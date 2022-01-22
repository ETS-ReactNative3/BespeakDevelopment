import React, { Component } from 'react';
import {
    TextInput,
    ScrollView, 
    TouchableOpacity, 
    Text, 
    View,
    BackHandler,
    Image,
    Alert
} from 'react-native';

import { auth } from '../firebase';

import Index from "../styles/Index.js";
import Validation from "../styles/Validation"

import { 
    validateEmail,
} from '../helper/TextValidate';

class LoginScreen extends Component {
    state = {
        email: {value: '', valid: ''},
        password: {value: '', valid: ''},
        submit_result: ''
    }
    _handleText(key, value) {
        if(value) {
            this.setState({[key]: {'value': value}});
        } else {
            if(this.state.submit_result) {
                this.setState({'submit_result': ''})
            }
            this.setState({[key]: {
                'value': false,
                'valid': 'This field is required.'
            }})
        }
    }
    _handleSubmit() {
        let is_valid = true;
        for(var key in this.state) {
            if(!this.state[key].value && key!='submit_result') {
                is_valid = false;
                this.setState({[key]: {'valid': 'This is a required field.'}})
            }
            is_valid = is_valid && true;
        }

        if(is_valid) {
            var email = this.state.email.value
            var password = this.state.password.value
            
            let user = auth.currentUser
            if(user) {
                user.reload()
            }
            auth
                .signInWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    let user = userCredentials.user
                    if(!user.emailVerified) {
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
        }
    }
    
    render() {
        return (
            <View style={Index.SIcontainer}>
                <ScrollView>
                    <Text style={Index.SItitleText}>Log In</Text>
                    <TextInput style={Index.SIinput} placeholder='Email' maxLength={150} 
                        onChangeText = {text => this._handleText('email', text)}/>
                    <Text style={Validation.textVal}>
                        {this.state.email.valid}</Text> 
        
                    <TextInput style={Index.SIinput} placeholder='Password' secureTextEntry={true}
                        maxLength = {15} onChangeText = {text => this._handleText('password', text)}/>
                    <Text style={Validation.textVal}>
                        {this.state.submit_result ? 
                            this.state.submit_result : this.state.password.valid}</Text>  
                    <TouchableOpacity
                        onPress = {() => this.props.navigation.navigate('ResetFormScreen')}>
                            <Text style={Index.SIforgotpass}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Index.SIbutton} 
                        onPress={() => { this._handleSubmit() }}>
                            <Text style={Index.SIbuttonText}> Log In</Text>
                    </TouchableOpacity>
        
                    <View style={Index.loginpicContainer}>
                        <Image style={Index.loginpic}
                            source={require('../assets/img/LogIN.png')}/>
                    </View>
                </ScrollView>
                <View style={Index.SIfooter}>
                    <Text style={Index.signup}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress = {() => this.props.navigation.replace('ContinueScreen')}>
                        <Text style={Index.signupbtn}> Sign Up</Text>
                    </TouchableOpacity>
                    <Text>.</Text>
                </View>
            </View>  
        );
    }
}

class ResetFormScreen extends Component {
    state = {
        email: {value: '', valid: ''}
    }
    _handleText(value) {
        if(value) {
            if(validateEmail(value)) {
                this.setState({'email': {'value': value, 'valid': ''}})
                return
            }
            this.setState({'email': {'value': false, 'valid': 'Invalid email format.'}})
        }
        this.setState({'email': {'value': false, 'valid': 'This is a required field.'}})
    }
    _handleSubmit() {
        if(this.state.email.value) {
            let email = this.state.email.value
            auth
                .sendPasswordResetEmail(email)
                .catch(error => {
                    if(error.message = 'auth/user-not-found') {
                        this.setState({'email': {'valid': 'This email is unavailable.'}})
                        return
                    }else if(error.code == 'auth/too-many-requests') {
                        Alert.alert('Reset Password', 'Please wait, we have sended you the email already.')
                        return
                    }
                    Alert.alert("Error!", error.message)
                })
                .then(() => {
                    if(!this.state.email.valid)
                        this.props.navigation.navigate('ResetPasswordScreen', {email: email})
                })
            return
        }
        this.setState({'email': {'valid': 'This is a required field.'}})
    }

    render() {
        return (
            <View style={Index.SIcontainer}>
                <View style={Index.ResetPWContent}>
                    <View style={Index.TitleContainer}>
                        <Text style={Index.Titletxt}>Enter Your Email</Text>
                    </View>
                    <View style={Index.InputContainer}>
                        <TextInput style={Index.Input} placeholder='Email'
                            onChangeText = {text => this._handleText(text)}/>
                        <Text style={Validation.textVal}>
                            {this.state.email.valid}</Text> 
                    </View>                  
                    <View style={Index.ResetPWContainer}>
                        <TouchableOpacity style={Index.ResetPWbtn}
                            onPress = {() => this._handleSubmit()}>
                            <Text style={Index.ResetPWbtntext}>Reset My Password</Text>
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
            <View style={Index.Content}>
                <ScrollView>
                    <View style={Index.PhonepicContainer}>
                        <Image
                            style={Index.Phonepic}
                                source={require('../assets/img/ResendResetPWpic.png')}
                        />
                    </View>
                    <View  style={Index.TitleContainer}>
                        <Text style={Index.Titletxt}>Reset Password</Text>
                    </View>
                    <View  style={Index.ResetInfoContainer}>
                        <Text style={Index.ResetInfotxt}>Please check your email and follow the instructions</Text>
                        <Text style={Index.ResetInfotxt}>to reset your password. If you did not receive an</Text>
                        <Text style={Index.ResetInfotxt}>email or if it expired, you can resend one.</Text>
                    </View>
                </ScrollView>
            <View style={Index.IndexContainer}>
                <TouchableOpacity style={Index.ResetPWbtn}
                    onPress = {() => this.props.navigation.navigate('TitleScreen')}>
                        <Text style={Index.ResetPWbtntext}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Index.ResendPWEmailbtn}
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
                        <Text style={Index.ResendPWEmailbtntext}>Resend password reset email</Text>
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