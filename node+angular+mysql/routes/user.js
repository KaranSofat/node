exports.home = function(req, res){

req.getConnection(function(err,connection){

 var queryData =  "SELECT node_questions.question_name,node_questions.description,node_questions.id FROM node_questions LEFT JOIN node_user ON node_questions.user_id=node_user.id";
 

        var query = connection.query('SELECT node_questions.question_name,node_questions.description,node_questions.id FROM node_questions LEFT JOIN node_user ON node_questions.user_id=node_user.id;SELECT * FROM node_user ORDER BY points DESC LIMIT 5',function(err,rows)
        {
       
     var data =rows[0];
     var data2 = rows[1];
 
       res.json({
                data: data,
                 data2: data2
              });
      
         });
         
    });

};


/*exports.showLogin = function(req, res){
 if(req.session.userId!=undefined)
 {
  res.redirect('/user/dashboard');
 
 } 
res.render('login',{page_title:"Login",error:'',session:req.session.userId,email:req.session.email});

}*/
exports.login = function(req, res){
     var input = JSON.parse(JSON.stringify(req.body));
     var email = input.email;
     var password= input.password;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM node_user Where email = ? and password= ?',[email,password],function(err,rows)
        {
            if(rows == '')
            {
       
                res.json({
                data: 'login Detail Failed'
              });
            }
            else
            {
              var userId = rows[0].id;
              var email = rows[0].email;
              req.session.userId = userId;
              req.session.email = email;
             res.json({
                data: rows,
                 
              });
            }
     
       
                
           
         });
         
         //console.log(query.sql);
    });  
    
   
  // }

 //
  
};
exports.logout = function(req, res){
req.session.destroy();
 res.redirect('/user/login');

}
exports.dashboard = function(req, res){

 req.getConnection(function(err,connection){
 
 var id = req.session.userId;
console.log(id);
  //var queryData =  "SELECT node_questions.question_name,node_questions.description FROM node_questions LEFT JOIN node_user ON node_questions.user_id=node_user.id";
        var query = connection.query('SELECT node_questions.question_name,node_questions.id,node_questions.description FROM node_questions LEFT JOIN node_user ON node_questions.user_id=node_user.id ORDER BY node_questions.id DESC;SELECT * FROM node_user  WHERE id = ?',[id],function(err,rows)
        {
                 var data2 = rows[0];
                 var data3 = rows[1];
                
                res.json({
                data: data2,
                data3:data3
                 
              });
                
                // res.render('dashboard',{page_title:"Dashboard",session:req.session.userId,email:req.session.email,data:data3,dataQ:data2});
           
         });
         
        /*var async = require('async');
         async.parallel([
    function(callback) {
        var queryData = '' +
            ' SELECT node_questions.question_name,node_questions.description' +
            ' FROM node_questions' +
            ' LEFT JOIN node_user' +
            ' ON node_questions.user_id=node_user.id';
        connection.query(queryData, function (err, rows1) {
            if (err) {
                return callback(err);
            }
            return callback(null, rows1);
        });
    },
    function(callback) {
        connection.query('SELECT * FROM node_user Where id = ?', [id], function (err, rows2) {
            if (err) {
                return callback(err);
            }
            return callback(null, rows2);
        });
    }
], function(error, callbackResults) {
    if (error) {
        //handle error
        console.log(error);
    } else {
        console.log(callbackResults[0]); // rows1
        console.log(callbackResults[1]); // rows2
        // use this data to send back to client etc.
    }
});
         */
         
    
    });  


};


