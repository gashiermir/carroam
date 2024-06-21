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


    // Apply `isAdmin` policy to admin-specific controllers/actions
    UserController: {
      '*': 'isAdmin',
      'signup': true,
      'editOwnProfile': 'isLoggedIn',
      'updateOwnProfile': 'isLoggedIn',
      'edit': 'isAdminOrOwnsProfile',
    'update': 'isAdminOrOwnsProfile'
    },
    MarkeController: {
      '*': 'isAdmin'
    },
    ModellController: {
      '*': 'isAdmin'
    },
  
    // Apply `isVermieter` policy to vermieter-specific controllers/actions
    AngebotController: {
      '*': 'isLoggedIn',
      'create': 'isVermieter',
      'update': 'isAdminOrOwnsAngebot',
      'delete': 'isAdminOrOwnsAngebot',
      'show': 'isLoggedIn',
      'index': 'isLoggedIn',
      'edit': 'isAdminOrOwnsAngebot'
    },
    BuchungController: {
      '*': 'isLoggedIn'
    },
    BewertungController: {
      '*': 'isVermieter'
    }

};
