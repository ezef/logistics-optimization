module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        packets: {
            collection: 'packet',
            via: 'client'
        }
    },
};