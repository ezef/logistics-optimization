module.exports = {
    attributes: {
        addressTo: {
            type: 'string',
        },
        deliveryDate: {
            type: 'string',
            columnType: 'date'
        },
        strictDeliveryDate: {
            type: 'boolean',
        },
        cost: {
            type: 'string',
        },
        status: {
            type: 'string',
        },
        client: {
            model: 'client'
        },
        warehouse: {
            model: 'Warehouse'
        }
    },
};