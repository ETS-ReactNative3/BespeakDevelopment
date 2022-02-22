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

import BottomSheet from "react-native-gesture-bottom-sheet";

import SystemStyle from "../styles/SystemStyle";

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
                    }
                }>
                    <Image style={SystemStyle.CardImage}
                        source={ item.event_image }/>
                    <View style={SystemStyle.CardContainer}>
                        <Text style={SystemStyle.CardTitle}>{item.name}</Text>
                        <Text style={SystemStyle.CardSched}>{item.sched}</Text>
                        <Text style={SystemStyle.CardOrg}>
                            { item.owner_name }
                        </Text>
                        <View style={SystemStyle.CardLocationContainer}>
                            <SimpleLineIcons name="location-pin" size={16} color="black"/>
                            <Text style={SystemStyle.CardLocation}>{ item.location }</Text>
                        </View>
                    </View>
                    <View style={SystemStyle.CardOption}>
                        <TouchableOpacity>
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
            </TouchableOpacity>
        )
    }
}

class EventModal extends Component {
    render() {
        let item = this.props.data
        if(item.id) {
            console.log("Opened Event Modal: ", item.id)
        }
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
                                        onPress={() => navigation.navigate('NotificationDetailScreen')}>
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
                                    <TouchableOpacity style={SystemStyle.InterestedParticipantsBtn}
                                        onPress={() => navigation.navigate('')}> 
                                            <View style={SystemStyle.RowImg}>
                                                <Image style={SystemStyle.InterestedIndividuals}
                                                    source={require('../assets/img/EveryNation.png')}/>
                                                <Image style={SystemStyle.InterestedIndividuals}
                                                    source={require('../assets/img/EveryNation.png')}/>
                                            </View>
                                            
                                            <Text style={SystemStyle.InterestedIndividualsText}>Name, Name and Other's are interested</Text>
                                    </TouchableOpacity>  
                                    <TouchableOpacity style={SystemStyle.InterestedBtn}
                                        onPress={() => {
                                            this.props.modal_ref.current.close()
                                            this.props.navigation.navigate('EventScreen', {event_id: item.id})
                                        }}>
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