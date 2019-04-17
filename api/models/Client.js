module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        address: {
            type: 'string',
            required: true
        },

        packets: {
            collection: 'packet',
            via: 'client'
        }
    },
};