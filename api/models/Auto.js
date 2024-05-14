/**
 * Auto.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const Modell = require("./Modell");

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    ps: { type: 'number' },
    getriebeart: { type: 'string', isIn: ['Automatik', 'Manuell'] },
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
      model: 'Buchung'
    },

    bewertungen: {
      collection: 'Bewertung',
      via: 'auto'
    }



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

