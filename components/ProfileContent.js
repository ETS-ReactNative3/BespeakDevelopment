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

import SystemStyle from "../styles/SystemStyle";
import homeStyles from "../styles/homeStyles";

import Options from '../values/Options'

const Top = createMaterialTopTabNavigator();

class ProfileContent extends Component {
    render() {
        return (
            <Top.Navigator screenOptions={{
                    ...Options.TopTabNavigation,
                    ...Options.ProfileTabNavigation
                }}>
                <Top.Screen name="My Events" component={ProfileEvents} />
                <Top.Screen name="My Tickets" component={ProfileTickets} />
                <Top.Screen name="Bookmarks" component={ProfileBookmarks} />
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
                                    event_name: this.state.event_post})
                            }}>
                        <Feather name="plus" size={50} style={homeStyles.cardicon}/>
                    </TouchableOpacity>
                </View>
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
            <View style={SystemStyle.TabContainer}>
                <Text style={SystemStyle.TabEmptyList}> No bookmark found</Text>
            </View>
        );
    }
}

export default React.memo(ProfileContent)