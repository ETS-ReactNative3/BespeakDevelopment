import { auth, db, storage } from '../firebase'

async function _arrangeProfileData(user_data, mod = false) {
    //console.log('Arranging: ', events_data)
    let arranged_data = [];
    let following = await _getFollowing(undefined, true);
    console.log("Following: ", following)

    for(var i = 0; i < user_data.length; i++) {
        let item = user_data[i]
        //console.log('Arranging: ', item)

        // #REMOVED: For Faster Loading
        //item.profile_image = await _getProfileImage(item.id, 'profile')
        //item.cover_image = await _getProfileImage(item.id, 'cover')

        item.is_following = following?.includes(item.id);

        arranged_data.push(item)
    }
    return arranged_data;
}

async function _getProfileImage(user_id, image_type) {
    if(user_id) {
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
    }

    if(image_type == 'profile')
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

async function _getFollowersId(user_id = auth.currentUser.uid) {
    let get_relation_query = db.collection("_relation")
        .doc(user_id)
        
    let snapshot = await get_relation_query.get();

    if(snapshot.empty) {
        return false;
    } 

    let _data = snapshot.data();
    return _data?.follower ? _data?.follower : [];
}

async function _getFollowersToken(user_id = auth.currentUser.uid) {
    let followers = await _getFollowersId(user_id);

    if(followers.length == 0) return;

    let get_token_query = db.collection("_token")
        .where('owner', 'in', followers);
        
    let snapshot = await get_token_query.get();

    if(snapshot.empty) {
        return [];
    } 

    let _tokens = [];

    snapshot.forEach((doc) => {
        _tokens.push(doc.id)
    })

    return _tokens;
}

async function _isFollowing(_follower, _following) {
    if(_follower == _following) return false;

    let _data = await _getFollowersId(_following)
    
    if(_data.length == 0) {
        return false;
    } 

    console.log("Checking ", _follower, " and ", _following);
    return _data?.includes(_follower);
}

async function _countProfileRelation(user_id = auth.currentUser.uid) {
    const followers = await _getFollowersId(user_id);
    const following = await _getFollowing(user_id);

    return {
        total_followers: followers?.length,
        total_following: following?.length
    }
}

export {
    _arrangeProfileData,
    _isFollowing,
    _countProfileRelation,
    _getFollowersId,
    _getFollowing,
    _getProfileImage,
    _getFollowersToken
}