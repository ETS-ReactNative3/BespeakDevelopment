import React, { Component } from "react";
import {
  TouchableOpacity,
  Text, 
  View,
} from 'react-native';
import { db, auth } from '../firebase';

import EventList from "../components/EventList";

import HomeScreenStyle from "../styles/HomeScreenStyle";

import { registerForPushNotificationsAsync } from '../helper/PushNotifHelper';
import { _initializeDoc } from '../helper/ProfileHelper';

class HomeScreen extends Component {
    componentDidMount() {
        let uid = auth.currentUser.uid;
        this._saveTokenToUser(uid);
    }
    _saveTokenToUser(uid) {
        registerForPushNotificationsAsync().then(async (token) => {
            let _token_doc = db.collection("_token").doc(token);

            await _token_doc.update({
                owner: uid, 
            }).catch(async (err) => {
                if(err.code == 'firestore/not-found') {
                    await _initializeDoc("_token", {
                        owner: uid
                    }, token)
                    return;
                }
    
                Alert.alert("Error!", err.message);
                console.log("Error: ", err)
            }).then(() => {
            });
        }
    );
    }
    render() {
        return (
                <View style={HomeScreenStyle.Container}>
                    <View style={HomeScreenStyle.HomeHeader}>
                        <TouchableOpacity>
                                <Text style={HomeScreenStyle.BespeakLogo}>bespeak</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <EventList for_home = {true}
                        navigation = {this.props.navigation}/>
                </View>
        );
    }
}
  
export default {
    HomeScreen
}