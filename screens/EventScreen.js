import React, { Component } from 'react';
import {
    ScrollView, 
    TouchableOpacity, 
    Text, 
    View,
    Image,
    RefreshControl,
    TextInput,
    ActivityIndicator,
    Alert
} from 'react-native';
import Loader from 'react-native-three-dots-loader'
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

import { CommentSection } from '../components/CommentSection'

import SystemStyle from "../styles/SystemStyle";
import EditEventStyle from "../styles/EditEventStyle";

import dateFormat from "../helper/DateFormat"
import { 
    _arrangeData,
    _getProfileImage,
    _getEventImage,
    _getUserData
} from "../helper/EventLoad"
import { _isFollowing } from "../helper/ProfileLoad";
import { _setFollowConnection } from '../helper/ProfileHelper';

class EventScreen extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            loading: true,
            user_data: null,
            
            raw_comment: null,
            comment_data: [],
            active_comment: false,
            is_active: false,
            is_extending: false,
            is_submitting: false,

            _extend: false,
            _limit: 5,
            _last: null,
        }
        this.onRefresh = this.onRefresh.bind(this)
        this._showOptions = this._showOptions.bind(this);

        this.comment_modal = React.createRef();
        this.comment_scroll = React.createRef();
    }
    componentDidMount() {
        this._startLoad();
    }
    componentDidUpdate(prevProps) {
        if(this.props.route.params.event_id !== prevProps.route.params.event_id ) {
            this.setState({loading: true});
            this._startLoad();
        }
    }
    _startLoad() {
        let event_id = this.props.route.params.event_id

        console.log('Opening Event with ID: ', event_id)

        if(event_id) {
            this._retrieveData(event_id)
        } else {
            this.props.navigation.goBack();
        }
    }
    async _retrieveData(event_id) {
        let uid = auth.currentUser.uid;
        let current_time = await fetch_date_time();

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

        _data = _data[0]

        console.log('Comparing time: ', _data.schedule, ' to ', current_time.epoch);
        _data.has_ended = _data.schedule < current_time.epoch;

        if(_data.has_ended) {
            Alert.alert('This event has ended', 'This event is now archived however interactions will remain enabled.')
        }

        _data.is_following = await _isFollowing(uid, _data.owner);
        
        console.log("Opened Event Data: ", _data)

        let _user_data_name = await _getUserData('_name', undefined)

        this._loadComments();

        this.setState({
            loading: false,
            data: _data,
            user_data: {
                name: _user_data_name,
            }
        });
        
        this._loadImages(_data, uid);
    }
    
    async _loadImages(item, uid) {
        // Load Images Synchronously 
        let user_image = await _getProfileImage(uid);

        item.event_image = item._banner ? item._banner
            : await _getEventImage(undefined, item.random_banner)
        item.owner_image = await _getProfileImage(item.owner);;

        this.setState({data: item, user_data: {...this.state.user_data, profile_image: user_image}});
    }

    async _retrieveComments(type_extend = false) {
        let event_id = this.props.route.params.event_id

        let get_comment_query = await db
            .collection('comment')
            .where('event_id', '==', event_id)
            .orderBy('server_time', 'desc')
        
        if(type_extend && this.state._last) {
            get_comment_query = get_comment_query
                .startAfter(this.state._last)
        }

        get_comment_query = await get_comment_query
            .limit(this.state._limit)
            .get()
            
        if(get_comment_query.empty) {
            console.log('No comments found for event: ', event_id);
            return {data: [], _last: this.state._last};
        }
        
        let _data = [];
        let _cleaned_data = [];

        get_comment_query.forEach((doc) => {
            _data.unshift({id: doc.id, ...doc.data()})
        })


        for(var i = 0; i < _data.length; i++) {
            let comment = _data[i]

            comment.owner_name = await _getUserData("_name", comment.owner)

            comment.is_owned = comment.owner == auth.currentUser.uid;
            comment.server_time = await dateFormat(new Date(comment.server_time), "EEEE, MMMM d, yyyy h:mm aaa")

            _cleaned_data.push(comment);
        }
        
        let _last = get_comment_query.docs[get_comment_query.docs.length-1]; 

        return {data: _cleaned_data, last: _last};
    }

    _loadCommentImages(items, has_add = []) {
        // Load Images
        items?.forEach(async (item) => {
            item.owner_image = await _getProfileImage(item.owner);

            this.setState({comment_data: [...items, ...has_add]});
        })
    }
    
    async _loadComments() {
        let query_res = await this._retrieveComments();

        this.setState({
            comment_data: query_res.data,
            _last: query_res.last,
            _extend: query_res.data.length == this.state._limit
        });

        this._loadCommentImages(query_res.data)
    }

    async _extendLoadComments() {
        this.setState({
            _extend: false,
            is_extending: true
        });
        console.log('Extending Comments...')

        let query_res = await this._retrieveComments(true);

        let has_data = query_res.data.length == this.state._limit;
        
        let current_to_add = this.state.comment_data;

        this.setState({
            comment_data: [... query_res?.data, ... current_to_add],
            _last: query_res.last,
            _extend: has_data,
            is_extending: false
        });
        
        this._loadCommentImages(query_res?.data, current_to_add)
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
                .then(async () => {
                    this.comment_modal.current.close()
                    
                    let current = this.state.comment_data;

                    let index = current?.indexOf(comment_data);
                    current.splice(index, 1)
                    this.setState({comment_data: current});
                });
            this.setState({ active_comment: false, is_active: false})
        }
    }
    
    async _handleSubmit() {
        if(this.state.raw_comment) {
            this.setState({is_submitting: true});
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
                    
                    let current = this.state.comment_data;
                    
                    comment_data.id = doc.id;
                    comment_data.owner_image = await _getProfileImage(comment_data.owner);
                    comment_data.owner_name = await _getUserData("_name", comment_data.owner)
                    comment_data.server_time = await dateFormat(new Date(comment_data.server_time), "EEEE, MMMM d, yyyy h:mm aaa")
                    comment_data.is_owned = true;

                    current?.push(comment_data);
                    this.setState({comment_data: current, is_submitting: false});
                    
                    console.log(this.comment_scroll.current);
                    //this.comment_scroll.current.scrollTo({y: 0, animated: true}); 
                });
        }
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
    _openProfile(uid) {
        if(uid == auth.currentUser.uid) return;
        this.props.navigation.navigate('UserProfileScreen', {user_id: uid})
    }
    _showOptions(item) {
        this.setState({ active_comment: item, is_active: true })
        this.comment_modal.current.show();
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
                <View style={EditEventStyle.EventContainer}>
                    <View style={EditEventStyle.ImgContainer}>
                        <Image style={EditEventStyle.ImgContainer}
                            source={ item.event_image }/>
                    </View>
                    <View style={EditEventStyle.EventContainer}>
                        <View style={EditEventStyle.TitleAndButtonRow}>
                        <Text style={EditEventStyle.EventTitle}>{ item.name }</Text>
                            { item.owner == auth.currentUser.uid && !item.has_ended &&
                                <TouchableOpacity style={SystemStyle.FollowOrgBtn}
                                    onPress={() => this.props.navigation.navigate('EditEventScreen', 
                                    {event_id: item.id, 
                                    _done: this.onRefresh})}>
                                        <Text style={SystemStyle.FollowOrgTextBtn}>Edit Event</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={SystemStyle.OrganizerTab}>
                            <TouchableOpacity style={SystemStyle.OrganizerInfo}
                                onPress={() => this._openProfile(item.owner) }>
                                    <View style={SystemStyle.OrganizerImgContainer}>
                                        <Image style={SystemStyle.OrganizerImg}
                                            source={ item.owner_image }/>
                                    </View>
                                    <View style={SystemStyle.OrgCardContainer}>
                                        <Text style={SystemStyle.OrganizerNameButBlack}>{ item.owner_name }</Text>
                                    </View>
                            </TouchableOpacity>

                            {item.owner != auth.currentUser.uid &&
                                <TouchableOpacity style={
                                    !item.is_following ? 
                                        SystemStyle.FollowOrgBtn : SystemStyle.FollowingOrgBtn}
                                    onPress={() => this._handleFollow(item.owner)}>
                                        <Text style={SystemStyle.FollowOrgTextBtn}>{
                                            !item.is_following ? 'Follow' : 'Unfollow'
                                        }</Text>
                                </TouchableOpacity>
                            }
                            
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
                    
                    <Text style={SystemStyle.EventAddInfoTitle}>
                        Additional Information</Text>
                    <Text style={SystemStyle.EventTextInfo}>
                        { item.info } 
                    </Text>
                    <View style={SystemStyle.BreakLineContainer}>
                        <Text style={SystemStyle.BreakLine}></Text>
                        <Text style={SystemStyle.BreakLineComment}>Comments</Text>
                    </View>
                    
                    
                    { comment_content.length > 0 && (
                            <>
                                { this.state.is_extending &&
                                    <View style={SystemStyle.Center}>  
                                        <Loader key = {this.state.is_extending}/>
                                    </View>
                                }
                                { this.state._extend && 
                                    <View style={SystemStyle.Center}>  
                                        <TouchableOpacity style={SystemStyle.LoadBtn}
                                            onPress={() => this._extendLoadComments()}>
                                                <Text style={SystemStyle.LoadText}> {
                                                    'Load more comments...'
                                                } </Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                }
                                <ScrollView>
                                    { comment_content.map((item)=> 
                                        <CommentSection data = {item}
                                            key = {item.id}
                                            navigation = {this.props.navigation}
                                            _triggerOption = {this._showOptions}/>
                                    )}
                                </ScrollView>
                            </>
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

                                <View style={SystemStyle.SendComment}>
                                    { this.state.is_submitting ? (
                                            <ActivityIndicator size={25} color="orange"/> 
                                        ) : (
                                            <TouchableOpacity
                                                onPress = {() => this._handleSubmit()}>
                                                    <Ionicons name="send" size={24} 
                                                        color={ this.state.raw_comment ? "black" : "#5b5c5a"}/>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                                
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
                            { item.has_ended ? (
                                <View style={SystemStyle.ViewAttendeeBtn}>
                                        <Text style={SystemStyle.AttendingTextBtn}>Event Ended</Text>
                                </View>
                            ) : (
                                <TouchableOpacity style={SystemStyle.AttendingBtn}
                                    onPress={() => Alert.alert("La pa", "Lapa Lapa.")}>
                                        <Text style={SystemStyle.AttendingTextBtn}>I'm attending!</Text>
                                </TouchableOpacity>
                            )}
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
