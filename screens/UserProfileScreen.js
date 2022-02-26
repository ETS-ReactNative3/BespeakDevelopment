import React, { Component } from "react";
import {
    ScrollView, 
    TouchableOpacity,
    Text, 
    View,
    Image,
    Alert,
    SafeAreaView,
    RefreshControl
} from 'react-native';
import { 
    SimpleLineIcons,
    Ionicons
} from '@expo/vector-icons';
import { auth, db, storage } from '../firebase';

import ProfileScreenStyle from "../styles/ProfileScreenStyle";
import SystemStyle from "../styles/SystemStyle";

import EventList from "../components/EventList";

import { 
    _arrangeProfileData,
    _countProfileRelation,
    _getProfileImage,
} from "../helper/ProfileLoad";
import { _setFollowConnection } from "../helper/ProfileHelper";

class UserProfileScreen extends Component {
    constructor() {
        super()
        this.onRefresh = this.onRefresh.bind(this)
        this.state = {
        data: {},
        is_loading: true,
        refreshing: false
        }
    }
    async _loadUserData() {
        var uid = this.props.route.params.user_id;
        console.log('Viewing Profile of User with ID: ' + uid);

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

        this._loadImages(_data);
        console.log('Profile Name: ', this.state.data.profile_name)
    }

    async _loadImages(item) {
        // Load Images Synchronously 

        let profile_image = item.profile_image ? item.profile_image
            : await _getProfileImage(undefined, 'profile')
        let cover_image = item.cover_image ? item.cover_image
            : await _getProfileImage(undefined, 'cover')

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
    async _handleFollow(uid) {
        let item = this.state.data;

        let result = await _setFollowConnection(undefined, uid,
            item.is_following ? 'unfollow' : 'follow');

        if(result) {
            this.setState({data: {
                ...item,
                is_following: !item.is_following
            }})
        }
    }   
    render() {
        let item = this.state.data;
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
                                        key = { item.cover_photo }
                                        source={ item.cover_photo }/>
                                </View>
                                <View style={ProfileScreenStyle.FirstSection}>
                                    <View style={ProfileScreenStyle.ProfileImgContainer}>
                                        <Image style={ProfileScreenStyle.ProfileImg}
                                            key = {item.profile_photo}
                                            source={ item.profile_photo }/>
                                    </View>

                                <View style={SystemStyle.RowImg}>
                                    <View style={SystemStyle.ShareUserOption}>
                                        <TouchableOpacity onPress = {() => _initiateUserSharing(item)}>
                                            <Ionicons name="share-social-outline" size={22} color="#000" />
                                        </TouchableOpacity>
                                    </View>     
                                    { !this.state.is_loading &&
                                        <TouchableOpacity style={
                                            !item.is_following ? 
                                            ProfileScreenStyle.FollowUserBtn : ProfileScreenStyle.UnfollowUserBtn}
                                            onPress={() => this._handleFollow(item.id)}>
                                                <Text style={SystemStyle.FollowOrgTextBtn}>{
                                                    !item.is_following ? 'Follow' : 'Unfollow' } </Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <View style={ProfileScreenStyle.SecondSection}>
                                <Text style={ProfileScreenStyle.ProfileName}> 
                                    { item.profile_name } </Text>

                                { item.bio &&
                                    <Text style={ProfileScreenStyle.ProfileBio}> {
                                        item.bio.replace(/(\r\n|\n|\r)/gm, " ") } </Text>
                                }

                                { item.location &&
                                    <View style={ProfileScreenStyle.LocationContainer}>
                                        <SimpleLineIcons name="location-pin" size={13} color="#808080" />
                                        <Text style={ProfileScreenStyle.ProfileLocation}> 
                                            { item.location } </Text>
                                    </View>
                                }

                                <View style={ProfileScreenStyle.Dashboard}>
                                    { !this.state.is_loading && 
                                        <>
                                            <View style={ProfileScreenStyle.Counter}>            
                                                <Text style={ProfileScreenStyle.CounterNumber}> { item.total_followers } </Text>
                                                <Text style={ProfileScreenStyle.BoardTextOne}>Followers</Text>
                                            </View>
                                            <View style={ProfileScreenStyle.Counter}>            
                                                <Text style={ProfileScreenStyle.CounterNumber}> { item.total_following } </Text>
                                                <Text style={ProfileScreenStyle.BoardTextTwo}>Following</Text>
                                            </View>
                                        </>
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <View style={ProfileScreenStyle.Container}>
                    {!this.state.refreshing &&
                        <EventList for_user = {true}
                            user_id = {this.props.route.params.user_id}
                            navigation = {this.props.navigation}/>
                    }
                </View>
                
            </>
        );
    }
}
  
export default {
  UserProfileScreen,
}