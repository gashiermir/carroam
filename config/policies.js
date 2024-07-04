/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  '*': 'isLoggedIn',

  AuthController: {
    '*': true
  },

  SearchController: {
    '*': true
  },

  // Apply `isAdmin` policy to admin-specific controllers/actions
  UserController: {
    '*': 'isAdmin',
    'signup': true,
    'editOwnProfile': 'isLoggedIn',
    'updateOwnProfile': 'isLoggedIn',
    'edit': 'isAdminOrOwnsProfile',
    'update': 'isAdminOrOwnsProfile'
  },
  
  // Allow both 'admin' and 'vermieter' roles to access these routes
  MarkeController: {
    '*': 'isAdmin',
    'find': 'isLoggedIn'

  },

  ModellController: {
    '*': 'isAdmin',
    'findByMarke': 'isLoggedIn'
  },

  // Apply `isVermieter` policy to vermieter-specific controllers/actions
  AngebotController: {
    '*': 'isLoggedIn',
    'create': 'isVermieter',
    'update': 'isAdminOrOwnsAngebot',
    'delete': 'isAdminOrOwnsAngebot',
    'view': 'isLoggedIn',
    'apiShow': 'isLoggedIn',
    'index': 'isLoggedIn',
    'edit': 'isAdminOrOwnsAngebot',
    'publicShow': true, // Öffentlich zugänglich
    'contact': true // Öffentlich zugänglich
  },

  BuchungController: {
    '*': 'isLoggedIn'
  },

  BewertungController: {
    '*': 'isVermieter'
  },

  ChatController: {
    '*': 'isLoggedIn',
    show: 'isParticipant', // Apply the policy to the findOne action of ChatController
  }

};
