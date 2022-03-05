import { auth, db, _db, d_link } from '../firebase';
import { Alert } from 'react-native';

async function _setFollowConnection(_follower = auth.currentUser.uid,
    _following, type) {
        if(_follower == _following) return false;
        
        let result = true;

        let relation_doc = db.collection("_relation").doc(_following);
        let _add_relation = type == 'follow' ? _db.FieldValue.arrayUnion(_follower)
            : _db.FieldValue.arrayRemove(_follower);
        let _add_count = type == 'follow' ? _db.FieldValue.increment(1) 
            : _db.FieldValue.increment(-1);

        await relation_doc.update({
            count: _add_count,
            follower: _add_relation 
        }).catch(async (err) => {
            if(err.code == 'firestore/not-found') {
                if(type == 'unfollow') return

                await _initializeDoc("_relation", {
                    count: 1,
                    follower: [_follower]
                }, _following)
                return;
            }

            result = false;
            Alert.alert("Error!", err.message);
            console.log("Error: ", err)
        }).then(() => {
        });

        return result;
}

async function _initializeDoc(collection, _data, _id) {
    let doc = db.collection(collection);

    if(_id) {
        doc = doc.doc(_id);
    }

    await doc.set({
        ..._data
    }).catch((err) => {
        Alert.alert("Error!", err.message);
        console.log("Error: ", err)
    });
}

async function _getUserGeneratedLink(value, _title = 'A Bespeak User', 
    _img = 'https://firebasestorage.googleapis.com/v0/b/bespeak-development.appspot.com/o/system%2Fbespeak-icon.jpg?alt=media&token=c929cf2e-0626-4d8c-a15c-b7231d8d96eb',
    _desc = null) {

    console.log('Creating User Link: Name -',  _title, ' Image -', _img);

    const link = await d_link().buildShortLink({
        link: `https://bespeak.page.link/app?user=${value}`,
        android: {
            packageName: 'com.jedpedregosa.Bespeak',
            fallbackUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        
        social: {
            title: _title + ' is now on Bespeak! 👀🤟',
            imageUrl: _img,
            descriptionText: _desc?.substring(0, 60) + '... 😎 Be updated with ' + _title + ' now on the Bespeak mobile app! 🥳'
        },
        domainUriPrefix: 'https://bespeak.page.link',
    });
    
    console.log('Link Made: ', link)
    return link;
}

async function _deleteOverallAccount(uid = auth.currentUser.uid) {
    var batch = db.batch();

    await db.collection('user_info')
        .doc(uid).get()
        .then((doc) => {
            batch.delete(doc.ref);
        })

    await db.collection('ticket')
        .where('owner', '==', uid)
        .get().then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                await db.collection('_participant')
                    .where('attending', 'array-contains', doc.id)
                    .get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            batch.update(doc.ref, {
                                attending: _db.FieldValue.arrayRemove(uid),
                            })
                        })
                    });

                batch.delete(doc.ref);
            })
        })

    await db.collection('event')
        .where('owner', '==', uid)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            })
        })

    await db.collection('comment')
        .where('owner', '==', uid)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                batch.update(doc.ref, {
                    owner: '_UNDEFINED_'
                })
            })
        })

    await db.collection('_token')
        .where('owner', '==', uid)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            })
        })

    await db.collection('_relation')
        .doc(uid).get()
        .then((doc) => {
            batch.delete(doc.ref);
        })

    await db.collection('_relation')
        .where('follower', 'array-contains', uid)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                batch.update(doc.ref, {
                    follower: _db.FieldValue.arrayRemove(uid),
                })
            })
        })

    await db.collection('_participant')
        .where('interested', 'array-contains', uid)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                batch.update(doc.ref, {
                    interested: _db.FieldValue.arrayRemove(uid),
                })
            })
        });

    await db.collection('_participant')
        .where('attending', 'array-contains', uid)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                batch.update(doc.ref, {
                    attending: _db.FieldValue.arrayRemove(uid),
                })
            })
        });

    await db.collection('_notification')
        .where('to', '==', uid)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            })
        })

    await auth.currentUser
        .delete().then(async () => {
            await batch.commit();
        }).catch(error => {
            console.log('Error!: ', error);
        })
}

export {
    _setFollowConnection,
    _getUserGeneratedLink,
    _initializeDoc,
    _deleteOverallAccount
};