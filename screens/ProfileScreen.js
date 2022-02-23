import React, { Component } from "react";
import {
    ScrollView, 
    TouchableOpacity,
    Text, 
    View,
    Image,
    SafeAreaView, RefreshControl
} from 'react-native';
import { 
    SimpleLineIcons,
} from '@expo/vector-icons';
import { auth, db, storage } from '../firebase';

import ProfileScreenStyle from "../styles/ProfileScreenStyle";

import ProfileContent from "../components/ProfileContent";

import { 
    _arrangeProfileData,
    _countProfileRelation,
    _getProfileImage
} from "../helper/ProfileLoad";
  
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
        raw_data.id = snapshot.id;
        raw_data = await _arrangeProfileData([raw_data]);
        let _data = raw_data[0];

        let count = await _countProfileRelation(uid);

        this.setState({'data': {
                'profile_name': _data._name,
                ...count,
                ..._data
            },
            'is_loading': false
        })

        this._loadImages(_data)
        console.log('Profile Name: ', this.state.data.profile_name)
    }

    async _loadImages(item) {
        // Load Images Synchronously 

        let profile_image = await _getProfileImage(item.id, 'profile')
        let cover_image = await _getProfileImage(item.id, 'cover')

        this.setState({data: {...this.state.data, 
            profile_photo: profile_image,
            cover_photo: cover_image}});
    }

    componentDidMount() {
        this.onRefresh()
    } 
    doRefresh() {
        return new Promise((resolve) => {
            this._loadUserData()
            setTimeout(resolve, 2000)
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
        let item = this.state.data

        return (
            <>
                <SafeAreaView>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing || this.state.is_loading}
                                onRefresh={this.onRefresh}
                                colors={["gray", "orange"]}/>
                        }>
                            <View style={ProfileScreenStyle.Container}>
                                <View style={ProfileScreenStyle.ProfileHeader}/>

                                <View style={ProfileScreenStyle.ProfileCoverImgContainer}>
                                    <Image style={ProfileScreenStyle.ProfileCoverImg}
                                        key = {item.cover_photo}
                                        source={ item.cover_photo } />
                                </View>
                                <View style={ProfileScreenStyle.FirstSection}>
                                    <View style={ProfileScreenStyle.ProfileImgContainer}>
                                        <Image style={ProfileScreenStyle.ProfileImg}
                                            key = {item.profile_photo}
                                            source={ item.profile_photo }/>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={ProfileScreenStyle.EditProfileBtn}
                                            onPress={() => this.props.navigation.navigate('EditProfileScreen', {_done: this.onRefresh})}>
                                                <Text style={ProfileScreenStyle.EditProfileText}>Edit Profile</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={ProfileScreenStyle.SecondSection}>
                                    <Text style={ProfileScreenStyle.ProfileName}>
                                        { item.profile_name } </Text>
                                
                                    { item.bio &&
                                        <Text style={ProfileScreenStyle.ProfileBio}>
                                            { item.bio.replace(/(\r\n|\n|\r)/gm, " ") } </Text>
                                    }

                                    { item.location &&
                                        <View style={ProfileScreenStyle.LocationContainer}>
                                            <SimpleLineIcons name="location-pin" size={13} color="#808080" />
                                            <Text style={ProfileScreenStyle.ProfileLocation}>
                                                { item.location } </Text>
                                        </View>
                                    }

                                    { !this.state.is_loading &&
                                        <View style={ProfileScreenStyle.Dashboard}>        
                                            <TouchableOpacity onPress = {() => this.props.navigation.navigate('FollowerScreen')}>
                                                <View style={ProfileScreenStyle.Counter}>            
                                                    <Text style={ProfileScreenStyle.CounterNumber}>{ item.total_followers }</Text>
                                                    <Text style={ProfileScreenStyle.BoardTextOne}>Followers</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress = {() => this.props.navigation.navigate('FollowingScreen')}>
                                                <View style={ProfileScreenStyle.Counter}>            
                                                    <Text style={ProfileScreenStyle.CounterNumber}>{ item.total_following }</Text>
                                                    <Text style={ProfileScreenStyle.BoardTextTwo}>Following</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            </View>
                    </ScrollView>
                </SafeAreaView>
                <ProfileContent refreshing = {this.state.refreshing} _on_done = {this.onRefresh}/>
            </>
        );
    }
}
  
export default {
    ProfileScreen,
}