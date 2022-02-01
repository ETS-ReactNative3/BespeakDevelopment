import React, { Component } from "react";
import {
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  Text, 
  View,
  Image,
  Alert,
  SafeAreaView, RefreshControl
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Top = createMaterialTopTabNavigator();

class ProfileContent extends Component {
    render() {
        return (
            <Top.Navigator initialRouteName="HomeTab"
            tabBarOptions={{
                indicatorStyle: {
                    borderBottomColor: '#eb9834',
                    borderBottomWidth: 4,
                    borderRadius:10,
                    marginLeft:'9%',
                    marginRight:'-30%',
                  },
                }}
                screenOptions={{
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor:'#ccc',
                    tabBarPressColor:'#eb9834',
                    swipeEnabled: true   
                }}>
                    <Top.Screen name=" " component={ProfileEvents} options={{ title: 'Tab Stack' }}/>
                    <Top.Screen name="My Tickets" component={ProfileTickets} />
                    <Top.Screen name="Bookmarks" component={ProfileBookmarks} />
            </Top.Navigator>
        );
    }
}

class ProfileEvents extends Component {
    render() {
        console.log('Event is Loaded')
        return (
            <ScrollView style={{backgroundColor:'#fff'}}>
                <View style={{
                        margin:'35%', 
                        alignSelf: "center", 
                        justifyContent: "center",}}>
                    <Text  style={{
                            alignSelf: "center", 
                            justifyContent: "center",
                            color:'#ccc',
                            fontSize:16,
                            fontFamily:'RedHatDisplay-Regular' }}>
                                No event found</Text>
                </View>
            </ScrollView>
        );
    }
}
class ProfileTickets extends Component {
    render() {
        console.log('Ticket is Loaded')
        return (
            <ScrollView style={{backgroundColor:'#fff'}}>
            <View style={{
                margin:'35%', 
                alignSelf: "center", 
                justifyContent: "center",}}>
                <Text  style={{
                    alignSelf: "center", 
                    justifyContent: "center",
                    color:'#ccc',
                    fontSize:16,
                    fontFamily:'RedHatDisplay-Regular' }}>
                        No ticket found</Text>
            </View>
        </ScrollView>
        );
    }
}
class ProfileBookmarks extends Component {
    render() {
        console.log('Bookmark is Loaded')
        return (
            <ScrollView style={{backgroundColor:'#fff'}}>
                            <View style={{
                        margin:'35%', 
                        alignSelf: "center", 
                        justifyContent: "center",}}>
                    <Text  style={{
                            alignSelf: "center", 
                            justifyContent: "center",
                            color:'#ccc',
                            fontSize:16,
                            fontFamily:'RedHatDisplay-Regular' }}>
                                No bookmark found</Text>
                </View>
            </ScrollView>
        );
    }
}

export default ProfileContent