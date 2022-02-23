import React, { Component } from "react";
import { 
    ActivityIndicator,
    FlatList,
    Text,
    View, 
    RefreshControl,
} from 'react-native';
import { auth, db, _db } from '../firebase';

import { ProfileCard } from "./ProfileCard";
import { ProfileListItem } from "./ProfileListItem";

import SystemStyle from "../styles/SystemStyle";

import { 
    _arrangeProfileData,
    _getFollowersId,
    _getFollowing,
    _getProfileImage
} from '../helper/ProfileLoad'

class OrganizerList extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            limit: 4,
            last_data: null,
            loading: true,
            refreshing: false,
            user_refresh: false, // Manual Refreshing
            can_extend: true,
        }

        this.onRefresh = this.onRefresh.bind(this)
        this._updateRelation = this._updateRelation.bind(this)
    }
    componentDidMount() {
        try {
            this.setState({
                loading: true
            })
            this._loadOrganizers();
        } catch(error) {
            console.log(error);
        }
    }
    _updateRelation(index) {
        this.setState({ refreshing: true });

        let organizer = this.state.data;
        
        index = organizer.indexOf(index)
        console.log("Processing Relation ID: ", index)
       
        organizer[index].is_following = !organizer[index].is_following;
         this.setState({data: organizer});
    
        this.setState({ refreshing: false });
    }
    async _retrieveOrganizers(type_extend = false) {

        let get_organizer_query = await db.collection('user_info');

        if(this.props.for_search && this.props.search_key) {
            let key = this.props.search_key;
            get_organizer_query = get_organizer_query
                .orderBy('_name')
                .where('_name', '>=', key)
                .where('_name', '<', key + `z`)
        } else if(this.props.list_follower) {
            let _list = await _getFollowersId();

            if(_list.length == 0) {
                return {'data': [], 'last': null}
            }

            get_organizer_query = get_organizer_query
                .where(_db.FieldPath.documentId(), "in", _list)
        } else if(this.props.list_following) {
            let _list = await _getFollowing();

            if(_list.length == 0) {
                return {'data': [], 'last': null}
            }

            get_organizer_query = get_organizer_query
                .where(_db.FieldPath.documentId(), "in", _list)
        }

        if(type_extend) {
            get_organizer_query = get_organizer_query
                .startAfter(this.state.last_data)
        }
        
        let documentSnapshots = await get_organizer_query
            .limit(this.state.limit)
            .get();
        let doc_data = [];

        documentSnapshots.forEach((doc) => {
            if(doc.id != auth.currentUser.uid)
                doc_data.push({id: doc.id, ...doc.data()})
        })
        
        doc_data = await _arrangeProfileData(doc_data);
        console.log("Arranged Profile Data: ", doc_data)

        let last_value = documentSnapshots.docs[documentSnapshots.docs.length-1]; 

        return {'data': doc_data, 'last': last_value}
    }
    async _loadOrganizers() {
        console.log('Loading Organizers...')

       let query_res = await this._retrieveOrganizers();
        this.setState({
            data: query_res.data,
            last_data: query_res.last,
            loading: false
        });

        this._loadImages(query_res.data)
    }
    async _extendLoadOrganizers() {
        this.setState({
            refreshing: true,
            can_extend: false
        });
        console.log('Retrieving Other Profiles...')

        let query_res = await this._retrieveOrganizers(true);

        let has_data = query_res.data.length > 0;
        let current_data = this.state.data;

        this.setState({
            data: [... current_data, ... query_res.data],
            last_data: query_res.last,
            refreshing: false,
            can_extend: has_data
        });

        this._loadImages(query_res.data, current_data);
    }

    _loadImages(items, has_add = []) {
        // Load Images Asynchronously
        items?.forEach(async (item) => {
            item.profile_image = await _getProfileImage(item.id, 'profile')
            item.cover_image = await _getProfileImage(item.id, 'cover')

            this.setState({data: [...has_add, ...items]});
        })
    }

    doRefresh() {
        return new Promise((resolve) => {
          this._loadOrganizers()
          setTimeout(resolve, 5000)
        });
    }
    async onRefresh() {
        console.log("Refreshing...")
        this.setState({'user_refresh': true})
        await this.doRefresh().then(() => {
            this.setState({
                'user_refresh': false,
                'can_extend': true
            })
            console.log("Refreshed.")
        })
    }
    _renderFooter() {
        if(this.state.refreshing) {
            return (
                <>
                    <ActivityIndicator color="orange"/> 
                    <Text style={SystemStyle.TabEmptyList}> Please wait. </Text>
                </>
            )
        } else {
            if(!this.props.for_search) return;
            return (
                <View style={SystemStyle.Footer}>
                    <Text style={SystemStyle.BespeakLogo}>bespeak</Text>
                    <Text style={SystemStyle.FooterText}>© Sandbox Technologies.</Text>
                </View>
            );
        }
    }
    render() {
        return (
            <View style={SystemStyle.EventListContainer}> 
                {this.state.loading && 
                    <View style={SystemStyle.TabContainer}>
                        <ActivityIndicator size={
                                !this.props.for_search ? 
                                'large' : 50
                            } color="orange"/> 
                    </View>
                }
                {this.state.data.length == 0 &&
                    <View style={SystemStyle.TabContainer}>
                        <Text style={SystemStyle.TabEmptyList}> No organizers found. </Text>
                    </View>
                }
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.user_refresh}
                            onRefresh={this.onRefresh}
                            colors={["gray", "orange"]}/>
                    }
                    data={Object.values(this.state.data)}
                    renderItem={({ item }) => {
                        if(this.props.for_search) {
                            return (
                                <ProfileCard data = {item} 
                                    refreshing={this.state.refreshing}
                                    navigation = {this.props.navigation}
                                    update_relation = {this._updateRelation}/>
                            );
                        }

                        return (
                            <ProfileListItem data = {item} 
                                refreshing={this.state.refreshing}
                                navigation = {this.props.navigation}
                                update_relation = {this._updateRelation}/>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this._renderFooter()}
                    onEndReached={() => { 
                            console.log("Can Extend: ", this.state.can_extend)
                            if(this.state.can_extend) this._extendLoadOrganizers()
                        }
                    }
                    onEndReachedThreshold={0.5}
                    refreshing={this.state.refreshing}>
                </FlatList>
            </View>
        );
    }
}

export default React.memo(OrganizerList);