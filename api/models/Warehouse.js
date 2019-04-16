/**
 * Warehouse.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        city: {
            type: 'string',
            required: true,
            unique: true
        },
        name: {
            type: 'string',
            required: true,
            unique: true
        },
        storageCapacity: {
            type: 'number',
            required: true,
        }
    },
};