const accountSid = 'ACd6620d3dbcb79ec552a73ec66cea94f1';
const authToken = '62125180ba1f88fe5a65f50dffdb504c';
const client = require('twilio')(accountSid, authToken);

exports.makeCall = async () => {
    client.calls
        .create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: '+919716606407',
            from: '+12017201164'
        })
        .then(call => console.log(call.sid));
}
exports.test = async () => {
    console.log('Test');
    return Promise((resolve, reject) => {
        console.log('Test running');
        return resolve(true);
    })
} 
