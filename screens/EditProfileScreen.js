import React, { Component } from "react";
import {
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  Text, 
  View,
  Image
} from 'react-native';
import { 
  Feather,
} from '@expo/vector-icons';
import ImagePicker from 'react-native-image-picker';

import { auth, db } from '../firebase';

import homeStyles from "../styles/homeStyles";

class EditProfileScreen extends Component {
    state = {
        user: auth.currentUser,
        data: {}
    }
    async _loadUserData(uid) {
        const user_info = db.collection("user_info")
        const query = user_info.doc(uid)
        const snapshot = await query.get()
    
        if(snapshot.empty) {
          console.log('No matching documents.');
          return;
        } 
        var raw_data = snapshot.data()
        this.setState({'data': raw_data})
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => alert('This is a button!')}>
                    <Text style={homeStyles.tabSave}>Save</Text>
                </TouchableOpacity>
            ),
        });
        let uid = auth.currentUser.uid
        console.log('User ID: ' + uid);
    
        this._loadUserData(uid)
    }
    selectImage = () => {
        const options = {
          maxWidth: 2000,
          maxHeight: 2000,
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };
        ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log(source);
            setImage(source);
          }
        });
    };
    render() {
        return (
            <View style={homeStyles.detailsScreencontainer}>
                <TouchableOpacity>
                    <View style={homeStyles.editprofilecoverimgContainer}>
                        <Feather name="plus" size={50} style={homeStyles.editcoverimg}/>
                        <Image style={homeStyles.editprofilecoverimg}
                            source={require('../assets/img/F.jpg')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.selectImage()}>
                    <View style={homeStyles.firstSection}>
                        <View style={homeStyles.editprofileimgContainer}>
                            <Feather name="plus" size={50} style={homeStyles.editimg}/>
                            <Image style={homeStyles.editprofileimg}
                                source={require('../assets/img/SecondPages.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <ScrollView>
                    {this.state.data.user_type == 'INDIV' ? (
                        <>
                            <Text style={homeStyles.Info}>First Name</Text>
                            <TextInput style={homeStyles.Profileinput} 
                                value={this.state.data.f_name}/>
                            <Text style={homeStyles.Info}>Last Name</Text>
                            <TextInput style={homeStyles.Profileinput} 
                                value={this.state.data.l_name}/>
                        </>
                    ) : (
                        <>
                            <Text style={homeStyles.Info}>Organization Name</Text>
                            <TextInput style={homeStyles.Profileinput} 
                                value={this.state.data.org_name}/>
                        </>
                    )}
                    <Text style={homeStyles.Info}>Bio</Text>
                    <TextInput style={homeStyles.Profileinput} 
                        value={this.state.data.bio}/>
                    <Text style={homeStyles.Info}>Location</Text>
                    <TextInput style={homeStyles.Profileinput} 
                        value={this.state.data.loc}/>
                    <Text style={homeStyles.Info}>Phone Number</Text>
                    <TextInput style={homeStyles.Profileinput} 
                        value={this.state.data.mobile}/>
                    <TouchableOpacity style={homeStyles.changepw}
                        onPress = {() => {}}>
                        <Text style={homeStyles.changepwtxt}> Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={homeStyles.signout}
                        onPress = {() => {
                            auth.signOut()}}>
                        <Text style={homeStyles.signouttxt}> Log Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    } 
}

export default {
    EditProfileScreen
}
