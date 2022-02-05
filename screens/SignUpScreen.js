import React, { Component } from 'react';
import {
  ScrollView, 
  TouchableOpacity, 
  Text, 
  View,
  Image,
  BackHandler,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { InputOutline, InputStandard } from 'react-native-input-outline';
import Spinner from 'react-native-loading-spinner-overlay';

import { auth, db } from '../firebase';

import SystemStyle from "../styles/SystemStyle";
import SignUpStyle from "../styles/SignUpStyle";
import Validation from '../styles/Validation';

import Properties from '../values/Properties';


import { 
    validateEmail,
    validateMobile,
    validatePassword
} from '../helper/TextValidate';
import { Messages } from '../values/Messages'

import SignUpNameForm from '../components/SignUpForm';

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
        this._handleSubmit = this._handleSubmit.bind(this)
    }
    
    _handleTextValue(key, value) {
        this.setState({[key]: value});
    }

    _handleSubmit() {
        let params = []
        if(this.user_type == 'INDIV') {
            params = {
                user_type: this.user_type,
                l_name: this.state.l_name,
                f_name: this.state.f_name,
            }
        } else {
            params = {
                org_name: this.state.org_name,
                user_type: this.user_type
            }
        }
        this.props.navigation.navigate('SignUpFormScreen', params);
    }
    
    render () {
        return (
            <View style={SignUpStyle.Container}>
                <ScrollView>
                    <Text style={SignUpStyle.PageGuide}>Let's Get Started!</Text>
                    <Text style={SignUpStyle.GuideText}>Share & see what's happening near you</Text>
                    <SignUpNameForm USER_TYPE = {this.user_type} 
                        handleTextValue={this._handleTextValue}
                        handleParentSubmit={this._handleSubmit}/> 
                    <View style={SignUpStyle.LetsGetStartedImgContainer}>
                        <Image style={SignUpStyle.LetsGetStartedImg}
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
        confirm: {value: '', valid: ''},
        is_loading: false
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
                    .catch(error => {
                        if(error.code != 'auth/too-many-requests') Alert.alert("Error!", error.message)
                    })
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
    async _processValidation() {
        let is_valid = true;
        for(var key in this.state) {
            if(key != 'is_loading') {
                await this._handleText(key, this.state[key].value)
            }
        }
        for(var key in this.state) {
            if(this.state[key].valid != '' &&
                key != 'is_loading') {
                is_valid = false;
            }
            is_valid = is_valid && true;
        }
        return is_valid
    }
    async _processSubmit() {
        let email = this.state.email.value;
        let password = this.state.password.value;

        let user = null;
        await auth
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
                    this.setState({'is_loading': false})
                    return
                }
                        
                user = userCredentials.user;
                
                var data = this.props.route.params;
                data.mobile = this.state.mobile.value;
                db
                    .collection('user_info')
                    .doc(user.uid)
                    .set({
                        ...data
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
            this.setState({'is_loading': false})
    }
    async _handleSubmit() {
        let is_validated = await this._processValidation();
        if(is_validated) {
            this.setState({'is_loading': true})
            setTimeout(() => {
                this._processSubmit()
            }, 100);
        }
    }
    render () {
        return (
            <View style={SignUpStyle.Container}>
                {
                    this.state.is_loading && 
                    <Spinner visible={true} textContent={'We\'re setting your account now.'}
                        textStyle={SystemStyle.defaultLoader}
                        animation = 'fade'
                        overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                }
                <KeyboardAvoidingView>
                    <ScrollView>
                        <Text style={SignUpStyle.PageGuide}>Almost There...</Text>
                        <Text style={SignUpStyle.GuideText}>We need additional details to get to know you</Text>                        
                        <SafeAreaView style={SignUpStyle.InputOutlineContainer}>
                        <InputOutline placeholder="Email"
                            maxLength={150}
                            value = {this.state.email.value}
                            onChangeText = {text => this._handleText('email', text)}
                        {...Properties.defaultInputOutline}/> 
                        </SafeAreaView>
                        {this.state.email.valid ?
                            <Text style={Validation.textVal}>
                                {this.state.email.valid}</Text>
                        : null}
                        <SafeAreaView style={SignUpStyle.InputOutlineContainer}>
                        <InputOutline placeholder="(+63)"
                            maxLength={15}
                            value = {this.state.mobile.value}
                            onChangeText = {text => this._handleText('mobile', text)}
                        {...Properties.defaultInputOutline}/> 
                        </SafeAreaView>
                        {this.state.mobile.valid ?
                            <Text style={Validation.textVal}>
                                {this.state.mobile.valid}</Text>
                        : null}
                        <SafeAreaView style={SignUpStyle.InputOutlineContainer}>
                        <InputOutline placeholder="Password"
                            maxLength={15}
                            value = {this.state.password.value}
                            onChangeText = {text => this._handleText('password', text)}
                            secureTextEntry={true}
                        {...Properties.defaultInputOutline}/> 
                        </SafeAreaView>  
                        {this.state.password.valid ?
                            <Text style={Validation.textVal}>
                                {this.state.password.valid}</Text>
                        : null}
                        <SafeAreaView style={SignUpStyle.InputOutlineContainer}>
                        <InputOutline placeholder="Confirm Password"
                            maxLength={15}
                            value = {this.state.confirm.value}
                            onChangeText = {text => this._handleText('confirm', text)}
                            secureTextEntry={true}
                        {...Properties.defaultInputOutline}/> 
                        </SafeAreaView>
                        {this.state.confirm.valid ?
                            <Text style={Validation.textVal}>
                                {this.state.confirm.valid}</Text>
                        : null}  
                        <View style={SignUpStyle.Container}>
                            <Text style={SignUpStyle.GreyText}>By clicking the button below, you agree to our</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity 
                                onPress = {() => Alert.alert("Terms of Service", Messages.terms)}>
                                    <Text style={SignUpStyle.TextBtn}>Terms</Text>
                            </TouchableOpacity>
                            <Text style={SignUpStyle.GreyText}> and </Text>
                            <TouchableOpacity
                                onPress = {() => Alert.alert("Data Policy", Messages.policy)}>
                                    <Text style={SignUpStyle.TextBtn}>Data Policy</Text>
                            </TouchableOpacity>
                            <Text style={SignUpStyle.GreyText}>.</Text>
                        </View>
                        
                        <TouchableOpacity style={SignUpStyle.ContinueBtn}
                            onPress={() => this._handleSubmit()}>
                                <Text style={SignUpStyle.ContinueTextBtn}>I'm done!</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={SignUpStyle.AlmostThereImgContainer}>
                        <Image style={SignUpStyle.AlmostThereImg}
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
            <View style={SignUpStyle.Container}>
                <View style={SignUpStyle.TicketContainer}>
                    <View style={SignUpStyle.Content}>
                        <View style={SignUpStyle.VerifyEmailImgContainer}>
                            <Image style={SignUpStyle.VerifyEmailImg}
                                source={require('../assets/img/VerifyEmail.png')}/>
                        </View>
                        <View  style={SignUpStyle.MessageContent}>
                            <Text style={SignUpStyle.ContentTitle}>Verify by Email</Text>
                            <Text style={SignUpStyle.ContentInfo}>Please check your email {this.props.route.params.email} and follow the instructions
                            to verify your account. If you did not receive an email or if it expired, you can resend one.</Text>
                        </View>
                    </View>
                    <View style={SignUpStyle.LowerContainer}>
                        <TouchableOpacity style={SignUpStyle.DoneBtn}
                            onPress={() => {
                                    auth.signOut(); // #TODO: Error Message Shown 'No User Currently Signed In'
                                    this.props.navigation.navigate('TitleScreen')
                                }}>
                            <Text style={SignUpStyle.DoneTextBtn}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={SignUpStyle.ResendBtn}
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
                            <Text style={SignUpStyle.ResendTextBtn}>Resend my Verification Email</Text>
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