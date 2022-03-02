import React, { Component } from 'react';
import {
    TouchableOpacity, 
    Text, 
    View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import QRCode from 'react-native-qrcode-svg';

import { db } from '../firebase.js';

import ViewTicket from "../styles/ViewTicket.js";
import SystemStyle from '../styles/SystemStyle.js';

import dateFormat from '../helper/DateFormat';
import { 
    _arrangeData,
    _getUserData
} from '../helper/EventLoad';

class TicketScreen extends Component {
    state = {
        data: [],

        is_loading: true
    }

    componentDidMount() {
        let _id = this.props.route.params.ticket_id;
        this._loadTicket(_id);
    }
    
    async _loadTicket(ticket_id) {
        let get_ticket_query = await db.collection('ticket')
            .doc(ticket_id)
            .get();

        if(get_ticket_query.empty) {
            this.props.route.params.navigation.goBack();
        }

        let _ticket = get_ticket_query.data();

        let get_event_query = await db.collection('event')
            .doc(_ticket.event_id)
            .get();

        if(get_event_query.empty) {
            this.props.route.params.navigation.goBack();
        }

        let _event = get_event_query.data();

        _data = await _arrangeData([_event]);
        
        _data = _data[0];

        _data.ticket_owner = await _getUserData('_name', _ticket.owner);
        _data.reg_date = await dateFormat(new Date(_ticket.server_time),
            "MMMM d, yyyy ∘ h:mm aaa");

        this.setState({
            data: {..._data},
            is_loading: false
        });
    }

    render() {
        if(this.state.is_loading) {
            return (
                <Spinner visible={true}
                    textStyle={SystemStyle.defaultLoader}
                    animation = 'fade'
                    overlayColor = "orange"/>
            );
        }

        let item = this.state.data;
        return (
            <View style={ViewTicket.SIcontainer}> 
                <View style={ViewTicket.TicketContent}>
                    <View style={ViewTicket.YourTicket}>
                        <View style={ViewTicket.YourTicketContent}>
                            <Text style={ViewTicket.bespeaklogoWhite}>bespeak</Text>
                            <Text style={ViewTicket.eventTitlecontentWhite}>{ item.name }</Text>
                            <Text style={ViewTicket.eventDTRcontentWhite}>{ item.sched }</Text>
                            <Text style={ViewTicket.eventLOCcontentWhite}>{ item.owner_name }</Text>
                            <Text style={ViewTicket.feedcontentWhite}>{ item.location }</Text>
                        </View>
                        <View style={ViewTicket.SampleQRpicContainer}>
                            <View style={ViewTicket.SampleQRpic}> 
                                <QRCode value={ this.props.route.params.ticket_id }/>
                            </View>
                        </View>
                        <View style={ViewTicket.YourTicketContent}>
                            <Text style={ViewTicket.NameOnTicketWhite}>{ item.ticket_owner }</Text>
                            <Text style={ViewTicket.DateRegisteredWhite}>{ item.reg_date }</Text>
                            <Text style={ViewTicket.RefNumWhite}>Ref: 182hencxais</Text>
                        </View>
                    </View>
                    <View style={ViewTicket.DetailscontentOnTicket}>
                        <Text style={ViewTicket.contentDetailsOnTicket}>
                            { item.desc }
                        </Text>
                        <Text style={ViewTicket.contentDetailsOnTicket}>
                            { item.info }
                        </Text>
                    </View>
                    <View style={ViewTicket.doneContainer}>
                        <TouchableOpacity style={ViewTicket.donebtn} 
                            onPress={() => {
                                console.log('Closing ticket...');
                                this.props.route.params.navigation.goBack()
                                this.props.route.params.navigation.goBack()}}>
                                <Text style={ViewTicket.donebtntext}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
    
export default TicketScreen;  