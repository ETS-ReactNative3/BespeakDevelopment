import React, { Component } from "react";
import {
  Text,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Options from '../values/Options'

const Top = createMaterialTopTabNavigator();

class AttendeeContent extends Component {
    render() {
        return (
            <Top.Navigator screenOptions={{
                    ...Options.AttendeesScreenNavigation,
                    ...Options.AttendeesTabNavigation
                }}>
                <Top.Screen name="Interested" component={React.memo(InterestedScreen)}/>
                <Top.Screen name="Attending" component={React.memo(AttendingScreen)}/>
                <Top.Screen name="Registered" component={React.memo(AttendedScreen)}/>
            </Top.Navigator>
        );
    }
}

class InterestedScreen extends Component {
    render() {
        return (
            // Dito yung di pa interested sa event
            <Text> Add Interested Here. </Text>
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


export default React.memo(AttendeeContent)