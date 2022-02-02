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
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'react-native-image-crop-picker';

import { auth, db, storage, _auth } from '../firebase';

import ChangePass from "../styles/ChangePass";
import SystemStyle from "../styles/SystemStyle";
import homeStyles from "../styles/homeStyles";
import Validation from '../styles/Validation';

import { 
    validateName, 
    validateOrgName,
    validateMobile,
    validatePassword
} from '../helper/TextValidate';

class EditProfileScreen extends Component {
    state = {
        user: auth.currentUser,
        data: {},
        valid: {},
        profile_photo: {uri: '', hasChange: false},
        cover_photo: {uri: '', hasChange: false},
        is_loading: false
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
        var raw_data = snapshot.data()
        this.setState({'data': raw_data})

        let profile_image = null
        let cover_image = null
        
        await storage.ref(`/users/${uid}/profile`)
        .getDownloadURL()
        .then((url) => { 
            profile_image = url
            console.log("User's Profile Photo: ", url)
        }).catch((error) => {
            if(error.code != 'storage/object-not-found') {
                console.log("Error occured: ", error.code)
                Alert.alert('Error!', error.message)
            }
        })

        await storage.ref(`/users/${uid}/cover`)
        .getDownloadURL()
        .then((url) => { 
            cover_image = url
            console.log("User's Cover Photo: ", url)
        }).catch((error) => {
            if(error.code != 'storage/object-not-found') {
                console.log("Error occured: ", error.code)
                Alert.alert('Error!', error.message)
            }
        })

        this.setState({'profile_photo': {
            'uri': profile_image,
            'hasChange': false
        }})
        this.setState({'cover_photo': {
            'uri': cover_image,
            'hasChange': false
        }})

        this.setState({'is_loading': false})
    }
    componentDidMount() {
        this.setState({'is_loading': true})
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => this._handleSubmit()}>
                    <Text style={homeStyles.tabSave}>Save</Text>
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
                    'uri': images.path,
                    'hasChange': true
                }})
            } else {
                this.setState({'cover_photo': {
                    'uri': images.path,
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
        await db
            .collection('user_info')
            .doc(this.state.user.uid)
            .update({
                ...this.state.data
            })
            .catch(error => {
                Alert.alert('Error!', error.message)
                return
            }) 
            .then(async () => {
                if (this.state.profile_photo.hasChange) {
                    await this._uploadToStorage(this.state.profile_photo.uri, `/users/${this.state.user.uid}/profile`)
                }
                if (this.state.cover_photo.hasChange) {
                    await this._uploadToStorage(this.state.cover_photo.uri, `/users/${this.state.user.uid}/cover`)
                }

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
            Alert.alert('Error!', e)
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

        console.log('Data State: ', this.state.data)
        console.log('Valid State: ', this.state.valid)
    }
    render() {
        return (
            <View style={homeStyles.detailsScreencontainer}>
                {
                    this.state.is_loading && 
                        <Spinner visible={true} 
                        textStyle={SystemStyle.whiteLoader}
                        color = '#fff'
                        animation = 'fade'
                        overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                }
                <TouchableOpacity onPress = {() => this._selectImage("cover")}>
                    <View style={homeStyles.editprofilecoverimgContainer}>
                            <Feather name="plus" size={50} style={homeStyles.editcoverimg}/>
                            <Image style={homeStyles.editprofilecoverimg}
                                source={
                                    this.state.cover_photo.uri ?
                                    {uri: this.state.cover_photo.uri}:
                                    require('../assets/img/blank-cover.png')
                                }/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this._selectImage("dp")}>
                    <View style={homeStyles.firstSection}>
                        <View style={homeStyles.editprofileimgContainer}>
                            <Feather name="plus" size={50} style={homeStyles.editimg}/>
                            <Image style={homeStyles.editprofileimg}
                                source={
                                    this.state.profile_photo.uri ?
                                    {uri: this.state.profile_photo.uri}:
                                    require('../assets/img/blank-profile.png')
                                }/>
                        </View>
                    </View>
                </TouchableOpacity>
                <ScrollView>
                    {this.state.data.user_type == 'INDIV' ? (
                        <>
                            <Text style={homeStyles.Info}>First Name</Text>
                            <TextInput style={homeStyles.Profileinput} maxLength={26}
                                value={this.state.data.f_name}
                                placeholder={this.state.data.f_name}
                                onChangeText = {text => this._handleText('f_name', text)}/>
                            <Text style={Validation.textVal}>
                                {this.state.valid.f_name}</Text>
                            <Text style={homeStyles.Info}>Last Name</Text>
                            <TextInput style={homeStyles.Profileinput} maxLength={26}
                                value={this.state.data.l_name}
                                placeholder={this.state.data.l_name}
                                onChangeText = {text => this._handleText('l_name', text)}/>
                            <Text style={Validation.textVal}>
                                {this.state.valid.l_name}</Text>
                        </>
                    ) : (
                        <>
                            <Text style={homeStyles.Info}>Organization Name</Text>
                            <TextInput style={homeStyles.Profileinput} maxLength={46}
                                value={this.state.data.org_name}
                                placeholder={this.state.data.org_name}
                                onChangeText = {text => this._handleText('org_name', text)}/>
                            <Text style={Validation.textVal}>
                                {this.state.valid.org_name}</Text>
                        </>
                    )}
                    <Text style={homeStyles.Info}>Bio</Text>
                    <TextInput style={homeStyles.Profileinput} maxLength={300}
                        value={this.state.data.bio}
                        placeholder={this.state.data.bio}
                        onChangeText = {text => this._handleText('bio', text)}/>
                    <Text style={homeStyles.Info}>Location</Text>
                    <TextInput style={homeStyles.Profileinput} maxLength={64}
                        value={this.state.data.location}
                        placeholder={this.state.data.location}
                        onChangeText = {text => this._handleText('location', text)}/>
                    <Text style={homeStyles.Info}>Phone Number</Text>
                    <TextInput style={homeStyles.Profileinput} maxLength={15}
                        value={this.state.data.mobile}
                        placeholder={this.state.data.mobile}
                        onChangeText = {text => this._handleText('mobile', text)}/>
                    <Text style={Validation.textVal}>
                            {this.state.valid.mobile}</Text>
                    <TouchableOpacity style={homeStyles.changepw}
                        onPress = {() => { this.props.navigation.navigate('ChangePasswordScreen') }}>
                        <Text style={homeStyles.changepwtxt}> Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={homeStyles.signout}
                        onPress = {() => { auth.signOut() }}>
                        <Text style={homeStyles.signouttxt}> Log Out</Text>
                    </TouchableOpacity>
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
            <View style={ChangePass.SIcontainer}>
                {
                    this.state.is_loading && 
                        <Spinner visible={true} textContent = {'Updating your password now...'}
                            textStyle={SystemStyle.defaultLoader}
                            color = '#fff'
                            animation = 'fade'
                            overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                }
                <ScrollView>
                    <Text style={ChangePass.SUAltText}>Current Password</Text>
                    <TextInput style={ChangePass.SIinput} secureTextEntry={true}
                        maxLength = {15}
                        onChangeText = {(text) => this._handleText('current', text)}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.txtNewPassword.focus(); }}
                        blurOnSubmit={false}/>
                    <Text style={Validation.textVal}>
                        {this.state.valid.current}</Text>
                    <Text style={ChangePass.SUAltText}>New Password</Text>
                    <TextInput style={ChangePass.SIinput} secureTextEntry={true}
                        maxLength = {15}
                        onChangeText = {(text) => this._handleText('new', text)}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.txtConfirmPassword.focus(); }}
                        blurOnSubmit={false}
                        ref={(input) => { this.txtNewPassword = input; }}/>
                    <Text style={Validation.textVal}>
                        {this.state.valid.new}</Text>
                    <Text style={ChangePass.SUAltText}>Confirm Password</Text>
                    <TextInput style={ChangePass.SIinput} secureTextEntry={true}
                        maxLength = {15}
                        onChangeText = {(text) => this._handleText('confirm', text)}
                        returnKeyType="next"
                        ref={(input) => { this.txtConfirmPassword = input; }}
                        blurOnSubmit={false}/>
                    <Text style={Validation.textVal}>
                        {this.state.valid.confirm}</Text>
                </ScrollView>
                <View>
                    <TouchableOpacity style={ChangePass.continuebtn}
                        onPress = {() => { this._handleSubmit() }}>
                            <Text style={ChangePass.continuebtntext}>Save</Text>
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
