import React, { Component } from "react";
import { View } from "react-native";

import OrganizerList from "../components/OrganizerList";

import SystemStyle from "../styles/SystemStyle";

class FollowingScreen extends Component {
    render() {
        return (
            <View style={SystemStyle.Container}>
                <OrganizerList list_following = {true}
                    navigation = { this.props.navigation }/>
            </View>
        );
    }
}

class FollowerScreen extends Component {
    render() {
        return (
            <View style={SystemStyle.Container}>
                <OrganizerList list_follower = {true}
                    navigation = { this.props.navigation }/>
            </View>
        );
    }
}

export default { 
    FollowingScreen,
    FollowerScreen
}