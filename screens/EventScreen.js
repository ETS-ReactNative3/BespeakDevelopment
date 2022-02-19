import React, { Component } from 'react';
import {
    ScrollView, 
    TouchableOpacity, 
    Text, 
    View,
    Image,
    Pressable,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { 
    Feather,
    AntDesign,
    SimpleLineIcons,
    MaterialCommunityIcons,
    Ionicons
} from '@expo/vector-icons';
import { InputOutline } from 'react-native-input-outline';
import * as ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';

import { auth, db, storage } from '../firebase'

import fetch_date_time from '../api/GlobalTime'

import CreateEventStyle from "../styles/CreateEventStyle.js";
import Validation from '../styles/Validation';
import SystemStyle from "../styles/SystemStyle";

import Properties from "../values/Properties"
import dateFormat from "../helper/DateFormat"
import { _arrangeData } from "../helper/EventLoad"

class EventScreen extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            loading: true,
        }
    }
    componentDidMount() {
        let event_id = this.props.route.params.event_id
        if(event_id) {
            this._retrieveEvent(event_id)
        } else {
            this.props.navigation.goBack();
        }
    }
    async _retrieveEvent(event_id) {
        let get_event_query = await db
            .collection('event')
            .doc(event_id)
            .get();
        
        if(get_event_query.empty) {
            console.log('No data found for user: ', uid);
            return;
        }

        let _data = get_event_query.data();
        _data.id = get_event_query.id;
        _data = await _arrangeData([_data], true); 

        console.log("Opened Event Data: ", _data)

        this.setState({
            loading: false,
            data: _data[0]
        });
    }
    render() {
        let item = this.state.data

        if(this.state.loading) 
            return (
                <View style={SystemStyle.TabContainer}>
                    <ActivityIndicator size={'large'} color="grey"/> 
                </View>
            )

        return (
            <ScrollView>
                <View style={SystemStyle.EventContainer}>
                    <View style={SystemStyle.ImgContainer}>
                        <Image style={SystemStyle.ImgContainer}
                            source={ item.event_image }/>
                    </View>
                    <View style={SystemStyle.EventContainer}>
                        <Text style={SystemStyle.EventTitle}>{ item.name }</Text>

                        <View style={SystemStyle.OrganizerTab}>
                            <TouchableOpacity style={SystemStyle.OrganizerInfo}
                                onPress={() => navigation.navigate('NotificationDetailScreen')}>
                                    <View style={SystemStyle.OrganizerImgContainer}>
                                        <Image style={SystemStyle.OrganizerImg}
                                            source={ item.owner_image }/>
                                    </View>
                                    <View style={SystemStyle.OrgCardContainer}>
                                        <Text style={SystemStyle.OrganizerName}>{ item.owner_name }</Text>
                                    </View>
                            </TouchableOpacity>

                            {item.owner == auth.currentUser.uid ? (
                                <TouchableOpacity style={SystemStyle.FollowOrgBtn}
                                    onPress={() => this.props.navigation.navigate('EditEventScreen')}>
                                        <Text style={SystemStyle.FollowOrgTextBtn}>Edit Event</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={SystemStyle.FollowOrgBtn}
                                    onPress={() => navigation.navigate('')}>
                                        <Text style={SystemStyle.FollowOrgTextBtn}>Followed</Text>
                                </TouchableOpacity>
                            )}
                            
                        </View>
                        <View style={SystemStyle.LowerSection}>
                            <Feather name="calendar" size={24} color="black" />
                            <Text style={SystemStyle.EventSchedule}>{ item.sched }</Text>
                        </View>
                        <View style={SystemStyle.LowerSection}>
                            <SimpleLineIcons name="location-pin" size={24} color="black" />
                            <Text style={SystemStyle.EventPlace}>{ item.location }</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={SystemStyle.LineBreak}></Text>
                </View>
                <View style={SystemStyle.Container}>

                    <Text style={SystemStyle.EventAboutTitle}>About</Text>
                    <Text style={SystemStyle.EventTextInfo}>
                        { item.desc }
                    </Text>
                    
                    <Text style={SystemStyle.EventReminderTitle}>
                        Additional Information</Text>
                    <Text style={SystemStyle.EventTextInfo}>
                        { item.info } 
                    </Text>
                    <View style={SystemStyle.BreakLineContainer}>
                        <Text style={SystemStyle.BreakLine}></Text>
                        <Text style={SystemStyle.BreakLineComment}>Comment</Text>
                    </View>

                    <View style={SystemStyle.BespeakerCommentContainer}>
                        <View style={SystemStyle.BespeakerImgContainer}>
                        <Image style={SystemStyle.BespeakerImg}
                            source={require('../assets/img/EveryNation.png')}/>
                        </View>
                        <View style={SystemStyle.BespeakerContainer}>
                            <Text style={SystemStyle.BespeakerName}>Aegon Targaryen</Text>
                            <Text style={SystemStyle.BespeakerComment}>I guess it would be good to go here after finding out
                                something about myself.</Text>
                        </View>
                        
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <SimpleLineIcons name="options" size={24} color="black" style={SystemStyle.CommentInfo}/>
                        </TouchableOpacity>
                    </View>          
                    <View style={SystemStyle.BespeakerCommentContainer}>
                        <View style={SystemStyle.BespeakerImgContainer}>
                            <Image style={SystemStyle.BespeakerImg}
                                source={require('../assets/img/EveryNation.png')}/>
                        </View>
                        <View style={SystemStyle.BespeakerContainer}>
                            <Text style={SystemStyle.BespeakerName}>Sansa Stark</Text>
                            <View style={SystemStyle.BespeakerInput}>
                                <TextInput style={SystemStyle.MyCommentInput} placeholder=' Write a comment..' />
                                <TouchableOpacity>
                                    <Ionicons name="send" size={24} color="black" style={SystemStyle.SendComment}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>          
                </View>
                <View style={SystemStyle.AttendingContainer}>
                    <TouchableOpacity style={SystemStyle.AttendingBtn}
                        onPress={() => setModalAttendingVisible(true)}>
                            <Text style={SystemStyle.AttendingTextBtn}>I'm attending!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default { EventScreen };
