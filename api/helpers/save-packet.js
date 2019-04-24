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

        const packetPopulated = await Packet.find({id:packetModel.id}).populate('client').populate('warehouse');
        delete packetPopulated[0].createdAt;
        delete packetPopulated[0].updatedAt;
        delete packetPopulated[0].client.updatedAt;
        delete packetPopulated[0].client.createdAt;
        delete packetPopulated[0].warehouse.updatedAt;
        delete packetPopulated[0].warehouse.createdAt;
        return exits.success(packetPopulated);
    }
};