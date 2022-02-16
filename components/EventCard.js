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
} from '@expo/vector-icons';
import BottomSheet from "react-native-gesture-bottom-sheet";

import SystemStyle from "../styles/SystemStyle";

class EventCard extends Component {
    constructor() {
        super();
        this.event_modal = null
    }
    render() {
        let item = this.props.data;
        return (
            <TouchableOpacity style={SystemStyle.Card}
                onPress = {() => {
                        if(item.is_owned) {
                            Alert.alert("This is your event!")
                        } else {
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
                        <TouchableOpacity>
                            <Feather name="bookmark" size={22} color="black" />
                        </TouchableOpacity>
                    </View>     
            </TouchableOpacity>
        )
    }
}

class EventModal extends Component {
    render() {
        let item = this.props.data
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
                                
                                <View style={SystemStyle.OrganizerTab}>
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
                                        onPress={() => navigation.navigate('HomeDetailScreen')}>
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