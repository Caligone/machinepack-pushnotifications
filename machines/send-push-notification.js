'use strict';

var Sender = require('../lib/Sender');

module.exports = {

    friendlyName: 'Send push notification',

    description: 'Send a push notification using APN or GCM',

    extendedDescription: '',

    inputs: {
        message: {
            example: {
                expiry: 1426493518,
                badge: 3,
                alert: 'Hey you !',
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
            description: 'The token device or an array of device tokens',
            required: true
        },
        connectionOptions: {
            example: {},
            description: 'The connection options cf https://www.npmjs.com/package/apn',
            required: true
        },
        type: {
            example: 0,
            description: 'The type of push notification (0: Google, 1: Apple)',
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
        var sender;
        try {
            sender = new Sender(inputs.type, inputs.connectionOptions);
        }
        catch (ex) {
            return exits.error(ex);
        }

        try {
            sender.send(inputs.message, inputs.deviceToken);
        }
        catch (ex) {
            return exits.error(ex);
        }

        return exits.success();
    },
};
