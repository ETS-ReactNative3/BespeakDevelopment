import React, { Component } from "react";
import {
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  Text, 
  View,
  Image,
  Alert
} from 'react-native';
import { 
  Feather,
} from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import Spinner from 'react-native-loading-spinner-overlay';
import { InputStandard } from 'react-native-input-outline';
import * as ImagePicker from 'react-native-image-crop-picker';

import { auth, db, storage, _auth } from '../firebase';

import SystemStyle from "../styles/SystemStyle";
import Validation from '../styles/Validation';

import EditProfileScreenStyle from '../styles/EditProfileScreenStyle';

import Properties from '../values/Properties';

import { 
    validateName, 
    validateOrgName,
    validateMobile,
    validatePassword
} from '../helper/TextValidate';
import { 
    _getProfileImage,
} from "../helper/ProfileLoad";
import { 
    _getUserGeneratedLink, 
    _deleteOverallAccount
} from "../helper/ProfileHelper"


class EditProfileScreen extends Component {
    state = {
        user: auth.currentUser,
        data: {},
        valid: {},
        profile_photo: {uri: '', hasChange: false},
        cover_photo: {uri: '', hasChange: false},
        is_loading: false,

        show_dialog: false,
        show_confirm: false,
        show_valid: false,

        pass_confirm: null,
        show_load: false,
    }
    async _loadUserData() {
        let uid = auth.currentUser.uid
        console.log('Edit User ID: ' + uid);
        
        const user_info = db.collection("user_info")
        const query = user_info.doc(uid)
        const snapshot = await query.get()
    
        if(snapshot.empty) {
            console.log('No data found for user: ', uid);
            return;
        } 
        var _data = snapshot.data()

        if(_data.bio)
            _data.bio = _data.bio.replace(/(\r\n|\n|\r)/gm, " ")
        
        _data.id = snapshot.id;

        let profile_image = _data.profile_image ? _data.profile_image 
            : await _getProfileImage(undefined, 'profile')
        let cover_image = _data.cover_image ? _data.cover_image 
            : await _getProfileImage(undefined, 'cover')

        this.setState({
            'data': { ..._data },
            'profile_photo': {
                'uri': profile_image,
                'hasChange': false
            },
            'cover_photo': {
                'uri': cover_image,
                'hasChange': false
            },
            'is_loading': false
        })
    }

