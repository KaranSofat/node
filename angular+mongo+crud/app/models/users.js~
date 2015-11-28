// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('users', {
	name : {type : String, default: ''},
	email : {type : String, default: ''},
	address : {type : String, default: ''},
  comments: [{ 
   	uname : {type : String, default: ''},
	  uemail : {type : String, default: ''},
	  comment : {type : String, default: ''}
    }]
});
