import React, { Component } from "react";
import { Text,
View,
TouchableOpacity,
Image,
} from "react-native";

import SystemStyle from "../styles/SystemStyle";


class FollowingScreen extends Component {
    render() {
        return (
            <View style={SystemStyle.Container}>
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
                            <Text style={SystemStyle.FollowOrganizer}>Every Nation Campus</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SystemStyle.FollowOrgBtn}
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
                            <Text style={SystemStyle.FollowOrganizer}>Every Nation Campus</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SystemStyle.FollowOrgBtn}
                        //onPress={() => navigation.navigate('')}
                    >
                        <Text style={SystemStyle.FollowOrgTextBtn}>Following</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class FollowerScreen extends Component {
    render() {
        return (
            <View style={SystemStyle.Container}>
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
                            <Text style={SystemStyle.FollowOrganizer}>Every Nation Campus</Text>
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
                            <Text style={SystemStyle.FollowOrganizer}>Every Nation Campus</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SystemStyle.ToFollowOrgBtn}
                        //onPress={() => navigation.navigate('')}
                    >
                        <Text style={SystemStyle.FollowOrgTextBtn}>Follow</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        );
    }
}

export default { 
    FollowingScreen,
    FollowerScreen
}