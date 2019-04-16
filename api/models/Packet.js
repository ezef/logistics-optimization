module.exports = {
    attributes: {
        deliveryDate: {
            type: 'string',
            columnType: 'date'
        },
        client: {
            model: 'client'
        },
        warehouse: {
            model: 'Warehouse'
        }
    },
};