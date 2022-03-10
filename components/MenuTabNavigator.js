import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import Menu from './MenuNavigator'

import { _loadAllNotification } from "../helper/NotificationLoad";

const Tab = createBottomTabNavigator();

class UserTabNavigate extends Component {
    state = {
        notif_count: 0,
        is_mounted: false
    }
    async componentDidMount() {
        let all_notif = await _loadAllNotification();
        all_notif = all_notif.unread_count;
        this.setState({notif_count: all_notif, is_mounted: true});
    }

    render() {
        let count = this.state.notif_count;

        let _direct = this.props.direct;
        var route = _direct?.event || _direct?.user ? 'SearchTab' : 'HomeTab';
        console.log('Route: ', route)
        return (
            // #TODO: Implement Deep Link Instead.
            <NavigationContainer>
                <Tab.Navigator initialRouteName={route} key = {_direct?.event}
                    screenOptions={{
                        tabBarActiveTintColor: '#eb9834',
                }}>
                    <Tab.Screen name="HomeTab" component={Menu.HomeNavigator}
                        options={{
                            headerShown: false,
                            tabBarShowLabel:false,
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="home-variant" color={color} size={29} />
                            )
                        }}/>
                    <Tab.Screen name="SearchTab" component={Menu.SearchNavigator} initialParams = {{direct: _direct}}
                        options={{
                            title: ' ',
                            headerShown: false,
                            tabBarShowLabel:false,
                            tabBarLabel: 'Search',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="search"  color={color} size={29} />
                            ),
                        }}/>
                    <Tab.Screen name="ScanTab" component={Menu.ScanNavigator}
                        options={{
                            title: ' ',
                            headerShown: false,
                            tabBarShowLabel:false,
                            tabBarLabel: 'Scan',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="scan" color={color} size={30} />
                            ),
                        }}/>
                    <Tab.Screen name="NotificationTab" component={Menu.NotificationNavigator}
                        options={{
                            title: ' ',
                            headerShown: false,
                            tabBarShowLabel:false,
                            tabBarLabel: 'Updates',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="notifications-sharp" color={color} size={27} />
                            ),
                            tabBarBadge: count > 0 ? count : null,
                            tabBarBadgeStyle: count > 0 ? {
                                backgroundColor:'#eb9834',
                                color:'#fff'} : ''
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

export default React.memo(UserTabNavigate);