async function push_notif(_data = []) {
    console.log('Sending Notifications to: ', _data);

    if(_data.length == 0) return;

    let response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data)
    })
    console.log('Push Notification Response: ', JSON.stringify(response))
}

export default push_notif;