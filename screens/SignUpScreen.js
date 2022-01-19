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
  Document
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
    constructor (props) {
        super(props);
        this.user_type = props.route.params.USER_TYPE
    }
    render () {
        return (
            <View style={SignUp.SIcontainer}>
                <ScrollView>
                <Text style={SignUp.SItitleText}>Let's Get Started!</Text>
                <Text style={SignUp.SUAltText}>Share & see what's happening near you</Text>
                <SignUpNameFields USER_TYPE = {this.user_type}/> 
                    <View style={{}}>
                        <TouchableOpacity style={SignUp.continuebtn}
                            onPress={() => navigation.navigate('SecondForm')}>
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
                    <TextInput style={SignUp.SIinput} placeholder='Email'/>
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