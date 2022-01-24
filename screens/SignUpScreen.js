import React, { Component } from 'react';
import {
  TextInput,
  ScrollView, 
  TouchableOpacity, 
  Text, 
  View,
  Image,
  BackHandler,
  Alert,
  KeyboardAvoidingView
} from 'react-native';

import { auth, db } from '../firebase';

import SignUp from "../styles/SignUp";
import Validation from '../styles/Validation';
import EmailVerification from "../styles/EmailVerification.js";

import { 
    validateEmail,
    validateMobile,
    validatePassword
} from '../helper/TextValidate';
import { Messages } from '../values/Messages'

import SignUpNameFields from '../components/SignUpNameFields';

class SignUpNameScreen extends Component {
    state = {
        l_name: '',
        f_name: '',
        org_name: '',
    }
    constructor (props) {
        super(props);
        this.user_type = props.route.params.USER_TYPE
        this._handleTextValue = this._handleTextValue.bind(this)
    }
    
    _handleTextValue(key, value) {
        this.setState({[key]: value});
    }

    _handleSubmit() {
        let params = {
            USER_TYPE: this.user_type,
            l_name: this.state.l_name,
            f_name: this.state.f_name,
            org_name: this.state.org_name
        }
        if(!(this.state.l_name && this.state.f_name) && !(this.state.org_name)) {
            return
        } 
        this.props.navigation.navigate('SignUpFormScreen', params);
    }
    
    render () {
        return (
            <View style={SignUp.SIcontainer}>
                <ScrollView>
                    <Text style={SignUp.SItitleText}>Let's Get Started!</Text>
                    <Text style={SignUp.SUAltText}>Share & see what's happening near you</Text>
                    <SignUpNameFields USER_TYPE = {this.user_type} handleTextValue={this._handleTextValue}/> 
                    <View style={{}}>
                        <TouchableOpacity style={SignUp.continuebtn}
                            onPress={() => this._handleSubmit()}>
                                <Text style={SignUp.continuebtntext}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={SignUp.LetsGetStartedpicContainer}>
                        <Image style={SignUp.loginpic}
                            source={require('../assets/img/LetsGetStarted.png')}/>
                    </View>
                </ScrollView>
            </View>  
        );
    }
}

