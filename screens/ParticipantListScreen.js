import React, { Component } from "react";
import { Text } from "react-native";

class AttendingScreen extends Component {
    render() {
        return (
            // Dito yung di pa starting si event, yung dalawa.
            <Text> Add Attending Here. </Text>
        );
    }
}

class AttendedScreen extends Component {
    render() {
        return (
            // Dito yung pag tapos or ongoing si event, dito yung tatlo.
            <Text> Add Attended Here. </Text>
        );
    }
}

export default AttendingScreen; // Palitan nalang to AttendedScreen kung yun naman itetest.

/*import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { 
    Feather,
    FontAwesome,
    Ionicons
  } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SearchScreenStyle from "../styles/SearchScreenStyle";
import SystemStyle from "../styles/SystemStyle";

import EventList from "./EventList";

import Options from '../values/Options'

const Top = createMaterialTopTabNavigator();

class AttendeeContent extends Component {
    render() {
        return (
            <Top.Navigator screenOptions={{
                    ...Options.AttendeesScreenNavigation,
                    ...Options.AttendeesTabNavigation
                }}>
                <Top.Screen name="Interested" component={AttendingScreen}/>
                <Top.Screen name="Registered" component={AttendedScreen}/>
            </Top.Navigator>
        );
    }
}

class AttendingScreen extends Component {
    render() {
        return (
            // Dito yung di pa starting si event, yung dalawa.
            <Text> Add Attending Here. </Text>
        );
    }
}

class AttendedScreen extends Component {
    render() {
        return (
            // Dito yung pag tapos or ongoing si event, dito yung tatlo.
            <Text> Add Attended Here. </Text>
        );
    }
}

const AttendingScreenContent = React.memo(AttendingScreen)
const AttendedScreenContent = React.memo(AttendedScreen)

export default React.memo(AttendeeContent)
*/