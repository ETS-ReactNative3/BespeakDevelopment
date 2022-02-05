import React, { Component } from 'react';
import {
    ScrollView, 
    TouchableOpacity, 
    Text, 
    View,
    Image,
    Pressable,
    TextInput
} from 'react-native';
import { 
    Feather,
    AntDesign,
    SimpleLineIcons,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import { InputOutline } from 'react-native-input-outline';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import fetch_date_time from '../api/GlobalTime'

import CreateEventStyle from "../styles/CreateEventStyle.js";

import Properties from "../values/Properties"
  
class CreateEventScreen extends Component {
    state = {
        is_date_select: false,
        _server: {
            date_time: false,
            epoch: false
        }
    }
    async _load_date_time() {
        this.setState({'_server': {... await fetch_date_time()}});
        console.log("Loaded DateTime: ", this.state._server.date_time)
    }
    async componentDidMount () {
        await this._load_date_time()
    }
    _handleDateSelection(status) {
        console.log('Opening/Closing Date & Time Selection...')
        this.setState({'is_date_select': status})
    }
    render() {
        return (
            <View style = {CreateEventStyle.ScreenContainer}>
                <View style={CreateEventStyle.FormContainer}>
                    <DateTimePickerModal
                        isVisible={this.state.is_date_select}
                        mode="datetime"
                        minimumDate = {this.state._server.epoch ? this.state._server.date_time : new Date()}
                        onConfirm={(value) => {
                            console.log('Date selected: ', value)
                            this._handleDateSelection(false) 
                        }}
                        onCancel={() => this._handleDateSelection(false) }/>
                    <ScrollView>
                        <View style={CreateEventStyle.AddBannerContainer}>
                            <Feather name="plus" size={50} style={CreateEventStyle.AddImageIcon}/>
                            <Image style={CreateEventStyle.AddBannerImg}/>
                        </View>
                        
                        <Text style={CreateEventStyle.CreateEventFormHeader}>Create Event</Text>

                        <InputOutline placeholder="Event Name"
                            style = {CreateEventStyle.FormField}
                            characterCount = {30}
                            trailingIcon = {() => {
                                    return <AntDesign name="book" size={24} style={CreateEventStyle.CreateEventIcon} />
                                }
                            }
                            //value = {this.state.email.value}
                            //onChangeText = {text => this._handleText('email', text)}
                        {...Properties.defaultInputOutline}/>
                        <Pressable
                            onPress={() => this._handleDateSelection(true)}>
                                <View pointerEvents="none">
                                    <InputOutline placeholder="Schedule"
                                        style = {CreateEventStyle.FormField}
                                        characterCount = {30}
                                        trailingIcon = {() => {
                                            return <Feather name="calendar" size={22} style={CreateEventStyle.CreateEventIcon} />
                                        }}
                                        editable = {false}
                                            //value = {this.state.email.value}
                                            //onChangeText = {text => this._handleText('email', text)}
                                        {...Properties.defaultInputOutline}/> 
                                </View>
                        </Pressable>
                        <View style={CreateEventStyle.CreateEventSchedcontainer}>
                            <Feather name="calendar" size={22} style={CreateEventStyle.CreateEventSchedIcon} />
                            <TextInput style={CreateEventStyle.CreateEventSchedField} placeholder='Schedule '
                                onFocus = {() => this._handleDateSelection(true)}></TextInput>
                        </View>
                    { /*
                        <View style={CreateEvent.CreateEventNamecontainer}>
                            <AntDesign name="book" size={24} style={CreateEvent.CreateEventNameIcon} />
                            <TextInput style={CreateEvent.CreateEventNameField} placeholder='Event Name '></TextInput>
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
                    */ }
                    </ScrollView>
                    <TouchableOpacity style={CreateEventStyle.createeventbtn}
                        onPress={() => navigation.navigate('')}>
                            <Text style={CreateEventStyle.createeventtxt}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default { CreateEventScreen };
  