exports.register = function(req, res){
 var input = JSON.parse(JSON.stringify(req.body));
 console.log(input);
 req.getConnection(function (err, connection) {
         var transporter = req.app.get('transporter');
        var data = {
            
            email    : input.email,
            password : input.pass
     
        
        };
       
        transporter.sendMail({
         from: "test@gmail.com", // sender address
         to: input.email, // comma separated list of receivers
         subject: "Stack Account ✔", // Subject line
         text: "Hello Your account has been created with stack account haveing email= "+input.email+" and password is: "+input.pass // plaintext body
      }, function(error, response){
         if(error){
             console.log(error);
         }else{
             console.log("Message sent: " + response.message);
         }
      });
      
        
        var query = connection.query("INSERT INTO node_user set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/user/login');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
  
};
exports.addQuestion = function(req, res){

var input = req.body; 
 req.getConnection(function (err, connection) {  
 var data = {
            
            question_name    : input.title,
             	description : input.description,
             		user_id : req.session.userId
     
        
        };
        
        var query = connection.query("INSERT INTO node_questions set ? ",data, function(err, rows)
        {
  
          if (err)
          {
           res.json({
                  data: query.sql
                   
                });
          
          }   
         
         else
         {
         
          res.json({
                data: 'add Question'
                 
              });
         }
          
        });
 });

};
exports.paypal = function(req, res){
var paypal = require('paypal-rest-sdk');
var config = {
  "port" : 5000,
  "api" : {
    "host" : "api.sandbox.paypal.com",
    "port" : "",            
    "client_id" : "AQV7SWL3j0DXLQ8lkWdtwbVkEf19_c-DWhKGcEMBuRmLShCMy7IZI-SjqOdGK9pmw6j_Kl14r6bU__9O",  // your paypal application client id
    "client_secret" : "EOEsosZxySTotyYcfYTaNm5Rnf5IEWNxwOs9GxNQrb2wUi3pm4t1niJivxIdR6oHVVUUUlaw3UbLvJGu" // your paypal application secret id
  }
}
 
paypal.configure(config.api);

  var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": "http://localhost:4300/user/sucess",
    "cancel_url": "http://localhost:4300/user/cancel"
  },
  "transactions": [{
    "amount": {
      "total":parseInt(req.body.amount),
      "currency":  req.body.currency
    },
    "description": req.body.description
  }]
};
paypal.payment.create(payment, function (error, payment) {
if (error) {
    console.log(error);
  }
else {
    if(payment.payer.payment_method === 'paypal') {
      req.paymentId = payment.id;
      var redirectUrl;
      console.log(payment);
      for(var i=0; i < payment.links.length; i++) {
        var link = payment.links[i];
        if (link.method === 'REDIRECT') {
          redirectUrl = link.href;
        }
      }
      
      console.log("response");
     // console.log(res);
      res.redirect(redirectUrl);
    }
  }

});

};
exports.paypalForm = function(req, res){

console.log('paypal');
res.render('paypal',{page_title:"Paypal",session:req.session.userId,email:req.session.email});
};
exports.sucess = function(req, res){
res.render('success',{page_title:"Paypal",session:req.session.userId,email:req.session.email});

};
exports.cancel = function(req, res){
res.render('cancel',{page_title:"Paypal",session:req.session.userId,email:req.session.email});
};
exports.profile = function(req, res){
 var id = req.params.id;
 
 req.getConnection(function (err, connection) {
  var query = connection.query('SELECT node_questions.question_name,node_questions.description FROM node_questions LEFT JOIN node_user ON node_questions.user_id=node_user.id  Where node_questions.user_id = ? ; SELECT * FROM node_user Where id = ?', [id,id], function(err, rows)
        {
      // console.log(rows);
var dataQ = rows[0];
     //  var query = connection.query('SELECT node_questions.question_name,node_questions.description FROM node_questions LEFT JOIN node_user ON node_questions.user_id=node_user.id;SELECT * FROM node_user  WHERE id = ?',[id],function(err,rows)
       
            res.json({
                data: rows[1],
                 data2: dataQ
              });
         // res.render('profile',{page_title:"Profile",session:req.session.userId,email:req.session.email,data:rows[1],dataQ:dataQ});
        });


  });
};

exports.settings = function(req, res){
var id = req.session.userId;

req.getConnection(function (err, connection) {
  var query = connection.query(' SELECT * FROM node_user Where id = ?', [id], function(err, rows)
        {

console.log(rows);
     //  var query = connection.query('SELECT node_questions.question_name,node_questions.description FROM node_questions LEFT JOIN node_user ON node_questions.user_id=node_user.id;SELECT * FROM node_user  WHERE id = ?',[id],function(err,rows)
       
       
          res.render('settings',{page_title:"settings",session:req.session.userId,email:req.session.email,data:rows});
        });


  });

};
exports.saveInfo = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body))
  var uuid = require('node-uuid');
  var randomNumber = uuid.v4();
  var fs = require('fs');
  var tmp_path = req.files.file.path;
    var target_path = './public/images/' + req.files.file.name +  randomNumber;
   
    fs.rename(tmp_path, target_path, function(err) {
       // if (err) throw err;
      
        fs.unlink(tmp_path, function() {
           // if (err) throw err;
            //res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
        });
      });
  
