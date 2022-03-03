import React, { Component } from "react";
import { 
    ActivityIndicator,
    FlatList,
    Text,
    View, 
    RefreshControl,
    Image
} from 'react-native';
import { db, _db } from '../firebase';

import SystemStyle from "../styles/SystemStyle";

import { 
    _arrangeProfileData,
    _getFollowersId,
    _getFollowing,
    _getProfileImage
} from '../helper/ProfileLoad'

class ParticipantList extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            limit: 8,
            last_data: null,
            loading: true,
            refreshing: false,
            user_refresh: false, // Manual Refreshing
            can_extend: true,
        }

        this.onRefresh = this.onRefresh.bind(this)
    }
    componentDidMount() {
        try {
            this.setState({
                loading: true
            })
            this._loadParticipants();
        } catch(error) {
            console.log(error);
        }
    }

    async _retrieveParticipants(type_extend = false) {
        let event_id = this.props.event_id;
        
        let get_participant_query = await db.collection('_participant')
            .doc(event_id)
            .get();

        let _result = get_participant_query.data();
        let raw_data = [];
        let for_attending = false;

        if(this.props._interested) {
            raw_data = _result?.interested;
        } else if(this.props._attending) {
            raw_data = _result?.attending;

            for_attending = true;
        } else {
            raw_data = _result?.attended;
        }
        
        if(!raw_data) raw_data = [];

        if(raw_data.length == 0) {
            return {'data': [], 'last': null}
        }

        if(for_attending) {
            let _data = await db.collection('ticket')
                .where(_db.FieldPath.documentId(), "in", raw_data)
                .get();

            let _owners = [];
            _data.forEach((doc) => {
                let data = doc.data()
                data = data.owner;
                _owners.push(data);
            })
            raw_data = _owners;
        }

        let get_profile_query = await db.collection('user_info')
            .where(_db.FieldPath.documentId(), "in", raw_data)

        if(type_extend) {
            get_profile_query = get_profile_query
                .startAfter(this.state.last_data)
        }
        
        get_profile_query = await get_profile_query
            .limit(this.state.limit)
            .get();
        
        let doc_data = [];

        get_profile_query.forEach((doc) => {
            doc_data.push({id: doc.id, ...doc.data()})
        })
        
        doc_data = await _arrangeProfileData(doc_data);
        console.log("Arranged Profile Data: ", doc_data)

        let last_value = get_profile_query.docs[get_profile_query.docs.length-1]; 

        return {'data': doc_data, 'last': last_value}
    }

    async _loadParticipants() {
        console.log('Loading Participants...')

       let query_res = await this._retrieveParticipants();
        this.setState({
            data: query_res.data,
            last_data: query_res.last,
            loading: false
        });

        this._loadImages(query_res.data)
    }

    async _extendLoadParticipants() {
        this.setState({
            refreshing: true,
            can_extend: false
        });
        console.log('Retrieving Other Participants...')

        let query_res = await this._retrieveParticipants(true);

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
            item.profile_image =  item.profile_image ? item.profile_image 
                : await _getProfileImage(false, 'profile')
            item.cover_image = item.cover_image ? item.cover_image 
                : await _getProfileImage(false, 'cover')

            this.setState({data: [...has_add, ...items]});
            console.log(this.state.data)
        })
    }

    doRefresh() {
        return new Promise((resolve) => {
          this._loadParticipants()
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
        } 
    }

    render() {
        return (
            <View style={SystemStyle.Container}>
                {this.state.loading && 
                    <View style={SystemStyle.TabContainer}>
                        <ActivityIndicator size={50} color="orange"/> 
                    </View>
                }
                {this.state.data.length == 0 &&
                    <View style={SystemStyle.TabContainer}>
                        <Text style={SystemStyle.TabEmptyList}> No users found. </Text>
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
                        return (
                        <View style={SystemStyle.NameList}>
                            <View style={SystemStyle.NamesImgContainer}>
                                <Image style={SystemStyle.NamesImg}
                                    source={ item.profile_image }/>
                            </View>
                            <View style={SystemStyle.NamesInCard}>
                                <Text style={SystemStyle.NamesInCardText}>{ item._name }</Text>
                            </View>
                        </View>);
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this._renderFooter()}
                    onEndReached={() => { 
                            console.log("Can Extend: ", this.state.can_extend)
                            if(this.state.can_extend) this._extendLoadParticipants()
                        }
                    }
                    onEndReachedThreshold={0.5}
                    refreshing={this.state.refreshing}>
                </FlatList>
            </View>
        );
    }
}

export default ParticipantList;