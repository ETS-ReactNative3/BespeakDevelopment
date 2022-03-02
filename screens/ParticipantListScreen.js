import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MaterialIcons, } from '@expo/vector-icons';

import Options from '../values/Options'
import SystemStyle from "../styles/SystemStyle";

const Top = createMaterialTopTabNavigator();

class AttendeeContent extends Component {
    render() {
        return (
            <Top.Navigator screenOptions={{
                    ...Options.AttendeesScreenNavigation,
                    ...Options.AttendeesTabNavigation
                }}>
                <Top.Screen name="Interested" 
                component={React.memo(InterestedScreen)}
                
                />
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
            <View style={SystemStyle.Container}>
                <TouchableOpacity style={SystemStyle.NameList}
                    //onPress={() => this._handleNotificationClick(item)}
                    >
                    <View style={SystemStyle.NamesImgContainer}>
                        <Image style={SystemStyle.NamesImg}
                            source={require('../assets/img/CreateEvent.png')}/>
                    </View>
                    <View style={SystemStyle.NamesInCard}>
                        <Text style={SystemStyle.NamesInCardText}>Denise Daniel</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={SystemStyle.NameList}
                    //onPress={() => this._handleNotificationClick(item)}
                    >
                    <View style={SystemStyle.NamesImgContainer}>
                        <Image style={SystemStyle.NamesImg}
                            source={require('../assets/img/CreateEvent.png')}/>
                    </View>
                    <View style={SystemStyle.NamesInCard}>
                        <Text style={SystemStyle.NamesInCardText}>Denise Daniel</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={SystemStyle.NameList}
                    //onPress={() => this._handleNotificationClick(item)}
                    >
                    <View style={SystemStyle.NamesImgContainer}>
                        <Image style={SystemStyle.NamesImg}
                            source={require('../assets/img/CreateEvent.png')}/>
                    </View>
                    <View style={SystemStyle.NamesInCard}>
                        <Text style={SystemStyle.NamesInCardText}>Denise Daniel</Text>
                    </View>
                </TouchableOpacity>
            </View>
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