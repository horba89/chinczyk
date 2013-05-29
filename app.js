/*jshint node: true */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
	app.set('gracze', { 																							
		gracz: [
			{'id': 0, 'nazwa': '', 'pionki': {'0': 0, '1': 0, '2': 0, '3': 0}, 'start': false}, 
			{'id': 1, 'nazwa': '', 'pionki': {'0': 0, '1': 0, '2': 0, '3': 0}, 'start': false},
			{'id': 2, 'nazwa': '', 'pionki': {'0': 0, '1': 0, '2': 0, '3': 0}, 'start': false}, 			
			{'id': 3, 'nazwa': '', 'pionki': {'0': 0, '1': 0, '2': 0, '3': 0}, 'start': false}, 	
		],
		
		kolejka: null,
		ilosc_graczy: 0
		});
});

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});

var io = require('socket.io');
var socket = io.listen(server);

socket.on('connection', function (client) {
    'use strict';
    var username;
	var id = null;
	var incoming;
	var gracze = app.get('gracze');
	
    //client.send('Witaj!');
    //client.send('Podaj nazwę użytkownika: ');
		
    client.on('message', function (msg) {
        if (id == null) {
			incoming = JSON.parse(msg);
			if (incoming.nick != null) {
				id = gracze.ilosc_graczy;
				gracze.ilosc_graczy ++;
				username = incoming.nick;
				gracze.gracz[id].nazwa = incoming.nick;
				
				client.json.emit('json', '{"gracze":'+ JSON.stringify(gracze)+', "myid": '+id+'}' );
				client.json.broadcast.emit('json', '{"gracze":'+ JSON.stringify(gracze)+', "id": '+id+'}' );
					
				client.json.send('{"msg": "Witaj ' +username+'","myid":'+id+'}');
				client.json.broadcast.emit('message','{"msg": "Nowy użytkownik: '+ username+'","id":'+id+'}');
			}
			
            return;
        }
			incoming = JSON.parse(msg);
			if (incoming.msg != null) {
					
					
				client.json.emit('message','{"gracz": '+id+', "msg": "' + incoming.msg +'"}');
				client.json.broadcast.emit('message','{"gracz": '+id+', "msg": "' + incoming.msg + '"}');
				
			}
        //client.broadcast.emit('message', username + ': ' + msg);
		//client.emit('message', username + ': ' + msg);
    });
	
	client.on('start', function (msg) {
		gracze.gracz[id].start = true;
		var ilosc = 0;
		for (var i =0; i<4; i++) {
			if(gracze.gracz[i].start === true){
				ilosc++;
			}
		}
		console.log("start: %d", ilosc);
		if(ilosc === gracze.ilosc_graczy){
			client.emit('start', true);
			client.broadcast.emit('start', true);
			gracze.kolejka = 0;
		}
	});
	
	client.on('losuj', function(msg) { //wylosowac numer oczka
		var los = Math.floor((Math.random()*6)+1);
		client.emit('losuj', los);
		client.broadcast.emit('losuj', los);
	});
	
});

