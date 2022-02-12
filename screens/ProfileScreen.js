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
import ProfileScreenStyle from "../styles/ProfileScreenStyle";

import ProfileContent from "../components/ProfileContent";
  
class ProfileScreen extends Component {
  constructor() {
    super()
    this.onRefresh = this.onRefresh.bind(this)
    this.state = {
      user: auth.currentUser,
      data: {},
      is_loading: true,
      refreshing: false
    }
  }
  async _loadUserData() {
    var uid = this.state.user.uid;
    console.log('Logged In User ID: ' + uid);

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
        if(error.code != 'storage/object-not-found') {
          console.log("Error occured: ", error.message)
          Alert.alert('Error!', error.message)
        }
      })

    await storage.ref(`/users/${uid}/cover`)
      .getDownloadURL()
      .then((url) => { 
        cover_image = url
        console.log("User's Cover Photo: ", url)
      }).catch((error) => {
        if(error.code != 'storage/object-not-found') {
          console.log("Error occured: ", error.code)
          Alert.alert('Error!', error.message)
        }
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
    await this.doRefresh().then(() => {
      this.setState({'refreshing': false})
      console.log("Refreshed.")
    })
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
              <View style={ProfileScreenStyle.Container}>
              {
                this.state.is_loading && 
                  <Spinner visible={true} 
                    textStyle={SystemStyle.whiteLoader}
                    color = '#eb9834'
                    animation = 'fade'
                    overlayColor = 'rgba(0, 0, 0, 0.50)'/>
              }
              <View style={ProfileScreenStyle.ProfileHeader}/>
              <View style={ProfileScreenStyle.ProfileCoverImgContainer}>
                <Image style={ProfileScreenStyle.ProfileCoverImg}
                  key = {this.state.data.cover_photo}
                  source={
                    this.state.data.cover_photo ?
                    {uri: this.state.data.cover_photo}:
                    require('../assets/img/blank-cover.png')
                  }/>
              </View>
              <View style={ProfileScreenStyle.FirstSection}>
                <View style={ProfileScreenStyle.ProfileImgContainer}>
                  <Image style={ProfileScreenStyle.ProfileImg}
                    key = {this.state.data.profile_photo}
                    source={
                      this.state.data.profile_photo ?
                      {uri: this.state.data.profile_photo}:
                      require('../assets/img/blank-profile.png')
                    }/>
                </View>
                <View>
                  <TouchableOpacity style={ProfileScreenStyle.EditProfileBtn}
                    onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
                      <Text style={ProfileScreenStyle.EditProfileText}>Edit Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={ProfileScreenStyle.SecondSection}>
                <Text style={ProfileScreenStyle.ProfileName}>
                  {
                    this.state.data.profile_name
                  }
                </Text>
                {
                  this.state.data.bio ? (
                    <Text style={ProfileScreenStyle.ProfileBio}>
                      {
                        this.state.data.bio.replace(/(\r\n|\n|\r)/gm, " ")
                      }
                    </Text>
                  ) : null
                }
                { this.state.data.location ? (
                  <View style={ProfileScreenStyle.LocationContainer}>
                    <SimpleLineIcons name="location-pin" size={13} color="#808080" />
                    <Text style={ProfileScreenStyle.ProfileLocation}>
                      {
                        this.state.data.location
                      }
                    </Text>
                  </View>
                ) : null}
                <View style={ProfileScreenStyle.Dashboard}>
                  <View style={ProfileScreenStyle.Counter}>            
                    <Text style={ProfileScreenStyle.CounterNumber}>814</Text>
                    <Text style={ProfileScreenStyle.BoardTextOne}>Followers</Text>
                  </View>
                  <View style={ProfileScreenStyle.Counter}>            
                    <Text style={ProfileScreenStyle.CounterNumber}>26</Text>
                    <Text style={ProfileScreenStyle.BoardTextTwo}>Following</Text>
                  </View>
                </View>
              </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ProfileContent refreshing = {this.state.refreshing}/>
    </>
    );
  }
}
  
export default {
    ProfileScreen,
}