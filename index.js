var express = require('express'),
  bodyParser = require('body-parser'),
  pg = require('pg'),
  ect = require('ect'),
  app = express(),
  session = require('express-session');

var connect = "postgres://postgres@localhost/messages";
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({secret: 'max', resave: false, saveUninitialized: true}));


require('./app/config/express')(app);
require('./app/config/routes')(app);

var port = 3000;
 app.listen(port, function(){
  console.log('Server is listening in port:' + port )
 })
