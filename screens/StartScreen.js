import React, { Component } from 'react';
import {
  ScrollView, 
  TouchableOpacity, 
  Text, 
  View,
  Image
} from 'react-native';
import { 
  Ionicons,
} from '@expo/vector-icons';

import StartScreenStyle from "../styles/StartScreenStyle.js";
import SystemStyle from "../styles/SystemStyle.js";


class TitleScreen extends Component {
  render () {
    return (
      <View style={StartScreenStyle.Container}>
        <ScrollView>
            
        </ScrollView>
        <Image style={StartScreenStyle.FrontPic}
          source={require('../assets/img/TitlePage.png')}/>      
        <View style={StartScreenStyle.Footer}>
          <TouchableOpacity style={StartScreenStyle.LogIn}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={StartScreenStyle.LogInText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={StartScreenStyle.SignUp}
            onPress={() => this.props.navigation.navigate('ContinueScreen')}>
              <Text style={StartScreenStyle.SignUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class ContinueScreen extends Component {
  render () {
    return (
      <View style={StartScreenStyle.SigningUpContainer}>
        <ScrollView>
          <Text style={StartScreenStyle.PageGuide}>Sign up as...</Text>
          <TouchableOpacity style={StartScreenStyle.SignUpAsContainer}
            onPress={() => this.props.navigation.navigate('SignUpNameScreen', { USER_TYPE: 'INDIV' })}>
              <Ionicons name="md-person" size={23} style={StartScreenStyle.IndivIcon}/>
              <View style={StartScreenStyle.Card}>
                <Text style={StartScreenStyle.OptionTitle}>Individual</Text>
                <Text style={StartScreenStyle.OptionText}>For freelancers, Individuals who requires a quick</Text>
                <Text style={StartScreenStyle.OptionText}>social gathering, and users who wish to attend</Text>
                <Text style={StartScreenStyle.OptionText}>events</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={StartScreenStyle.SignUpAsContainerNotActive}
            onPress={() => this.props.navigation.navigate('SignUpNameScreen', { USER_TYPE: 'ORG' })}>
              <View style={StartScreenStyle.OrgIconContainer}>
                <Image style={StartScreenStyle.OrgIcon} source={require('../assets/img/Peopleorg.png')}/>
              </View>
              <View style={StartScreenStyle.Card}>
                <Text style={StartScreenStyle.OptionTitle}>Organization</Text>
                <Text style={StartScreenStyle.OptionText}>For mid-small organization, small communities,</Text>
                <Text style={StartScreenStyle.OptionText}>groups, social networks</Text>
              </View>
          </TouchableOpacity>    
        </ScrollView>
        <View style={StartScreenStyle.SignUpImgContainer}>
          <Image style={StartScreenStyle.SignUpImg} source={require('../assets/img/ContinueAs.png')}/>      
        </View>
        <View style={StartScreenStyle.LogInFooter}>
          <Text style={StartScreenStyle.LogInFooterText}>Already have an account?</Text>
          <TouchableOpacity 
            onPress={() => {
              this.props.navigation.replace('LoginScreen');
            }}>
              <Text style={StartScreenStyle.LogInFooterBtn}> Sign In</Text>
          </TouchableOpacity>
          <Text>.</Text>
        </View>
      </View>
    );
  }
}
  

export default { TitleScreen, ContinueScreen }
