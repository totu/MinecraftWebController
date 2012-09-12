/*  app.js                                                             	    *
 *	Simple node.js Minecraft Server Web Controller v.1.1 by Topi Tuulensuu  *
 *  Note: This is made with Mojang's server application in mind, your		*
 *  experience with other servers (e.g. Bukkit) may vary!					*
 *	Contact: topi.tuulensuu@student.hamk.fi                                 */
 
//Setting up http, socket.io and express 
var express = require('express');
var app = express()
  , http = require('http')
  , webserver = http.createServer(app)
  , io = require('socket.io').listen(webserver);

//Server port
webserver.listen(8080);

//Setting variables
var proc = require('child_process')
  , server_list = require('./serverlist')
  ,	server = null
  , java_server = null;

//Get index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


//Main function - When client connects
io.sockets.on('connection', function(socket) {
	
	//When client asks for server list
	socket.on('get_server_list', function() {
		//Send server list
		socket.emit('server_list', server_list);
	});
	
	//When client asks for server status
	socket.on('get_status', function() {
		//Send server status
		socket.emit('status', server);
	});
	
	//When the client wants to start a server
	socket.on('start_server', function(name) {
		//If a server is already running or server name doesn't exist in serverlist.js
		if (java_server || !server_list[name]) {
			//Send fail with the command
			socket.emit('fail', 'start_server');
			//Stop execution
			return;
		}
		
		//Set server to correspond the name of the server client wants to run
		server = name;
		
		//start java_server
		java_server = proc.spawn(
			'java',
			['-Xmx1536M', '-Xms1536M', '-jar', 'server.jar', 'nogui'],
			{ cwd: 'D:/minecraft/' + server + '/' }
		);
		
		//Send status of the server to client
		io.sockets.emit('status', server);
		
		//Get java_server out put
		java_server.stdout.on('data', function (data) {
			if (data) {
				//Send it to the client
				io.sockets.emit('console', ""+data);
			}
		});
		
		//Get java_server errors
		java_server.stderr.on('data', function (data) {
			if (data) {
				//Send them to the client
				io.sockets.emit('console', ""+data);
			}
		});
		
		//When server shuts down
		java_server.on('exit', function() {
			//Clear variables and send new status
			java_server = server = null;
			io.socket.emit('status', null);
		});
		
	});
	
	//When client sends server command
	socket.on('command', function(cmd) {
		if (java_server) {
			//Send the command to client
			io.sockets.emit('console', "<span style='color:red;text-shadow:1px 1px #000'>[Server]: " + cmd + '</span>');
			//...And to the server
			java_server.stdin.write(cmd + "\r");
		} else {
			//Else send fail
			socket.emit('fail', cmd);
		}
	});
});

//Allows for commands to be typed into the Console Window to control the MC Server
process.stdin.resume();
process.stdin.on('data', function (data) {
	if (java_server) {
		java_server.stdin.write(data);
	}
});