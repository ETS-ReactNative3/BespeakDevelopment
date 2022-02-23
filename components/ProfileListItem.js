import React, { Component } from "react";
import { 
    Text,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import { 
    Ionicons,
    FontAwesome
} from '@expo/vector-icons';

import { _setFollowConnection } from "../helper/ProfileHelper";

import SystemStyle from "../styles/SystemStyle";

class ProfileListItem extends Component {
    async _handleFollow(uid) {
        let item = this.props.data;

        let result = await _setFollowConnection(undefined, uid,
            item.is_following ? 'unfollow' : 'follow');

        if(result) {
            this.props.update_relation(item);
        }
    }
    _openProfile(uid) {
        this.props.navigation.navigate('UserProfileScreen', {user_id: uid})
    }
    render() {
        let item = this.props.data;

        return (
            <View style={SystemStyle.FollowOrganizerTab}>
                <TouchableOpacity style={SystemStyle.OrganizerInfo}
                    onPress={() => this._openProfile(item.id) }>
                        <View style={SystemStyle.OrganizerImgContainer}>
                            <Image style={SystemStyle.FollowOrganizerImg}
                                source={ item.profile_image } />
                        </View>
                        <View style={SystemStyle.FollowCardContainer}>
                            <Text style={SystemStyle.FollowListOrganizerName}>{ item._name }</Text>
                            <Text style={SystemStyle.FollowListOrganizerBio}>{ item.bio }</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity style={
                    !item.is_following ? 
                        SystemStyle.FollowOrgBtn : SystemStyle.ToFollowOrgBtn}
                    onPress={() => this._handleFollow(item.id)}>
                        <Text style={SystemStyle.FollowOrgTextBtn}>{
                            !item.is_following ? 'Follow' : 'Unfollow'
                        }</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export {
    ProfileListItem
};