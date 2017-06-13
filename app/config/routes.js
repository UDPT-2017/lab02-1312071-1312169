var aboutController = require('../controllers/aboutController');
var usersController = require('../controllers/usersController');
var sessionsController = require('../controllers/sessionsController');
var friendsController = require('../controllers/friendsController');
var messagesController = require('../controllers/messagesController');
var homeController = require('../controllers/homeController');

var configRoutes = function(app){
  app.get('/', homeController.home);
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
  app.put('/messages', messagesController.syncMessages);
  app.get('/friends', friendsController.listFriend);
  app.delete('/unfriend/:id', friendsController.unfriend);
  app.get('/messages/new', messagesController.getfriend);
  app.post('/messages/new', messagesController.newMess);
  app.get('/messages/sent', function(req, res){
    res.render('messages/sent');
  });
  app.get('/message/:id', messagesController.show);
  app.get('/messages/:id', messagesController.showmessage);
  app.get('/viewSentMess', messagesController.messages_sent);
};

module.exports = configRoutes;
