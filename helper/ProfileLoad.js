import { auth, db, storage } from '../firebase'

async function _arrangeProfileData(events_data, mod = false) {
    //console.log('Arranging: ', events_data)
    let arranged_data = [];
    let following = await _getFollowing(undefined, true);
    console.log("Following: ", following)

    for(var i = 0; i < events_data.length; i++) {
        let item = events_data[i]
        //console.log('Arranging: ', item)

        // Check if own profile.
        item.is_owned = item.owner == auth.currentUser.uid

        item.profile_image = await _getProfileImage(item.id, 'profile')
        item.cover_image = await _getProfileImage(item.id, 'cover')

        item.is_following = following?.includes(item.id);

        arranged_data.push(item)
    }
    return arranged_data;
}

async function _getProfileImage(user_id = auth.currentUser.uid, image_type) {
    let user_image = false;
    await storage.ref(`/users/${user_id}/${image_type}`)
        .getDownloadURL()
        .then((url) => { 
            user_image = url
            //console.log("Loaded Event Image for ", user_image, ": ", url)
        }).catch((error) => {
            if(error.code != 'storage/object-not-found') {
                console.log("Error occured: ", error.message)
                Alert.alert('Error!', error.message)
            }
        })

    if(user_image) {
        return {uri: user_image};
    }

    if(image_type == 'profile' )
        return require('../assets/img/blank-profile.png');

    return require('../assets/img/blank-cover.png');
}

async function _getFollowing(user_id = auth.currentUser.uid, ids_only = true) {
    let _data = [];

    let get_relation_query = await db.collection('_relation')
        .where('follower', 'array-contains', user_id)
        .get();

    if(ids_only) {
        get_relation_query.forEach((doc) => {
            if(doc.id != user_id)
                _data.push(doc.id)
        })
    } else {
        get_relation_query.forEach((doc) => {
            if(doc.id != user_id)
                _data.push({id: doc.id, ...doc.data()})
        })
    }
    return _data;
}


export {
    _arrangeProfileData
}