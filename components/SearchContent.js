import React, { Component } from "react";
import { View, Text } from "react-native";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import EventList from "./EventList";
import OrganizerList from "./OrganizerList"

import SearchScreenStyle from '../styles/SearchScreenStyle';

import Options from '../values/Options'

const Top = createMaterialTopTabNavigator();

class SearchContent extends Component {
    render() {
        return (
            <Top.Navigator screenOptions={{
                    lazy: true,
                    ...Options.SearchScreenNavigation,
                    ...Options.SearchTabNavigation
                }}>
                <Top.Screen name="Events" children={() => 
                    <SearchEventContent search_key = {this.props.search_key}
                        refreshing = {this.props.refreshing}
                        navigation = {this.props.navigation}/>} />
                <Top.Screen name="Organizers" children={() => 
                    <SearchOrganizerContent search_key = {this.props.search_key}
                        refreshing = {this.props.refreshing}
                        navigation = {this.props.navigation}/>} />
            </Top.Navigator>
        );
    }
}

class SearchEvent extends Component {
    render() {
        return (
            <View style={SearchScreenStyle.Container}>
                { this.props.search_key ? (
                    <Text style={SearchScreenStyle.TopSearch}>Search results for "{this.props.search_key}"</Text>
                ) : (
                    <Text style={SearchScreenStyle.TopSearch}>Top Search</Text>
                )}
                
                { !this.props.refreshing &&
                    <EventList for_search = {true} 
                        search_key = {this.props.search_key}
                        navigation = {this.props.navigation}/>
                }
            </View>
        );
    }
}

class SearchOrganizer extends Component {
    render() {
        return (
            <View style={SearchScreenStyle.Container}>
                { this.props.search_key ? (
                    <Text style={SearchScreenStyle.TopSearch}>Search results for "{this.props.search_key}"</Text>
                ) : (
                    <Text style={SearchScreenStyle.TopSearch}>Top Search</Text>
                )}
                { !this.props.refreshing &&
                    <OrganizerList for_search = {true} 
                        search_key = {this.props.search_key}
                        navigation = {this.props.navigation}/>
                }
            </View>
        );
    }
}

const SearchEventContent = React.memo(SearchEvent)
const SearchOrganizerContent = React.memo(SearchOrganizer)

export default React.memo(SearchContent)