    componentDidMount() {
        this.setState({'is_loading': true})

        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => this._handleSubmit()}>
                    <Text style={EditProfileScreenStyle.HeaderSave}>Save</Text>
                </TouchableOpacity>
            ),
        });
    
        this._loadUserData()
    }
    _selectImage(upload_type) {
        //#TODO: Add Support for IOS, Optimize, Seperate to Option File
        ImagePicker.openPicker({
            multiple: false,
            cropping: true,
            cropperCircleOverlay: upload_type == "dp" ? true : false,
            mediaType: 'photo'
        }).then(images => {
            console.log('Attached Image: ', images.path);
            if(upload_type == "dp") {
                this.setState({'profile_photo': {
                    'uri': {uri: images.path},
                    'hasChange': true
                }})
            } else {
                this.setState({'cover_photo': {
                    'uri': {uri: images.path},
                    'hasChange': true
                }})
            }
        }).catch(error => {
            console.log("Error/Warning: ", error)
        });
    };
    async _handleSubmit() {
        let is_valid = await this._processValidate()
        if(is_valid) {
            this.setState({'is_loading': true})
            await this._processSubmit();
        }
    }
    async _processSubmit() {
        let _data = this.state.data
        _data._name = _data.user_type == "INDIV" ?
            _data.f_name + ' ' + _data.l_name : _data.org_name; 

        let _cleaned_data = {}

        for(var key in _data) {
            if(['f_name', 'l_name', 'location',
                'org_name', 'bio', 'mobile', '_name'].includes(key)) 
            _cleaned_data[key] = _data[key]
        }
        console.log('Value To Updated: ', _cleaned_data)
        
        let user_id = this.state.user.uid;

        await db
            .collection('user_info')
            .doc(user_id)
            .update({
                ..._cleaned_data
            })
            .catch(error => {
                Alert.alert('Error!', error.message)
                return
            }) 
            .then(async () => {
                let _update = _cleaned_data;
                _update.profile_image = _data.profile_image;
                _update.cover_image = _data.cover_image;

                if (this.state.profile_photo.hasChange) {
                    await this._uploadToStorage(this.state.profile_photo.uri.uri, `/users/${user_id}/profile`)
                    _update.profile_image = await _getProfileImage(user_id, 'profile')
                }
                if (this.state.cover_photo.hasChange) {
                    await this._uploadToStorage(this.state.cover_photo.uri.uri, `/users/${user_id }/cover`)
                    _update.cover_image = await _getProfileImage(user_id, 'cover')
                }

                try {
                    let link_title = _data.user_type == "INDIV" ? _data.f_name : _data.org_name;

                    // Create a dynamic link.
                    _update._link = await _getUserGeneratedLink(user_id, 
                        link_title, _update.profile_image.uri ? _update.profile_image.uri : undefined, _update.bio);

                    await db
                        .collection('user_info')
                        .doc(user_id)
                        .update({
                            ..._update
                        })
                        .catch(error => {
                            Alert.alert('Error!', error.message)
                            console.log('Error!', error.message)
                        })
                } catch(e) { console.log('Error!', e)}

                this.setState({'is_loading': false})
                
                this.props.navigation.goBack()
            });
    }
    async _processValidate() {
        if(!this.state.valid) {
            return true;
        }

        var is_valid = true;

        for(var key in this.state.valid) {
            console.log(`Checking ${key} with value: `, this.state.data[key])
            await this._handleText(key, this.state.data[key])
        }

        for(var key in this.state.valid) {
            if(this.state.valid[key] != '') {
                is_valid = is_valid && false;
            }
        }

        return is_valid;
    }
    _uploadToStorage(path, imageName) {
        let reference = storage.ref(imageName);         
        let task = reference.putFile(path);            

        return task.then(() => {                                 
            console.log('Photo Uploaded to Storage', path);
        }).catch((e) => {
            Alert.alert('Error!', e.message)
            console.log('Uploading Image Error: ', e)
        });
    }
    _handleText(key, value) {
        var dataState = this.state.data;
        var validState = this.state.valid;
        var val_msg = 'This is a required field.';

        if(key == 'f_name') {
            if(!validateName(value)) {
                if(value != '') {
                    val_msg = 'Invalid name.'
                } 
            } else {
                val_msg = false;
            }

            validState.f_name = val_msg
            dataState.f_name = value;
        } else if (key == 'l_name') {
            if(!validateName(value)) {
                if(value != '') {
                    val_msg = 'Invalid name.'
                }
            } else {
                val_msg = false;
            }

            validState.l_name = val_msg
            dataState.l_name = value;
        } else if (key == 'org_name') {
            if(!validateOrgName(value)) {
                if(value != '') {
                    val_msg = 'Invalid name.'
                }
            } else {
                val_msg = false;
            }

            validState.org_name = val_msg
            dataState.org_name = value;
        } else if (key == 'mobile') {
            if(!validateMobile(value)) {
                if(value != '') {
                    val_msg = 'Invalid mobile number format.'
                }
            } else {
                val_msg = false;
            }

            validState.mobile = val_msg
            dataState.mobile = value;
        } else if (key == 'location') {
            dataState.location = value;
        } else {
            dataState.bio = value;
        }
        
        this.setState({'data': dataState})
        this.setState({'valid': validState})
    }

    async _handleDelete() {
        this.setState({show_load: true});

        var user_creds = _auth.EmailAuthProvider
            .credential(this.state.user.email, this.state.pass_confirm)
        console.log('Started deleting account... ')
        
        await auth
            .currentUser
            .reauthenticateWithCredential(user_creds)
            .then(async () => {
                console.log('Deleting account now...')
                this.setState({show_load: false});
                await _deleteOverallAccount();
            })
            .catch(error => {
                console.log('Error on Reauthentication: ', error.message)
                if(error.code == 'auth/wrong-password') {
                    this.setState({show_valid: true})
                } else {
                    Alert.alert('Error!', error.message)
                }
            })

        this.setState({show_load: false});
    }

    render() {
        let item = this.state.data;

        return (
            <View style={EditProfileScreenStyle.EditProfileContainer}>
                { this.state.is_loading && 
                    <Spinner visible={true} 
                        textStyle={SystemStyle.whiteLoader}
                        color = '#fff'
                        animation = 'fade'
                        overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                }
                { this.state.show_load && 
                    <Spinner visible={true}
                        textContent = {'Deleting your information...'}
                        textStyle={SystemStyle.defaultLoader}
                        color = '#fff'
                        animation = 'fade'
                        overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                }
                <TouchableOpacity onPress = {() => this._selectImage("cover")}>
                    <View style={EditProfileScreenStyle.EditProfileCoverImgContainer}>
                        <Feather name="plus" size={50} style={EditProfileScreenStyle.EditCoverImgIcon}/>
                        <Image style={EditProfileScreenStyle.EditProfileCoverImg}
                            source={ this.state.cover_photo.uri ?
                                this.state.cover_photo.uri 
                                : require('../assets/img/blank-cover.png') }/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this._selectImage("dp")}>
                    <View style={EditProfileScreenStyle.UpperSection}>
                        <View style={EditProfileScreenStyle.EditProfileImgContainer}>
                            <Feather name="plus" size={50} style={EditProfileScreenStyle.EditProfileImgIcon}/>
                            <Image style={EditProfileScreenStyle.EditProfileImg}
                                source={ this.state.profile_photo.uri ?
                                    this.state.profile_photo.uri
                                    : require('../assets/img/blank-profile.png') }/>
                        </View>
                    </View>
                </TouchableOpacity>
                <ScrollView>
                    <View style = {EditProfileScreenStyle.EditProfileFormContainer}>
                        { item.user_type == 'INDIV' ? (
                            <>
                                <InputStandard placeholder = 'First Name'
                                    style = {EditProfileScreenStyle.EditProfileTextInput}
                                    characterCount = {26}
                                    value={item.f_name}
                                    onChangeText = {text => this._handleText('f_name', text)}
                                    {...Properties.defaultInputStandard}
                                    autoCorrect = {false}/> 
                                {this.state.valid.f_name ?
                                    <Text style={Validation.textVal}>
                                        {this.state.valid.f_name}</Text>
                                : null}

                                <InputStandard placeholder = 'Last Name'
                                    style = {EditProfileScreenStyle.EditProfileTextInput}
                                    characterCount = {26}
                                    value={item.l_name}
                                    onChangeText = {text => this._handleText('l_name', text)}
                                    {...Properties.defaultInputStandard}
                                    autoCorrect = {false}/> 
                                {this.state.valid.l_name ?
                                    <Text style={Validation.textVal}>
                                        {this.state.valid.l_name}</Text>
                                : null}
                            </>  
                        ) : (
                            <>
                                <InputStandard placeholder = 'Organization Name'
                                    style = {EditProfileScreenStyle.EditProfileTextInput}
                                    characterCount = {46}
                                    value={item.org_name}
                                    onChangeText = {text => this._handleText('org_name', text)}
                                    {...Properties.defaultInputStandard}
                                    autoCorrect = {false}/> 
                                {this.state.valid.org_name ?
                                    <Text style={Validation.textVal}>
                                        {this.state.valid.org_name}</Text>
                                : null}  
                            </>
                        )}
                    <InputStandard placeholder = 'Bio'
                        style = {EditProfileScreenStyle.EditProfileTextInput}
                        characterCount = {100}
                        value={item.bio}
                        onChangeText = {text => this._handleText('bio', text)}
                        {...Properties.defaultInputStandard}
                        characterCountFontSize = {12}
                        multiline = {true}
                        minHeight = {60}
                        textAlignVertical = 'top'/> 

                    <InputStandard placeholder = 'Location'
                        style = {EditProfileScreenStyle.EditProfileTextInput}
                        characterCount = {64}
                        value={item.location}
                        onChangeText = {text => this._handleText('location', text)}
                        {...Properties.defaultInputStandard}/> 

                    <InputStandard placeholder = 'Phone Number'
                        style = {EditProfileScreenStyle.EditProfileTextInput}
                        characterCount = {15}
                        value={item.mobile}
                        onChangeText = {text => this._handleText('mobile', text)}
                        {...Properties.defaultInputStandard}/> 
                    <Text style={Validation.textVal}>
                            {this.state.valid.mobile}</Text>
                    </View>

                    <TouchableOpacity style={EditProfileScreenStyle.ChangePassBtn}
                        onPress = {() => { this.props.navigation.navigate('ChangePasswordScreen') }}>
                            <Text style={EditProfileScreenStyle.ChangePassTextBtn}> Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={EditProfileScreenStyle.LogOutBtn}
                        onPress = {async () => { 
                            try { await auth.signOut() }
                            catch(e) { console.log('Error: ', e) }}}>
                                <Text style={EditProfileScreenStyle.LogOutTextBtn}> Log Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={EditProfileScreenStyle.DeleteAcctBtn}
                        onPress = {() => { this.setState({show_dialog: true}) }}>
                            <Text style={EditProfileScreenStyle.DeleteAcctTextBtn}> Delete Account</Text>
                    </TouchableOpacity>
                    <Dialog.Container visible={this.state.show_dialog}>
                        <Dialog.Title>Account Delete</Dialog.Title>
                            <Dialog.Description>
                                Do you want to delete this account? Please take note that this action will
                                 lose all of your events and connections on bespeak.
                            </Dialog.Description>
                        <Dialog.Button label="Cancel" color = {'orange'} bold = {true}
                            onPress={() => { this.setState({show_dialog: false}) }} />
                        <Dialog.Button label="Delete" color = {'gray'} bold = {true}
                            onPress={() => { this.setState({show_confirm: true, show_dialog: false}) }} />
                    </Dialog.Container>
                    <Dialog.Container visible={this.state.show_confirm}>
                        <Dialog.Title>Confirm Delete</Dialog.Title>
                        <Dialog.Description>
                            We need your confirmation for your request. Its sad for us to see you go but we guarantee that
                            all of your information saved in bespeak will be securely removed. 
                        </Dialog.Description>
                        <Dialog.Input label = 'Confirm using your password' secureTextEntry={true}
                            onChangeText = {text => {
                                this.setState({pass_confirm: text, show_valid: false})}}/>

                        {this.state.show_valid && 
                            <Text style = {Validation.EditedTextVal}>Your password does not match.</Text>
                        }
                        
                        <Dialog.Button label="Cancel" color = {'orange'} bold = {true}
                            onPress={() => { this.setState({show_confirm: false}) }} />
                        <Dialog.Button label="Delete my information" color = {'gray'} bold = {true}
                            onPress={() => { this._handleDelete(); }} />
                    </Dialog.Container>
                </ScrollView>
            </View>
        );
    } 
}

