import React, { Component } from "react";
import { Text } from "react-native";

class FollowingScreen extends Component {
    render() {
        return (
            <Text> Add Following Here. </Text>
        );
    }
}

class FollowerScreen extends Component {
    render() {
        return (
            <Text> Add Follower Here. </Text>
        );
    }
}

export default { 
    FollowingScreen,
    FollowerScreen
}