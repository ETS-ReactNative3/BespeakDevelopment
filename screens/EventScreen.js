import React, { Component } from 'react';
import {
    ScrollView, 
    TouchableOpacity, 
    Text, 
    View,
    Image,
    Pressable,
    RefreshControl,
    TextInput,
    ActivityIndicator,
    Modal,
    Alert
} from 'react-native';
import { 
    Feather,
    SimpleLineIcons,
    MaterialIcons,
    FontAwesome5,
    Ionicons
} from '@expo/vector-icons';
import BottomSheet from "react-native-gesture-bottom-sheet";

import { auth, db } from '../firebase'

import fetch_date_time from '../api/GlobalTime'

import SystemStyle from "../styles/SystemStyle";

import dateFormat from "../helper/DateFormat"
import { 
    _arrangeData,
    _getProfileImage,
    _getUserData
} from "../helper/EventLoad"

class EventScreen extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            loading: true,
            user_data: null,
            
            raw_comment: null,
            comment_data: {},
            active_comment: false,
            is_active: false
        }
        this.onRefresh = this.onRefresh.bind(this)

        this.comment_modal = React.createRef();
    }
    componentDidMount() {
        this._startLoad()
    }
    _startLoad() {
        let event_id = this.props.route.params.event_id
        if(event_id) {
            this._retrieveData(event_id)
        } else {
            this.props.navigation.goBack();
        }
    }
    async _retrieveData(event_id) {
        let uid = auth.currentUser.uid;

        let user_profile_name = await _getUserData("_name", uid);
        let user_image = await _getProfileImage(uid);

        let get_event_query = await db
            .collection('event')
            .doc(event_id)
            .get();
        
        if(get_event_query.empty) {
            console.log('No data found for user: ', uid);
            return;
        }

        let _data = get_event_query.data();
        _data.id = get_event_query.id;
        _data = await _arrangeData([_data], true); 

        console.log("Opened Event Data: ", _data)

        this._loadComments();

        this.setState({
            loading: false,
            data: _data[0],
            user_data: {
                name: user_profile_name,
                profile_image: user_image
            }
        });
    }

    async _loadComments() {
        let event_id = this.props.route.params.event_id

        let get_comment_query = await db
            .collection('comment')
            .where('event_id', '==', event_id)
            .orderBy('server_time', 'desc')
            .get();
            
        if(get_comment_query.empty) {
            console.log('No comments found for event: ', event_id);
            return;
        }
        
        let _data = [];
        let _cleaned_data = [];

        get_comment_query.forEach((doc) => {
            _data.push({id: doc.id, ...doc.data()})
        })


        for(var i = 0; i < _data.length; i++) {
            let comment = _data[i]

            comment.owner_name = await _getUserData("_name", comment.owner)
            comment.owner_image = await _getProfileImage(comment.owner);

            comment.is_owned = comment.owner == auth.currentUser.uid;
            comment.server_time = await dateFormat(new Date(comment.server_time), "EEEE, MMMM d, yyyy h:mm aaa")

            _cleaned_data.push(comment);
        }

        this.setState({
            comment_data: {..._cleaned_data}
        })

    }

    async _handleDelete(comment_data) {
        if(comment_data.owner == auth.currentUser.uid) {
            await db
                .collection('comment')
                .doc(comment_data.id)
                .delete()
                .catch(error => {
                    Alert.alert('Error!', error.message)
                    return
                }) 
                .then(async (doc) => {
                    this.reloadComments();
                });
            this.setState({ active_comment: false, is_active: false})
        }
    }
    
    async _handleSubmit() {
        if(this.state.raw_comment) {
            let comment_data = {
                owner: auth.currentUser.uid,
                event_id: this.state.data.id,
                content: this.state.raw_comment,
                server_time: await (await fetch_date_time()).epoch
            }

            await db
                .collection('comment')
                .add({
                    ...comment_data
                })
                .catch(error => {
                    Alert.alert('Error!', error.message)
                    return
                }) 
                .then(async (doc) => {
                    this.setState({raw_comment: null})
                    this.reloadComments();
                });
        }
    }

    reloadComments() {
        return new Promise((resolve) => {
            this._loadComments();
            setTimeout(resolve, 100)
        });
    }
    doRefresh() {
        return new Promise((resolve) => {
          this._startLoad()
          setTimeout(resolve, 3000)
        });
    }
    async onRefresh() {
        console.log("Refreshing...")
        this.setState({'refreshing': true})
        await this.doRefresh().then(() => {
            this.setState({
                'refreshing': false
            })
            console.log("Refreshed.")
        })
    }
    render() {
        let item = this.state.data;
        let comment_content = Object.values(this.state.comment_data);
        let active_comment = this.state.active_comment;

        if(this.state.loading) 
            return (
                <View style={SystemStyle.TabContainer}>
                    <ActivityIndicator size={'large'} color="grey"/> 
                </View>
            )

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        colors={["gray", "orange"]}/>
                }>
                <View style={SystemStyle.EventContainer}>
                    <View style={SystemStyle.ImgContainer}>
                        <Image style={SystemStyle.ImgContainer}
                            source={ item.event_image }/>
                    </View>
                    <View style={SystemStyle.EventContainer}>
                        <Text style={SystemStyle.EventTitle}>{ item.name }</Text>

                        <View style={SystemStyle.OrganizerTab}>
                            <TouchableOpacity style={SystemStyle.OrganizerInfo}
                                onPress={() => navigation.navigate('NotificationDetailScreen')}>
                                    <View style={SystemStyle.OrganizerImgContainer}>
                                        <Image style={SystemStyle.OrganizerImg}
                                            source={ item.owner_image }/>
                                    </View>
                                    <View style={SystemStyle.OrgCardContainer}>
                                        <Text style={SystemStyle.OwnEventName}>{ item.owner_name }</Text>
                                    </View>
                            </TouchableOpacity>

                            {item.owner == auth.currentUser.uid ? (
                                <TouchableOpacity style={SystemStyle.FollowOrgBtn}
                                    onPress={() => this.props.navigation.navigate('EditEventScreen', 
                                        {event_id: item.id, 
                                        _done: this.onRefresh})}>
                                            <Text style={SystemStyle.FollowOrgTextBtn}>Edit Event</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={SystemStyle.FollowOrgBtn}
                                    onPress={() => navigation.navigate('')}>
                                        <Text style={SystemStyle.FollowOrgTextBtn}>Followed</Text>
                                </TouchableOpacity>
                            )}
                            
                        </View>
                        <View style={SystemStyle.LowerSection}>
                            <Feather name="calendar" size={24} color="black" />
                            <Text style={SystemStyle.EventSchedule}>{ item.sched }</Text>
                        </View>
                        <View style={SystemStyle.LowerSection}>
                            <SimpleLineIcons name="location-pin" size={24} color="black" />
                            <Text style={SystemStyle.EventPlace}>{ item.location }</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={SystemStyle.LineBreak}></Text>
                </View>
                <View style={SystemStyle.Container}>

                    <Text style={SystemStyle.EventAboutTitle}>About</Text>
                    <Text style={SystemStyle.EventTextInfo}>
                        { item.desc }
                    </Text>
                    
                    <Text style={SystemStyle.EventReminderTitle}>
                        Additional Information</Text>
                    <Text style={SystemStyle.EventTextInfo}>
                        { item.info } 
                    </Text>
                    <View style={SystemStyle.BreakLineContainer}>
                        <Text style={SystemStyle.BreakLine}></Text>
                        <Text style={SystemStyle.BreakLineComment}>Comments</Text>
                    </View>
                    
                    { comment_content.length > 0 && (
                            comment_content.map((item)=> 
                                <View key = {item.id} style={SystemStyle.BespeakerCommentContainer}>
                                    <View style={SystemStyle.BespeakerImgContainer}>
                                        <Image style={SystemStyle.BespeakerImg}
                                            source={ item.owner_image }/>
                                        </View>
                                    <View style={SystemStyle.BespeakerContainer}>
                                        <Text style={SystemStyle.BespeakerName}>{ item.owner_name }</Text>
                                        <Text style={SystemStyle.BespeakerComment}> 
                                            { item.content } </Text>
                                    </View>
                                    
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ active_comment: item, is_active: true })
                                        this.comment_modal.current.show();
                                    }}>
                                        <SimpleLineIcons name="options" size={24} color="#5b5c5a" style={SystemStyle.CommentInfo}/>
                                    </TouchableOpacity>
                                </View>   
                            )
                        )
                    }

                    <View style={SystemStyle.BespeakerCommentContainer}>
                        <View style={SystemStyle.BespeakerImgContainer}>
                            <Image style={SystemStyle.BespeakerImg}
                                source={ this.state.user_data.profile_image }/>
                        </View>
                        <View style={SystemStyle.BespeakerContainer}>
                            <Text style={SystemStyle.BespeakerName}> { this.state.user_data.name } </Text>
                            <View style={SystemStyle.BespeakerInput}>
                                <TextInput style={SystemStyle.MyCommentInput} 
                                    value = {this.state.raw_comment}
                                    placeholder=' Write a comment..'
                                    maxLength={50}
                                    onChangeText={text => {
                                        this.setState({raw_comment: text});
                                    }}/>

                                <TouchableOpacity
                                    onPress = {() => this._handleSubmit()}>
                                    <Ionicons name="send" size={24} 
                                        color={ this.state.raw_comment ? "black" : "#5b5c5a"}
                                        style={SystemStyle.SendComment}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>          
                </View>
                <View style={SystemStyle.AttendingContainer}>
                    {item.owner == auth.currentUser.uid ? (
                        <>
                            <TouchableOpacity style={SystemStyle.ViewAttendeeBtn}
                                onPress={() => this.props.navigation.navigate('ParticipantListScreen') }>
                                    <Text style={SystemStyle.ViewAttendeeTextBtn}>View Attendees</Text> 
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity style={SystemStyle.AttendingBtn}
                                onPress={() => Alert.alert("La pa", "Lapa Lapa.")}>
                                    <Text style={SystemStyle.AttendingTextBtn}>I'm attending!</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                
                <BottomSheet hasDraggableIcon
                    ref={this.comment_modal}
                    height={90}
                    radius={35}>
                        <View style={SystemStyle.CommentInfoView}>
                            <View style={SystemStyle.DeleteModalView}>
                                { active_comment.is_owned &&
                                    <TouchableOpacity style={SystemStyle.Icon}
                                        onPress={() => this._handleDelete(active_comment) }>
                                            <MaterialIcons name="delete-outline" size={24} color="black" />
                                            <Text style={SystemStyle.DeleteTextBtn}>Delete</Text>
                                    </TouchableOpacity>
                                }
                                <View style={SystemStyle.CommentDateInfo}>
                                    <FontAwesome5 name="clock" size={24} color="black" style={SystemStyle.Icon}/>
                                    <Text style={SystemStyle.CommentDate}>{ active_comment.server_time }</Text>
                                </View>
                            </View>
                        </View>
                </BottomSheet>

            </ScrollView>

        );
    }
}

export default { EventScreen };
