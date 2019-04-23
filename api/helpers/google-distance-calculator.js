module.exports = {
    friendlyName: 'Calculate Distance',
    description: 'Calculate Distance between Two addresses',
    inputs: {
        addressTo: {
            type: 'string',
            required: true
        },
        addressFrom: {
            type: 'string',
            required: true
        }
    },
    exits: {
        success: {
            description: 'All done.',
        }
    },
    fn: async function(inputs, exits) {
        var distance = require('google-distance-matrix');
        distance.key('AIzaSyBnkFjDVec1TDd9tIwmYWyj6zI8buHST6k');
        var distanceCalculation = new Promise(function(resolve, reject) {
            distance.matrix([inputs.addressTo], [inputs.addressFrom], function(err, {
                rows
            }) {
                if (err) {
                    reject(err);
                }
                if (rows[0].elements[0].status == 'OK') {
                    resolve({
                        time: rows[0].elements[0].duration.value,
                        lenght: rows[0].elements[0].distance.value
                    });
                } else {
                    resolve({});
                }
            })
        });
        await distanceCalculation.then(function(result) {
            return exits.success(result);
        }, function(err) {
            return exits.error(err);
        })
    }
};