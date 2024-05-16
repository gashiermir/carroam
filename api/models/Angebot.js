/**
 * Angebot.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {


    ps: { type: 'number' },
    getriebe: { type: 'string', isIn: ['Automatik', 'Manuell'] },
    preis: { type: 'string' },
    beschreibung: { type: 'string' },
    standort: { type: 'string'},
    verfügbarkeitVon: {
      type: 'ref',
      columnType: 'date'
    },
    verfügbarkeitBis: {
      type: 'ref',
      columnType: 'date'
    },
    vermieter: {
      model: 'User'
    },
    modelle: {
      model: 'Modell'
    },
    buchungen: {
      collection: 'Buchung',
      via: 'angebote'
    },

    bewertungen: {
      collection: 'Bewertung',
      via: 'angebote'
    },

    bildUrl: { type: 'string' } // Neues Attribut für die Bild-URL

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

};

