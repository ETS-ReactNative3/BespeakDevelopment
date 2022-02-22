import { auth, db, _db } from '../firebase';
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

export {
    _setFollowConnection
};