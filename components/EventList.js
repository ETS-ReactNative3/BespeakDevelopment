import React, { Component } from "react";
import { ActivityIndicator,
    Alert,
    FlatList,
    Text,
    View, RefreshControl } from 'react-native';

import { auth, db, storage } from '../firebase';

import { EventCard, EventModal } from "./EventCard";

import dateFormat from '../helper/DateFormat';

import SystemStyle from "../styles/SystemStyle";

import { get } from "react-native/Libraries/Utilities/PixelRatio";

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
            modal_data: false
        }
        this.onRefresh = this.onRefresh.bind(this)
        this._viewModal = this._viewModal.bind(this)

        this.event_modal = React.createRef();
    }

    componentDidMount() {
        try {
            this.setState({
                loading: true
            })
            this._loadEvents();
        } catch(error) {
            console.log(error);
        }
    }

    _viewModal(data) {
        this.setState({modal_data: data});
        this.event_modal.current.show();
    }
    async _retrieveEvents(type_extend = false) {
        let get_events_query = await db.collection('event');

        if(this.props.for_profile && this.props.user_id) {
            console.log("Getting all events for USER ID: ", this.props.user_id)
            get_events_query = get_events_query
                .where("owner", "==", this.props.user_id)
        }   

        get_events_query = get_events_query
            .orderBy('server_time', 'desc')

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
        
        //console.log("Loaded Data: ", doc_data)

        doc_data = await this._arrangeData(doc_data);
        console.log("Arranged Data: ", doc_data)

        let last_value = documentSnapshots.docs[documentSnapshots.docs.length-1]; //doc_data[doc_data.length - 1]?.id;

        return {'data': doc_data, 'last': last_value}
    }

    async _loadEvents() {
        console.log('Loading Events...')

       let query_res = await this._retrieveEvents();

        this.setState({
            data: query_res.data,
            last_data: query_res.last,
            loading: false
        });
    }
    async _arrangeData(events_data) {
        //console.log('Arranging: ', events_data)
        let arranged_data = [];

        for(var i = 0; i < events_data.length; i++) {
            let item = events_data[i]
            //console.log('Arranging: ', item)
            item.owner_name = await this._getOrganizerName(item.owner);
            item.event_image = await this._getEventImage(item.id);

            let raw_sched = parseInt(item.schedule);
            let raw_posted = parseInt(item.server_time);

            let sched = await dateFormat(new Date(raw_sched), "EEEE, MMMM d, yyyy ∘ h:mm aaa");
            let posted = await dateFormat(new Date(raw_posted), "MMMM d, yyyy");
            
            item.sched = sched;
            item.date_posted = posted;

            arranged_data.push(item)
        }
        return arranged_data;
    } 
    // #TODO: Optimize, Minimalize
    async _extendLoadEvents() {
        this.setState({
            refreshing: true,
            can_extend: false
        });
        console.log('Retrieving Other Events...')

        let query_res = await this._retrieveEvents(true);

        let has_data = query_res.data.length > 0;

        this.setState({
            data: [... this.state.data, ... query_res.data],
            last_data: query_res.last,
            refreshing: false,
            can_extend: has_data
        });
    }

    async _getEventImage(event_id) {
        let event_image = false;
        await storage.ref(`/event/${event_id}/banner`)
            .getDownloadURL()
            .then((url) => { 
                event_image = url
                console.log("Loaded Event Image for ", event_id, ": ", url)
            }).catch((error) => {
                if(error.code != 'storage/object-not-found') {
                console.log("Error occured: ", error.message)
                Alert.alert('Error!', error.message)
                }
            })

        if(event_image) {
            return {uri: event_image};
        }
        return require('../assets/img/blank-cover.png');
    }
    // #TODO: OPTIMIZE
    async _getOrganizerName(uid) {
        console.log('Getting Organizer Name for ID: ' + uid);

        const user_info = db.collection("user_info")
        const query = user_info.doc(uid)
        const snapshot = await query.get()

        if(snapshot.empty) {
            console.log('No data found for user: ', uid);
            return "Bespeak User";
        } 

        var raw_data = snapshot.data()
        var organizer_name = ''

        if(raw_data.user_type == "INDIV") {
            organizer_name = raw_data.f_name 
                + ' ' + raw_data.l_name;
        } else {
            organizer_name = raw_data.org_name
        }

        return organizer_name;
    }

    async _getOrganizerLocation(uid) {
        console.log('Getting Organizer Loc for ID: ' + uid);

        const user_info = db.collection("user_info")
        const query = user_info.doc(uid)
        const snapshot = await query.get()

        if(snapshot.empty) {
            console.log('No data found for user: ', uid);
            return;
        } 

        var raw_data = snapshot.data()
        return raw_data.location;
    }
    doRefresh() {
        return new Promise((resolve) => {
          this._loadEvents() 
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
            return null;
        }
    }

    render() {
        return (
            <View style = {SystemStyle.EventListContainer}>
                <EventModal modal_ref = {this.event_modal} data = {this.state.modal_data}/>
                {this.state.loading && 
                    <View style={SystemStyle.TabContainer}>
                        <ActivityIndicator size={
                                this.props.for_profile ? 
                                'large' : 50
                            } color="orange"/> 
                    </View>
                }
                {this.state.data.length == 0 &&
                    <View style={SystemStyle.TabContainer}>
                        <Text style={SystemStyle.TabEmptyList}> No events found. </Text>
                    </View>
                }
                <FlatList
                    refreshControl={
                        this.props.for_home &&
                        <RefreshControl
                          refreshing={this.state.user_refresh}
                          onRefresh={this.onRefresh}
                          colors={["gray", "orange"]}/>
                    }
                    data={Object.values(this.state.data)}
                    renderItem={({ item }) => (
                        <EventCard data = {item} modal_view = {this._viewModal}/>
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
            </View>
        );
    }
}

export default React.memo(EventList); 