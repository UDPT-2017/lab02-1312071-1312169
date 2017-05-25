var aboutController = require('../controllers/aboutController');
var usersController = require('../controllers/usersController');

var configRoutes = function(app){
  app.get('/', function(req, res){
    res.render('home');
  });
  app.get('/about', aboutController.index);
  app.get('/signup', function(req, res){
    res.render('signup');
  });
  app.post('/signup', usersController.signup);
};

module.exports = configRoutes;
