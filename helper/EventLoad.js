import { auth, db, storage } from '../firebase'
import dateFormat from '../helper/DateFormat';

import fetch_date_time from '../api/GlobalTime'

import Banners from '../values/Banners'

async function _arrangeData(events_data, mod = false) {
    let saved_events = await _getUserData("bookmarked");
    let current_time = await fetch_date_time();
    //console.log("Bookmarked Events: ", saved_events) // Logs All Events

    //console.log('Arranging: ', events_data)
    let arranged_data = [];

    for(var i = 0; i < events_data.length; i++) {
        let item = events_data[i]
        //console.log('Arranging: ', item)

        // Check if own event.
        item.is_owned = item.owner == auth.currentUser.uid

        // #REMOVED: To implement a faster loading
        //item.owner_image = await _getProfileImage(item.owner)
        //item.event_image = await _getEventImage(item.id, item.random_banner);

        item.owner_name = await _getUserData("_name", item.owner)
        
        let sched_end = item.schedule + 86400000 // Add one day to event schedule

        console.log('Comparing time: ', item.schedule, ' to ', current_time.epoch);

        item.is_overlap = item.schedule < current_time.epoch;
        item.has_ended = sched_end < current_time.epoch;


        let raw_sched = parseInt(item.schedule);
        let raw_posted = parseInt(item.server_time);

        let sched = await dateFormat(new Date(raw_sched), 
            mod ? "EEEE, MMMM d, yyyy ∘ Starts at h:mm aaa" : "EEEE, MMMM d, yyyy ∘ h:mm aaa");
        let posted = await dateFormat(new Date(raw_posted), "MMMM d, yyyy");
        
        item.sched = sched;
        item.date_posted = posted;

        item.is_bookmarked = saved_events?.includes(item.id);

        arranged_data.push(item)
    }
    return arranged_data;
}

async function _getProfileImage(user_id) {
    let user_image = false;

    if(user_id)
        user_image = await _getUserData('profile_image', user_id);

    if(user_image) {
        return user_image;
    }
    return require('../assets/img/blank-profile.png');
}

async function _getOwnerDataByEventId(event_id) {
    let get_owner_query = await db.collection('event')
        .doc(event_id)
        .get();

    if(get_owner_query.empty) {
        console.log('No data found for event: ', event_id);
        return;
    } 

    var event_data = get_owner_query.data()

    var owner_name = await _getUserData('_name', event_data.owner);

    return {
        name: owner_name ? owner_name : 'A Bespeak User',
        id: event_data.owner
    };
}

async function _getEventImage(event_id, random_banner) {
    let event_image = false;
    
    if(event_id) {
        await storage.ref(`/event/${event_id}/banner`)
            .getDownloadURL()
            .then((url) => { 
                event_image = url
                //console.log("Loaded Event Image for ", event_id, ": ", url)
            }).catch((error) => {
                if(error.code != 'storage/object-not-found') {
                    console.log("Error occured: ", error.message)
                    Alert.alert('Error!', error.message)
                }
            })

        if(event_image) {
            return {uri: event_image};
        } 
    }
    
    
    if (random_banner) {
        random_banner--;
    }

    let _banner = false;
    
    try {
        _banner = Banners[random_banner];
    } catch(e) {}

    if(!_banner) {
        _banner = Banners[8];
    }
    
    return _banner ? _banner : require('../assets/img/blank-cover.png');
}

async function _getUserData(metadata, uid = auth.currentUser.uid) {
    const user_info = db.collection("user_info")
    const query = user_info.doc(uid)
    const snapshot = await query.get()

    if(snapshot.empty) {
        console.log('No data found for user: ', uid);
        return;
    } 

    var raw_data = snapshot.data()
    return raw_data[metadata];
}

async function _checkEventAvailability(event_id) {
    let current_time = await fetch_date_time();
    let current_count = await _getAttendingCount(event_id);

    let get_event_query = await db.collection('event')
        .doc(event_id)
        .get();

    if(get_event_query.empty) {
        console.log('No data found for event: ', event_id);
        return 102;
    } 

    var _data = get_event_query.data()

    if(_data.schedule < current_time.epoch) {
        return 103;
    } else if(!_data.is_open) {
        return 102;
    } else if(current_count >= _data.max) {
        return 101;
    }// #TODO: Add Maximum Participant Validator return 101.

    return 100;
}

async function _checkUserAttendance(event_id, uid = auth.currentUser.uid) {
    let attending = true;

    let get_ticket_query = await db.collection('ticket')
        .where('event_id', '==', event_id)
        .where('owner', '==', uid)
        .get();

    if(get_ticket_query.empty) {
        attending = false;
    }

    console.log('Is User Attending?: ', attending);

    return attending;
}

async function _getAttendingCount(event_id) {
    let list = [];
    
    let get_participant_query = await db.collection('_participant')
        .doc(event_id)
        .get();
    
    if(get_participant_query.empty) {
        return 0;
    }

    list = get_participant_query.data();

    try {
        console.log('Event attendee count: ', list.attending.length);

        return list.attending.length;
    } catch(e) {
        return 0;
    }
}

export {
    _getUserData,
    _arrangeData,
    _getProfileImage,
    _getEventImage,
    _getOwnerDataByEventId,
    _getAttendingCount,
    _checkEventAvailability,
    _checkUserAttendance
}