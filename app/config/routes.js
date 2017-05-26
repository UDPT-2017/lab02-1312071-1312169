var aboutController = require('../controllers/aboutController');
var usersController = require('../controllers/usersController');
var sessionsController = require('../controllers/sessionsController');

var configRoutes = function(app){
  app.get('/', function(req, res){
    res.render('home');
  });
  app.get('/about', aboutController.index);
  app.get('/signup', function(req, res){
    res.render('signup');
  });
  app.post('/signup', usersController.signup);
  app.get('/login', function(req, res){
    res.render('sessions/new');
  });
  app.post('/login', sessionsController.login);
  app.get('/logout', sessionsController.logout);
};

module.exports = configRoutes;
