import React, { Component } from "react";
import {
  TouchableOpacity,
  Text, 
  View,
} from 'react-native';

import EventList from "../components/EventList";

import HomeScreenStyle from "../styles/HomeScreenStyle";

class HomeScreen extends Component {
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