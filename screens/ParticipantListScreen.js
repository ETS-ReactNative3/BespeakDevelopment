import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
    MaterialIcons,
    AntDesign,  
} from '@expo/vector-icons';

import Options from '../values/Options'
import SystemStyle from "../styles/SystemStyle";

const Top = createMaterialTopTabNavigator();

class AttendeeContent extends Component {
    render() {
        return (
            <Top.Navigator screenOptions={{
                    ...Options.AttendeesScreenNavigation,
                    ...Options.AttendeesTabNavigation
                }}>
                <Top.Screen name="Interested" 
                component={React.memo(InterestedScreen)}
                    options={{
                        tabBarShowLabel: true,
                        tabBarLabel: 'Interested',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="like2" size={19} color="#eb9834" />// #bbb for inactive
                            )
                        }}
                />
                <Top.Screen name="Attending" 
                component={React.memo(AttendingScreen)}
                    options={{
                        tabBarShowLabel: true,
                        tabBarLabel: 'Interested',
                        tabBarIcon: ({ color,size }) => (
                            <MaterialIcons name="person-add-alt" size={23} color="#eb9834" />// #bbb for inactive
                            )
                        }}
                />
                <Top.Screen name="Registered" 
                component={React.memo(AttendedScreen)}
                    options={{
                        tabBarShowLabel: true,
                        tabBarLabel: 'Interested',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="people-outline" size={25} color="#eb9834" />// #bbb for inactive
                            )
                        }}
                />
            </Top.Navigator>
        );
    }
}

class InterestedScreen extends Component {
    render() {
        return (
            <View style={SystemStyle.Container}>
                <TouchableOpacity style={SystemStyle.NameList}
                    //onPress={() => this._handleNotificationClick(item)}
                    >
                    <View style={SystemStyle.NamesImgContainer}>
                        <Image style={SystemStyle.NamesImg}
                            source={require('../assets/img/CreateEvent.png')}/>
                    </View>
                    <View style={SystemStyle.NamesInCard}>
                        <Text style={SystemStyle.NamesInCardText}>Denise Daniel</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={SystemStyle.NameList}
                    //onPress={() => this._handleNotificationClick(item)}
                    >
                    <View style={SystemStyle.NamesImgContainer}>
                        <Image style={SystemStyle.NamesImg}
                            source={require('../assets/img/CreateEvent.png')}/>
                    </View>
                    <View style={SystemStyle.NamesInCard}>
                        <Text style={SystemStyle.NamesInCardText}>Denise Daniel</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={SystemStyle.NameList}
                    //onPress={() => this._handleNotificationClick(item)}
                    >
                    <View style={SystemStyle.NamesImgContainer}>
                        <Image style={SystemStyle.NamesImg}
                            source={require('../assets/img/CreateEvent.png')}/>
                    </View>
                    <View style={SystemStyle.NamesInCard}>
                        <Text style={SystemStyle.NamesInCardText}>Denise Daniel</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

class AttendingScreen extends Component {
    render() {
        return (
            <View style={SystemStyle.Container}>
            <TouchableOpacity style={SystemStyle.NameList}
                //onPress={() => this._handleNotificationClick(item)}
                >
                <View style={SystemStyle.NamesImgContainer}>
                    <Image style={SystemStyle.NamesImg}
                        source={require('../assets/img/CreateEvent.png')}/>
                </View>
                <View style={SystemStyle.NamesInCard}>
                    <Text style={SystemStyle.NamesInCardText}>Denise Daniel</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={SystemStyle.NameList}
                //onPress={() => this._handleNotificationClick(item)}
                >
                <View style={SystemStyle.NamesImgContainer}>
                    <Image style={SystemStyle.NamesImg}
                        source={require('../assets/img/CreateEvent.png')}/>
                </View>
                <View style={SystemStyle.NamesInCard}>
                    <Text style={SystemStyle.NamesInCardText}>Denise Daniel</Text>
                </View>
            </TouchableOpacity>
        </View>
        );
    }
}

class AttendedScreen extends Component {
    render() {
        return (
            <View style={SystemStyle.Container}>
            <TouchableOpacity style={SystemStyle.NameList}
                //onPress={() => this._handleNotificationClick(item)}
                >
                <View style={SystemStyle.NamesImgContainer}>
                    <Image style={SystemStyle.NamesImg}
                        source={require('../assets/img/CreateEvent.png')}/>
                </View>
                <View style={SystemStyle.NamesInCard}>
                    <Text style={SystemStyle.NamesInCardText}>Denise Daniel</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={SystemStyle.NameList}
                //onPress={() => this._handleNotificationClick(item)}
                >
                <View style={SystemStyle.NamesImgContainer}>
                    <Image style={SystemStyle.NamesImg}
                        source={require('../assets/img/CreateEvent.png')}/>
                </View>
                <View style={SystemStyle.NamesInCard}>
                    <Text style={SystemStyle.NamesInCardText}>Denise Daniel</Text>
                </View>
            </TouchableOpacity>
        </View>
        );
    }
}


export default React.memo(AttendeeContent)