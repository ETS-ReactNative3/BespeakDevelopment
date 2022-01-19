import React, {
  useState,
  Component
} from 'react';
import {
  TextInput,
  ScrollView, 
  TouchableOpacity, 
  Text, 
  View,
  Image,
  StyleSheet,
  Document,
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

import SignUp from "../styles/SignUp";

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
    render () {
        return (
            <View style={SignUp.SUcontainer}>
                <ScrollView>
                    <Text style={SignUp.SUtitleText}>Almost There...</Text>
                    <Text style={SignUp.SUAltText}>We need additional details to get to know you</Text>
                    <TextInput style={SignUp.SIinput} placeholder='Email' defaultValue = {this.props.route.params.l_name}/>
                    <TextInput style={SignUp.SIinput} placeholder='(+63)'/>
                    <TextInput style={SignUp.SIinput} placeholder='Password' secureTextEntry={true}/>
                    <TextInput style={SignUp.SIinput} placeholder='Confirm Password' secureTextEntry={true}/>
                    
                    <View style={{alignSelf:'center'}}>
                        <Text style={SignUp.altText}>By clicking the button below, you agree to our</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <TouchableOpacity>
                            <Text style={SignUp.btnText}>Terms</Text>
                        </TouchableOpacity>
                        <Text style={SignUp.andText}> and </Text>
                        <TouchableOpacity>
                            <Text style={SignUp.btnText}>Data Policy</Text>
                        </TouchableOpacity>
                        <Text style={SignUp.andText}>.</Text>
                    </View>
                    
                    <TouchableOpacity style={SignUp.continuebtn}
                        onPress={() => navigation.navigate('SignUp')}>
                            <Text style={SignUp.continuebtntext}>I'm done!</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={SignUp.AlmostTherepicContainer}>
                    <Image style={SignUp.AlmostTherepic}
                        source={require('../assets/img/AlmostThere.png')}/>
                </View>
            </View>
        );
    }
}

export default { SignUpNameScreen, SignUpFormScreen }