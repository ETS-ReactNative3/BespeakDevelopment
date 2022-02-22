import React, { Component } from "react";
import { ActivityIndicator,
    FlatList,
    Text,
    View, 
    RefreshControl
} from 'react-native';

import { db, _db } from '../firebase';

import { _arrangeData, _getUserData } from "../helper/EventLoad";

import { EventCard, EventModal } from "./EventCard";

import SystemStyle from "../styles/SystemStyle";

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
        this._removeItem = this._removeItem.bind(this)

        this.event_modal = React.createRef();
    }

    componentDidMount() {
        try {
            //# TODO: Optimize
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this._loadEvents();
            });
            this.setState({
                loading: true
            })
            this._loadEvents();
        } catch(error) {
            console.log(error);
        }
    }
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

        let get_events_query = await db.collection('event');

        if(!for_profile) {
            get_events_query = get_events_query
                .where('is_open', '==', true);
        }

        if(for_profile) {
            console.log("Getting all events for USER ID: ", this.props.user_id)
            get_events_query = get_events_query
                .where("owner", "==", this.props.user_id)
        } else if(this.props.for_saved) {
            let saved_events = await _getUserData("bookmarked")
            console.log("Getting all bookmarked events for USER ID: ", this.props.user_id)

            if(saved_events.length == 0) {
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
        
        //console.log("Loaded Data: ", doc_data)

        doc_data = await _arrangeData(doc_data);
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
            return (
                <View style={SystemStyle.Footer}>
                    <Text style={SystemStyle.BespeakLogo}>bespeak</Text>
                    <Text style={SystemStyle.FooterText}>© Sandbox Technologies.</Text>
                </View>
            );
        }
    }

    render() {
        if(this.state.data.length == 0) {}
        if(this.props.for_profile && this.props.user_id) {

        }
        return (
            <View style = {SystemStyle.EventListContainer}>
                {this.state.loading && 
                    <View style={SystemStyle.TabContainer}>
                        <ActivityIndicator size={
                                this.props.for_profile ? 
                                'large' : 50
                            } color="orange"/> 
                    </View>
                }
                {this.state.data.length == 0 && (
                        this.props.for_profile && this.props.user_id ? (
                            // Dito yung ipapacreate mo siya ng ibint
                            <View style={SystemStyle.TabContainer}>
                                <Text style={SystemStyle.TabEmptyList}> No events found. Create one. </Text>
                            </View>
                        ) : this.props.for_saved ? (
                            // Dito yung ipapa browse mo siya ng ibint para mag bookmark cya
                            <View style={SystemStyle.TabContainer}>
                                <Text style={SystemStyle.TabEmptyList}> No events found. Bookmark an event. </Text>
                            </View>
                        ) : (
                            // Dito yung ipapa browse mo siya ng organizer para magka laman newspid niya
                            <View style={SystemStyle.TabContainer}>
                                <Text style={SystemStyle.TabEmptyList}> No events found. Follow an organizer. </Text>
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