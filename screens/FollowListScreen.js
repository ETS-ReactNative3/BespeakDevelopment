import React, { Component } from "react";
import { View } from "react-native";

import OrganizerList from "../components/OrganizerList";

import SystemStyle from "../styles/SystemStyle";

class FollowingScreen extends Component {
    render() {
        return (
            <View style={SystemStyle.Container}>

                <OrganizerList list_following = {true}
                    navigation = { this.props.navigation }/>
    /*
                <View style={SystemStyle.FollowOrganizerTab}>
                    <TouchableOpacity style={SystemStyle.OrganizerInfo}
                    //onPress={() => navigation.navigate(' ')}
                    >
                        <View style={SystemStyle.OrganizerImgContainer}>
                            <Image
                                style={SystemStyle.FollowOrganizerImg}
                                source={require('../assets/img/EveryNation.png')}
                            />
                        </View>
                        <View style={SystemStyle.FollowCardContainer}>
                            <Text style={SystemStyle.FollowListOrganizerName}>Every Nation Campus</Text>
                            <Text style={SystemStyle.FollowListOrganizerBio}>Bio sabi mo eto para sayo hakhak.Bio sabi mo eto para sayo hakhak</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SystemStyle.ToFollowingOrgBtn}
                        //onPress={() => navigation.navigate('')}
                    >
                        <Text style={SystemStyle.FollowOrgTextBtn}>Following</Text>
                    </TouchableOpacity>
                </View>
                <View style={SystemStyle.FollowOrganizerTab}>
                    <TouchableOpacity style={SystemStyle.OrganizerInfo}
                    //onPress={() => navigation.navigate(' ')}
                    >
                        <View style={SystemStyle.OrganizerImgContainer}>
                            <Image
                                style={SystemStyle.FollowOrganizerImg}
                                source={require('../assets/img/EveryNation.png')}
                            />
                        </View>
                        <View style={SystemStyle.FollowCardContainer}>
                            <Text style={SystemStyle.FollowListOrganizerName}>Every Nation Campus</Text>
                            <Text style={SystemStyle.FollowListOrganizerBio}>Bio sabi mo eto para sayo hakhak.Bio sabi mo eto para sayo hakhak</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SystemStyle.ToFollowingOrgBtn}
                        //onPress={() => navigation.navigate('')}
                    >
                        <Text style={SystemStyle.FollowOrgTextBtn}>Following</Text>
                    </TouchableOpacity>
                </View>
*/
            </View>
        );
    }
}

class FollowerScreen extends Component {
    render() {
        return (
            <View style={SystemStyle.Container}>
                <OrganizerList list_follower = {true}
                    navigation = { this.props.navigation }/>
  /*
                <View style={SystemStyle.FollowOrganizerTab}>
                    <TouchableOpacity style={SystemStyle.OrganizerInfo}
                    //onPress={() => navigation.navigate(' ')}
                    >
                        <View style={SystemStyle.OrganizerImgContainer}>
                            <Image
                                style={SystemStyle.FollowOrganizerImg}
                                source={require('../assets/img/EveryNation.png')}
                            />
                        </View>
                        <View style={SystemStyle.FollowCardContainer}>
                            <Text style={SystemStyle.FollowListOrganizerName}>Every Nation Campus</Text>
                            <Text style={SystemStyle.FollowListOrganizerBio}>Bio sabi mo eto para sayo hakhak.Bio sabi mo eto para sayo hakhak</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SystemStyle.ToFollowOrgBtn}
                        //onPress={() => navigation.navigate('')}
                    >
                        <Text style={SystemStyle.FollowOrgTextBtn}>Follow</Text>
                    </TouchableOpacity>
                </View>
                <View style={SystemStyle.FollowOrganizerTab}>
                    <TouchableOpacity style={SystemStyle.OrganizerInfo}
                    //onPress={() => navigation.navigate(' ')}
                    >
                        <View style={SystemStyle.OrganizerImgContainer}>
                            <Image
                                style={SystemStyle.FollowOrganizerImg}
                                source={require('../assets/img/EveryNation.png')}
                            />
                        </View>
                        <View style={SystemStyle.FollowCardContainer}>
                            <Text style={SystemStyle.FollowListOrganizerName}>Every Nation Campus</Text>
                            <Text style={SystemStyle.FollowListOrganizerBio}>Bio sabi mo eto para sayo hakhak.Bio sabi mo eto para sayo hakhak</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SystemStyle.ToFollowOrgBtn}
                        //onPress={() => navigation.navigate('')}
                    >
                        <Text style={SystemStyle.FollowOrgTextBtn}>Follow</Text>
                    </TouchableOpacity>
                </View>
*/
            </View>
        );
    }
}

export default { 
    FollowingScreen,
    FollowerScreen
}