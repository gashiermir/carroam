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

  'GET /search': 'SearchController.search',

  // Route to list all Angebote
  'GET /angebot': 'AngebotController.index',

  // Route to show the form for creating a new Angebot
  'GET /angebot/new': 'AngebotController.new',

  // Route to create a new Angebot
  'POST /angebot/create': 'AngebotController.create',

  // Route to show a single Angebot
  'GET /angebot/:id': 'AngebotController.show',

  // Route to show the form for editing an existing Angebot
  'GET /angebot/:id/edit': 'AngebotController.edit',

  // Route to update an existing Angebot
  'POST /angebot/:id/update': 'AngebotController.update',

  // Route to delete an existing Angebot
  'POST /angebot/:id/delete': 'AngebotController.delete',


  // Route to list all Modelle
  'GET /modell': 'ModellController.index',

  // Route to show the form for creating a new Modell
  'GET /modell/new': 'ModellController.new',

  // Route to create a new Modell
  'POST /modell/create': 'ModellController.create',

  // Route to show a single Modell
  'GET /modell/:id': 'ModellController.show',

  // Route to show the form for editing an existing Modell
  'GET /modell/:id/edit': 'ModellController.edit',

  // Route to update an existing Modell
  'POST /modell/:id/update': 'ModellController.update',

  // Route to delete an existing Modell
  'POST /modell/:id/delete': 'ModellController.delete',

  
  'GET /user': 'UserController.find',
  'GET /user/new': 'UserController.new',
  'POST /user': 'UserController.create',
  'GET /user/:id': 'UserController.show',
  'GET /user/:id/edit': 'UserController.edit',
  'POST /user/:id': 'UserController.update',
  'GET /user/:id/delete': 'UserController.destroy',


  'GET /user/edit': 'UserController.editOwnProfile',
  'POST /user/update': 'UserController.updateOwnProfile',



  // Route to list all Buchungen
  'GET /buchung': 'BuchungController.index',

  // Route to show the form for creating a new Buchung
  'GET /buchung/new': 'BuchungController.new',

  // Route to create a new Buchung
  'POST /buchung/create': 'BuchungController.create',

  // Route to show a single Buchung
  'GET /buchung/:id': 'BuchungController.show',

  // Route to show the form for editing an existing Buchung
  'GET /buchung/:id/edit': 'BuchungController.edit',

  // Route to update an existing Buchung
  'POST /buchung/:id/update': 'BuchungController.update',

  // Route to delete an existing Buchung
  'POST /buchung/:id/delete': 'BuchungController.delete',


  // Route to list all Bewertungen
  'GET /bewertung': 'BewertungController.index',

  // Route to show the form for creating a new Bewertung
  'GET /bewertung/new': 'BewertungController.new',

  // Route to create a new Bewertung
  'POST /bewertung/create': 'BewertungController.create',

  // Route to show a single Bewertung
  'GET /bewertung/:id': 'BewertungController.show',

  // Route to show the form for editing an existing Bewertung
  'GET /bewertung/:id/edit': 'BewertungController.edit',

  // Route to update an existing Bewertung
  'POST /bewertung/:id/update': 'BewertungController.update',

  // Route to delete an existing Bewertung
  'POST /bewertung/:id/delete': 'BewertungController.delete',



  // Route to list all Marken
  'GET /marke': 'MarkeController.index',

  // Route to show the form for creating a new Marke
  'GET /marke/new': 'MarkeController.new',

  // Route to create a new Marke
  'POST /marke/create': 'MarkeController.create',

  // Route to show a single Marke
  'GET /marke/:id': 'MarkeController.show',

  // Route to show the form for editing an existing Marke
  'GET /marke/:id/edit': 'MarkeController.edit',

  // Route to update an existing Marke
  'POST /marke/:id/update': 'MarkeController.update',

  // Route to delete an existing Marke
  'POST /marke/:id/delete': 'MarkeController.delete',




  '/signup': { view: 'pages/signup' },
  'POST /auth/signup': 'UserController.signup',

  'GET /login': 'AuthController.showLogin',
  'POST /auth/login': 'AuthController.login',

  'GET /logout': 'AuthController.logout',

  'GET /dashboard': 'DashboardController.showDashboard',

  'GET /api/marken': 'MarkeController.find',
  'GET /api/modelle': 'ModellController.findByMarke',

  








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
