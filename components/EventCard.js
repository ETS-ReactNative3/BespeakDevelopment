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
    FontAwesome,
    MaterialIcons,
    FontAwesome5,
    MaterialCommunityIcons
} from '@expo/vector-icons';

import { auth, db, _db } from '../firebase';

import BottomSheet from "react-native-gesture-bottom-sheet";

import SystemStyle from "../styles/SystemStyle";

import { _initiateSharing } from "../helper/LinkHelper";
import { _initializeDoc } from '../helper/ProfileHelper';

class EventCard extends Component {
    constructor() {
        super();
        this.event_modal = null
    }
    async _bookmarkEvent() {
        let uid = auth.currentUser.uid
        let item_id = this.props.data.id;

        let is_bookmarked = this.props.data.is_bookmarked;

        let user_doc = db.collection("user_info").doc(uid);
        let _query = _db.FieldValue.arrayUnion(item_id);
        
        if(is_bookmarked) {
            _query = _db.FieldValue.arrayRemove(item_id)
        }

        console.log("Bookmark Event: ", is_bookmarked)
        await user_doc.update({
            bookmarked: _query
        }).catch((err) => {
            Alert.alert("Error!", err.message);
            console.log("Error: ", err)
        }).then(() => {
            //# TODO: Rename to proper function name
            this.props.remove(this.props.data)
        });
        
    }
    render() { 
        let item = this.props.data;
        return (
            <TouchableOpacity style={SystemStyle.Card}
                onPress = {() => {
                    if(item.is_owned) {
                        this.props.navigation.navigate('EventScreen', {event_id: item.id})
                    } else {
                        console.log("Opening Event Modal...");
                        this.props.modal_view(item)
                    }
                }}>
                    <Image style={SystemStyle.CardImage}
                        source={ item.event_image }/>
                    <View style={SystemStyle.CardContainer}>
                        <Text style={SystemStyle.CardTitle}>{item.name}</Text>
                        <Text style={SystemStyle.CardSched}>{item.sched}</Text>
                        <Text style={SystemStyle.CardOrg}>
                            { item.owner_name }
                        </Text>

                        <View style={SystemStyle.CardLocationContainer}>
                            <SimpleLineIcons name="location-pin" size={14} color="#5b5c5a"/>
                            <Text style={SystemStyle.CardLocation}>{ item.location }</Text>
                        </View>

                        
                    </View>
                    <View style={SystemStyle.CardOption}>
                    <View style={SystemStyle.CardStatContainer}>
                            { item.has_ended ? (
                                <>
                                    <MaterialIcons name="event-busy" size={14} color="#a30000" />
                                    <Text style={SystemStyle.EventEnded}>Event has ended</Text>
                                </>
                            ) : item.is_overlap ? (
                                <>
                                    <FontAwesome5 name="running" size={14} color="#eb9834" />
                                    <Text style={SystemStyle.StartAndSlot}>Happening now</Text>
                                </>
                            ) : item.remaining_status ? (
                                <>
                                    <MaterialIcons name="people-outline" size={14} color="#eb9834" />
                                    <Text style={SystemStyle.StartAndSlot}>{ item.remaining_status }</Text>
                                </>
                            ) : item.countdown_status ? (
                                <>
                                    <MaterialCommunityIcons name="calendar-clock" size={14} color="#eb9834" />
                                    <Text style={SystemStyle.StartAndSlot}>{ item.countdown_status }</Text>
                                </>
                            ) : null}
                        </View>
                        <View style={SystemStyle.RowImg}>
                        <TouchableOpacity onPress = {() => _initiateSharing(item)}>
                            <Ionicons name="share-social-outline" size={22} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => this._bookmarkEvent()}>
                            {this.props.data.is_bookmarked ? (
                                <FontAwesome name="bookmark" size={22} color="black" />
                            ) : (
                                <Feather name="bookmark" size={22} color="black" />
                            )}
                        </TouchableOpacity>
                        </View>
                    </View>     
            </TouchableOpacity>
        )
    }
}

class EventModal extends Component {
    _handleInterested(event) {
        this.props.modal_ref.current.close()

        let uid = auth.currentUser.uid;

        db.collection("_participant")
            .doc(event.id)
            .update({
                interested: _db.FieldValue.arrayUnion(uid)
            }).catch(async (err) => {
                if(err.code == 'firestore/not-found') {
                    await _initializeDoc("_participant", {
                        interested: [uid]
                    }, event.id)
                    return;
                }
                Alert.alert("Error!", err.message);
                console.log("Error: ", err)
            })
        
        this.props.navigation.navigate('EventScreen', {event_id: event.id})
    }
    render() {
        let item = this.props.data;

        return(
            <BottomSheet hasDraggableIcon
                ref={this.props.modal_ref}
                height={480}
                radius={35}>
                    <Image style={SystemStyle.BottomSheetImage}
                        source={ item.event_image }/>
                    <View style={SystemStyle.BottomSheetModal}>
                        <View style={SystemStyle.BottomSheetModalContainer}>
                            <View style={SystemStyle.BottomSheetContainer}>
                                <Text style={SystemStyle.DragableModalTitle}>{item.name}</Text>
                                <Text style={SystemStyle.DraggableModalDescription}>{item.desc}</Text>
                                
                                <View style={SystemStyle.OrganizerTabModal}>
                                    <TouchableOpacity style={SystemStyle.OrganizerInfo}
                                        onPress={() => {
                                            this.props.modal_ref.current.close()    
                                            this.props.navigation.navigate('UserProfileScreen', {user_id: item.owner})
                                        }}>
                                            <View style={SystemStyle.OrganizerImgContainer}>
                                                <Image style={SystemStyle.OrganizerImg}
                                                    source={item.owner_image}/>
                                            </View>
                                            <View style={SystemStyle.OrgCard}>
                                                <Text style={SystemStyle.OrganizerName}>{item.owner_name}</Text>
                                            </View>
                                    </TouchableOpacity>
                                </View>

                                <Text style={SystemStyle.DraggableModalDescription}>Posted {item.date_posted}</Text>
                                <Text style={SystemStyle.DraggableModalDescription}>For All</Text>

                                <View style={SystemStyle.InterestedParticipantsContainer}>
                                    <View style={SystemStyle.InterestedParticipantsBtn}> 
                                        <View style={SystemStyle.RowImg}>
                                            { item.sneak_imgs?.map((content, index) => {
                                                return (
                                                    <Image style={SystemStyle.InterestedIndividuals}
                                                        source={ content } key = { index }/>
                                                );
                                            })}
                                        </View>
                                        <View  style={SystemStyle.Center}>
                                            <Text style={SystemStyle.InterestedIndividualsText}>{ item.summary }</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={SystemStyle.InterestedBtn}
                                        onPress={() => this._handleInterested(item)}>
                                            <Text style={SystemStyle.InterestedTextBtn}>I'm Interested</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
            </BottomSheet>
        )
    }
}

export {
    EventCard,
    EventModal
};