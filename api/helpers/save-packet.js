module.exports = {
    friendlyName: 'Save packet',
    description: '',
    inputs: {
        packet: {
            type: 'json',
            required: true
        },
        warehouse: {
            type: 'json',
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
            packet,
            warehouse
        } = inputs;
        const packetModel = await Packet.create({
            addressTo: packet.addressTo,
            deliveryDate: packet.deliveryDate,
            strictDeliveryDate: packet.strictDeliveryDate,
            cost: packet.cost,
            status: 'Pending',
            client: 1,
            warehouse: warehouse.id
        }).fetch();
        return exits.success(packetModel);
    }
};