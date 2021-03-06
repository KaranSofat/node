module.exports = function(app) {
var Users = require("../app/models/users");
var Comments = require("../app/models/comment");

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

app.post('/search', function(req, res) {

var input = JSON.parse(JSON.stringify(req.body));
Users.find( { $or:[ {'email':input.email}, {'address':input.address} ]}, 
  function(err,users){
   res.json(({data:users}));
   
});
/*Users.find({email: input.email,address:input.address}, function(err, users) {
   res.json(({data:users}));
  
  
});*/


});

app.post('/view/:id', function(req, res) {
var id = req.params.id;
Users.findById(id,function(err,users){
res.json({data:users});
 
 });

});
app.post('/comments/:id', function(req, res) {
var id = req.params.id;
var input = JSON.parse(JSON.stringify(req.body));

Users.findByIdAndUpdate(id, {$push: {"comments":{
     uname: req.body.name,
     uemail : req.body.email,
     comment: req.body.comment,
     posted_at: Date.now() 
   } 
 }
}).exec(function(error, response){

 Users.findById(id,function(err,user){
         res.send({data:user});
  
    });
   



});


});

app.get('/commentsEdit/:id/:mainId', function(req, res) {
var id = req.params.id;
var mainId = req.params.mainId;

Users.find({"_id": mainId}, { comments: { $elemMatch: { _id: id }}})
     .exec(function(err, data) {
         if(err){
           console.log(err)
        }
        else{
          res.send({data:data});
        }
})


})
app.post('/commentsSave/:id', function(req, res) {
var id = req.params.id;
var input = JSON.parse(JSON.stringify(req.body));
var commentId = input.id;
var name  = input.name;
var email = input.email;
var comment = input.comment
Users.update({'comments._id': input.id}, 
  {
      $set: {
          'comments.$.uname': name,
          'comments.$.uemail': email,
          'comments.$.ucomment': comment
          }
  },function(error, result){
    if(error){
      console.log(error);
    }
    else{
res.send({data:'success'});
    }
})



})
app.post('/deleteComment/:id', function(req, res) {
var input = JSON.parse(JSON.stringify(req.body));
var id = req.params.id;
var userId = input.uid;
 Users.findOneAndUpdate(
        {_id: userId}, 
        {$pull: {comments: {_id: id}}},
        function(err, data){
           if(err) return err;
           res.send({data:data});
    });
})



};
