var machinepack = require('../.');

machinepack.sendPushNotification({
    notification: {
        expiry: 1426493518,
        badge: 3,
        alert: 'Hey you !',
        sound: 'ping.aiff',
        payload: {
            data: 'Here is my data',
            otherData: 'And here is some other'
        }
    }, 
    deviceToken: '5gxadhy6 6zmtxfl6 5zpbcxmw ez3w7ksf qscpr55t trknkzap 7yyt45sc g6jrw7qz',
    connectionOptions: {}
}, function (d) {
    console.log(d);
}, function(d) {
    console.log(d);
});
