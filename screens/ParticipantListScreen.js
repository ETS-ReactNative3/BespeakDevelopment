import React, { Component } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    MaterialIcons,
    AntDesign,  
} from '@expo/vector-icons';

import ParticipantList from "../components/ParticipantList";

import Options from '../values/Options'

const Top = createMaterialTopTabNavigator();

class AttendeeContent extends Component {
    render() {
        return (
            <Top.Navigator screenOptions={{
                    lazy: true,
                    ...Options.AttendeesScreenNavigation,
                    ...Options.AttendeesTabNavigation
                }}>
                <Top.Screen name="Interested" component={InterestedScreen}
                    initialParams = {{event_id: this.props.route.params.event_id}}
                    options={{
                        tabBarShowLabel: true,
                        tabBarLabel: 'Interested',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="like2" size={19} color="#eb9834" />// #bbb for inactive
                            )
                        }}/>
                <Top.Screen name="Registered" component={AttendingScreen}
                    initialParams = {{event_id: this.props.route.params.event_id}}
                    options={{
                        tabBarShowLabel: true,
                        tabBarLabel: 'Registered',
                        tabBarIcon: ({ color,size }) => (
                            <MaterialIcons name="person-add-alt" size={23} color="#eb9834" />// #bbb for inactive
                            )
                        }}/>
                <Top.Screen name="Participants" component={AttendedScreen}
                    initialParams = {{event_id: this.props.route.params.event_id}}
                    options={{
                        tabBarShowLabel: true,
                        tabBarLabel: 'Participants',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="people-outline" size={25} color="#eb9834" />// #bbb for inactive
                            )
                        }}/>
            </Top.Navigator>
        );
    }
}

class InterestedScreen extends Component {
    render() {
        return (
            <ParticipantList _interested = {true} 
                event_id = {this.props.route.params.event_id}/>
        );
    }
}

class AttendingScreen extends Component {
    render() {
        return (
            <ParticipantList _attending = {true} 
                event_id = {this.props.route.params.event_id}/>
        );
    }
}

class AttendedScreen extends Component {
    render() {
        return (
            <ParticipantList _attended = {true} 
                event_id = {this.props.route.params.event_id}/>
        );
    }
}


export default React.memo(AttendeeContent)