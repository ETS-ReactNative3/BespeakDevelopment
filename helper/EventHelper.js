import { Alert } from 'react-native'; 

import { auth, db, _db, d_link, storage } from '../firebase'

import fetch_date_time from '../api/GlobalTime'

import { _initializeDoc } from './ProfileHelper'

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
    _joinUserToEvent
}

