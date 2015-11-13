exports.index = function(req, res){
/*var Promise = require('bluebird');
var getConnection = Promise.promisify(req.getConnection, req);

getConnection().then(function(connection) {

    Promise.promisifyAll(connection);
    return connection.queryAsync('SELECT node_questions.question_name,node_questions.description FROM node_questions LEFT JOIN node_user ON node_questions.user_id=node_user.id;SELECT * FROM node_user ORDER BY points DESC LIMIT 5');
}).spread(function(rows, fields) {
     // process result here
     console.log("rows = ", rows);
     var data = rows[0];
     var data2 = rows[1];
   //  console.log(data);
     //console.log(data2);
     
     res.render('index', {
         page_title: 'Welcome',
         session: req.session.userId,
         email: req.session.email,
         data: data,
         data2: data2
     });
}, function(err) {
     // process error here
});*/

req.getConnection(function(err,connection){

 var queryData =  "SELECT node_questions.question_name,node_questions.description FROM node_questions LEFT JOIN node_user ON node_questions.user_id=node_user.id";
 

        var query = connection.query('SELECT node_questions.question_name,node_questions.description FROM node_questions LEFT JOIN node_user ON node_questions.user_id=node_user.id;SELECT * FROM node_user ORDER BY points DESC LIMIT 5',function(err,rows)
        {
       
     var data =rows[0];
     var data2 = rows[1];
      console.log(data);
      console.log(data2);
       connection.end();
             res.render('index', { page_title: 'Welcome',session:req.session.userId,email:req.session.email,data:data,data2:data2});
         });
         
    });
};
exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};







