module.exports.routes = {
  '/': { view: 'pages/homepage' },
  'GET /dashboard': { view: 'pages/dashboard' },
  'GET /search': 'SearchController.search',

  'GET /angebot': 'AngebotController.index',
  'GET /angebot/new': 'AngebotController.new',
  'POST /angebot/create': 'AngebotController.create',
  'GET /angebot/:id': { action: 'angebot/show' },
  'GET /angebot/:id/edit': 'AngebotController.edit',
  'POST /angebot/:id/update': 'AngebotController.update',
  'POST /angebot/:id/delete': 'AngebotController.delete',

  'GET /angebote/:id': { action: 'angebot/publicShow' }, // Neue Route für öffentliche Angebotsansicht

  'POST /kontakt': { action: 'angebot/contact' },

  'GET /modell': 'ModellController.index',
  'GET /modell/new': 'ModellController.new',
  'POST /modell/create': 'ModellController.create',
  'GET /modell/:id': 'ModellController.show',
  'GET /modell/:id/edit': 'ModellController.edit',
  'POST /modell/:id/update': 'ModellController.update',
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

  'GET /buchung': 'BuchungController.index',
  'GET /buchung/new': 'BuchungController.new',
  'POST /buchung/create': 'BuchungController.create',
  'GET /buchung/:id': 'BuchungController.show',
  'GET /buchung/:id/edit': 'BuchungController.edit',
  'POST /buchung/:id/update': 'BuchungController.update',
  'POST /buchung/:id/delete': 'BuchungController.delete',

  'GET /bewertung': 'BewertungController.index',
  'GET /bewertung/new': 'BewertungController.new',
  'POST /bewertung/create': 'BewertungController.create',
  'GET /bewertung/:id': 'BewertungController.show',
  'GET /bewertung/:id/edit': 'BewertungController.edit',
  'POST /bewertung/:id/update': 'BewertungController.update',
  'POST /bewertung/:id/delete': 'BewertungController.delete',

  'GET /marke': 'MarkeController.index',
  'GET /marke/new': 'MarkeController.new',
  'POST /marke/create': 'MarkeController.create',
  'GET /marke/:id': 'MarkeController.show',
  'GET /marke/:id/edit': 'MarkeController.edit',
  'POST /marke/:id/update': 'MarkeController.update',
  'POST /marke/:id/delete': 'MarkeController.delete',



  // Chat routes
  'GET /chat': 'ChatController.find',
  'GET /chat/new': 'ChatController.new',
  'POST /chat/create': 'ChatController.create',
  'GET /chat/:id': 'ChatController.show',
  'POST /chat/:id/delete': 'ChatController.delete',


  'POST /chat/createOrGet': 'ChatController.createOrGet',
  
  // Routen für die Nachrichten-API
  'GET /api/chat/:id/messages': 'MessageController.findMessagesByChat',
  'POST /message/create': 'MessageController.create',
      
  








  '/signup': { view: 'pages/signup' },
  'POST /auth/signup': 'UserController.signup',
  'GET /login': 'AuthController.showLogin',
  'POST /auth/login': 'AuthController.login',
  'GET /logout': 'AuthController.logout',
  'GET /dashboard': 'DashboardController.showDashboard',
  'GET /api/marken': 'MarkeController.find',
  'GET /api/modelle': 'ModellController.findByMarke',
  'GET /api/angebot/:id': 'AngebotController.showApi',
};
