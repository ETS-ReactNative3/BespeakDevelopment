import React, { Component } from 'react';
import {
    TouchableOpacity, 
    Text, 
    View,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import { 
    SimpleLineIcons,
} from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay/lib';

import fetch_date_time from '../api/GlobalTime'

import { db, _db } from '../firebase.js';

import PreviewTicketScanned from "../styles/PreviewTicketScanned.js";
import SystemStyle from '../styles/SystemStyle.js';

import dateFormat from '../helper/DateFormat';
import { 
    _arrangeData,
    _checkEventExist
} from '../helper/EventLoad.js';
import { _initializeDoc } from '../helper/ProfileHelper.js';

class AdmitScreen extends Component {
    state = {
        event_data: [],
        user_data: [],

        is_loading: true,
        is_verifying: false
    }
    componentDidMount() {
        if(this.props.route.params.content) {
            this._loadData();
        } else {
            this.props.navigation.goBack();
        }
    }

    async _getAdmitStatus(event_id, user_id) {
        let participant_query = await db.collection('_participant')
            .doc(event_id)
            .get();

        if(!participant_query.exists) {
            return false;
        }

        let _participants = [];
        let _user = participant_query.data();
        _participants = _user?.attended;

        if(!_participants) return false;

        console.log('Participant List: ', _participants);

        return _participants?.includes(user_id);
    }
    async _loadData() {
        let _content = this.props.route.params.content;
        let current_time = await fetch_date_time();

        let event = await _arrangeData([_content.event]);

        event = event[0];

        event.is_admitted = await this._getAdmitStatus(
            _content.event.id, _content.ticket.owner
        );

        event.time_admittable = event.schedule - 2 * (60 * 60 * 1000)
        event.is_admittable = 
            event.time_admittable < current_time.epoch ;

        if(event.is_admitted) {
            Alert.alert('User has been admitted', 
                'This ticket was already used earlier.')
        }

        let user_query = await db.collection('user_info')
            .doc(_content.ticket.owner)
            .get();

        let user = user_query.data();
        user.id = user_query.id;

        user.registration_date = await dateFormat(new Date
            (_content.ticket.server_time), "EEEE, MMMM d, yyyy h:mm aaa");

        this.setState({
            event_data: event, 
            user_data: user, 
            is_loading: false
        })
    }
    async _handleAdmit(event_data, user_id) {
        this.setState({is_verifying: true});
        let event_id = event_data.id;

        if(!await _checkEventExist(event_id)) {
            Alert.alert('Content not found',
                'The content you are trying to open may have been removed.');
            this.props.navigation.goBack();
            return;
        }
        if(!event_data.is_admitted) {
            db.collection("_participant")
                .doc(event_id)
                .update({
                    attended: _db.FieldValue.arrayUnion(user_id)
                }).catch(async (err) => {
                    if(err.code == 'firestore/not-found') {
                        await _initializeDoc("_participant", {
                            attended: [user_id]
                        }, event_id)
                        return;
                    }
                    Alert.alert("Error!", err.message);
                    console.log("Error: ", err)
                })
        }
        this.setState({is_verifying: false});
        this.props.navigation.replace('EventScreen', {event_id: event_id})
    }
    render() {
        let _event = this.state.event_data;
        let _user = this.state.user_data;

        return (
            <View style = {PreviewTicketScanned.Wrapper}>
                <ScrollView style = {PreviewTicketScanned.ScrollContainer} > 
                    { this.state.is_loading && 
                        <View style={SystemStyle.TabContainer}>
                            <ActivityIndicator size={50} color="orange"/> 
                        </View>
                    }
                    { this.state.is_verifying && 
                        <Spinner visible={true} textContent={'Verifying your request...'}
                            textStyle={SystemStyle.defaultLoader}
                            animation = 'fade'
                            overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                    }
                    <View style={PreviewTicketScanned.TicketContainer}>
                        <View style={PreviewTicketScanned.EventContainer}>
                            <Text style={PreviewTicketScanned.EventName}>{ _event.name }</Text>
                            <Text style={PreviewTicketScanned.EventDate}>{ _event.sched }</Text>
                            <Text style={PreviewTicketScanned.EventOrganizer}>{ _event.owner_name }</Text>
                            <View style={PreviewTicketScanned.TicketLocContainer}>
                                <SimpleLineIcons name="location-pin" size={16} color="black"/>
                                <Text style={PreviewTicketScanned.EventLocation}>{ _event.location }</Text>
                            </View>
                        </View>
                        <View style={PreviewTicketScanned.imgContainer}>
                            <Image style={PreviewTicketScanned.imgscan}
                                source={ _user.profile_image ? _user.profile_image 
                                    : require('../assets/img/blank-profile.png')}/>
                        </View>
                        <View style={PreviewTicketScanned.EventStat}>
                            <Text style={PreviewTicketScanned.EventStattxt}>Your event is now</Text>
                            <Text style={PreviewTicketScanned.EventStattxt}> in full swing!</Text>
                        </View>
                        <View style={PreviewTicketScanned.TicketPersonalInfo}>
                            <Text style={PreviewTicketScanned.PersonName}>{ _user._name }</Text>
                            <Text style={PreviewTicketScanned.PersonEmail}>{ _user.email }</Text>
                            <Text style={PreviewTicketScanned.PersonEmail}>{ _user.mobile }</Text>
                            <Text style={PreviewTicketScanned.DateRegistered}>{ _user.registration_date }</Text>
                        </View>
                        <View style={PreviewTicketScanned.ticketfooter}>
                            <Text style={PreviewTicketScanned.bespeaklogo}>bespeak</Text>
                            <Text style={PreviewTicketScanned.sandboxtech}>© Sandbox Tech</Text>
                        </View>      
                        <View style={PreviewTicketScanned.AdmitContainer}>
                            { _event.is_admittable ? (
                                <TouchableOpacity style={PreviewTicketScanned.AdmitBtn}
                                onPress={() => this._handleAdmit(_event, _user.id)}>
                                    <Text style={PreviewTicketScanned.AdmitTextBtn}>{
                                        _event.is_admitted ? 'Re-admit' : 'Admit'}</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={PreviewTicketScanned.WhyAreYouHere}
                                    onPress = {() => Alert.alert('Cannot be admitted', 
                                        'Admission starts on ', _event.time_admittable )}>
                                    <Text style={PreviewTicketScanned.WhyAreYouStillHere}>
                                        Event is on {_event.sched}</Text>
                                </TouchableOpacity>)}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default AdmitScreen;