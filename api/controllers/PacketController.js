/**
 * PacketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    sendPacket: async function(req, res) {
        const response = await sails.helpers.sendPacketToWarehouse.with(req.body);
        return res.status(200).send(response);
    }
};