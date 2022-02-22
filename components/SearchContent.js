import React, { Component } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import EventList from "./EventList";
import OrganizerList from "./OrganizerList"

import Options from '../values/Options'

const Top = createMaterialTopTabNavigator();

class SearchContent extends Component {
    render() {
        console.log("Searching for: ", this.props.search_key)
        return (
            <Top.Navigator screenOptions={{
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
            <>
                { !this.props.refreshing &&
                    <OrganizerList for_search = {true} 
                        search_key = {this.props.search_key}
                        navigation = {this.props.navigation}/>
                }
            </>
        );
        /*
        return (
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
                                <Text style={SystemStyle.OrganizerName}>Every Nation Campus</Text>
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
        );
        */
    }
}

const SearchEventContent = React.memo(SearchEvent)
const SearchOrganizerContent = React.memo(SearchOrganizer)

export default React.memo(SearchContent)