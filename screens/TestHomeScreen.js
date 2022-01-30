import React, { Component } from 'react';
import {
  TextInput,
  ScrollView, 
  TouchableOpacity, 
  Text, 
  View,
  Image,
  BackHandler,
  Alert,
  KeyboardAvoidingView
} from 'react-native';

import { auth, db } from '../firebase';

import SignUp from "../styles/SignUp";

// For Integration Testing
export default class TestHomeScreen extends Component {
    state = {
        user: auth.currentUser,
        data: {}
    }
    componentDidMount() {
        let uid = auth.currentUser.uid
        db
            .collection("user_info")
            .where('uid', '==', uid)
            .get()
            .catch(error => Alert.alert("Error!", error.message))
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log('Value: ' + doc)
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    //Alert.alert(doc.id, doc.data().last_name)
                    this.setState({data: doc.data()})
                });
                //
                //Alert.alert('Result', querySnapshot)
            })
    }
    render () {
        return (
            <View style={SignUp.SIcontainer}>
                <Text>{'\n\n\n\n\n\n\n\n\n\n'}</Text>
                <Text style={SignUp.SItitleText}>For Integration Testing</Text>
                <Text style={SignUp.SUAltText}>Email: {this.state.user.email}</Text>
                {this.state.data.org_name ? (
                    <>
                        <Text style={SignUp.SUAltText}>Organization Name: {this.state.data.org_name}</Text>
                    </>
                ) : (
                    <>
                        <Text style={SignUp.SUAltText}>Last Name: {this.state.data.last_name}</Text>
                        <Text style={SignUp.SUAltText}>First Name: {this.state.data.first_name}</Text>
                    </>
                )}
                
                <Text style={SignUp.SUAltText}>Mobile: {this.state.data.mobile}</Text>
                <TouchableOpacity style={SignUp.continuebtn}
                    onPress={() => {
                        auth.signOut()
                            .catch(error => {
                                Alert.alert("Error!", error.message)
                            })
                    }}>
                        <Text style={SignUp.continuebtntext}>Test Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

