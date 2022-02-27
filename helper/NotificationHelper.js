import { auth } from '../firebase';

import { _getUserData } from './EventLoad';

async function _constructNewEventNotif(_tokens = [], _data = {}, _creator = auth.currentUser.uid) {
    if(_tokens.length == 0) return;


    let _result = [];
    let owner_name = await _getUserData('_name', _creator);

    for(var token in _tokens) {
        _result.push({
            to: _tokens[token],
            title: owner_name,
            body: "Created a new event! Find out what's new!",
            data: _data
        });
    }

    return _result;
}

export { _constructNewEventNotif };