exports.index = function(req, res){
var id = req.session.userId;
var email = req.session.email;
res.render('index', { page_title: 'Welcome',id:id,email:email});

};
exports.templates = function (req, res) {
  var name = req.params.name;
  console.log(name);
  res.render('templates/' + name);
};







