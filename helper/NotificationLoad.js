import { auth, db } from '../firebase';

import { _getOwnerDataByEventId } from './EventLoad';

export async function _loadAllNotification(type_extend = false, 
    limit = undefined, start_after = undefined, user_id = auth.currentUser.uid) {

        let get_notif_query = await db.collection('_notification')
            .where('to', '==', user_id)
            .orderBy('server_time', 'desc')

        if(type_extend) {
            get_notif_query = get_notif_query
                .startAfter(start_after);
        }
        
        if(limit) {
            get_notif_query = await get_notif_query
                .limit(limit)
        }
        get_notif_query = await get_notif_query
            .get();

        let _data = [], unread_count = 0;

        await get_notif_query.forEach(async (doc) => {
            _data.push({id: doc.id, ...doc.data()});  
        })  

        for(var i=0; i < _data.length; i++) {
            let item = _data[i];

            let owner = await _getOwnerDataByEventId(item.event_id);

            item.owner_name = owner.name;
            item.owner_id = owner.id;

            if(!item.is_read) unread_count++;
            
            item.content = item.type == 'NEW_EVENT' ? 
                "Created a new event! Find out what's new!" :
                "A notification from " + item.owner_name;

            _data[i] = item;
        }

        let last_value = get_notif_query.docs[get_notif_query.docs.length-1];

        return {'data': _data, 'last': last_value, 'unread_count': unread_count};

}