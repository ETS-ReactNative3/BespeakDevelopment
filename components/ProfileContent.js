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
import TicketList from "./TicketList";

import SystemStyle from "../styles/SystemStyle";
import ProfileContentStyle from "../styles/ProfileContentStyle";

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
                <Top.Screen name="My Tickets" component={React.memo(ProfileTickets)} />
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
        return (
            <View style={ProfileContentStyle.CardContainer}>
                <View style={ProfileContentStyle.CreateCard}>
                    <TextInput style={ProfileContentStyle.CreateCardContent} 
                        maxLength ={50}
                        selectionColor={'#eb9834'}
                        placeholder="Create a bespeak event..."
                        onChangeText = {(text) => this.setState({'event_post': text})}></TextInput>


                        <TouchableOpacity 
                            onPress = {() => {
                                this.props.navigation.navigate('CreateEventScreen', {
                                    event_name: this.state.event_post})
                            }}>
                        <Feather name="plus" size={50} style={ProfileContentStyle.CardIcon}/>
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
        return (
            <View style={ProfileContentStyle.CardContainer}>
                <TicketList navigation = {this.props.navigation}/>
            </View>
        );
    }
}
class ProfileBookmarks extends Component {
    render() {
        return (
            <View style={ProfileContentStyle.CardContainer}>
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