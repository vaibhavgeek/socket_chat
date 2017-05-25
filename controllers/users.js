var mongoose = require('mongoose');    
var db_uri = 'mongodb://vaibhavgeek:vedicmaths@ds143231.mlab.com:43231/vedicmathsbot';

mongoose.Promise = global.Promise

mongoose.connect(db_uri);

var db = mongoose.connection;

var userSchema = mongoose.Schema({
    name: String,
    email: String
 });

  // Store song documents in a collection called "songs"
 var User = mongoose.model('users', userSchema);




module.exports = function(app){
	
	app.get('/users/:id' , function(req,res) {
		res.render('users/new' , {data : req.params});
	});

	app.post('/users/:id' , function(req,res) {
		var vaibhav = new User({
    		name: 'Vaibhav Maheshwari',
    		email: 'vaibhav.dkm@gmail.com'
 		});
		var list = [vaibhav]
  		User.insertMany(list);
		console.log(req.params);
		res.render('chats/chat' , {data : "Success" , id: req.params.id });
	});


	
}