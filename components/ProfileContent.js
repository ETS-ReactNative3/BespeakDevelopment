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
                screenOptions={{
                    tabBarActiveTintColor: '#eb9834',
                    swipeEnabled: true
                }}>
                    <Top.Screen name="ProfileEvents" component={ProfileEvents} />
                    <Top.Screen name="ProfileTickets" component={ProfileTickets} />
                    <Top.Screen name="ProfileBookmarks" component={ProfileBookmarks} />
            </Top.Navigator>
        );
    }
}

class ProfileEvents extends Component {
    render() {
        console.log('Event is Loaded')
        return (
            <>
            <Text>This is events</Text>
            <Text>This is events</Text>
            <Text>This is events</Text>
            <Text>This is events</Text>
            <Text>This is events</Text>
            <Text>This is events</Text>
            <Text>This is events</Text><Text>This is events</Text>
            <Text>This is events</Text>
            <Text>This is events</Text>
            <Text>This is events</Text>
            <Text>This is events</Text><Text>This is events</Text>
            <Text>This is events</Text>

            </>
        );
    }
}
class ProfileTickets extends Component {
    render() {
        console.log('Ticket is Loaded')
        return (
            <Text>{'Ticket is Loaded'}</Text>
        );
    }
}
class ProfileBookmarks extends Component {
    render() {
        console.log('Bookmark is Loaded')
        return (
            <ScrollView>
            <View style={{ flex: 1, 
                alignItems: "center", 
                justifyContent: "center" }}>
                    <Text style={{ color: "#006600", fontSize: 40 }}>
                        Images Screen!
                    </Text>
            </View>
            </ScrollView>
        );
    }
}

export default ProfileContent