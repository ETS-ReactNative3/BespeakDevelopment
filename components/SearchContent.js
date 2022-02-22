import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { 
    Feather,
    FontAwesome,
    Ionicons
  } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SearchScreenStyle from "../styles/SearchScreenStyle";
import SystemStyle from "../styles/SystemStyle";

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
            <View style={SearchScreenStyle.Container}>
                <Text style={SearchScreenStyle.TopSearch}>Top Search</Text>
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
                <Text style={SearchScreenStyle.TopSearch}>Top Search</Text>
            <View style={SystemStyle.EventListContainer}> 
                <TouchableOpacity style={SystemStyle.Card}>
                    <Image style={SystemStyle.CardImage}
                        source={require('../assets/img/EveryNation.png')}/>
                    <View style={SystemStyle.CardContainer}>
                        <View style={SystemStyle.OrganizerSectionTab}>
                            <TouchableOpacity style={SystemStyle.OrganizerInfo}
                                onPress={() => navigation.navigate('NotificationDetailScreen')}>
                            <View style={SystemStyle.OrganizerImgContainer}>
                                <Image style={SystemStyle.OrganizerImg}
                                    source={require('../assets/img/EveryNation.png')}
                                    />
                            </View>
                            <View style={SystemStyle.OrganizerCardContainer}>
                                <Text style={SystemStyle.OrganizerNameButBlack}>Every Nation Campus</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={SystemStyle.FollowOrgBtn}
                                onPress={() => navigation.navigate('')}>
                                <Text style={SystemStyle.FollowOrgTextBtn}>Follow</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={SystemStyle.OrgCardInfo}>We are the source of low-riced ununsed, as well as previously-owned, books and bargain publications from....</Text>
                    </View>
                    <View style={SystemStyle.CardOption}>
                        <TouchableOpacity>
                            <Ionicons name="share-social-outline" size={22} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome name="bookmark" size={22} color="black" />
                        </TouchableOpacity>
                    </View>     
                </TouchableOpacity>
            </View>
            </View>
        );
    }
}

const SearchEventContent = React.memo(SearchEvent)
const SearchOrganizerContent = React.memo(SearchOrganizer)

export default React.memo(SearchContent)