import { Alert } from 'react-native'; 

import { auth, db, _db, d_link, storage } from '../firebase'
import push_notif from '../api/PushNotification';

import fetch_date_time from '../api/GlobalTime'

import { _initializeDoc } from './ProfileHelper'

import {
    _processDelEventNotif,
    _constructDelEventNotif,
    _processEventChangeNotif,
    _constructEventChangeNotif,
    _processCommentNotif,
    _constructCommentNotif
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
    var batch = db.batch();

    db.collection('comment')
        .where('event_id', '==', event_id)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
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
                        batch.delete(doc.ref);
                    })
                });
            
            await db.collection('_participant')
                .doc(event_id)
                .get().then((doc) => {
                    let _data = doc.data();
                    if(_data?.attending) {
                        participants = [...participants, ..._data.attending];
                    }
                    batch.delete(doc.ref);
                })
            
            var update_batch = db.batch();
            // Optional
            await db.collection('user_info')
                .where('bookmarked', 'array-contains', event_id)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        update_batch.update(doc.ref, {
                            bookmarked: _db.FieldValue.arrayRemove(event_id),
                        })
                    }) 
                })

            await db.collection('_notification')
                .where('event_id', '==', event_id)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        update_batch.update(doc.ref, {
                            event_id: '_UNDEFINED_'
                        })
                    })
                })

            await update_batch.commit();

            console.log('Participants to notify about the deletion: ', participants);

            if(participants.length == 0 
                || doc.schedule > current_time.epoch + 86400000) {
                    batch.delete(doc.ref);
                    await batch.commit();
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

            batch.delete(doc.ref);
            await batch.commit();
        })

} 

async function _notifyEventChange(event_id, uid = auth.currentUser.uid) {
    let participants = [];
    await db.collection('ticket')
        .where('event_id', '==', event_id)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let _data = doc.data();
                participants.push(_data.owner)
            })
        });
    
    await db.collection('_participant')
        .doc(event_id)
        .get().then((doc) => {
            let _data = doc.data();
            if(_data?.attending) {
                participants = [...participants, ..._data.attending];
            }
        })
        
    console.log('Participants to notify about the update: ', participants);

    let uniq_participants = [...new Set(participants)];
    console.log('Participants Duplicate Removal: ', uniq_participants);

    _processEventChangeNotif(event_id, uniq_participants);
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
        const _notif_data = await _constructEventChangeNotif(_tokens, {event: event_id});
        push_notif(_notif_data);
    }
}

async function _notifyOnComment(event_id, event_owner, uid = auth.currentUser.uid) {
    let commented_users = [event_owner];
    let user_tokens = [];

    await db.collection('comment')
        .where('event_id', '==', event_id)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let user_id = doc.data();
                user_id = user_id.owner;
                commented_users.push(user_id);
            })
        })

    let uniq_users = [...new Set(commented_users)];
    console.log('Commented Duplicate Removal: ', uniq_users);

    const to_remove = uniq_users.indexOf(uid);
    uniq_users.splice(to_remove, 1);

    _processCommentNotif(event_id, uniq_users);
    let special_tokens = [];

    await db.collection('_token')
        .where('owner', 'in', uniq_users)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                if(data.owner == event_owner) 
                    special_tokens.push(doc.id)
                user_tokens.push(doc.id);
            })
        })

    console.log('Tokens obtained: ', user_tokens);
    console.log('Special Token: ', special_tokens);

    if(user_tokens.length > 0) {
        const _notif_data = await _constructCommentNotif(user_tokens, {event: event_id}, special_tokens);
        push_notif(_notif_data);
    }
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
            fallbackUrl: 'https://bespeak-development.web.app/'
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
    _deleteEvent,
    _notifyEventChange,
    _notifyOnComment
}

