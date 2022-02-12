import React, { Component } from "react";
import { ActivityIndicator,
    Alert,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    View } from 'react-native';
import { 
    Feather,
    Ionicons,
    SimpleLineIcons,
} from '@expo/vector-icons';
import { auth, db, storage } from '../firebase';

import dateFormat from '../helper/DateFormat';

import HomeScreenStyle from "../styles/HomeScreenStyle";
import SystemStyle from "../styles/SystemStyle";

class EventList extends Component {
    constructor() {
        super();

        this.state = {
            data: {},
            limit: 9,
            last_data: null,
            loading: true,
            refreshing: false
        }
    }

    componentDidMount() {
        try {
            this._loadEvents();
        } catch(error) {
            console.log(error);
        }
    }

    async _loadEvents() {
        this.setState({
            loading: true
        })
        console.log('Loading Events...')

        let get_events_query = await db.collection('event')
            .orderBy('server_time', 'desc')
            .limit(this.state.limit);
        
        let documentSnapshots = await get_events_query.get();
        let doc_data = [];

        documentSnapshots.forEach((doc) => {
            doc_data.push({id: doc.id, ...doc.data()})
        })
        
        console.log("Loaded Data: ", doc_data)

        doc_data = await this._arrangeData(doc_data);
        console.log("Arranged Data: ", doc_data)

        let last_value = doc_data[doc_data.length - 1]?.id;

        this.setState({
            data: doc_data,
            last_data: last_value,
            loading: false
        });
    }
    async _arrangeData(events_data) {
        console.log('Arranging: ', events_data)
        let arranged_data = [];
        /*await events_data.forEach(async (item) => {
            console.log('Arranging: ', item)
            item.owner_name = await this._getOrganizerName(item.owner);
            item.event_image = await this._getEventImage(item.id);
            console.log('Arranged: ', item)
            arranged_data.push(item)
        })*/
        for(var i = 0; i < events_data.length; i++) {
            let item = events_data[i]
            console.log('Arranging: ', item)
            item.owner_name = await this._getOrganizerName(item.owner);
            item.event_image = await this._getEventImage(item.id);

            let raw_sched = parseInt(item.schedule);
            let sched = await dateFormat(new Date(raw_sched), "EEEE, MMMM d, yyyy - h:mm aaa");
            
            item.sched = sched;

            arranged_data.push(item)
        }
        return arranged_data;
    } 
    // #TODO: Optimize, Minimalize
    async _extendLoadEvents() {
        this.setState({
            refreshing: true
        });
        console.log('Retrieving Other Events...')

        let get_events_query = await db.collection('event')
            .orderBy('server_time', 'desc')
            .startAfter(this.state.last_data)
            .limit(this.state.limit)

        let documentSnapshots = await get_events_query.get();

        let documentData = documentSnapshots.docs.map(document => document.data())

        let last_value = documentData[documentData.length - 1]?.id; 

        this.state({
            data: [...this.state.data, ... documentData],
            last_data: last_value,
            refreshing: false
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
    _renderFooter() {
        if(this.state.loading) {
            return (
                <ActivityIndicator/>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style = {SystemStyle.EventListContainer}>
                {this.state.loading && 
                    <View style={SystemStyle.TabContainer}>
                        <ActivityIndicator size="large" color="orange"/> 
                    </View>
                }
                <FlatList
                    data={Object.values(this.state.data)}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={SystemStyle.Card}>
                                <Image style={SystemStyle.CardImage}
                                    source={ item.event_image }/>
                                <View style={SystemStyle.CardContainer}>
                                    <Text style={SystemStyle.CardTitle}>{item.name}</Text>
                                    <Text style={SystemStyle.CardSched}>{item.sched}</Text>
                                    <Text style={SystemStyle.CardOrg}>
                                        { item.owner_name }
                                    </Text>
                                    <View style={SystemStyle.CardLocationContainer}>
                                        <SimpleLineIcons name="location-pin" size={16} color="black"/>
                                        <Text style={SystemStyle.CardLocation}>{ item.location }</Text>
                                    </View>
                                </View>
                                <View style={SystemStyle.CardOption}>
                                    <TouchableOpacity>
                                        <Ionicons name="share-social-outline" size={22} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Feather name="bookmark" size={22} color="black" />
                                    </TouchableOpacity>
                                </View>     
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this._renderFooter()}
                /*    onEndReached={this._extendLoadEvents()}*/
                    onEndReachedThreshold={0}
                    ListEmptyComponent={
                        <View style={SystemStyle.TabContainer}>
                            <Text style={SystemStyle.TabEmptyList}> No event found</Text>
                        </View>
                    }
                    refreshing={this.state.refreshing}>
                </FlatList>
            </View>
        );
    }
}

export default React.memo(EventList); 