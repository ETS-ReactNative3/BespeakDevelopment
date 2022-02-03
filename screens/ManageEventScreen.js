import React, { Component } from 'react';
import {
    TextInput,
    ScrollView, 
    TouchableOpacity, 
    Text, 
    View,
    Image
} from 'react-native';
import { 
    Feather,
    AntDesign,
    SimpleLineIcons,
    MaterialCommunityIcons
} from '@expo/vector-icons';

import CreateEvent from "../styles/CreateEvent.js";
  
class CreateEventScreen extends Component {
    render() {
        return (
            <View style={CreateEvent.container}>
                <ScrollView>
                    <View style={CreateEvent.addbannercoverimgContainer}>
                        <Feather name="plus" size={50} style={CreateEvent.addbannerimg}/>
                        <Image style={CreateEvent.addbannercoverimg}
                            //source={require('../assets/img/SecondPages.png')}
                            />
                    </View>
                    <View style={CreateEvent.createeventcontainer}>
                        <Text style={CreateEvent.eventCreatetxt}>Create Event</Text>
                    </View>
                    <View style={CreateEvent.CreateEventNamecontainer}>
                        <AntDesign name="book" size={24} style={CreateEvent.CreateEventNameIcon} />
                        <TextInput style={CreateEvent.CreateEventNameField} placeholder='Event Name '></TextInput>
                    </View>
                    <View style={CreateEvent.CreateEventSchedcontainer}>
                        <Feather name="calendar" size={22} style={CreateEvent.CreateEventSchedIcon} />
                        <TextInput style={CreateEvent.CreateEventSchedField} placeholder='Schedule '></TextInput>
                    </View>
                    <View style={CreateEvent.CreateEventLoccontainer}>
                        <SimpleLineIcons name="location-pin" size={24} style={CreateEvent.CreateEventLocIcon}/>
                        <TextInput style={CreateEvent.CreateEventLocField} placeholder='Location ' maxLength={100}></TextInput>
                    </View>
                    <View style={CreateEvent.CreateEventMaxAttendcontainer}>
                        <MaterialCommunityIcons name="account-group" size={24} style={CreateEvent.CreateEventLocIcon}/>
                        <TextInput style={CreateEvent.CreateEventMaxAttendField} placeholder='Max Attendees ' maxLength={100}></TextInput>
                    </View>
                    <View style={CreateEvent.CreateEventDesccontainer}>
                        <Feather name="edit-2" size={20} style={CreateEvent.CreateEventDescIcon}/>
                        <TextInput style={CreateEvent.CreateEventDescField} placeholder='Describe your event ' maxLength={100}></TextInput>
                    </View>
                    <View style={CreateEvent.CreateEventInfocontainer}>
                        <Feather name="plus" size={22} style={CreateEvent.CreateEventInfoIcon}/>
                        <TextInput style={CreateEvent.CreateEventInfoField} placeholder='Additional Information ' maxLength={100}></TextInput>
                    </View>
                </ScrollView>
                <TouchableOpacity style={CreateEvent.createeventbtn}
                    onPress={() => navigation.navigate('')}>
                        <Text style={CreateEvent.createeventtxt}>Create</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default { CreateEventScreen };
  