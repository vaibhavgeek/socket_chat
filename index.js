var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var chatsController = require('./controllers/chats');
var usersController = require('./controllers/users');

app.set('view engine' , 'ejs');
app.use(express.static('./public'));
users = [];
connections = [];


server.listen(process.env.PORT || 3000);
console.log("server running");


chatsController(app);
usersController(app);



/*

 var vaibhav = new User({
    name: 'Vaibhav Maheshwari',
    email: 'vaibhav.dkm@gmail.com'
  });

 var bahu = new Chat({
    name: 'Mahendra Bahubali',
    email: 'bahu@gmail.com'
  });



  var list = [vaibhav, bahu]
  Chat.insertMany(list);
*/
app.get('/',function(req,res) {
	res.sendFile(__dirname + '/index.html')
});



io.sockets.on('connection',function(socket) {
	connections.push(socket);
	console.log("Connected: %s sockets connected", connections.length);

	//Disconnect 
	socket.on('disconnect', function(data){
	//if(!socket.username) return;
	users.splice(users.indexOf(socket.username),1);
	connections.splice(connections.indexOf(socket) , 1);
	console.log("Disconnected: %s sockets connected", connections.length);
	UpdateUserNames();

 	});

 	socket.on('send message', function(data){
 		io.sockets.emit('new message' , { msg: data});
 	});
 	socket.emit('send message' ,"Hello World! ");


 	socket.on('new user', function(data,callback){
 		callback(true);
 		socket.username = data;
 		users.push(socket.username);
 		UpdateUserNames();
 	});

 	function UpdateUserNames(){
 		io.sockets.emit('get users' , users);
 	}
});

