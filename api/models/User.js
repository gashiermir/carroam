// api/models/User.js
const bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    vorname: {
      type: 'string',
      required: true
    },
    nachname: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    password: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string',
      isIn: ['admin', 'user', 'vermieter'],
      defaultsTo: 'user'
    },
    adresse: {
      type: 'string',
      required: true
    },
    plz: {
      type: 'string',
      required: true
    },
    ort: {
      type: 'string',
      required: true
    },
    angebote: {
      collection: 'Angebot',
      via: 'vermieter'
    },
    buchungen: {
      collection: 'Buchung',
      via: 'mieter'
    },
    bewertungen: {
      collection: 'Bewertung',
      via: 'benutzer'
    },
    createdAt: {
      type: 'ref',
      columnType: 'datetime',
      autoCreatedAt: true
    }
  },

  // Verschlüsseln des Passworts vor dem Speichern
  beforeCreate: async function (user, proceed) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return proceed();
  },

  // Methode zum Vergleichen des Passworts
  comparePassword: async function (password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
};
