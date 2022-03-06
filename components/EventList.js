import React, { Component } from "react";
import { ActivityIndicator,
    FlatList,
    Text,
    View,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import { auth, db, _db } from '../firebase';

import fetch_date_time from '../api/GlobalTime';

import { 
    _arrangeData, 
    _getUserData,
    _getEventImage,
    _getProfileImage
} from "../helper/EventLoad";
import { _getFollowing } from "../helper/ProfileLoad";

import { EventCard, EventModal } from "./EventCard";

import SystemStyle from "../styles/SystemStyle";
import { ScrollView } from "react-native-gesture-handler";

class EventList extends Component {
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
            modal_data: false,

            is_mounted: false
        }
        this.onRefresh = this.onRefresh.bind(this)
        this._viewModal = this._viewModal.bind(this)
        this._removeItem = this._removeItem.bind(this)

        this.event_modal = React.createRef();
    }

    componentDidMount() {
        try {
            this.setState({
                loading: true
            })
            this._loadEvents();

            //# TODO | FIX: Prevent Rerendering of Events to Top First.
            this.setState({is_mounted: true});

            //# TODO: Optimize
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                if((this.state.is_mounted && this.props.for_profile)) {
                        this._loadEvents();
                }
            }); 
        } catch(error) {
            console.log(error);
        }
    }
    //# TODO | FIX -
    componentWillUnmount() {
        this._unsubscribe();
    }
    _removeItem(index) {
        this.setState({ refreshing: true });

        let events = this.state.data;
        
        index = events.indexOf(index)
        console.log("Processing Bookmark ID: ", index)
        if(this.props.for_saved) {
            events.splice(index, 1)
            this.setState({data: events});
            console.log(this.state.data)
        } else {
            events[index].is_bookmarked = !events[index].is_bookmarked;
            this.setState({data: events});
        }

        this.setState({ refreshing: false });
    }
    _viewModal(data) {
        this.setState({modal_data: data});
        this.event_modal.current.show();
    }
    async _retrieveEvents(type_extend = false) {
        let for_profile = this.props.for_profile && this.props.user_id;
        let for_user = this.props.for_user && this.props.user_id;

        let get_events_query = await db.collection('event');

        if(!for_profile) {
            get_events_query = get_events_query
                .where('is_open', '==', true);
        }

        if(for_profile || for_user) {
            console.log("Getting all events for USER ID: ", this.props.user_id)
            get_events_query = get_events_query
                .where("owner", "==", this.props.user_id)
        } else if(this.props.for_saved) {
            let saved_events = await _getUserData("bookmarked")
            
            console.log("Getting all bookmarked events...");

            if(!saved_events || saved_events.length == 0) {
                return {'data': [], 'last': null}
            }

            get_events_query = get_events_query
                .where(_db.FieldPath.documentId(), "in", saved_events)
        } else if(this.props.for_search && this.props.search_key) {
            let key = this.props.search_key;

            get_events_query = get_events_query
                .orderBy('name')
                .where('name', '>=', key)
                .where('name', '<', key + `z`)
        } else if(this.props.for_home) {
            let following = await _getFollowing();

            if(following.length == 0) {
                return {'data': [], 'last': null}
            }

            let current_time = await fetch_date_time();

            following.push(auth.currentUser.uid)

            let _negate_day = current_time.epoch - 86400000;
            get_events_query = get_events_query
                .orderBy('schedule')
                .where('schedule', '>', _negate_day)
                .where('owner', "in", following)
        }

        if(!this.props.for_saved && !this.props.search_key) {
                get_events_query = get_events_query
                    .orderBy('server_time', 'desc')
        }

        if(type_extend) {
            get_events_query = get_events_query
                .startAfter(this.state.last_data)
        }
        
        let documentSnapshots = await get_events_query
            .limit(this.state.limit)
            .get();
        let doc_data = [];

        documentSnapshots.forEach((doc) => {
            doc_data.push({id: doc.id, ...doc.data()})
        })
        
        // console.log("Loaded Data: ", doc_data)

        doc_data = await _arrangeData(doc_data);
        // console.log("Arranged Data: ", doc_data)
        /*
        for(var i = 0; i < doc_data.length; i++) {
            
            //console.log('User Images: ', doc_data[i].sneak_imgs);
        }*/

        console.log("Loaded Events.")

        let last_value = documentSnapshots.docs[documentSnapshots.docs.length-1]; //doc_data[doc_data.length - 1]?.id;

        return {'data': doc_data, 'last': last_value}
    }

    async _loadEvents() {
        console.log('Loading Events...')

        let query_res = await this._retrieveEvents();

        this.setState({
            data: query_res.data,
            last_data: query_res.last,
            loading: false,
            can_extend: query_res.data.length == this.state.limit
        });

        this._loadImages(query_res.data)

        if(!this.props.for_profile)
            this._loadMiscs(query_res.data)
    }
    // #TODO: Optimize, Minimalize
    async _extendLoadEvents() {
        this.setState({
            refreshing: true,
            can_extend: false
        });
        console.log('Retrieving Other Events...')

        let query_res = await this._retrieveEvents(true);

        let has_data = query_res.data.length == this.state.limit;
        let current_to_add = this.state.data;

        this.setState({
            data: [... current_to_add, ... query_res.data],
            last_data: query_res.last,
            refreshing: false,
            can_extend: has_data
        });
        
        this._loadImages(query_res.data, current_to_add)

        if(!this.props.for_profile)
            this._loadMiscs(query_res.data, current_to_add)
    }
    _loadMiscs(items, has_add = []) {
        // Load Images
        items?.forEach(async (item) => {
            item.sneak_imgs = [];
            item.summary = 'Be the first to join this event!';

            let get_participant_query = await db.collection("_participant")
                .doc(item.id)
                .get();

            if(!get_participant_query.empty) {
                let participant = []
                let _names = []
                
                let raw_data = get_participant_query.data();

                raw_data = raw_data?.interested;

                if(raw_data) {
                    //console.log('Participants: ', raw_data)

                    for(var inc = 0; inc < raw_data.length 
                        && inc < 5; inc++) {
                            participant.push(await _getProfileImage(raw_data[inc]));
                            if(inc < 2) {
                                let f_name = await _getUserData('f_name', raw_data[inc])

                                if(f_name) 
                                    _names.push(f_name);
                                else
                                    _names.push(await _getUserData('org_name', raw_data[inc]))
                                    
                            }
                        }
                    
                    if(_names.length > 1) {
                        let others = raw_data.length - 2;

                        item.summary = `${_names[0] ? _names[0] : 'A user'}, ${_names[1] ? _names[1] : 'A user'}` +
                        `${others > 1 ? ' and ' + others : others == 1 ? ' and one other' : ''} are interested.`
                    } else if(_names.length == 1){
                        item.summary = `${_names[0] ? _names[0] : 'A user'} is interested.`
                    } 
                }
                item.sneak_imgs = participant;
            } 

            
            this.setState({data: [...has_add, ...items]});
        })
    }
    _loadImages(items, has_add = []) {
        // Load Images
        items?.forEach(async (item) => {
            item.event_image = item._banner ? item._banner
                : await _getEventImage(undefined, item.random_banner)
            
            this.setState({data: [...has_add, ...items]});

            item.owner_image = await _getProfileImage(item.owner)

            this.setState({data: [...has_add, ...items]});
        })
    }
    doRefresh() {
        return new Promise((resolve) => {
          this._loadEvents() 
          setTimeout(resolve, 3000)
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
            <View style = {SystemStyle.EventListContainer}>
                {this.state.loading && 
                    <View style={SystemStyle.TabContainer}>
                        <ActivityIndicator size={
                                this.props.for_profile || this.props.for_user ? 
                                'large' : 50
                            } color="orange"/> 
                    </View>
                }
                {this.state.data.length == 0 && (
                        this.props.for_profile && this.props.user_id ? (
                        <View style={SystemStyle.TabContainer}>
                            <ScrollView>    
                                <View style={SystemStyle.TabContainer}>
                                    <View style={SystemStyle.CreateEventImgContainer}>
                                        <Image style={SystemStyle.CreateEventImg} source={require('../assets/img/CreateEvent.png')}/>      
                                    </View>
                                    <Text style={SystemStyle.EmptyTitle}> Create your event </Text>
                                    <Text style={SystemStyle.EmptyTitleAdditionalInfo}> When you create an event, they will appear here</Text>
                                    <View style={SystemStyle.Center}>
                                        <Text style={SystemStyle.EmptyTitleAdditionalInfo}> on your profile. </Text>
                                    </View>
                                    <Text style={SystemStyle.NameList}></Text>
                                    <View style={SystemStyle.Center}>  
                                        <TouchableOpacity style={SystemStyle.LoadBtn}
                                            //onPress={() => this._extendLoadComments()}
                                        >
                                            <Text style={SystemStyle.LoadText}>Refresh...</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>

                        ) : this.props.for_saved ? (
                            <View style={SystemStyle.TabContainer}>
                                <View style={SystemStyle.LookEventImgContainer}>
                                    <Image style={SystemStyle.LookEventImg} source={require('../assets/img/LookEvent.png')}/>      
                                </View>
                                    <Text style={SystemStyle.EmptyTitle}> Look for an event </Text>
                                    <Text style={SystemStyle.EmptyTitleAdditionalInfo}> All the events you have saved will show up here. </Text>
                            </View>
                        ) : (
                            <View style={SystemStyle.TabContainer}>
                                <View style={SystemStyle.WelcomeToBespeakImgContainer}>
                                    <Image style={SystemStyle.WelcomeToBespeakImg} source={require('../assets/img/WelcomeToBespeak.png')}/>      
                                </View>
                                    <Text style={SystemStyle.EmptyTitle}> Welcome to Bespeak </Text>
                                    <Text style={SystemStyle.AdditionalInfo}> Follow organizers to start seeing their upcoming events. </Text>
                                    <Text style={SystemStyle.NameList}></Text>
                                    <View style={SystemStyle.Center}>  
                                        <TouchableOpacity style={SystemStyle.LoadBtn}
                                            //onPress={() => this._extendLoadComments()}
                                        >
                                            <Text style={SystemStyle.LoadText}>Refresh...</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                        )
                    ) 
                }
                <FlatList
                    refreshControl={
                        (this.props.for_home || this.props.for_search) &&
                        <RefreshControl
                          refreshing={this.state.user_refresh}
                          onRefresh={this.onRefresh}
                          colors={["gray", "orange"]}/>
                    }
                    data={Object.values(this.state.data)}
                    renderItem={({ item }) => (
                        <EventCard data = {item} 
                        refreshing={this.state.refreshing}
                            modal_view = {this._viewModal}
                            remove = {this._removeItem}
                            navigation = {this.props.navigation}/>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this._renderFooter()}
                    onEndReached={() => { 
                            console.log("Can Extend: ", this.state.can_extend)
                            if(this.state.can_extend) this._extendLoadEvents()
                        }
                    }
                    onEndReachedThreshold={0.5}
                    refreshing={this.state.refreshing}>
                </FlatList>

                <EventModal modal_ref = {this.event_modal} 
                    data = {this.state.modal_data}
                    navigation = {this.props.navigation}/>
            </View>
        );
    }
}

export default React.memo(EventList); 