/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'GET /dashboard': { view: 'pages/dashboard' },

  'GET /search': 'AutoController.search',
  'GET /search/form': { view: 'pages/search' },


  'GET /auto/:id': 'AutoController.show',
  'GET /auto/:id/edit': 'AutoController.edit',
  'GET /auto/:id/delete': 'AutoController.destroy',
  'GET /auto/new': 'AutoController.new',
  'POST /auto': 'AutoController.create',
  'POST /auto/:id': 'AutoController.update',


  'GET /modell': 'ModellController.find',
  'GET /modell/new': 'ModellController.new',
  'POST /modell': 'ModellController.create',
  'GET /modell/:id': 'ModellController.show',
  'GET /modell/:id/edit': 'ModellController.edit',
  'POST /modell/:id': 'ModellController.update',
  'GET /modell/:id/delete': 'ModellController.destroy',

  
  'GET /user': 'UserController.find',
  'GET /user/new': 'UserController.new',
  'POST /user': 'UserController.create',
  'GET /user/:id': 'UserController.show',
  'GET /user/:id/edit': 'UserController.edit',
  'POST /user/:id': 'UserController.update',
  'GET /user/:id/delete': 'UserController.destroy',


  'GET /buchung': 'BuchungController.find',
  'GET /buchung/new': 'BuchungController.new',
  'POST /buchung': 'BuchungController.create',
  'GET /buchung/:id': 'BuchungController.show',
  'GET /buchung/:id/edit': 'BuchungController.edit',
  'POST /buchung/:id': 'BuchungController.update',
  'GET /buchung/:id/delete': 'BuchungController.destroy',


  'GET /bewertung': 'BewertungController.find',
  'GET /bewertung/new': 'BewertungController.new',
  'POST /bewertung': 'BewertungController.create',
  'GET /bewertung/:id': 'BewertungController.show',
  'GET /bewertung/:id/edit': 'BewertungController.edit',
  'POST /bewertung/:id': 'BewertungController.update',
  'GET /bewertung/:id/delete': 'BewertungController.destroy',

  'GET /chat/start': 'ChatController.startSession',
  'POST /chat/send': 'ChatController.sendMessage',
  'GET /chat/session/:id': 'ChatController.viewSession',






  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
