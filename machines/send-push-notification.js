var apn = require('apn');

module.exports = {

    friendlyName: 'Send push notification',

    description: 'Send a push notification using APN or GCM',

    extendedDescription: '',

    inputs: {
        notification: {
            example: {
                expiry: 1426493518,
                badge: 3,
                alert: 'Hey you !',
                sound: 'ping.aiff',
                payload: {
                    data: 'Here is my data',
                    otherData: 'And here is some other'
                }
            },
            description: 'The notification object',
            required: true
        },
        deviceToken: {
            example: '5gxadhy6 6zmtxfl6 5zpbcxmw ez3w7ksf qscpr55t trknkzap 7yyt45sc g6jrw7qz',
            description: 'The token device',
            required: true
        },
        connectionOptions: {
            example: {},
            description: 'The connection options cf https://www.npmjs.com/package/apn',
            required: true
        }

    },

    defaultExit: 'success',

    exits: {
        error: {
            description: 'Unexpected error occurred.',
        },

        success: {
            description: 'Notification sent.',
        },
    },

    fn: function (inputs, exits) {
        try {
            var apnConnection = new apn.Connection(inputs.conn);
        }
        catch (ex) {
            exits.error(ex);
        }
        var device = new apn.Device(inputs.deviceToken);
        var pushNotification = new apn.Notification();

        pushNotification.expiry = inputs.notification.expiry;
        pushNotification.badge = inputs.notification.badge;
        pushNotification.sound = inputs.notification.sound;
        pushNotification.alert = inputs.notification.alert;
        pushNotification.payload = inputs.notification.payload;

        apnConnection.pushNotification(pushNotification, device);
        return exits.success();
    },
};
