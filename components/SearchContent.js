import React, { Component } from "react";
import {
  Text,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import EventList from "./EventList";

import Options from '../values/Options'

const Top = createMaterialTopTabNavigator();

class SearchContent extends Component {
    render() {
        return (
            <Top.Navigator screenOptions={{
                    ...Options.SearchScreenNavigation,
                    ...Options.SearchTabNavigation
                }}>
                <Top.Screen name="Events" component={SearchEvent} />
                <Top.Screen name="Organizers" component={SearchOrganizer} />
            </Top.Navigator>
        );
    }
}

class SearchEvent extends Component {
    render() {
        return (
            <Text>Add Event Search Here.</Text>
        );
    }
}

class SearchOrganizer extends Component {
    render() {
        return (
            <Text>Add Organizer Search Here.</Text>
        );
    }
}

export default React.memo(SearchContent)