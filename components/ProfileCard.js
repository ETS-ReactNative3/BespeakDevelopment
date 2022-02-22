import React, { Component } from "react";
import { 
    Text,
    TouchableOpacity,
    Image,
    View,
    Alert
} from 'react-native';
import { 
    Feather,
    Ionicons,
    SimpleLineIcons,
    FontAwesome
} from '@expo/vector-icons';

import { auth, db, _db } from '../firebase';

import SystemStyle from "../styles/SystemStyle";

class ProfileCard extends Component {
    render() {
        let item = this.props.data;

        return (
            <TouchableOpacity style={SystemStyle.Card}>
                <Image style={SystemStyle.CardImage}
                    source={ item.cover_image }/>
                <View style={SystemStyle.CardContainer}>
                    <View style={SystemStyle.OrganizerSectionTab}>
                        <TouchableOpacity style={SystemStyle.OrganizerInfo}
                            onPress={() => navigation.navigate('NotificationDetailScreen')}>
                                <View style={SystemStyle.OrganizerImgContainer}>
                                    <Image style={SystemStyle.OrganizerImg}
                                        source={ item.profile_image }/>
                                </View>
                                <View style={SystemStyle.OrganizerCardContainer}>
                                    <Text style={SystemStyle.OrganizerName}>{ item._name }</Text>
                                </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={SystemStyle.FollowOrgBtn}
                            onPress={() => navigation.navigate('')}>
                                <Text style={SystemStyle.FollowOrgTextBtn}>Follow</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={SystemStyle.OrgCardInfo}>{ item.bio }</Text>
                </View>
                <View style={SystemStyle.CardOption}>
                    <TouchableOpacity>
                        <Ionicons name="share-social-outline" size={22} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="bookmark" size={22} color="black" />
                    </TouchableOpacity>
                </View>     
            </TouchableOpacity>
        );
    }
}

export {
    ProfileCard
};