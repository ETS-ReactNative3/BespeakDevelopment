import React, { Component } from "react";
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import Menu from './MenuNavigator'
import ScanScreen from '../screens/ScanScreen' //#TODO: Migrate Soon

import SystemStyle from "../styles/SystemStyle";

const Tab = createBottomTabNavigator();

export default class UserTabNavigate extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator initialRouteName="HomeTab"
                    screenOptions={{
                        tabBarActiveTintColor: '#eb9834',
                    }}>
                <Tab.Screen name="HomeTab" component={Menu.HomeNavigator}
                    options={{
                        headerShown: false,
                        tabBarShowLabel:false,
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home-variant" color={color} size={30} />
                        )
                    }}/>
                <Tab.Screen name="SearchTab" component={Menu.SearchNavigator}
                    options={{
                        title: ' ',
                        headerShown: false,
                        tabBarShowLabel:false,
                        tabBarLabel: 'Search',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="search"  color={color} size={30} />
                        ),
                    }}/>
                <Tab.Screen name="ScanTab" component={ScanScreen}
                    options={{
                        title: '',
                        tabBarShowLabel:false,
                        headerShadowVisible:false,
                        tabBarLabel: 'Scan',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="scan" color={color} size={45} />
                        ),
                    }}/>
                <Tab.Screen name="NotificationTab" component={Menu.NotificationNavigator}
                    options={{
                        title: <Text style={SystemStyle.TabTitle}>Notifications</Text>,
                        tabBarShowLabel:false,
                        tabBarLabel: 'Updates',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="notifications-sharp" color={color} size={27} />
                        ),
                        tabBarBadge: 3,
                        tabBarBadgeStyle: {
                            backgroundColor:'#eb9834',
                            color:'#fff'},
                        }
                    }/>
                <Tab.Screen name="ProfileTab" component={Menu.ProfileNavigator}
                    options={{
                        title: ' ',
                        headerShown: false,
                        tabBarShowLabel:false,
                        headerShadowVisible:false,
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="md-person" color={color} size={27} />
                        ),
                    }}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

