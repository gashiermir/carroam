/**
 * Buchung.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    preis: {
      type: 'number',
      required: true
    },
    status: {
      type: 'string',
      isIn: ['offen', 'bestätigt', 'storniert'],
      defaultsTo: 'offen'
    },
    buchungsdatum: {
      type: 'ref',
      columnType: 'date',
      required: true
    },
    buchungVon: {
      type: 'ref',
      columnType: 'date',
      required: true
    },
    buchungBis: {
      type: 'ref',
      columnType: 'date',
      required: true
    },

    mieter: {
      model: 'User',
      required: true
    },

    angebote: {
      model: 'Angebot',
      required: true
    },

    
    createdAt: {
      type: 'ref',
      columnType: 'datetime',
      autoCreatedAt: true
    },
    updatedAt: {
      type: 'ref',
      columnType: 'datetime',
      autoUpdatedAt: true
    }





    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  beforeCreate: function(values, proceed) {
    if (new Date(values.buchungVon) >= new Date(values.buchungBis)) {
      return proceed(new Error('BuchungVon muss vor BuchungBis liegen.'));
    }
    return proceed();
  }

};

