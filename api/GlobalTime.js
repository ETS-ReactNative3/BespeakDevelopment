function convert_time(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

async function fetch_date_time() {
    var URL_REGISTER = 'https://www.google.com';

    var date_time = null;
    var epoch = null;
    var current_tz = null;

    await fetch(URL_REGISTER, {method: 'POST', body: ''})
        .then(
            async function(response) {
                date_time = response.headers.get('Date')
                epoch = Date.parse(date_time)
                current_tz = new Date(epoch)

                date_time = current_tz.toLocaleString()
                console.log("Date time from google: ", date_time);
                date_time = new Date(date_time)
                
                if (response.status !== 200) {
                    // console.log('Status Code: ' + response.status);
                    return;
                }
            }
        )
        .catch(function(err) {
            console.log('Fetching Date and Time Error: ', err);
        });
    return {
        'date_time': date_time,
        'epoch': epoch
    }
}
export default fetch_date_time