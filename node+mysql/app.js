
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var passport = require('passport');
var Promise = require('bluebird')
var Q = require('q');


//load customers route
var user = require('./routes/user'); 
var app = express();
var async = require('async');

var connection  = require('express-myconnection'); 
var mysql = require('mysql');
var MemStore = express.session.MemoryStore;
 var nodemailer = require("nodemailer");
        var smtpTransport = require('nodemailer-smtp-transport');
         var transporter = nodemailer.createTransport({
         service: "Gmail",
         auth: {
          //  host: 'localhost',
           // secureConnection: false, // use SSL
            //port: 587, // port for secure SMTP
             user: "karansofat89@@gmail.com",
             pass: "funjabimunde123456789"
         }
      });
app.configure(function(){
  // this logs in a Apache style
  // app.use(express.logger());
  app.set('transporter', transporter); 
  app.use(express.bodyParser());
  
  // this middleware will override our method
  // with what we passed into the hidden variable _method
  app.use(express.methodOverride());
  // methodOverride must be after the bodyParser
  app.use(express.static(__dirname + '/static'));
  app.use(express.cookieParser());
  app.use(express.session({secret: 'alessios', store: MemStore({
    reapInterval: 60000 * 10
  })}));
});


// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/




app.use(

    connection(mysql,{
        
	      "facebook_api_key" 		: 			"",
	      "facebook_api_secret"	:				"",
	      "callback_url"				:				"http://localhost:3000/auth/facebook/callback",
        host: 'localhost',
        user: 'root',
        password : 'password',
        port : 3306, //port mysql
        database:'nodeDemo',
        multipleStatements:true

    },'pool') //or single

);



app.get('/', routes.index);

app.get('/user/login', user.showLogin);
app.post('/user/login', user.login);
app.post('/user/register', user.register);
app.get('/user/dashboard', user.dashboard);
app.post('/user/addQuestion', user.addQuestion);
app.post('/user/paypal', user.paypal);
app.get('/user/paypalForm', user.paypalForm);
app.get('/user/sucess', user.sucess);
app.get('/user/cancel', user.cancel);
app.get('/user/profile/:id', user.profile);
app.get('/user/settings/', user.settings);
app.post('/user/editInfo/', user.saveInfo);

app.get('/logout', user.logout);
app.get('/partials/:name', routes.partials);
//app.get('*', routes.index);
/*app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);*/


//app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
