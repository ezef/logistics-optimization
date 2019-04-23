var moment = require('moment');
module.exports = {
    friendlyName: 'Send packet to warehouse',
    description: '',
    inputs: {
        client: {
            type: 'json',
            required: true
        },
        deliveryDate: {
            type: 'string',
            required: true
        },
        addressTo: {
            type: 'string',
            required: true
        },
        strictDeliveryDate: {
            type: 'string',
            required: true
        },
        size: {
            type: 'string',
            required: true
        },
        weight: {
            type: 'string',
            required: true
        },
    },
    exits: {
        success: {
            description: 'All done.',
        },
    },
    fn: async function(inputs, exits) {
        const {
            client: {
                id,
                name
            },
            addressTo,
            deliveryDate,
            strictDeliveryDate
        } = inputs;
        const calculatedDistancesWarehouses = await sails.helpers.getNearestWarehouse(addressTo);
        const orderedDistancesWarehouses = calculatedDistancesWarehouses.sort((prev, curr) => {
            return prev.lenght - curr.lenght;
        });
        orderedDistancesWarehouses.forEach(async (warehouse) => {
            if (warehouse.occupancy <= (warehouse.storageCapacity * 0.95)) {
                //normal delivery 
                const body = await sails.helpers.savePacket.with({
                    packet: {
                        cost: (warehouse.lenght * 0.0002),
                        ...inputs
                    },
                    warehouse: warehouse
                });
                return exits.success(body);
            } else if (warehouse.occupancy >= (warehouse.storageCapacity * 0.95)) {
                if (warehouse.occupancy < warehouse.storageCapacity) {
                    if (!strictDeliveryDate) {
                        //accepted but delayed
                        inputs.deliveryDate = moment(inputs.deliveryDate).add(1, 'days').toDate();
                        const body = await sails.helpers.savePacket.with({
                            packet: {
                                cost: (warehouse.lenght * 0.0002) + 70,
                                ...inputs
                            },
                            warehouse: warehouse
                        });
                        return exits.success(body);
                    }
                } else {
                    return exits.error("warehouse full, not accepted")
                }
            }
        });
    }
};