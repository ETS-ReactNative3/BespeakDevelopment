import React, { Component } from 'react';
import {
    ScrollView, 
    TouchableOpacity, 
    Text, 
    View,
    Image,
    Pressable,
    RefreshControl,
    TextInput,
    ActivityIndicator,
    Modal,
    Alert
} from 'react-native';
import { 
    Feather,
    SimpleLineIcons,
    MaterialIcons,
    FontAwesome5,
    Ionicons
} from '@expo/vector-icons';
import BottomSheet from "react-native-gesture-bottom-sheet";

import { auth, db } from '../firebase'

import fetch_date_time from '../api/GlobalTime'

import SystemStyle from "../styles/SystemStyle";
import EditEventStyle from "../styles/EditEventStyle";

import dateFormat from "../helper/DateFormat"
import { 
    _arrangeData,
    _getProfileImage,
    _getEventImage,
    _getUserData
} from "../helper/EventLoad"
import { _isFollowing } from "../helper/ProfileLoad";
import { _setFollowConnection } from '../helper/ProfileHelper';

class CommentSection extends Component {
    _openProfile(uid) {
        if(uid == auth.currentUser.uid) return;
        this.props.navigation.navigate('UserProfileScreen', {user_id: uid})
    }
    render() {
        let item = this.props.data;
        return(
            <View style={SystemStyle.BespeakerCommentContainer}>
                <TouchableOpacity onPress = {() => this._openProfile(item.owner)}>
                    <View style={SystemStyle.BespeakerImgContainer}>
                        <Image style={SystemStyle.BespeakerImg}
                            source={ item.owner_image }/>
                    </View>
                </TouchableOpacity>
                <View style={SystemStyle.BespeakerContainer}>
                    <TouchableOpacity onPress = {() => this._openProfile(item.owner)}>
                        <Text style={SystemStyle.BespeakerName}>{ item.owner_name }</Text>
                    </TouchableOpacity>
                    <Text style={SystemStyle.BespeakerComment}> 
                        { item.content } </Text>
                </View>
                
                <TouchableOpacity onPress={() => {
                    this.props._triggerOption(item);
                }}>
                    <SimpleLineIcons name="options" size={24} color="#5b5c5a" style={SystemStyle.CommentInfo}/>
                </TouchableOpacity>
            </View>  
        );
    }
}

export { CommentSection };