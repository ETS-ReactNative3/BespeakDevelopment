import React, { Component } from "react";
import { 
    ActivityIndicator,
    FlatList,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { auth, db, _db } from '../firebase';

import SystemStyle from "../styles/SystemStyle";
import TicketScreenStyle from '../styles/TicketScreenStyle';

import dateFormat from '../helper/DateFormat';
import { 
    _getUserData,
    _arrangeData
} from '../helper/EventLoad';

class TicketList extends Component {
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
    }
    componentDidMount() {
        try {
            this.setState({
                loading: true
            })
            this._loadTickets();
        } catch(error) {
            console.log(error);
        }
    }
    async _retrieveTickets(type_extend = false) {
        let uid = auth.currentUser.uid;

        let get_ticket_query = await db.collection('ticket')
            .where('owner', '==', uid)
            .orderBy('server_time', 'desc');

        if(type_extend) {
            get_ticket_query = get_ticket_query
                .startAfter(this.state.last_data)
        }
        
        let documentSnapshots = await get_ticket_query
            .limit(this.state.limit)
            .get();

        let doc_data = [];
        let _data = []

        documentSnapshots.forEach((doc) => {
            doc_data.push({id: doc.id, ...doc.data()})
        })
        
        for(var i = 0; i < doc_data.length; i++) {
            let item = doc_data[i];

            let get_event_query = await db.collection('event')
                .doc(item.event_id)
                .get();

            if(get_event_query.empty) {
                item.ticket_owner = await _getUserData('_name', item.owner);
                item.name = 'A Bespeak Event';
                item.reg_date = await dateFormat(new Date(item.server_time),
                    "MMMM d, yyyy ∘ h:mm aaa");
                item.sched = 'Not Found.';

                continue;
            }

            let _event = get_event_query.data();

            let raw_data = await _arrangeData([_event]);
        
            raw_data = raw_data[0];
            raw_data.id = item.id

            raw_data.ticket_owner = await _getUserData('_name', item.owner);
            raw_data.reg_date = await dateFormat(new Date(item.server_time),
                "MMMM d, yyyy ∘ h:mm aaa");

            _data.push(raw_data)
        }

        console.log("Arranged Tickets: ", _data)

        let last_value = documentSnapshots.docs[documentSnapshots.docs.length-1]; 

        return {'data': _data, 'last': last_value}
    }
    async _loadTickets() {
        console.log('Loading Tickets...')

       let query_res = await this._retrieveTickets();
        this.setState({
            data: query_res.data,
            last_data: query_res.last,
            loading: false,
            can_extend: query_res.data.length == this.state.limit
        });
    }
    async _extendLoadTickets() {
        this.setState({
            refreshing: true,
            can_extend: false
        });
        console.log('Retrieving Other Tickets...')

        let query_res = await this._retrieveTickets(true);

        let has_data = query_res.data.length == this.state.limit;
        let current_data = this.state.data;

        this.setState({
            data: [... current_data, ... query_res.data],
            last_data: query_res.last,
            refreshing: false,
            can_extend: has_data
        });
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
            <View style={SystemStyle.EventListContainer}> 
                {this.state.loading && 
                    <View style={SystemStyle.TabContainer}>
                        <ActivityIndicator size={'large' } color="orange"/> 
                    </View>
                }
                {this.state.data.length == 0 &&
                    <View style={SystemStyle.TabContainer}>
                        <Text style={SystemStyle.TabEmptyList}> No tickets found. </Text>
                    </View>
                }
                <FlatList
                    data={Object.values(this.state.data)}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={TicketScreenStyle.MyTicketStub} //MyTicketExpiredStub For Expired
                                onPress = {() => this.props.navigation.navigate('TicketScreen', {ticket_id: item.id})}>
                                    <View style={TicketScreenStyle.MyTicketStubDiv}>
                                        <View>
                                            <Text style={TicketScreenStyle.MyTicketEvent}>{ item.name }</Text>
                                            <Text style={TicketScreenStyle.MyTicketDate}>{ item.sched }</Text>

                                            <Text style={TicketScreenStyle.MyTicketOrganizer}>{ item.owner_name }</Text>
                                            <Text style={TicketScreenStyle.MyTicketLocation}>{ item.location }</Text>
                                        </View>
                                        <View style={TicketScreenStyle.MyTicketQR}>
                                            <QRCode value={ item.id }/>
                                        </View>
                                    </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this._renderFooter()}
                    onEndReached={() => { 
                            console.log("Can Extend: ", this.state.can_extend)
                            if(this.state.can_extend) this._extendLoadTickets()
                        }
                    }
                    onEndReachedThreshold={0.5}
                    refreshing={this.state.refreshing}>
                </FlatList>
            </View>
        );
    }
}

export default React.memo(TicketList);