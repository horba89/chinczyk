/*jshint node: true */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var gra;

var showki = [
		[{x: 0, y: 9}, {x: 1, y: 9}, {x: 0, y: 10}, {x: 1, y: 10}],
		[{x: 9, y: 0}, {x: 10, y: 0}, {x: 9, y: 1}, {x: 10, y: 1}],
		[{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
		[{x: 9, y: 9}, {x: 10, y: 9}, {x: 9, y: 10}, {x: 10, y: 10}]
	];
var pola = [{x: 5, y: 5},
		{x: 4, y: 10}, {x: 4, y: 9}, {x: 4, y: 8}, {x: 4, y: 7}, {x: 4, y: 6},
		{x: 3, y: 6}, {x: 2, y: 6}, {x: 1, y: 6}, {x: 0, y: 6}, {x: 0, y: 5},
		{x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}, {x: 3, y: 4}, {x: 4, y: 4},
		{x: 4, y: 3}, {x: 4, y: 2}, {x: 4, y: 1}, {x: 4, y: 0}, {x: 5, y: 0},
		{x: 6, y: 0}, {x: 6, y: 1}, {x: 6, y: 2}, {x: 6, y: 3}, {x: 6, y: 4},
		{x: 7, y: 4}, {x: 8, y: 4}, {x: 9, y: 4}, {x: 10, y: 4}, {x: 10, y: 5},
		{x: 10, y: 6}, {x: 9, y: 6}, {x: 8, y: 6}, {x: 7, y: 6}, {x: 6, y: 6},
		{x: 6, y: 7}, {x: 6, y: 8}, {x: 6, y: 9}, {x: 6, y: 10}, {x: 5, y: 10}
	];
var domki = [
		[{x: 5, y: 9}, {x: 5, y: 8}, {x: 5, y: 7}, {x: 5, y: 6}],
		[{x: 5, y: 1}, {x: 5, y: 2}, {x: 5, y: 3}, {x: 5, y: 4}],
		[{x: 9, y: 5}, {x: 8, y: 5}, {x: 7, y: 5}, {x: 6, y: 5}],
		[{x: 1, y: 5}, {x: 2, y: 5}, {x: 3, y: 5}, {x: 4, y: 5}]
	];

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
	app.set('gracze', {
		gracz: [
			{'id': 0, 'nazwa': '', 'pionki': [ 0, 0, 0, 0], 'start': false},
			{'id': 1, 'nazwa': '', 'pionki': [ 0, 0, 0, 0], 'start': false},
			{'id': 2, 'nazwa': '', 'pionki': [ 0, 0, 0, 0], 'start': false},
			{'id': 3, 'nazwa': '', 'pionki': [ 0, 0, 0, 0], 'start': false}
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


function emitAll(client, nazwa, co) { //wysyłanie do siebie i do reszty
	'use strict';
	client.emit(nazwa, co);
	client.broadcast.emit(nazwa, co);
}
function emitAllJSON(client, nazwa, co) {  
	'use strict';
	client.json.emit(nazwa, co);
	client.json.broadcast.emit(nazwa, co);
}

function ZmianaKolejki() {                  // zmienia kolejke na kolejnego gracza
	'use strict';
	var gra = app.get('gracze');
	// Zmiana kolejki na następnego gracza
	if (gra.kolejka < gra.ilosc_graczy - 1) {  // jezeli false zmienia na 1 gracza
		gra.kolejka++;
	} else {
		gra.kolejka = 0;
	}
}
// Różnica pól między poszczególnymi graczami
function Roznica(id_gracza) {
	var roznica = 0;
	if (id_gracza === 1) {
		roznica = 20;
	} else if (id_gracza === 2) {
		roznica = 30;
	} else if (id_gracza === 3) {
		roznica = 10;
	}
	return roznica;
}
// g - id gracza, nr_pola - pole do sprawdzenia
function PrzeliczNrPola(g, nr_pola) {    //przelicza pozycje na pozycje gracza 0
	'use strict';
	var roznica = Roznica(g), moje_pole;
	// Z jego 1 na moje 10, 20 lub 30
	
	moje_pole = nr_pola + roznica;

	if (moje_pole < pola.length) {
		return moje_pole;
	}

	return moje_pole - pola.length + 1;


}

function PoleZajete(id, nr_pola, moj) { 
	if (moj === true){
		for (var i = 0; i < 4; i++) {
			if (gra.gracz[id].pionki[i] === nr_pola) {   //jak numer pola sprawdzonego jest taki sam z numerem w tablicy pionki to wtedy pole jest zajete
				return true;
			}
		}
		return false;
	} 
	for (var i = 0; i < 4; i++) {  // i numer gracza, j numer pionka, jak i = id to gracz dla ktorego jest sprawdzane
		for (var j = 0; j < 4; j++) {
			if (i === id) { // To nasze pionki
				
			} else {
				if (nr_pola <= 40 && gra.gracz[i].pionki[j] === PrzeliczNrPola(i, nr_pola)) { // zeby pomijac pionki w domkach
					return {gracz: i, pionek: j};
				}
			}
		}
	}
	return false;
	
}

function RuchMozliwy(id, los) { // sprawdza czy mozna wykonac ruch
	var mozliwy = false;
	var p = 0;
	for (var i = 0; i < 4; i++) {
		if(gra.gracz[id].pionki[i] != 0 && gra.gracz[id].pionki[i] + los > 44 ||
			gra.gracz[id].pionki[i] == 0 && los !== 6 ||
			gra.gracz[id].pionki[i] > 0 && gra.gracz[id].pionki[i] + los < 44 && PoleZajete(id, gra.gracz[id].pionki[i] + los, true) !== false
			) {
			//mozliwy = false;
		}
		else {
			mozliwy = true;
			p++;
		}
	}
	console.log(p + " pionków może się ruszyć");
	return mozliwy;
	
}
	
function KoniecGry() {

	var dom = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (gra.gracz[i].pionki[j] > 40) dom++;
		}
		if (dom === 4) return i;
	}
	
	return false;
}

socket.on('connection', function (client) {
    'use strict';
    var username;
	var id = null;
	var incoming;
	var pierwsze3 = true;
	var ruchow = 0;
	var los;
	gra = app.get('gracze');

    //client.send('Witaj!');
    //client.send('Podaj nazwę użytkownika: ');

    client.on('message', function (msg) {
        if (id == null) {
			incoming = JSON.parse(msg);
			if (incoming.nick != null && gra.ilosc_graczy < 4) {
				id = gra.ilosc_graczy;
				gra.ilosc_graczy++;
				username = incoming.nick;
				gra.gracz[id].nazwa = incoming.nick;

				client.json.emit('json', '{"gracze":' + JSON.stringify(gra) + ', "myid": ' + id + '}');
				client.json.broadcast.emit('json', '{"gracze":' + JSON.stringify(gra) + ', "id": ' + id + '}');

				client.json.send('{"msg": "Witaj ' + username + '","myid":' + id + '}');
				client.json.broadcast.emit('message', '{"msg": "Nowy użytkownik: ' + username + '","id":' + id + '}');
			}

            return;
        }
		incoming = JSON.parse(msg);
		if (incoming.msg != null) {		
			// client.json.emit('message','{"gracz": '+id+', "msg": "' + incoming.msg +'"}');
			// client.json.broadcast.emit('message','{"gracz": '+id+', "msg": "' + incoming.msg + '"}');
			emitAllJSON(client, 'message', '{"gracz": ' + id + ', "msg": "' + incoming.msg +'"}');
		}
        //client.broadcast.emit('message', username + ': ' + msg);
		//client.emit('message', username + ': ' + msg);
    });

	client.on('start', function (msg) {
		gra.gracz[id].start = true;
		var ilosc = 0;
		for (var i =0; i<4; i++) {
			if(gra.gracz[i].start === true){
				ilosc++;
			}
		}
		console.log("start: %d", ilosc);
		if(ilosc === gra.ilosc_graczy && gra.ilosc_graczy >= 2 ){
			
			emitAll(client, 'start', true);
			gra.kolejka = 0;
		}
	});
	
	client.on('losuj', function(msg) {
		// losowanie tylko jak kolejka należy do gracza, który wysłał pakiet
		if(gra.kolejka != null && gra.kolejka == id){
			//wylosowac numer oczka
			los = Math.floor((Math.random()*6)+1);
			
			// client.emit('losuj', los);
			// client.broadcast.emit('losuj', los);
			emitAll(client, 'losuj', los);
			ruchow++;
			
			if (los == 6) { pierwsze3 = false; } // Wyłączenie trybu startowego 3 losowania w kolejce
			
			//console.log(los != 6  && ruchow >= 3);
			// Przejście kolejki do następnego gracza
			if(RuchMozliwy(id, los) === false
				|| (gra.gracz[id].pionki[0] == 0 || gra.gracz[id].pionki[1] == 0 || 
				gra.gracz[id].pionki[2] == 0 || gra.gracz[id].pionki[3] == 0) && los != 6 && ruchow >= 3 
				||/* */ (pierwsze3 == false && los != 6) || (los != 6  && ruchow >= 3) )
			{ 
				// Jak wszystkie pionki w schowku, resetujemy ilość ruchów, umożliwia 3 losy
				if(pierwsze3 && ruchow >= 3 ) { 
					ruchow = 0;
					ZmianaKolejki();
					// Wysłanie kolejki do graczy
					emitAll(client, 'kolejka', gra.kolejka);
				}
				// Zmiana kolejki na następnego gracza
				// Po wysłaniu pionka lub po 3 próbach
			}
			else {// ten sam gracz
				
			}
		}
	});
	
	
	client.on('pionek', function (msg) {
		var stan_pola;
		// tylko jak kolejka należy do gracza, który wysłał pakiet
		if(gra.kolejka != null && gra.kolejka == id && los !== null){
			if(/* (gra.gracz[id].pionki[0] != 0 || gra.gracz[id].pionki[1] != 0 || 
				gra.gracz[id].pionki[2] != 0 || gra.gracz[id].pionki[3] != 0)
				||  */(pierwsze3 == false && los !== 6)
				|| (los !== 6  && ruchow >= 3) ) // jak sie wylosuje 6 to ma nie zmieniac kolejki
				{
					ZmianaKolejki();
					// Wysłanie kolejki do graczy
					emitAll(client, 'kolejka', gra.kolejka);
				}
			var pion = parseInt(msg);  // dostaje od klienta nr pionka ktorym rusza
			console.log("recv pion:" + pion + ";msg:" + msg + ",los:" + los);
			if(los === 6 && gra.gracz[id].pionki[pion] === 0) {
				//ustawia pionek na pierwsze pole
				gra.gracz[id].pionki[pion] = 1;
				
				// PoleZajete(1,PrzeliczNrPola(1,8),false) Z jego nr pola na nasze i sprawdzamy
				stan_pola = PoleZajete(id, PrzeliczNrPola(id, gra.gracz[id].pionki[pion]), false);
				if(stan_pola !== false) {
					gra.gracz[stan_pola.gracz].pionki[stan_pola.pionek] = 0;     // zbija pionek do schowka
				}
				
				//los = 1; // myk by przeniosło tylko na 1 pole
				
			} else if (gra.gracz[id].pionki[pion] <= 40) {
				
				gra.gracz[id].pionki[pion] += los;
				
				// PoleZajete(1,PrzeliczNrPola(1,8),false) Z jego nr pola na nasze i sprawdzamy
				stan_pola = PoleZajete(id, PrzeliczNrPola(id, gra.gracz[id].pionki[pion]), false);
				if(stan_pola !== false) {
					gra.gracz[stan_pola.gracz].pionki[stan_pola.pionek] = 0;
					console.log("recv pion:zbijam" + id + ";gracz:" + stan_pola.gracz + ",zbity p:" + stan_pola.pionek);
				}
				// Jak brak pionków, utrata kolejki
				
			}
			
			client.json.broadcast.emit('pionek', { id: id, poz: gra.gracz[id].pionki[pion], "pionek": pion});
			los = null;
			
			var koniecGry = KoniecGry();
			if (koniecGry !== false) {
				emitAll(client, 'koniec', koniecGry);
			}			
		
		}
	});
	
	
});
