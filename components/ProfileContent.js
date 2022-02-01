import React, { Component } from "react";
import {
  ScrollView, 
  Text, 
  View,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SystemStyle from "../styles/SystemStyle";

import Options from '../values/Options'

const Top = createMaterialTopTabNavigator();

class ProfileContent extends Component {
    render() {
        return (
            <Top.Navigator screenOptions={Options.ProfileTabNavigation}>
                <Top.Screen name="My Events" component={ProfileEvents} />
                <Top.Screen name="My Tickets" component={ProfileTickets} />
                <Top.Screen name="Bookmarks" component={ProfileBookmarks} />
            </Top.Navigator>
        );
    }
}

class ProfileEvents extends Component {
    render() {
        return (
            <View style={SystemStyle.TabContainer}>
                <Text style={SystemStyle.TabEmptyList}> No event found</Text>
            </View>
        );
    }
}
class ProfileTickets extends Component {
    render() {
        return (
            <View style={SystemStyle.TabContainer}>
                <Text style={SystemStyle.TabEmptyList}> No ticket found</Text>
            </View>
        );
    }
}
class ProfileBookmarks extends Component {
    render() {
        return (
            <View style={SystemStyle.TabContainer}>
                <Text style={SystemStyle.TabEmptyList}> No bookmark found</Text>
            </View>
        );
    }
}

export default ProfileContent