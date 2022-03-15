import React, { Component } from 'react';
import {
    TextInput,
    ScrollView, 
    TouchableOpacity, 
    Text, 
    View,
    BackHandler,
    Image,
    Alert,
    SafeAreaView
} from 'react-native';
import OutlineInput from 'react-native-outline-input';
import { InputOutline, InputStandard } from 'react-native-input-outline';

import Spinner from 'react-native-loading-spinner-overlay';

import { auth } from '../firebase';

import SystemStyle from "../styles/SystemStyle";
import LogInScreenStyle from "../styles/LogInScreenStyle.js";
import Validation from "../styles/Validation"

import Properties from '../values/Properties';

import { 
    validateEmail,
} from '../helper/TextValidate';
import { borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


class LoginScreen extends Component {
    state = {
        email: {value: '', valid: ''},
        password: {value: '', valid: ''},
        submit_result: '',
        is_loading: false
    }
    componentDidMount() {
        this.txtEmail.focus();
    }
    _handleText(key, value) {
        this.setState({[key]: {'valid': false, 'value': value}});
        if(value) {
            let val_msg = ''
            if(key == 'email') {
                if(!validateEmail(value)) {
                    val_msg = 'Invalid email format.'
                }
            }
            this.setState({[key]: {'value': value, 'valid': val_msg}});
        } else {
            if(this.state.submit_result) {
                this.setState({'submit_result': ''})
            }
            this.setState({[key]: {
                'value': value,
                'valid': 'This is a required field.'
            }})
        }
    }
    async _processValidation() {
        let is_valid = true;
        for(var key in this.state) {
            if(key == 'submit_result' || key == 'is_loading') break
            await this._handleText(key, this.state[key].value)
            if(this.state[key].valid != '') {
                is_valid = false;
            }
            is_valid = is_valid && true;
        }
        return is_valid
    }
    async _processSubmit() {
        var email = this.state.email.value
        var password = this.state.password.value
            
        let user = auth.currentUser
        if(user) {
            user.reload()
        }
        await auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                let user = userCredentials.user
                if(!user.emailVerified) {
                    this.setState({'is_loading': false})
                    this.props.navigation.navigate('EmailVerificationScreen', {
                        'email': email
                    });
                    return
                }
            })
            .catch(error => {
                if(error.code == 'auth/invalid-password' ||
                    error.code == 'auth/invalid-email' ||
                    error.code == 'auth/user-not-found' ||
                    error.code == 'auth/wrong-password') {
                        this.setState({'submit_result': 'Your username or password is incorrect.'})
                } else if(error.code == 'auth/too-many-requests') {
                    this.setState({'submit_result': 'This account is currently blocked.'})
                } else {
                    Alert.alert('Error', error.message)
                }
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
    render() {
        return (
            <View style={LogInScreenStyle.Container}>
                {
                    this.state.is_loading && 
                    <Spinner visible={true} textContent={'Please wait'}
                        textStyle={SystemStyle.defaultLoader}
                        animation = 'fade'
                        overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                }
                <ScrollView>
                    <Text style={LogInScreenStyle.PageGuide}>Log In</Text>
                    
                    <SafeAreaView style={LogInScreenStyle.InputStandardContainer}>
                        <InputStandard placeholder="Email" style={LogInScreenStyle.PassiveInputColor}
                            autoCorrect = {false}
                            characterCount = {150}
                            onChangeText = {text => this._handleText('email', text)}
                            returnKeyType="next"
                            ref={(input) => { this.txtEmail = input; }}
                            onSubmitEditing={() => { this.txtPassword.focus(); }}
                            blurOnSubmit={false}
                            {...Properties.defaultInputStandard}/> 

                        {this.state.email.valid ?
                            <Text style={Validation.textVal}>
                                {this.state.email.valid}</Text>
                    : null}   
                    </SafeAreaView>
                    
                    <SafeAreaView style={LogInScreenStyle.InputStandardContainer}>
                        <InputStandard placeholder="Password" style={LogInScreenStyle.PassiveInputColor}
                            characterCount = {15}
                            secureTextEntry = {true}
                            returnKeyType="done"
                            onChangeText = {text => this._handleText('password', text)}
                            ref={(input) => { this.txtPassword = input; }}
                            {...Properties.defaultInputStandard}/> 

                        {this.state.submit_result || this.state.password.valid ? (
                            <Text style={Validation.textVal}> {this.state.submit_result ? 
                                this.state.submit_result : this.state.password.valid}</Text>  
                        ) : null}
                    </SafeAreaView>
                    
                    <TouchableOpacity
                        onPress = {() => this.props.navigation.navigate('ResetFormScreen')}>
                            <Text style={LogInScreenStyle.ForgotPasswordBtn}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={LogInScreenStyle.LogInBtn} 
                        onPress={() => { this._handleSubmit() }}>
                            <Text style={LogInScreenStyle.LogInTextBtn}> Log In</Text>
                    </TouchableOpacity>
        
                    <View style={LogInScreenStyle.LogInImgContainer}>
                        <Image style={LogInScreenStyle.LogInImg}
                            source={require('../assets/img/LogIN.png')}/>
                    </View>
                </ScrollView>
                <View style={LogInScreenStyle.SignUpFooter}>
                    <Text style={LogInScreenStyle.SignUpFooterText}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress = {() => this.props.navigation.replace('ContinueScreen')}>
                        <Text style={LogInScreenStyle.SignUpFooterBtn}> Sign Up</Text>
                    </TouchableOpacity>
                    <Text>.</Text>
                </View>
            </View>  
        );
    }
}

class ResetFormScreen extends Component {
    state = {
        email: {value: '', valid: ''},
        is_loading: false
    }
    _handleText(value) {
        if(value) {
            if(validateEmail(value)) {
                this.setState({'email': {'value': value, 'valid': ''}})
                return
            }
            this.setState({'email': {'value': false, 'valid': 'Invalid email format.'}})
        } else {
            this.setState({'email': {'value': false, 'valid': 'This is a required field.'}})
        }
    }
    _processSubmit() {
        if(this.state.email.value) {
            let email = this.state.email.value
            auth
                .sendPasswordResetEmail(email)
                .catch(error => {
                    if(error.code == 'auth/user-not-found') {
                        this.setState({'email': {'valid': 'This email is unavailable.'}})
                        return
                    } else if(error.code == 'auth/too-many-requests') {
                        Alert.alert('Reset Password', 'Please wait, we have sended you the email already.')
                        return
                    }
                    Alert.alert("Error!", error.message)
                })
                .then(() => {
                    if(!this.state.email.valid)
                        this.props.navigation.navigate('ResetPasswordScreen', {email: email})
                })
            this.setState({'is_loading': false})
            return
        }
        this.setState({'is_loading': false})
        this.setState({'email': {'valid': 'This is a required field.'}})
    }
    _handleSubmit() {
        if(this.state.email.value) this.setState({'is_loading': true})
        setTimeout(() => {
            this._processSubmit()
        }, 100);
    }

    render() {
        return (
            <View style={LogInScreenStyle.Container}>
                {
                    this.state.is_loading && 
                    <Spinner visible={true} textContent={'We\'re sending you an email now.'}
                        textStyle={SystemStyle.defaultLoader}
                        animation = 'fade'
                        overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                }
                <View style={LogInScreenStyle.ResetPWContent}>
                    <View style={LogInScreenStyle.TitleContainer}>
                        <Text style={LogInScreenStyle.TitleTxt}>Enter Your Email</Text>
                    </View>
                    <SafeAreaView style={LogInScreenStyle.InputStandardContainer}>
                        <InputStandard placeholder="Email"
                            autoCorrect = {false}
                            characterCount = {150}
                            returnKeyType="done"
                            onChangeText = {text => this._handleText(text)}
                            {...Properties.defaultInputStandard}/> 
                        </SafeAreaView>
                        {this.state.email.valid ?
                            <Text style={Validation.IndentedTextVal}>
                                {this.state.email.valid}</Text>
                        : null}
                    <View style={LogInScreenStyle.ResetPWContainer}>
                        <TouchableOpacity style={LogInScreenStyle.ResetPassBtn}
                            onPress = {() => this._handleSubmit()}>
                            <Text style={LogInScreenStyle.ResetPassTextBtn}>Reset My Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

class ResetPasswordScreen extends Component {
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
            <View style={LogInScreenStyle.ResetPassScreenContent}>
                <ScrollView>
                    <View style={LogInScreenStyle.PhoneImgContainer}>
                        <Image
                            style={LogInScreenStyle.PhoneImg}
                                source={require('../assets/img/ResendResetPWpic.png')}
                        />
                    </View>
                    <View  style={LogInScreenStyle.TitleContainer}>
                        <Text style={LogInScreenStyle.TitleTxt}>Reset Password</Text>
                    </View>
                    <View  style={LogInScreenStyle.ResetInfoContainer}>
                        <Text style={LogInScreenStyle.ResetInfoTxt}>Please check your email and follow the instructions</Text>
                        <Text style={LogInScreenStyle.ResetInfoTxt}>to reset your password. If you did not receive an</Text>
                        <Text style={LogInScreenStyle.ResetInfoTxt}>email or if it expired, you can resend one.</Text>
                    </View>
                </ScrollView>
            <View style={LogInScreenStyle.Container}>
                <TouchableOpacity style={LogInScreenStyle.ResetPassBtn}
                    onPress = {() => this.props.navigation.navigate('TitleScreen')}>
                        <Text style={LogInScreenStyle.ResetPassTextBtn}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity style={LogInScreenStyle.ResendPassEmailBtn}
                    onPress = {() => {
                            let email = this.props.route.params.email;

                            auth
                                .sendPasswordResetEmail(email)
                                .catch(error => {
                                    if(error.code == 'auth/too-many-requests') {
                                        Alert.alert('Reset Password', 'Please wait, we have sended you the email already.')
                                        return
                                    }
                                    Alert.alert("Error!", error.message)
                                })
                        }}>
                        <Text style={LogInScreenStyle.ResendPassEmailTextBtn}>Resend password reset email</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}


export default {
    LoginScreen,
    ResetFormScreen,
    ResetPasswordScreen 
}