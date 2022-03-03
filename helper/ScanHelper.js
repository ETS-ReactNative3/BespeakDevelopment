import { auth, db } from '../firebase';
import { sha256 } from 'react-native-sha256';

export async function _fetchScannedData(ticket) {
    let _key1 = ticket?.key1;
    let _key2 = ticket?.key2;


    if(!(_key1 && _key2)) return 104;

    let ticket_query = await db.collection('ticket')
        .doc(_key1)
        .get();

    if(ticket_query.empty) {
        console.log('Ticket not existing!')
        return 103;
    }

    let _ticket = ticket_query.data();
    _ticket.id = ticket_query.id;

    let _hash = null;

    await sha256(_ticket.owner + _ticket.server_time).then( hash => {
        _hash = hash;
    })

    if(_key2 != _hash) {
        return 102;
    }

    let event_query = await db.collection('event')
        .doc(_ticket.event_id)
        .get();

    if(event_query.empty) {
        console.log('Event not existing!')
        return 103;
    }

    let _event = event_query.data();
    _event.id = event_query.id;

    if(_event.owner != auth.currentUser.uid) {
        return 102;
    }

    return {event: _event, ticket: _ticket};
}