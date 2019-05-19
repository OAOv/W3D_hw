var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 3000;
server.listen (port, function() {
  console.log ('listening on port ' + port)
});

app.get ('/', function (req, res) {
	res.sendFile (__dirname + "/hw5.html");
});

app.get ('/change', function (req, res) {
	let name = req.query.nickname;
	console.log (name + ' is on ...');
	res.sendFile (__dirname + '/hw5p.html');
});

//////////////////////////

var names = [];
var numOfUsers = 0;
var msgs = [];
var flag = 1;

io.on('connect', function(socket){
  console.log ('a user connected with socket');

  socket.on('toggle', function(name) {
  	console.log ('user: ' + name);
  	names.push(name);
  	numOfUsers++;

  	for(var i = 0; i < numOfUsers - 1; i++) {
  		if(names[i] == name) {
  			console.log('same nickname!');
  			socket.emit ('used', name);
  			names.pop();
  			numOfUsers--;
  			flag = 0;
  		}
  	}

  	if(flag) {
  		socket.username  = name;
  		socket.emit('preMsg', msgs);
  		io.emit('newUser', name);
  		msgs.push("Welcome, " + name);
  	}
  	flag = 1;
  });

	socket.on('sendMsg', function(msg) {
		console.log('msg: ' + msg);
		msgs.push(msg);
		io.emit('postMsg', msg); 
	});

	socket.on('disconnect', function() {
		console.log(socket.username + ' exit.');
		io.sockets.emit('postMsg', socket.username  + ' has left the chat room.');
	});
});