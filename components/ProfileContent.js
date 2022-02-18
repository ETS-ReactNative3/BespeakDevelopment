import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { 
    Feather,
} from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { auth } from '../firebase'

import EventList from "./EventList"

import SystemStyle from "../styles/SystemStyle";
import homeStyles from "../styles/homeStyles";

import Options from '../values/Options'

const Top = createMaterialTopTabNavigator();

class ProfileContent extends Component {
    render() {
        console.log('Profile Contents Loading....')
        return (
            <Top.Navigator screenOptions={{
                    lazy: true,
                    ...Options.TopTabNavigation,
                    ...Options.ProfileTabNavigation
                }}>
                <Top.Screen name="My Events" component={React.memo(ProfileEvents)} initialParams = {{_done: this.props._on_done}}/>
                <Top.Screen name="My Tickets" component={ProfileTickets} />
                <Top.Screen name="Bookmarks" component={React.memo(ProfileBookmarks)} />
            </Top.Navigator>
        );
    }
}

class ProfileEvents extends Component {
    state = {
        event_post: ''
    }
    render() {
        console.log('Event Tab Contents Loaded.')
        return (
            <View style={homeStyles.uHcontainer}>
                <View style={homeStyles.createcard}>
                    <TextInput style={homeStyles.createCardcontent} 
                        maxLength ={50}
                        placeholder="Create event "
                        onChangeText = {(text) => this.setState({'event_post': text})}></TextInput>


                        <TouchableOpacity 
                            onPress = {() => {
                                this.props.navigation.navigate('CreateEventScreen', {
                                    event_name: this.state.event_post, 
                                    _done: this.props.route.params._done})
                            }}>
                        <Feather name="plus" size={50} style={homeStyles.cardicon}/>
                    </TouchableOpacity>
                </View>
                <EventList for_profile = {true} 
                    user_id = {auth.currentUser.uid} 
                    navigation = {this.props.navigation}/>
            </View>
            /*
            <View style={SystemStyle.TabContainer}>
                <Text style={SystemStyle.TabEmptyList}> No event found</Text>
            </View>*/
        );
    }
}
class ProfileTickets extends Component {
    render() {
        console.log('Ticket Tab Contents Loaded.')
        return (
            <View style={SystemStyle.TabContainer}>
                <Text style={SystemStyle.TabEmptyList}> No ticket found</Text>
            </View>
        );
    }
}
class ProfileBookmarks extends Component {
    render() {
        console.log('Bookmarks Tab Contents Loaded.')
        return (
            <View style={homeStyles.uHcontainer}>
                <EventList for_saved = {true} for_profile = {true} 
                    navigation = {this.props.navigation}/>
            </View>
            /*
            <View style={SystemStyle.TabContainer}>
                <Text style={SystemStyle.TabEmptyList}> No bookmark found</Text>
            </View>*/
        );
    }
}

export default React.memo(ProfileContent)