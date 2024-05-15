/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcryptjs');


module.exports = {
  
    create: async function (req, res) {
        sails.log.debug("Create new user....");
        try {
          let user = await User.create(req.allParams()).fetch();
          res.redirect('/user');
        } catch (err) {
          sails.log.error(err);
          res.serverError(err);
        }
      },
    
      find: async function (req, res) {
        sails.log.debug("List users....");
        let users = await User.find();
        res.view('pages/user/index', { users });
      },
    
      show: async function (req, res) {
        sails.log.debug("Show single user....");
        let user = await User.findOne({ id: req.params.id }).populate('angebote').populate('buchungen');
        if (!user) {
          return res.notFound('Kein Benutzer mit dieser ID gefunden.');
        }
        res.view('pages/user/show', { user });
      },
    
      edit: async function (req, res) {
        sails.log.debug("Edit single user....");
        let user = await User.findOne({ id: req.params.id });
        if (!user) {
          return res.notFound('Kein Benutzer mit dieser ID gefunden.');
        }
        res.view('pages/user/edit', { user });
      },
    
      update: async function (req, res) {
        sails.log.debug("Update user....");
        let params = req.allParams();
    
        // Falls das Passwort geändert wird, verschlüsseln wir es erneut
        if (params.password) {
          params.password = await bcrypt.hash(params.password, 10);
        }
    
        let updatedUser = await User.updateOne({ id: req.params.id }).set(params);
        if (!updatedUser) {
          return res.notFound('Kein Benutzer mit dieser ID gefunden.');
        }
        res.redirect('/user');
      },
    
      destroy: async function (req, res) {
        sails.log.debug("Delete single user....");
        try {
          let deletedUser = await User.destroyOne({ id: req.params.id });
          if (!deletedUser) {
            sails.log.debug("No user found with that ID.");
            return res.notFound('Kein Benutzer mit dieser ID gefunden.');
          }
          res.redirect('/user');
        } catch (err) {
          sails.log.error(err);
          res.serverError(err);
        }
      },
    
      new: function (req, res) {
        sails.log.debug("Show form to create new user....");
        res.view('pages/user/new');
      }

};

