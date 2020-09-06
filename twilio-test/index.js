const app = require('express')();
const { test } = require('./services/call');

app.get('/', (req, res) => {
    res.send("Wadhaiyan ji wadhaiyan");
});

app.get('/outbound-call', async (req, res) => {
    console.log('Going to make an outbound call');
    let t = await test();
    console.log('Test over', t);
    res.send('call successful');
});

app.listen(1903, () => {
    console.log('App started on port 1903');
});