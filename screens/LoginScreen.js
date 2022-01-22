import React, { Component } from 'react';
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
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons,
    FontAwesome5,
    MaterialIcons,
} from '@expo/vector-icons';

import { auth } from '../firebase';

import Index from "../styles/Index.js";
import Validation from "../styles/Validation"
import TitlePage from "../assets/img/TitlePage.png";

class LoginScreen extends Component {
    state = {
        email: {value: '', valid: ''},
        password: {value: '', valid: ''}
    }
    _handleText(key, value) {
        if(value) {
            this.setState({[key]: {'value': value}});
        } else {
            this.setState({[key]: {
                'value': false,
                'valid': 'This field is required.'
            }})
        }
    }
    _handleSubmit() {
        let is_valid = true;
        for(var key in this.state) {
            if(!this.state[key].value) {
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
                        this.setState({password: {valid: 'Your username or password is incorrect.'}})
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
                        {this.state.password.valid}</Text>  

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
    render() {
        return (
            <View style={Index.SIcontainer}>
                <View style={Index.ResetPWContent}>
                    <View  style={Index.TitleContainer}>
                        <Text style={Index.Titletxt}>Enter Your Email</Text>
                    </View>
                    <View  style={Index.InputContainer}>
                        <TextInput style={Index.Input} placeholder='Email'></TextInput>
                    </View>                  
                    <View style={Index.ResetPWContainer}>
                        <TouchableOpacity style={Index.ResetPWbtn}
                            //onPress
                        >
                            <Text style={Index.ResetPWbtntext}>Reset My Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

class ResetPasswordScreen extends Component {
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
                <TouchableOpacity style={Index.Indexbtn}
                    //onPress
                >
                    <Text style={Index.Indexbtntext}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Index.ResendPWEmailbtn}
                    //onPress
                >
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