console.log(req.files.file.name);
  if(req.files.file.name == "")
  {
    var imageName = input.oldFile + randomNumber;
   
   }
   else
   {
  var imageName = req.files.file.name +  randomNumber;
    
   }
      
var id = req.session.userId;
req.getConnection(function (err, connection) {
    
        var data = {
            
            name    : input.name,
            email : input.email,
            profile   : input.description,
            skills   : input.skills, 
            image    :  imageName
        };
        
          var query =  connection.query("UPDATE node_user set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
       
          res.redirect('/user/dashboard');
          
        });
      //console.log(query.sql);
    });


}
exports.deleteQ = function(req, res){
 var id = req.params.id;
 req.getConnection(function (err, connection) {
 
 var query =  connection.query("DELETE FROM  node_questions WHERE id = ? ",[id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
              
               res.json({
                data:query.sql
                 
              });
              
              })
 
 
 })
 
              
              }
              
 exports.showQuestion = function(req, res){
 var id = req.params.id;
 req.getConnection(function (err, connection) {
  var query = connection.query('SELECT node_questions.question_name,node_questions.user_id,node_questions.id,node_questions.description,node_user.name FROM node_questions LEFT JOIN node_user ON node_questions.user_id=node_user.id  Where node_questions.id = ?; SELECT count(*) as Likes FROM node_view_status Where question_id = ? AND status =1', [id,id], function(err, rows)
        {
         
          if (err)
              console.log("Error Updating : %s ",err );
              
               res.json({
                data:rows[0],
                  data2:rows[1]
                 
              });
          
        });
 
 
 })
 
 }             
  
  exports.answer = function(req, res){

 var input = JSON.parse(JSON.stringify(req.body));
   req.getConnection(function (err, connection) {  
   var data = {
            
            question_id    : input.question_id,
             	answer : input.answer,
             		user_id : input.user_id

        };
        
        
        
        var query = connection.query("INSERT INTO node_answers set ? ;SELECT node_user.name,node_answers.answer FROM node_answers LEFT JOIN node_questions ON node_questions.id=node_answers.question_id LEFT JOIN node_user ON node_user.id = node_questions.user_id Where node_answers.question_id = ?",[data,input.question_id], function(err, rows)
        {
  
  
          if (err)
          {
           res.json({
                  data: query.sql
                   
                });
          
          }   
         
         else
         {
         
          res.json({
                data: 'addAnswer',
                 data2: rows[1]
              });
         }
          
        });
 });
  
  
  }             
              
    exports.showAnswer = function(req, res){
    var id = req.params.id;
     req.getConnection(function (err, connection) {  
    var query = connection.query("SELECT node_user.name,node_answers.answer FROM node_answers LEFT JOIN node_questions ON node_questions.id=node_answers.question_id LEFT JOIN node_user ON node_user.id = node_questions.user_id  Where node_answers.question_id = ? ORDER BY node_answers.id DESC" , [id],function(err, rows)
        {
  
          if (err)
          {
           res.json({
                  data: query.sql
                   
                });
          
          }   
         
         else
         {
         
          res.json({
                 data2: rows
              });
         }
          
        });
 });
    
    
    }    
    
exports.like = function(req, res){
 var id = req.params.id;
 var userId = req.params.userId;
req.getConnection(function (err, connection) { 
   var data = {
            
            question_id : id,
             	status : 1,
             		user_id : userId

        };
   
   var query = connection.query("INSERT INTO node_view_status set ?;SELECT count(*) as Likes FROM node_view_status Where question_id = ? AND status =1",[data,id], function(err, rows)
   {
    if (err)
          {
           res.json({
                  data: err
                   
                });
          
          }   
         
         else
         {
         
          res.json({
                 data: 'add Like Succesfully',
                  data2: rows[1]
              });
         }
          
   
   
   })
  
  
  })
 




}          
              
              
              
              
              
