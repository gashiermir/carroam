/**
 * Modell.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    // Name des Modells (z.B. A7)
    name: {
      type: 'string',
      required: true,
    },
    

    // Baujahr (z.B. 2018)
    // baujahr: {
    //   type: 'number',
    //   required: true,
    //   columnType: 'integer'
    // },

    // Beschreibung (z.B. SUV, Limousine, etc.)
    beschreibung: {
      type: 'string',
      isIn: ['SUV', 'Limousine', 'Coupé', 'Kombi', 'Cabrio', 'Pick-up', 'Van']
    },

    // sitzplaetze: {
    //   type: 'number'
    // },

    marke: {
      model: 'marke'
    },

    // Beziehungen
    angebote: {
      collection: 'Angebot',
      via: 'modelle'
    }

    

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

