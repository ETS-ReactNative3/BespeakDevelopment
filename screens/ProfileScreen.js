import React, { Component } from "react";
import {
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  Text, 
  View,
  Image,
  Alert,
  SafeAreaView, RefreshControl
} from 'react-native';
import { 
  Feather,
  Ionicons,
  SimpleLineIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { auth, db, storage } from '../firebase';

import SystemStyle from "../styles/SystemStyle";
import homeStyles from "../styles/homeStyles";

import ProfileContent from "../components/ProfileContent";
  
class ProfileScreen extends Component {
  state = {
    user: auth.currentUser,
    data: {},
    is_loading: true,
    refreshing: false
  }
  constructor() {
    super()
    this.onRefresh = this.onRefresh.bind(this)
  }
  async _loadUserData() {
    var uid = this.state.user.uid;
    console.log('User ID: ' + uid);

    const user_info = db.collection("user_info")
    const query = user_info.doc(uid)
    const snapshot = await query.get()

    if(snapshot.empty) {
      console.log('No data found for user: ', uid);
      return;
    } 

    var raw_data = snapshot.data()

    var profile_name = ''
    let profile_image = null
    let cover_image = null

    if(raw_data.user_type == "INDIV") {
      profile_name = raw_data.f_name 
        + ' ' + raw_data.l_name;
    } else {
      profile_name = raw_data.org_name
    }

    await storage.ref(`/users/${uid}/profile`)
      .getDownloadURL()
      .then((url) => { 
        profile_image = url
        console.log("User's Profile Photo: ", url)
      }).catch((error) => {
        if(error.code == '[storage/object-not-found]') {
          return;
        }
        Alert.alert('Error!', error)
      })

    await storage.ref(`/users/${uid}/cover`)
      .getDownloadURL()
      .then((url) => { 
        cover_image = url
        console.log("User's Cover Photo: ", url)
      }).catch((error) => {
        if(error.code == '[storage/object-not-found]') {
          return;
        }
        Alert.alert('Error!', error)
      })
    
    this.setState({'data': {
      'profile_name': profile_name,
      'profile_photo': profile_image,
      'cover_photo': cover_image,
      ...raw_data
    }})
    console.log('Profile Name: ', this.state.data.profile_name)
    this.setState({'is_loading': false})
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this._loadUserData()
    });

    this._loadUserData()
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  doRefresh() {
    return new Promise((resolve) => {
      this._loadUserData()
      setTimeout(resolve, 1000)
    });
  }
  async onRefresh() {
    console.log("Refreshing...")
    this.setState({'refreshing': true})
    await this.doRefresh().then(() => this.setState({'refreshing': false}))
    console.log("Refreshed.")
  }

  render() {
    return (
      <>
        <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}/>
            }>
              <View style={homeStyles.uHcontainer}>
              {
                this.state.is_loading && 
                  <Spinner visible={true} 
                    textStyle={SystemStyle.whiteLoader}
                    color = '#eb9834'
                    animation = 'fade'
                    overlayColor = 'rgba(0, 0, 0, 0.50)'/>
              }
              <View style={homeStyles.Profileheader}/>
              <View style={homeStyles.profilecoverimgContainer}>
                <Image style={homeStyles.profilecoverimg}
                  key = {this.state.data.cover_photo}
                  source={
                    this.state.data.cover_photo ?
                    {uri: this.state.data.cover_photo}:
                    require('../assets/img/blank-cover.png')
                  }/>
              </View>
              <View style={homeStyles.firstSection}>
                <View style={homeStyles.profileimgContainer}>
                  <Image style={homeStyles.profileimg}
                    key = {this.state.data.profile_photo}
                    source={
                      this.state.data.profile_photo ?
                      {uri: this.state.data.profile_photo}:
                      require('../assets/img/blank-profile.png')
                    }/>
                </View>
                <View>
                  <TouchableOpacity style={homeStyles.EditProfile}
                    onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
                      <Text style={homeStyles.EditProfileText}>Edit Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={homeStyles.secondSection}>
                <Text style={homeStyles.ProfileName}>
                  {
                    this.state.data.profile_name
                  }
                </Text>
                {
                  this.state.data.bio ? (
                    <Text style={homeStyles.ProfileBio}>
                      {
                        this.state.data.bio
                      }
                    </Text>
                  ) : null
                }
                { this.state.data.location ? (
                  <View style={{flexDirection:'row'}}>
                    <SimpleLineIcons name="location-pin" size={13} color="black" />
                    <Text style={homeStyles.ProfileLocation}>
                      {
                        this.state.data.location
                      }
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={homeStyles.dashboard}>
                <View style={homeStyles.counter}>            
                  <Text style={homeStyles.counterint}>814</Text>
                  <Text style={homeStyles.boardtextOne}>Followers</Text>
                </View>
                <View style={homeStyles.counter}>            
                  <Text style={homeStyles.counterint}>26</Text>
                  <Text style={homeStyles.boardtextTwo}>Following</Text>
                </View>
              </View>
          </View>
        </ScrollView>
        
      </SafeAreaView>
      <ProfileContent />
    </>
    );
  }
}
  
export default {
    ProfileScreen,
}