import React, { Component } from 'react';
import {
  ScrollView, 
  TouchableOpacity, 
  Text, 
  View,
  Image
} from 'react-native';
import Index from "../styles/Index.js";
import { 
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';

class TitleScreen extends Component {
  render () {
    return (
      <View style={Index.container}>
        <ScrollView>
            
        </ScrollView>
        <Image style={Index.frontpic}
          source={require('../assets/img/TitlePage.png')}/>      
        <View style={Index.footer}>
          <TouchableOpacity style={Index.button}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={Index.buttonText}>Log In</Text>
          </TouchableOpacity>
          <Text>{'\n'}</Text>
          <TouchableOpacity style={Index.button2}
            onPress={() => this.props.navigation.navigate('ContinueScreen')}>
              <Text style={Index.buttonText2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class ContinueScreen extends Component {
  render () {
    return (
      <View style={Index.SUcontainer}>
        <ScrollView>
          <Text style={Index.SUtitleText}>Sign up as...</Text>
          <TouchableOpacity style={Index.ContinueAsbtncontainer}
            onPress={() => this.props.navigation.navigate('SignUpNameScreen', { USER_TYPE: 'INDIV' })}>
              <Ionicons name="md-person" size={23} style={Index.IndivIcon}/>
              <View style={Index.IndivCard}>
                <Text style={Index.IndivTitle}>Individual</Text>
                <Text style={Index.IndivText}>For freelancers, Individuals who requires a quick</Text>
                <Text style={Index.IndivText}>social gathering, and users who wish to attend</Text>
                <Text style={Index.IndivText}>events</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={Index.ContinueAsbtncontainerNotActive}
            onPress={() => this.props.navigation.navigate('SignUpNameScreen', { USER_TYPE: 'ORG' })}>
              <View style={Index.OrgIconContainer}>
                <Image style={Index.OrgIcon} source={require('../assets/img/Peopleorg.png')}/>
              </View>
              <View style={Index.IndivCard}>
                <Text style={Index.IndivTitle}>Organization</Text>
                <Text style={Index.IndivText}>For mid-small organization, small communities,</Text>
                <Text style={Index.IndivText}>groups, social networks</Text>
              </View>
          </TouchableOpacity>    
        </ScrollView>
        <View style={Index.capicContainer}>
          <Image style={Index.capic} source={require('../assets/img/ContinueAs.png')}/>      
        </View>
        <View style={Index.SUfooter}>
          <Text style={Index.signin}>Already have an account?</Text>
          <TouchableOpacity 
            onPress={() => {
              this.props.navigation.replace('LoginScreen');
            }}>
              <Text style={Index.signupbtn}> Sign In</Text>
          </TouchableOpacity>
          <Text>.</Text>
        </View>
      </View>
    );
  }
}
  

export default { TitleScreen, ContinueScreen }