class SignUpFormScreen extends Component {
    state = {
        email: {value: '', valid: ''},
        mobile: {value: '', valid: ''},
        password: {value: '', valid: ''},
        confirm: {value: '', valid: ''}
    }
    _handleText(key, value) {
        let val_msg = 'This is a required field.'
        this.setState({[key]: {'valid': '', 'value': value}})
        if(key == 'email') {
            if(validateEmail(value)) {
                auth
                    .fetchSignInMethodsForEmail(value)
                    .then(result => {
                        if(result.length > 0) {
                            val_msg = 'This email is unavailable.';
                            this.setState({[key]: {'valid': val_msg, 'value': value}})
                        }
                    })
                    .catch(error => Alert.alert(error.message))
            } else {
                if(value) {
                    val_msg = 'Invalid email format.';
                }
                this.setState({[key]: {'valid': val_msg, 'value': value}})
            }
        } else if(key == 'mobile') {
            if(!validateMobile(value)) {
                if(value) {
                    val_msg = 'Invalid mobile number format.';
                }
                this.setState({[key]: {'valid': val_msg, 'value': value}})
            } 
        } else if(key == 'password'){
            if(!validatePassword(value)) {
                if(value) {
                    val_msg = 'Your password is too weak.';
                }
                this.setState({[key]: {'valid': val_msg, 'value': value}})
            } 
            this.setState({'confirm': {'valid': '', 'value': this.state.confirm.value}})
            if(value != this.state.confirm.value) {
                val_msg = 'Your password does not match.';
                this.setState({'confirm': {'valid': val_msg, 'value': this.state.confirm.value}})
            } 
            // # TODO: Optimized Implementation
        } else if(key == 'confirm'){
            if(value != this.state.password.value ||
                    this.state.password.value == '') {
                if(value) {
                    val_msg = 'Your password does not match.';
                }
                this.setState({[key]: {'valid': val_msg, 'value': value}})
            } 
        }
    }
    _handleSubmit() {
        let is_valid = true;
        for(var key in this.state) {
            this._handleText(key, this.state[key].value)
        }
        for(var key in this.state) {
            if(this.state[key].valid != '') {
                is_valid = false;
            }
            is_valid = is_valid && true;
        }

        if(!is_valid) {
            return
        }

        let email = this.state.email.value;
        let password = this.state.password.value;

        let user = null;
        auth
            .createUserWithEmailAndPassword(email, password)
            .catch(error => {
                if(error.code == 'auth/email-already-exists' ||
                    error.code == 'auth/email-already-in-use' ||
                    error.code == 'auth/invalid-email') {
                        this.setState({'email': {'valid': 'This email is unavailable.'}})
                            return
                        }
                        Alert.alert('Error!', error.message)
                        return
                    })
            .then(userCredentials => {
                if(!userCredentials) {
                    return
                }
                        
                user = userCredentials.user;
                        
                db
                    .collection('user_info')
                    .add({
                        uid: user.uid,
                        first_name: this.props.route.params.f_name,
                        last_name: this.props.route.params.l_name,
                        mobile: this.state.mobile.value,
                        org_name: this.props.route.params.org_name
                    })
                    .catch(error => {
                        Alert.alert('Error!', error.message)
                        return
                    }) 
                    .then(() => {
                        let displayName = this.props.route.params.f_name ? 
                        this.props.route.params.f_name : this.props.route.params.org_name
                        user.updateProfile({
                            displayName: displayName,
                        })
                        .catch(error => {
                            Alert.alert('Error!', error.message)
                            return
                        })
                        .then(function() {
                            user.sendEmailVerification()
                                .catch(error => {
                                    if(error.code == 'auth/too-many-requests') {
                                        Alert.alert('Email Verification', 'Please wait, we have sended you the email already.')
                                        return
                                    }
                                    Alert.alert('Error!', error.message)
                                });
                        });
                            this.props.navigation.navigate('EmailVerificationScreen', {
                                'email': email
                            });
                        }) 
                })
    }
    render () {
        return (
            <View style={SignUp.SUcontainer}>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <Text style={SignUp.SUtitleText}>Almost There...</Text>
                        <Text style={SignUp.SUAltText}>We need additional details to get to know you</Text>
                        <TextInput style={SignUp.SIinput} placeholder='Email' maxLength={150} 
                            onChangeText = {text => this._handleText('email', text)}/>
                        <Text style={Validation.textVal}>
                            {this.state.email.valid}</Text>   
                        <TextInput style={SignUp.SIinput} placeholder='(+63)' maxLength={15}
                            onChangeText = {text => this._handleText('mobile', text)}/>
                            <Text style={Validation.textVal}>
                                {this.state.mobile.valid}</Text>  
                        <TextInput style={SignUp.SIinput} placeholder='Password' secureTextEntry={true}
                            maxLength = {15}
                            onChangeText = {text => this._handleText('password', text)}/>
                            <Text style={Validation.textVal}>
                                {this.state.password.valid}</Text>  
                        <TextInput style={SignUp.SIinput} placeholder='Confirm Password' secureTextEntry={true}
                            maxLength = {15}
                            onChangeText = {text => this._handleText('confirm', text)}/>
                            <Text style={Validation.textVal}>
                                {this.state.confirm.valid}</Text>  
                        
                        <View style={{alignSelf:'center'}}>
                            <Text style={SignUp.altText}>By clicking the button below, you agree to our</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity onPress = {
                                () => Alert.alert("Terms of Service", Messages.terms)
                            }>
                                <Text style={SignUp.btnText}>Terms</Text>
                            </TouchableOpacity>
                            <Text style={SignUp.andText}> and </Text>
                            <TouchableOpacity>
                                <Text style={SignUp.btnText}>Data Policy</Text>
                            </TouchableOpacity>
                            <Text style={SignUp.andText}>.</Text>
                        </View>
                        
                        <TouchableOpacity style={SignUp.continuebtn}
                            onPress={() => this._handleSubmit()}>
                                <Text style={SignUp.continuebtntext}>I'm done!</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={SignUp.AlmostTherepicContainer}>
                        <Image style={SignUp.AlmostTherepic}
                            source={require('../assets/img/AlmostThere.png')}/>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

class EmailVerificationScreen extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton() {
        return true;
    }
    render() {
        return (
            <View style={EmailVerification.SIcontainer}>
                <View style={EmailVerification.TicketContent}>
                    <View style={EmailVerification.YourTicket}>
                        <View style={EmailVerification.SampleQRpicContainer}>
                            <Image style={EmailVerification.SampleQRpic}
                                source={require('../assets/img/VerifyEmail.png')}/>
                        </View>
                        <View  style={EmailVerification.YourTicketContent}>
                            <Text style={EmailVerification.NameOnTicketWhite}>Verify by Email</Text>
                            <Text style={EmailVerification.DateRegisteredWhite}>Please check your email {this.props.route.params.email} and follow the instructions
                            to verify your account. If you did not receive an email or if it expired, you can resend one.</Text>
                        </View>
                    </View>
                    <View style={EmailVerification.doneContainer}>
                        <TouchableOpacity style={EmailVerification.donebtn}
                            onPress={() => {
                                auth.signOut();
                                this.props.navigation.navigate('TitleScreen')
                                }}>
                            <Text style={EmailVerification.donebtntext}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={EmailVerification.changebtn}
                            onPress={() => {
                                auth.currentUser.sendEmailVerification()
                                        .catch(error => {
                                            if(error.code == 'auth/too-many-requests') {
                                                Alert.alert('Email Verification', 'Please wait, we have sended you the email already.')
                                                return
                                            }
                                            Alert.alert("Error", error.message)
                                        })
                                return
                                    }}>
                            <Text style={EmailVerification.changebtntext}>Resend my Verification Email</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default { 
    SignUpNameScreen, 
    SignUpFormScreen,
    EmailVerificationScreen
}