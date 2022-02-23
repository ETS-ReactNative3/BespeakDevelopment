import React, { Component } from "react";
import {
  TouchableOpacity,
  Text, 
  View,
} from 'react-native';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast'
import EventList from "../components/EventList";

import HomeScreenStyle from "../styles/HomeScreenStyle";

class HomeScreen extends Component {
    render() {
        return (
            <Root>
                <View style={HomeScreenStyle.Container}>
                    <View style={HomeScreenStyle.HomeHeader}>
                        <TouchableOpacity
                            onPress={() =>
                                Popup.show({
                                type: 'confirm',
                                title: 'Delete?',
                                textBody: 'This progress cannot be undone. ',
                                buttonText: 'Okay',
                                callback: () => Popup.hide()
                            })}>
                                <Text style={HomeScreenStyle.BespeakLogo}>bespeak</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <EventList for_home = {true}
                        navigation = {this.props.navigation}/>
                </View>
            </Root>
        );
    }
}
  
export default {
    HomeScreen
}