module.exports = {
    friendlyName: 'Get nearest warehouse',
    description: '',
    inputs: {
        addressTo: {
            type: 'string',
            required: true
        },
    },
    exits: {
        success: {
            outputFriendlyName: 'Nearest warehouse',
        },
    },
    fn: async function(inputs, exits) {
        // Get nearest warehouse.
        var warehouses = await Warehouse.find().populate('packets');
        var distances = [];
        var promises = warehouses.map(async (warehouse) => {
            var googleResponse = await sails.helpers.googleDistanceCalculator(warehouse.city, inputs.addressTo);
            if (!(googleResponse.lenght == undefined)) {
                distances.push({
                    id: warehouse.id,
                    name: warehouse.name,
                    lenght: googleResponse.lenght,
                    occupancy: warehouse.packets.length,
                    storageCapacity: warehouse.storageCapacity
                });
            }
        });
        await Promise.all(promises);
        return exits.success(distances);
    }
};