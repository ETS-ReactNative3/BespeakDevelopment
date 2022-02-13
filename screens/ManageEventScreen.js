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
import * as ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';

import { auth, db, storage } from '../firebase'

import fetch_date_time from '../api/GlobalTime'

import CreateEventStyle from "../styles/CreateEventStyle.js";
import Validation from '../styles/Validation';
import SystemStyle from "../styles/SystemStyle";

import Properties from "../values/Properties"
import dateFormat from "../helper/DateFormat"

class CreateEventScreen extends Component {
    state = {
        data: {
            name: this.props.route.params.event_name,
            schedule: '',
            location: '',
            max: null,
            desc: '',
            info: ''
        },
        banner_photo: {
            uri: ''
        },
        valid: {},
        is_date_select: false,
        _server: {
            date_time: false,
            epoch: false
        },
        is_loading: true
    }
    async _load_date_time() {
        this.setState({'_server': {... await fetch_date_time()},
            'is_loading': false});
        console.log("Loaded DateTime: ", this.state._server.date_time)
    }
    componentDidMount () {
        this._load_date_time()
    }
    _handleDateSelection(status) {
        console.log('Opening/Closing Date & Time Selection...')
        this.setState({'is_date_select': status})
    }
    _handleText(key, value) {
        var current_data = this.state.data;
        var current_valid = this.state.valid
        var editable_val = value

        current_valid[key] = '';
        
        if(key == 'max') {
            editable_val = value.toString()?.replace(/[^0-9]/g, '')

            if(editable_val) {
                editable_val = parseInt(editable_val)
            }

            if(editable_val == 0) {
                current_valid[key] = 'This cannot be zero.'
            }
        }

        if(value == '' || value == null) {
            current_valid[key] = 'This field is required.'
        } 

        current_data[key] = editable_val;

        this.setState({'data': current_data});
        this.setState({'valid': current_valid});

        console.log('State Value: ', this.state.data)
    }
    async _handleSubmit() {
        let is_valid = await this._processValidate()
        if(is_valid) {
            this.setState({'is_loading': true})
            console.log("Create Event Validated...")
            this._processSubmit();
        }
    }
    async _processValidate() {
        let is_valid = true;
        for(var key in this.state.data) {
            await this._handleText(key, this.state.data[key])
        }
        for(var key in this.state.valid) {
            if(this.state.valid[key] != '') {
                is_valid = false;
            }
            is_valid = is_valid && true;
        }
        return is_valid
    }
    async _processSubmit() {
        var event_data = this.state.data

        //Add Server Time
        event_data.server_time = (await fetch_date_time()).epoch;
        event_data.owner = auth.currentUser.uid

        await db
            .collection('event')
            .add({
                ...event_data
            })
            .catch(error => {
                this.setState({'is_loading': false})
                Alert.alert('Error!', error.message)
                return
            }) 
            .then(async (doc) => {
                if(this.state.banner_photo.uri) {
                    await this._uploadToStorage(this.state.banner_photo.uri, `/event/${doc.id}/banner`)
                }
                this.setState({'is_loading': false})
                this.props.navigation.goBack()
            });
    }
    // #TODO: Move to Helper
    _uploadToStorage(path, imageName) {
        let reference = storage.ref(imageName);         
        let task = reference.putFile(path);            

        return task.then(() => {                                 
            console.log('Photo Uploaded to Storage', path);
        }).catch((e) => {
            Alert.alert('Error!', e)
            console.log('Uploading Image Error: ', e)
        });
    }
    _selectImage() {
        //#TODO: Add Support for IOS, Optimize, Seperate to Option File
        ImagePicker.openPicker({
            multiple: false,
            cropping: true,
            mediaType: 'photo'
        }).then(images => {
            console.log('Attached Image: ', images.path);
            this.setState({'banner_photo': {
                'uri': images.path
            }})
        }).catch(error => {
            console.log("Error/Warning: ", error)
        });
    };
    render() {
        return (
            <View style = {CreateEventStyle.ScreenContainer}>
                {
                    this.state.is_loading && 
                    <Spinner visible={true} textStyle={SystemStyle.defaultLoader}
                        animation = 'fade'
                        overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                }
                <ScrollView>
                    <View style={CreateEventStyle.FormContainer}>
                        <DateTimePickerModal
                            isVisible={this.state.is_date_select}
                            mode="datetime"
                            minimumDate = {this.state._server.date_time ? this.state._server.date_time : new Date()}
                            onConfirm={(value) => {
                                console.log('Date selected: ', value)
                                let current = this.state.data;
                                current.schedule = Date.parse(value);
                                this.setState({'data': current})
                                this._handleDateSelection(false) 
                            }}
                            onCancel={() => this._handleDateSelection(false) }/>

                        <TouchableOpacity onPress = {() => this._selectImage()}>
                            <View style={CreateEventStyle.AddBannerContainer}>
                                <Feather name="plus" size={50} style={CreateEventStyle.AddImageIcon}/>
                                <Image style={CreateEventStyle.AddBannerImg}
                                    source={
                                        this.state.banner_photo.uri ?
                                        {uri: this.state.banner_photo.uri}:
                                        null
                                    }/>
                            </View>
                        </TouchableOpacity>

                        <Text style={CreateEventStyle.CreateEventFormHeader}>Create Event</Text>
                    
                        <Pressable onPress = {() => this.txtName.focus() } >
                            <View style={CreateEventStyle.EventFieldContainer}>
                                <AntDesign name="book" size={24} style={CreateEventStyle.EventFieldIcon}/>
                                <TextInput style={CreateEventStyle.FormEventField} placeholder="Event Name "
                                    maxLength={50} 
                                    value = {this.state.data.name}
                                    onChangeText = {text => this._handleText('name', text)}
                                    ref={(input) => { this.txtName = input; }}/>
                            </View>
                        </Pressable>
                        
                        { this.state.valid.name ?
                            <Text style={Validation.textVal}>
                                {this.state.valid.name} </Text>
                            : null
                        }

                        <Pressable onPress = {() => this._handleDateSelection(true) } >
                            <View style={CreateEventStyle.EventFieldContainer}>
                                <Feather name="calendar"  size={22} style={CreateEventStyle.EventFieldIcon}/>
                                <TextInput style={CreateEventStyle.FormEventField} placeholder="Schedule "
                                    value = {this.state.data.schedule 
                                        ? dateFormat(new Date(this.state.data.schedule), "EEEE, MMMM d, yyyy - h:mm aaa")
                                        : ''}
                                    maxLength={50} 
                                    editable = {false}
                                    ref={(input) => { this.txtSchedule = input; }}/>
                            </View>
                        </Pressable>
                        
                        { this.state.valid.schedule ?
                            <Text style={Validation.textVal}>
                                {this.state.valid.schedule} </Text>
                            : null
                        }

                        <Pressable onPress = {() => this.txtLocation.focus() } >
                            <View style={CreateEventStyle.EventFieldContainer}>
                                <SimpleLineIcons name="location-pin" size={24} style={CreateEventStyle.EventFieldIcon}/>
                                <TextInput style={CreateEventStyle.FormEventField} placeholder="Location "
                                    maxLength={30} 

                                    onChangeText = {text => this._handleText('location', text)}
                                    ref={(input) => { this.txtLocation = input; }}/>
                            </View>
                        </Pressable>

                        { this.state.valid.location ?
                            <Text style={Validation.textVal}>
                                {this.state.valid.location} </Text>
                            : null
                        }
                        
                        <Pressable onPress = {() => this.txtMaxAttend.focus() } >
                            <View style={CreateEventStyle.EventFieldContainer}>
                                <MaterialCommunityIcons name="account-group" size={24} style={CreateEventStyle.EventFieldIcon}/>
                                <TextInput style={CreateEventStyle.FormEventField} placeholder='Max Attendees '
                                    maxLength={4} 
                                    value = {this.state.data.max?.toString()}
                                    keyboardType = 'numeric'
                                    onChangeText = {text => this._handleText('max', text)}
                                    ref={(input) => { this.txtMaxAttend = input; }}/>
                            </View>
                        </Pressable>

                        { this.state.valid.max ?
                            <Text style={Validation.textVal}>
                                {this.state.valid.max}</Text>
                            : null
                        }   

                        <InputOutline placeholder="Describe your event"
                            style = {CreateEventStyle.FormFieldAssisted}
                            characterCount = {100}
                            trailingIcon = {() => {
                                    return <Feather name="edit-2" size={20} style={CreateEventStyle.CreateEventIcon} />
                                }
                            }
                            onChangeText = {text => this._handleText('desc', text)}
                            {...Properties.defaultInputOutline}
                            characterCountFontSize = {12}
                            multiline = {true}
                            minHeight = {40}
                            textAlignVertical = 'top'/>

                        { this.state.valid.desc ?
                            <Text style={Validation.textVal}>
                                {this.state.valid.desc}</Text>
                            : null
                        }

                        <InputOutline placeholder="Additional Information"
                            style = {CreateEventStyle.FormFieldAssisted}
                            characterCount = {300}
                            trailingIcon = {() => {
                                    return <Feather name="plus" size={22} style={CreateEventStyle.CreateEventIcon} />
                                }
                            }
                            onChangeText = {text => this._handleText('info', text)}
                            {...Properties.defaultInputOutline}
                            characterCountFontSize = {12}
                            multiline = {true}
                            minHeight = {80}
                            textAlignVertical = 'top'/>

                        { this.state.valid.info ?
                            <Text style={Validation.textVal}>
                                {this.state.valid.info} </Text>
                            : null
                        }

                        <TouchableOpacity style={CreateEventStyle.FormButton}
                            onPress={() => this._handleSubmit()}>
                                <Text style={CreateEventStyle.FormButtonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default { CreateEventScreen };
  