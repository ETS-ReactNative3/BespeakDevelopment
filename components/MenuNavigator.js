import React, { Component } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreens from '../screens/HomeScreen'
import SearchScreens from '../screens/SearchScreen'
import NotificationScreens from '../screens/NotificationScreen';
import ProfileScreens from '../screens/ProfileScreen'
import EditProfileScreens from '../screens/EditProfileScreen'
import EventScreens from "../screens/EventScreen";
import ManageEventScreens from "../screens/ManageEventScreen";
import ParticipantListScreens from "../screens/ParticipantListScreen";
import FollowListScreens from "../screens/FollowListScreen";
import UserProfileScreens from "../screens/UserProfileScreen";

const MenuStack = createNativeStackNavigator();

class HomeNavigator extends Component {
    render() {
        return (
          <MenuStack.Navigator>
            <MenuStack.Screen name="HomeScreen" component={HomeScreens.HomeScreen}
              options={{
                title: ' ',
                headerShown: false,
                tabBarShowLabel:false
              }}/>
            <MenuStack.Screen name="EventScreen" component={EventScreens.EventScreen}
              options={{
                title: ' ',
              }}/>
            <MenuStack.Screen name="EditEventScreen" component={ManageEventScreens.EditEventScreen}
              options={{
                title: ' ',
                headerShown: true,
                tabBarShowLabel:false,
            }}/>
            <MenuStack.Screen name="ParticipantListScreen" component={ParticipantListScreens}
              options={{
                title: ' ',
                headerShown: true,
                tabBarShowLabel:false,
            }}/>
            <MenuStack.Screen name="UserProfileScreen" component={UserProfileScreens.UserProfileScreen}
              options={{
                title: ' ',
                headerShown: true,
                headerTintColor: '#000',
                headerTransparent: true,
                tabBarShowLabel:false,
                headerShadowVisible: false,
            }}/>
          </MenuStack.Navigator>
        );
    }
}

class SearchNavigator extends Component {
  render() {
    let _direct = this.props.route.params.direct
    //var route = _direct?.event ? 'EventScreen' : 'SearchScreen';
    console.log('Received ID: ', _direct);
    return (
      <MenuStack.Navigator>
        <MenuStack.Screen name="SearchScreen" component={SearchScreens.SearchScreen} initialParams = {{direct: _direct}}
          options={{
            title: ' ',
            headerShown: false,
            tabBarShowLabel:false
          }}/>
        <MenuStack.Screen name="EventScreen" component={EventScreens.EventScreen} 
            options={{
                title: ' ',
            }}/>
        <MenuStack.Screen name="EditEventScreen" component={ManageEventScreens.EditEventScreen}
          options={{
            title: ' ',
          }}/>
        <MenuStack.Screen name="ParticipantListScreen" component={ParticipantListScreens}
          options={{
            title: ' ',
            headerShown: true,
            tabBarShowLabel:false,
        }}/>
        <MenuStack.Screen name="UserProfileScreen" component={UserProfileScreens.UserProfileScreen}
          options={{
            title: ' ',
            headerShown: true,
            headerTintColor: '#000',
            headerTransparent: true,
            tabBarShowLabel:false,
            headerShadowVisible: false,
        }}/>
      </MenuStack.Navigator>
    );
  }
}

class NotificationNavigator extends Component {
  render () {
    return (
      <MenuStack.Navigator>
        <MenuStack.Screen name="NotificationScreen" component={NotificationScreens.NotificationScreen} 
          options={{
            title: 'Notifications',
            headerShown: true,
            tabBarShowLabel:false
          }}/>
        <MenuStack.Screen name="EventScreen" component={EventScreens.EventScreen}
          options={{
            title: ' ',
          }}/>
      </MenuStack.Navigator>
    );
  }
}

class ProfileNavigator extends Component {
  render () {
    return (
      <MenuStack.Navigator>
        <MenuStack.Screen name="ProfileScreen" component={ProfileScreens.ProfileScreen} 
          options={{
            title: ' ',
            headerShown: false,
            tabBarShowLabel:false
          }}/>
        <MenuStack.Screen name="EditProfileScreen" component={EditProfileScreens.EditProfileScreen}
          options={{
            title: 'Edit Profile',
            headerShown: true,
            tabBarShowLabel:false,
            headerTitleStyle: {
              fontFamily: 'RedHatDisplay-Medium',
              color: '#eb9834',
            }
          }}/>
        <MenuStack.Screen name="ChangePasswordScreen" component={EditProfileScreens.ChangePasswordScreen}
          options={{
            title: 'Change Password',
            headerShown: true,
            tabBarShowLabel:false,
            headerTitleStyle: {
              fontFamily: 'RedHatDisplay-Medium',
              color: '#eb9834',
            }
          }}/>
        <MenuStack.Screen name = "CreateEventScreen" component = {ManageEventScreens.CreateEventScreen}
          options={{
            title: '',
            headerShown: true,
            tabBarShowLabel:false,
          }}/>
        <MenuStack.Screen name="EventScreen" component={EventScreens.EventScreen}
          options={{
            title: ' ',
          }}/>
        <MenuStack.Screen name="EditEventScreen" component={ManageEventScreens.EditEventScreen}
          options={{
            title: ' ',
            headerShown: true,
            tabBarShowLabel:false,
        }}/>
        <MenuStack.Screen name="ParticipantListScreen" component={ParticipantListScreens}
          options={{
            title: ' ',
            headerShown: true,
            tabBarShowLabel:false,
        }}/>
        <MenuStack.Screen name="FollowingScreen" component={FollowListScreens.FollowingScreen}
          options={{
            title: 'Following',
            headerShown: true,
            tabBarShowLabel:false,
            headerTitleStyle: {
              fontFamily: 'RedHatDisplay-Medium',
              color: '#eb9834',
            }
        }}/>
        <MenuStack.Screen name="FollowerScreen" component={FollowListScreens.FollowerScreen}
          options={{
            title: 'Followers',
            headerShown: true,
            tabBarShowLabel:false,
            headerTitleStyle: {
              fontFamily: 'RedHatDisplay-Medium',
              color: '#eb9834',
            }
        }}/>
        <MenuStack.Screen name="UserProfileScreen" component={UserProfileScreens.UserProfileScreen}
          options={{
            title: ' ',
            headerShown: true,
            headerTintColor: '#000',
            headerTransparent: true,
            tabBarShowLabel:false,
            headerShadowVisible: false,
        }}/>
      </MenuStack.Navigator>
    );
  }
}

SearchNavigator = React.memo(SearchNavigator);

export default {
  HomeNavigator,
  SearchNavigator,
  NotificationNavigator,
  ProfileNavigator
}
