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
                <Top.Screen name="Events" children={() => 
                    <SearchEventContent search_key = {this.props.search_key}
                        refreshing = {this.props.refreshing}
                        navigation = {this.props.navigation}/>} />
                <Top.Screen name="Organizers" component={SearchOrganizer}/>
            </Top.Navigator>
        );
    }
}

class SearchEvent extends Component {
    render() {
        console.log("Searching for: ", this.props.search_key)
        return (
            <>
                { !this.props.refreshing &&
                    <EventList for_search = {true} 
                        search_key = {this.props.search_key}
                        navigation = {this.props.navigation}/>
                }
            </>
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

const SearchEventContent = React.memo(SearchEvent)
const SearchOrganizerContent = React.memo(SearchOrganizer)

export default React.memo(SearchContent)