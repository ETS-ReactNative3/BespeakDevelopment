import React, { Component } from 'react';
import {
    ScrollView, 
    TouchableOpacity, 
    Text, 
    View,
    Image,
    Pressable,
    Alert,
    TextInput,
} from 'react-native';
import { 
    Feather,
    AntDesign,
    SimpleLineIcons,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import ToggleSwitch from 'toggle-switch-react-native'
import { InputOutline } from 'react-native-input-outline';
import * as ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';

import { auth, db, storage } from '../firebase'

import fetch_date_time from '../api/GlobalTime';
import push_notif from '../api/PushNotification';

import CreateEventStyle from "../styles/CreateEventStyle.js";
import EditEventStyle from "../styles/EditEventStyle.js";
import Validation from '../styles/Validation';
import SystemStyle from "../styles/SystemStyle";

import Properties from "../values/Properties"
import dateFormat from "../helper/DateFormat"
import { 
    _uploadToStorage,
    _getGeneratedLink,
    _notifyEventChange
} from "../helper/EventHelper"
import { 
    _arrangeData,
    _getEventImage,
    _getAttendingCount
} from '../helper/EventLoad';
import {
    _getFollowersToken
} from '../helper/ProfileLoad'; 
import {
    _constructNewEventNotif,
    _processNewEventNotif
} from '../helper/NotificationHelper';

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
        let time_data = await fetch_date_time();

        this.setState({
            '_server': {... time_data},
            'is_loading': false,
            'data': 
                { 
                 ...this.state.data, 
                 'schedule': time_data.epoch + 2 * (60 * 60 * 1000)
                } 
        });
    }
    componentDidMount () {
        this._load_date_time()
    }
    async _handleDateSelection(status) {
        //console.log('Opening/Closing Date & Time Selection...')
        this.setState({
            'is_date_select': status,
            '_server': !status ? this.state._server : {... await fetch_date_time()}
        })
        console.log("Loaded DateTime: ", new Date(this.state._server.epoch) )
    }
    _handleText(key, value) {
        var current_data = this.state.data;
        var current_valid = this.state.valid
        var editable_val = value

        current_valid[key] = '';
        
        if(key == 'max') {
            editable_val = value?.toString()?.replace(/[^0-9]/g, '')

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

        let current_time = await fetch_date_time();

        if(this.state.data.schedule) {
            if(current_time.epoch > this.state.data.schedule) {
                is_valid = false;
                Alert.alert('Select a different schedule',
                    'The schedule of this event takes place in the past. You\'ll need to update the schedule'+
                    ' before you can create the event.')
            }
        }
        return is_valid;
    }
    async _processSubmit() {
        var event_data = this.state.data;
        let has_upload = this.state.banner_photo.uri;

        //Add Server Time
        event_data.server_time = (await fetch_date_time()).epoch;
        event_data.owner = auth.currentUser.uid;
        event_data.is_open = true;
        event_data._popularity = 0;

        if(!has_upload) {
            event_data.random_banner = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
        }

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
                let to_update = []

                if(has_upload) {
                    await _uploadToStorage(this.state.banner_photo.uri, `/event/${doc.id}/banner`)
                    to_update._banner = await _getEventImage(doc.id, undefined)
                }

                try {
                    let link_title = event_data.name + ' (' 
                        + await dateFormat(new Date(this.state.data.schedule), "EEEE, MMMM d, yyyy - h:mm aaa") + ', ' 
                        + event_data.location + ') ';

                    // Create a dynamic link.
                    to_update._link = await _getGeneratedLink('event', doc.id, 
                        link_title, has_upload ? to_update._banner?.uri : undefined, event_data.desc);

                    await db
                        .collection('event')
                        .doc(doc.id)
                        .update({
                            ...to_update
                        })
                        .catch(error => {
                            Alert.alert('Error!', error.message)
                            console.log('Error!', error.message)
                        })
                    
                    _processNewEventNotif(doc.id);
                    let all_token = await _getFollowersToken();

                    if(all_token.length > 0) {
                        const _data = await _constructNewEventNotif(all_token, {event: doc.id});
                        push_notif(_data);
                    }
                } catch(e) { console.log('Error!', e)}

                this.setState({'is_loading': false})
                
                this.props.navigation.goBack()
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
                                date = {this.state.data.schedule ? new Date(this.state.data.schedule) : new Date(this.state._server.epoch)}
                                minimumDate = {this.state._server.epoch ? new Date(this.state._server.epoch) : new Date()}
                                onConfirm={async (value) => {
                                    console.log('Date selected: ', value)
                                    let current = this.state.data;
                                     
                                    let selected = Date.parse(value);
                                    this.setState({'_server': {... await fetch_date_time()}});

                                    if(selected < this.state._server.epoch) {
                                        selected = this.state._server.epoch;    
                                    }

                                    current.schedule = selected;
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
                                    selectionColor={'#eb9834'}
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
                                    selectionColor={'#eb9834'}
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
                                    maxLength={50} 
                                    selectionColor={'#eb9834'}
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
                                    selectionColor={'#eb9834'}
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

class EditEventScreen extends Component {
    state = {
        data: {},
        to_compare: {},
        banner_photo: false,
        banner_has_change: false,
        valid: {},
        is_date_select: false,
        _server: {
            date_time: false,
            epoch: false
        },
        is_loading: true
    }
    async _handleText(key, value) {
        var current_data = this.state.data;
        var current_valid = this.state.valid
        var editable_val = value

        current_valid[key] = '';
        
        if(key == 'max') {
            editable_val = value?.toString()?.replace(/[^0-9]/g, '')

            if(editable_val) {
                editable_val = parseInt(editable_val)

                let event_id = this.props.route.params.event_id;
                let current_count = await _getAttendingCount(event_id);

                if(current_count > editable_val) {
                    editable_val = current_count;
                }
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
                'uri': images.path},
                'banner_has_change': true
            })
        }).catch(error => {
            console.log("Error/Warning: ", error)
        });
    };
    async _retrieveData(event_id) {
        let get_event_query = await db
            .collection('event')
            .doc(event_id)
            .get();
        
        if(get_event_query.empty) {
            console.log('No data found for user: ', uid);
            return;
        }

        let _data = get_event_query.data();
        _data.id = get_event_query.id;
        _data = await _arrangeData([_data], true); 

        console.log("Opened Event Data: ", _data)

        let data = _data[0];

        this.setState({
            _server: {... await fetch_date_time()},
            is_loading: false,
            data: {
                name: data.name,
                location: data.location,
                max: data.max,
                schedule: data.schedule,
                desc: data.desc,
                info: data.info,
                is_open: data.is_open
            },
            to_compare: {
                location: data.location,
                schedule: data.schedule,
                name: data.name
            }
        });

        this._loadImages(data);
    }
    async _loadImages(item) {
        // Load Images Synchronously 

        item.event_image = item._banner ? item._banner
            : await _getEventImage(undefined, item.random_banner)

        this.setState({banner_photo: item.event_image});
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => this._handleSubmit()}>
                    <Text style={EditEventStyle.tabSave}>Save</Text>
                </TouchableOpacity>
            ),
        });
        this._retrieveData(this.props.route.params.event_id)
    }
    async _handleDateSelection(status) {
        this.setState({
            'is_date_select': status,
            '_server': !status ? this.state._server : {... await fetch_date_time()}
        })
        console.log("Loaded DateTime: ", new Date(this.state._server.epoch) )
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
            if(key == 'is_open') continue;
            await this._handleText(key, this.state.data[key])
        }
        for(var key in this.state.valid) {
            if(this.state.valid[key] != '') {
                is_valid = false;
            }
            is_valid = is_valid && true;
        }

        let current_time = await fetch_date_time();

        if(this.state.data.schedule) {
            if(current_time.epoch > this.state.data.schedule) {
                is_valid = false;
                Alert.alert('Select a different schedule',
                    'The schedule of this event takes place in the past. You\'ll need to update the schedule'+
                    ' before you can edit this event.')
            }
        }

        return is_valid
    }
    async _processSubmit() {
        var event_data = this.state.data

        let event_id = this.props.route.params.event_id;

        await db
            .collection('event')
            .doc(event_id)
            .update({
                ...event_data
            })
            .catch(error => {
                if(error.code == 'firestore/not-found') {
                    this.props.navigation.goBack()
                    return;
                }
                this.setState({'is_loading': false})
                Alert.alert('Error!', error.message)
                return
            }) 
            .then(async () => {
                let to_update = []

                let has_change = this.state.banner_photo.uri && this.state.banner_has_change;
                let current = this.state.banner_photo.uri;

                if(has_change) {
                    await _uploadToStorage(this.state.banner_photo.uri, `/event/${event_id}/banner`)
                    to_update._banner = await _getEventImage(event_id, undefined)
                }

                try {
                    let link_title = event_data.name + ' (' 
                        + await dateFormat(new Date(event_data.schedule), "EEEE, MMMM d, yyyy - h:mm aaa") + ', ' 
                        + event_data.location + ') ';

                    // Create a dynamic link.
                    to_update._link = await _getGeneratedLink('event', event_id, 
                        link_title, has_change ? to_update._banner.uri : current ? current : undefined, event_data.desc);

                    await db
                        .collection('event')
                        .doc(event_id)
                        .update({
                            ...to_update
                        })
                        .catch(error => {
                            Alert.alert('Error!', error.message)
                            console.log('Error!', error.message)
                        })
                    
                    let initial = this.state.to_compare;
                    if(initial.name != event_data.name 
                        || initial.schedule != event_data.schedule
                        || initial.location != event_data.location) {
                            await _notifyEventChange(event_id);
                        }
                } catch(e) { console.log('Error!', e)}

                this.setState({'is_loading': false})
                
                this.props.route.params._done();
                this.props.navigation.goBack()
            });
    }
    render() {
        return(
            <View style={EditEventStyle.Container}>
                {
                    this.state.is_loading && 
                    <Spinner visible={true} textStyle={SystemStyle.defaultLoader}
                        animation = 'fade'
                        overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                }
                <ScrollView>
                    <DateTimePickerModal
                        isVisible={this.state.is_date_select}
                        mode="datetime"
                        minimumDate = {this.state._server.date_time ? this.state._server.date_time : new Date()}
                        onConfirm={async (value) => {
                            console.log('Date selected: ', value)
                            let current = this.state.data;
                                
                            let selected = Date.parse(value);
                            this.setState({'_server': {... await fetch_date_time()}});

                            if(selected < this.state._server.epoch) {
                                selected = this.state._server.epoch;    
                            }

                            current.schedule = selected;
                            this.setState({'data': current});
                            this._handleDateSelection(false);
                        }}
                        onCancel={() => this._handleDateSelection(false) }/>

                    <TouchableOpacity onPress = {() => this._selectImage()}>
                        <View style={EditEventStyle.addbannercoverimgContainer}>
                            <Feather name="plus" size={50} style={EditEventStyle.addbannerimg}/>
                            <Image style={EditEventStyle.addbannercoverimg}
                                source={
                                    this.state.banner_photo ?
                                    this.state.banner_photo:
                                    require('../assets/img/blank-cover.png')
                                }/>
                        </View>
                    </TouchableOpacity>

                    <View style={EditEventStyle.EditEventContainer}>
                        <Text style={EditEventStyle.TitleScreen}>Edit Event</Text>
                    </View>
                    <View style={EditEventStyle.LockEventContainer}>
                        <Text style={EditEventStyle.LockEventText}>Show Event</Text>
                        <ToggleSwitch isOn={this.state.data.is_open}
                            onColor="#eb9834"
                            offColor="#ccc"
                            size="medium"
                            style={EditEventStyle.LockEventToggle}
                            onToggle={isOn => this.setState({data: {...this.state.data, is_open: isOn,}})}/>
                    </View>
                    <Pressable onPress = {() => this.txtName.focus() }>
                        <View style={EditEventStyle.EditEventNamecontainer}>
                            <TextInput style={EditEventStyle.EditEventNameField} placeholder='Event Name '
                                maxLength={50} 
                                selectionColor={'#eb9834'}
                                value = {this.state.data.name}
                                onChangeText = {text => this._handleText('name', text)}
                                ref={(input) => { this.txtName = input; }}/>
                        </View>
                    </Pressable>

                    { this.state.valid.name ?
                        <Text style={Validation.EditedTextVal}>
                            {this.state.valid.name} </Text>
                        : null
                    }

                    <Pressable onPress = {() => this._handleDateSelection(true) } >
                        <View style={EditEventStyle.EditEventSchedcontainer}>
                            <TextInput style={EditEventStyle.EditEventSchedField} placeholder="Schedule "
                                value = {this.state.data.schedule 
                                    ? dateFormat(new Date(this.state.data.schedule), "EEEE, MMMM d, yyyy - h:mm aaa")
                                    : ''}
                                maxLength={50}
                                selectionColor={'#eb9834'}
                                editable = {false}
                                ref={(input) => { this.txtSchedule = input; }}/>
                        </View>
                    </Pressable>
                    
                    { this.state.valid.schedule ?
                        <Text style={Validation.EditedTextVal}>
                            {this.state.valid.schedule} </Text>
                        : null
                    }

                    <Pressable onPress = {() => this.txtLocation.focus() } >
                        <View style={EditEventStyle.EditEventLoccontainer}>
                            <TextInput style={EditEventStyle.EditEventLocField} placeholder="Location "
                                maxLength={50} 
                                selectionColor={'#eb9834'}
                                value = {this.state.data.location}
                                onChangeText = {text => this._handleText('location', text)}
                                ref={(input) => { this.txtLocation = input; }}/>
                        </View>
                    </Pressable>

                    { this.state.valid.location ?
                        <Text style={Validation.EditedTextVal}>
                            {this.state.valid.location} </Text>
                        : null
                    }

                    <Pressable onPress = {() => this.txtMaxAttend.focus() } >
                        <View style={EditEventStyle.EditEventMaxAttendcontainer}>
                            <TextInput style={EditEventStyle.EditEventMaxAttendField} placeholder='Max Attendees '
                                maxLength={4}
                                selectionColor={'#eb9834'}
                                value = {this.state.data.max?.toString()}
                                keyboardType = 'numeric'
                                onChangeText = {text => this._handleText('max', text)}
                                ref={(input) => { this.txtMaxAttend = input; }}/>
                        </View>
                    </Pressable>

                    { this.state.valid.max ?
                        <Text style={Validation.EditedTextVal}>
                            {this.state.valid.max}</Text>
                        : null
                    }   

                    <View style={CreateEventStyle.FormContainer}>
                        <InputOutline placeholder="Describe your event"
                            style = {CreateEventStyle.FormFieldAssisted}
                                characterCount = {100}
                                value = {this.state.data.desc}
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
                                {this.state.valid.desc} </Text>
                            : null
                        }

                        <InputOutline placeholder="Additional Information"
                            style = {CreateEventStyle.FormFieldAssisted}
                                characterCount = {300}
                                value = {this.state.data.info}
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
                    </View>
                    <TouchableOpacity style={EditEventStyle.DeleteBtn}
                        onPress={() => /*navigation.navigate('')*/ Alert.alert('Wala', 'wala pa.')}>
                            <Text style={EditEventStyle.DeleteTextBtn}>Delete Event</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

export default { 
    CreateEventScreen,
    EditEventScreen
};
  