import React, { Component } from "react";
import { 
    Text,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import { 
    Ionicons,
    FontAwesome,
    Feather
} from '@expo/vector-icons';

import { _setFollowConnection } from "../helper/ProfileHelper";

import SystemStyle from "../styles/SystemStyle";

import { _initiateUserSharing } from "../helper/LinkHelper";

import ContentLoader, { Rect, Circle, } from "react-content-loader/native"

class ProfileCard extends Component {
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
            <TouchableOpacity style={SystemStyle.Card} onPress={() => this._openProfile(item.id) }>
                <Image style={SystemStyle.CardImage}
                    source={ item.cover_image }/>
                <View style={SystemStyle.CardContainer}>
                    <View style={SystemStyle.OrganizerSectionTab}>
                        <TouchableOpacity style={SystemStyle.OrganizerInfo}
                            onPress={() => this._openProfile(item.id) }>
                                <View style={SystemStyle.OrganizerImgContainer}>
                                    <Image style={SystemStyle.OrganizerImg}
                                        source={ item.profile_image }/>
                                </View>
                                <View style={SystemStyle.OrganizerCardContainer}>
                                    <Text style={SystemStyle.OrganizerNameButBlack}>{ item._name }</Text>
                                </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={
                            !item.is_following ? 
                                SystemStyle.ToFollowingOrgBtn : SystemStyle.ToFollowOrgBtn}
                            onPress={() => this._handleFollow(item.id)}>
                                <Text style={SystemStyle.FollowOrgTextBtn}>{
                                    !item.is_following ? 'Follow' : 'Unfollow'
                                }</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={SystemStyle.OrgCardInfo}>{ item.bio }</Text>
                </View>
                <View style={SystemStyle.CardOptionForProfCard}>
                    <TouchableOpacity onPress = {() => _initiateUserSharing(item)}>
                        <Ionicons name="share-social-outline" size={22} color="black" />
                    </TouchableOpacity>
                </View>     
            </TouchableOpacity>
        );
    }
}

export {
    ProfileCard
};

/*
            <View style={SystemStyle.CardContentLoader}>
            <ContentLoader 
                    speed={4}
                    width={'100%'}
                    height={270}
                    backgroundColor="#cccccc"
                    foregroundColor="#ebebeb">
                        <Rect x="0" y="0" rx="20" width="100%" height="130" />
                        <Circle cx="10%" y="145" cy="23" r="23" />
                        <Rect x="20%" y="163" rx="4" ry="4" width="50%" height="10"/>
                        <Rect x="5%" y="205" rx="3" ry="3" width="50%" height="6"/>
                        <Rect x="5%" y="225" rx="3" ry="3" width="70%" height="6"/>
                </ContentLoader>
            </View>  
*/