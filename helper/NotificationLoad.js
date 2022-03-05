import { auth, db } from '../firebase';

import { 
    _getOwnerDataByEventId,
    _getUserData
} from './EventLoad';
import { _getTimeAgo } from '../helper/DateTextFormat';
import fetch_date_time from '../api/GlobalTime';

export async function _loadAllNotification(type_extend = false, 
    limit = undefined, start_after = undefined, user_id = auth.currentUser.uid) {

        let time_now = await fetch_date_time();

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

            item.ago = await _getTimeAgo(new Date(item.server_time), time_now.epoch);
            item.owner_id = item.from;
            item.owner_name = await _getUserData('_name', item.from);

            if(item.type == 'NEW_EVENT') {                
                item.content = "Created a new event! Find out what's new!"; 
            } else if(item.type == 'DEL_EVENT') {
                item.content = `Decided to cancel "${ item.event_name }" an event that you were planning to attend.`;
            } else if(item.type == 'UPD_EVENT') {
                item.content = "Updated the description of an event you are attending.";
            } else {
                item.content = "A Bespeak Notification.";
            }
            
            if(!item.is_read) unread_count++;
            _data[i] = item;
        }

        let last_value = get_notif_query.docs[get_notif_query.docs.length-1];

        return {'data': _data, 'last': last_value, 'unread_count': unread_count};
}