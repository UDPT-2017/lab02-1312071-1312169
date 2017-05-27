var aboutController = require('../controllers/aboutController');
var usersController = require('../controllers/usersController');
var sessionsController = require('../controllers/sessionsController');
var friendsController = require('../controllers/friendsController');
var messagesController = require('../controllers/messagesController');

var configRoutes = function(app){
  app.get('/', function(req, res){
    res.render('sessions/new');
  });
  app.get('/about', aboutController.index);
  app.get('/signup', function(req, res){
    res.render('signup');
  });
  app.post('/signup', usersController.signup);
  app.post('/login', sessionsController.login);
  app.get('/logout', sessionsController.logout);
  app.get('/users', usersController.listAllUser);
  app.post('/addfriend', friendsController.addfriend);
  app.get('/messages', messagesController.allMessages);
  app.get('/friends', friendsController.listFriend);
  app.delete('/unfriend/:id', friendsController.unfriend);
};

module.exports = configRoutes;
