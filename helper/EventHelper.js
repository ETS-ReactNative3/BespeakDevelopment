import { Alert } from 'react-native'; 

import { auth, db, _db, d_link, storage } from '../firebase'
import push_notif from '../api/PushNotification';

import fetch_date_time from '../api/GlobalTime'

import { _initializeDoc } from './ProfileHelper'

import {
    _processDelEventNotif,
    _constructDelEventNotif
} from './NotificationHelper';

async function _joinUserToEvent(event_id, uid = auth.currentUser.uid) {
    let current_time = await fetch_date_time();
    let ticket_id = false;

    await db.collection('ticket')
        .add({
            event_id: event_id,
            owner: uid,
            server_time: current_time.epoch
        }).catch(error => {
            Alert.alert('Error!', error.message)
            return;
        }).then(async (doc) => {
            console.log('Created a ticket: ', doc.id)
            let to_add = {attending: _db.FieldValue.arrayUnion(doc.id)}
            await db.collection("_participant").doc(event_id)
                .update({
                    ...to_add
                }).catch(async (err) => {
                    if(err.code == 'firestore/not-found') {
                        console.log('No participant document found, creating now...')
                        await _initializeDoc("_participant", {
                            ...to_add
                        }, event_id);
                        
                        return;
                    }
                    Alert.alert("Error!", err.message);
                    console.log("Error: ", err)
                }).then(() => {
                    ticket_id = doc.id;
                })
        })
    

    return ticket_id
}

async function _hasUserAdmitted(event_id, uid = auth.currentUser.uid) {
    let get_ticket_query = await db.collection('_participant')
        .doc(event_id)
        .get();

    if(get_ticket_query.empty) {
        return false;
    }

    let _data = get_ticket_query.data();

    if(_data?.attended) {
        let attended_list = _data.attended;

        return attended_list?.includes(uid);
    }
    return false;
}

async function _cancelReservation(event_id, uid = auth.currentUser.uid) {
    await db.collection('ticket')
        .where('event_id', '==', event_id)
        .where('owner', '==', uid).get()
        .then((querySnapshot) => {
            querySnapshot.forEach(async doc => {
                await db.collection('_participant')
                    .doc(event_id)
                    .update({
                        attended: _db.FieldValue.arrayRemove(uid),
                        attending: _db.FieldValue.arrayRemove(doc.id),
                        interested: _db.FieldValue.arrayRemove(uid)
                    })
                doc.ref.delete();
            });
        })
}

async function _deleteEvent(event_id, uid = auth.currentUser.uid) {
    let current_time = await fetch_date_time();

    db.collection('comment')
        .where('event_id', '==', event_id)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            })
        })

    await db.collection('event')
        .doc(event_id).get()
        .then(async (doc) => {
            let _data = doc.data();
            let participants = [];
            await db.collection('ticket')
                .where('event_id', '==', event_id)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let _data = doc.data();
                        participants.push(_data.owner)
                        doc.ref.delete();
                    })
                });
            
            await db.collection('_participant')
                .doc(event_id)
                .get().then((doc) => {
                    let _data = doc.data();
                    if(_data?.attending) {
                        participants = [...participants, ..._data.attending];
                    }
                    doc.ref.delete();
                })
                
            console.log('Participants to notify about the deletion: ', participants);

            if(participants.length == 0 
                || doc.schedule > current_time.epoch + 86400000) {
                    doc.ref.delete();
                    return;
            }

            let uniq_participants = [...new Set(participants)];
            console.log('Participants Duplicate Removal: ', uniq_participants);
            
            _processDelEventNotif(_data.name, uniq_participants);
            let _tokens = []

            await db.collection('_token')
                .where('owner', 'in', participants)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        _tokens.push(doc.id);
                    })
                })

            console.log('Tokens obtained: ', _tokens);
            
            if(_tokens.length > 0) {
                const _data = await _constructDelEventNotif(_tokens, {user: uid});
                push_notif(_data);
            }

            doc.ref.delete();
        })

} 

// #TODO: Move to Helper
function _uploadToStorage(path, imageName) {
    let reference = storage.ref(imageName);         
    let task = reference.putFile(path);            

    return task.then(() => {                                 
        console.log('Photo Uploaded to Storage', path);
    }).catch((e) => {
        Alert.alert('Error!', e)
        console.log('Uploading Image Error: ', e)
    });
}

async function _getGeneratedLink(param, value, _title = 'Bespeak Event', 
    _img = 'https://firebasestorage.googleapis.com/v0/b/bespeak-development.appspot.com/o/system%2Fbespeak-icon.jpg?alt=media&token=c929cf2e-0626-4d8c-a15c-b7231d8d96eb',
    _desc = null) {

    console.log('Creating Link: Title -',  _title, ' Image -', _img);

    const link = await d_link().buildShortLink({
        link: `https://bespeak.page.link/app?${param}=${value}`,
        android: {
            packageName: 'com.jedpedregosa.Bespeak',
            fallbackUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        
        social: {
            title: _title + ' on Bespeak 🐣',
            imageUrl: _img,
            descriptionText: _desc?.substring(0, 60)  + '... 😉 Join this event now on the Bespeak mobile app! 🎉'
        },
        domainUriPrefix: 'https://bespeak.page.link',
    });
    
    console.log('Link Made: ', link)
    return link;
}

export {
    _getGeneratedLink,
    _uploadToStorage,
    _joinUserToEvent,
    _cancelReservation,
    _hasUserAdmitted,
    _deleteEvent
}

