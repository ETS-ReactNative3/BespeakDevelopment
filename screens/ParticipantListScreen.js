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