class ChangePasswordScreen extends Component {
    state = {
        user: auth.currentUser,
        data: {current: '', new: '', confirm: ''},
        valid: {},
        is_loading: false
    }
    _handleText(key, value) {
        var dataState = this.state.data
        var validState = this.state.valid
        
        validState[key] = ''
        dataState[key] = value

        if(key == 'new' || key == 'confirm') {
            if(dataState.confirm != dataState.new) {
                validState.confirm = 'Your password does not match.'
            } else {
                validState.confirm = ''
            }

            if(value) {
                if(!validatePassword(value) && key == 'new') {
                    validState.new = 'Your password is too weak.'
                }
            } else {
                validState[key] = 'This field is required'
            }
        } else {
            if(!value) {
                validState.current = 'This field is required'
            }
        }

        this.setState({'data': dataState})
        this.setState({'valid': validState})
    }
    async _handleSubmit() {
        var is_validate = await this._processValidate()
        if(is_validate) {
            this.setState({'is_loading': true})
            await this._processSubmit()
            this.setState({'is_loading': false})
        }
    }
    async _processSubmit() {
        console.log('Changing Password for User: ', this.state.user.email)
        var user_creds = _auth.EmailAuthProvider
            .credential(this.state.user.email, this.state.data.current)
        console.log('Started changing password... ')
        
        await auth
            .currentUser
            .reauthenticateWithCredential(user_creds)
            .then(() => {
                console.log('Changing password now...')
                    auth.currentUser
                        .updatePassword(this.state.data.new)
                        .catch(error => {
                            console.log('Error on Changing Password: ', error.message)
                            Alert.alert('Error!', error.message)
                        }).then(() => {
                            this.props.navigation.goBack()
                        })
            })
            .catch(error => {
                console.log('Error on Reauthentication: ', error.message)
                if(error.code == 'auth/wrong-password') {
                    this.setState({'valid': {'current': 'Your password is incorrect.'}})
                } else {
                    Alert.alert('Error!', error.message)
                }
            })
    }
    async _processValidate() {
        let is_valid = true;
        for(var key in this.state.data) {
            await this._handleText(key, this.state.data[key])
        }
        for(var key in this.state.data) {
            if(this.state.valid[key] != '') {
                is_valid = false;
            }
        }
        return is_valid
    }
    render() {
        return (
            <View style={EditProfileScreenStyle.Container}>
                {
                    this.state.is_loading && 
                        <Spinner visible={true} textContent = {'Updating your password now...'}
                            textStyle={SystemStyle.defaultLoader}
                            color = '#fff'
                            animation = 'fade'
                            overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                }
                <ScrollView>
                    <Text style={EditProfileScreenStyle.OptionGuide}>Current Password</Text>
                    <TextInput style={EditProfileScreenStyle.ChangePassInput} secureTextEntry={true}
                        maxLength = {15}
                        onChangeText = {(text) => this._handleText('current', text)}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.txtNewPassword.focus(); }}
                        blurOnSubmit={false}/>
                    <Text style={Validation.textVal}>
                        {this.state.valid.current}</Text>
                    <Text style={EditProfileScreenStyle.OptionGuide}>New Password</Text>
                    <TextInput style={EditProfileScreenStyle.ChangePassInput} secureTextEntry={true}
                        maxLength = {15}
                        onChangeText = {(text) => this._handleText('new', text)}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.txtConfirmPassword.focus(); }}
                        blurOnSubmit={false}
                        ref={(input) => { this.txtNewPassword = input; }}/>
                    <Text style={Validation.textVal}>
                        {this.state.valid.new}</Text>
                    <Text style={EditProfileScreenStyle.OptionGuide}>Confirm Password</Text>
                    <TextInput style={EditProfileScreenStyle.ChangePassInput} secureTextEntry={true}
                        maxLength = {15}
                        onChangeText = {(text) => this._handleText('confirm', text)}
                        returnKeyType="next"
                        ref={(input) => { this.txtConfirmPassword = input; }}
                        blurOnSubmit={false}/>
                    <Text style={Validation.textVal}>
                        {this.state.valid.confirm}</Text>
                </ScrollView>
                <View>
                    <TouchableOpacity style={EditProfileScreenStyle.SaveBtn}
                        onPress = {() => { this._handleSubmit() }}>
                            <Text style={EditProfileScreenStyle.SaveTextBtn}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>  
        );
    }
}

export default {
    EditProfileScreen,
    ChangePasswordScreen
}
