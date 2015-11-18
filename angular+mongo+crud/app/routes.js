module.exports = function(app) {
var Users = require("../app/models/users");

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});



  app.post('/addData', function(req, res) {
     var input = JSON.parse(JSON.stringify(req.body));
     var users ={};
   
     users = new Users(
        {
            name : req.body.name,
            email : req.body.email,
            address : req.body.address
          
        });
        users.save(function(err){
           if (err)
               res.send(500,err);
         res.json({ data:'saveData' });
        });
     
		
	});

 app.get('/showUser', function(req, res) {
 
  return Users.find(function(err,users){
        if (err)
            res.send(404,err);
        res.json({'data':users});
    });
 });

 app.get('/deleteUser/:id', function(req, res) {
  var id = req.params.id;
  Users.findById(req.params.id,function(err,user){
        if (user)
            user.remove();
    });
    res.send({data:"delete"});
  
 
 });

app.get('/editUser/:id', function(req, res) {
  var id = req.params.id;
  Users.findById(req.params.id,function(err,user){
         res.send({data:user});
  
    });
   
 
 });

app.post('/editUserSave/:id', function(req, res) {
  var id = req.params.id;
  Users.findById(id,function(err,users){

            if (err)
                res.send(500,err);
           users.name = req.body.name,
            users.email = req.body.email,
            users.address = req.body.address

            users.save(function(err){
                if (err)
                    res.status(500,err);
                res.json(({data:'update'}));
            });
        });
   
 
 });













};
