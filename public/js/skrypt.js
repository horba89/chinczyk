/*jshint node: true, browser: true, jquery: true */
/*global io: false */
function Draw() {
	var plotno = $('#plotno')[0];
		if(plotno.getContext) {
			var kontekst = plotno.getContext('2d');
			kontekst.strokeStyle = "rgb(0, 0, 0)";
			kontekst.fillStyle = "rgb(240, 230, 220)";
			
						kontekst.font = "14pt Arial";
						kontekst.textAlign = "center";
						kontekst.textBaseline = "middle";
						
			// kontekst.fillRect(0,0,100,100);
			// kontekst.strokeRect(0,0,100,100);
			var szerokosc = 550;
			var pole = szerokosc / 11; // Szerokość / ilość pól
			
			var gracz_s = [ "rgb(25, 22, 15)", "rgb(5, 50, 75)", "rgb(5, 15, 0)", "rgb(50, 5, 5)"];
			var gracz_f = [ "rgb(250, 220, 150)", "rgb(10, 200, 250)", "rgb(40, 210, 40)", "rgb(220, 40, 40)"];
			
			for(var i=0; i<11; i++){
				for(var j=0; j<11; j++){
					
					if((i!=5 && (j==4 || j==6)) || (j!=5 && (i==4 || i==6)) || ( i==5 && (j==0 || j==10) || j==5 && (i==0 || i==10) )){
						
						RysujPole(i,j,pole,kontekst, "kwadrat");
					}
					else if(i==5 && j>0 && j<5){
						kontekst.save();
						//gracz0
						kontekst.strokeStyle = gracz_s[0];
						kontekst.fillStyle = gracz_f[0];
						
						RysujPole(i,j,pole,kontekst, "kolo");
						
						kontekst.restore();
					
					}
					else if(j==5 && i>0 && i<5){
						kontekst.save();
						//gracz2
						kontekst.strokeStyle = gracz_s[1];
						kontekst.fillStyle = gracz_f[1];
						
						RysujPole(i,j,pole,kontekst, "kolo");
						
						kontekst.restore();
					
					}
					else if(i==5 && j>5 && j<10){
						kontekst.save();
						//gracz2
						kontekst.strokeStyle = gracz_s[3];
						kontekst.fillStyle = gracz_f[3];
						
						RysujPole(i,j,pole,kontekst, "kolo");
						
						kontekst.restore();
					
					}
					else if(j==5 && i>5 && i<10){
						kontekst.save();
						//gracz2
						kontekst.strokeStyle = gracz_s[2];
						kontekst.fillStyle = gracz_f[2];
						
						RysujPole(i,j,pole,kontekst, "kolo");
						
						kontekst.restore();
					
					}

					if(i==4 && j==0){
						kontekst.save();
						//gracz2
						kontekst.strokeStyle = gracz_s[0];
						kontekst.fillStyle = gracz_f[0];
						
						RysujPole(i,j,pole,kontekst, "kolo");
						
						kontekst.fillStyle = "black";
						kontekst.fillText("Start",j*pole+(pole/2)-1,i*pole+(pole/2),pole);
						kontekst.restore();
						
					}
					else if(i==0 && j==6){
						kontekst.save();
						//gracz2
						kontekst.strokeStyle = gracz_s[1];
						kontekst.fillStyle = gracz_f[1];
						
						RysujPole(i,j,pole,kontekst, "kolo");
						
						kontekst.fillStyle = "black";
						kontekst.fillText("Start",j*pole+(pole/2)-1,i*pole+(pole/2),pole);
						kontekst.restore();
						
					}
					else if(i==10 && j==4){
						kontekst.save();
						//gracz2
						kontekst.strokeStyle = gracz_s[2];
						kontekst.fillStyle = gracz_f[2];
						
						RysujPole(i,j,pole,kontekst, "kolo");
						kontekst.fillStyle = "black";
						kontekst.fillText("Start",j*pole+(pole/2)-1,i*pole+(pole/2),pole);
						kontekst.restore();
						
					}
					else if(i==6 && j==10){
						kontekst.save();
						//gracz2
						kontekst.strokeStyle = gracz_s[3];
						kontekst.fillStyle = gracz_f[3];
						
						RysujPole(i,j,pole,kontekst, "kolo");
						kontekst.fillStyle = "black";
						kontekst.fillText("Start",j*pole+(pole/2)-1,i*pole+(pole/2),pole);
						kontekst.restore();
						
					}
				}			
			}
			
			// Pola schowków na pionki
			//gracz0
			kontekst.strokeStyle = gracz_s[0];
			kontekst.fillStyle = gracz_f[0];
			
			kontekst.fillRect(0,0, pole*2, pole*2);
			kontekst.strokeRect(0,0, pole*2, pole*2);
			
			//gracz1
			kontekst.strokeStyle = gracz_s[1];
			kontekst.fillStyle = gracz_f[1];
			
			kontekst.fillRect(szerokosc - pole*2, 0, pole*2, pole*2);
			kontekst.strokeRect(szerokosc - pole*2,0, pole*2, pole*2);
			
			//gracz2
			kontekst.strokeStyle = gracz_s[2];
			kontekst.fillStyle = gracz_f[2];
			
			kontekst.fillRect(0, szerokosc - pole*2, pole*2, pole*2);
			kontekst.strokeRect(0, szerokosc - pole*2, pole*2, pole*2);
			
			//gracz3
			kontekst.strokeStyle = gracz_s[3];
			kontekst.fillStyle = gracz_f[3];
			
			kontekst.fillRect(szerokosc - pole*2, szerokosc - pole*2, pole*2, pole*2);
			kontekst.strokeRect(szerokosc - pole*2, szerokosc - pole*2, pole*2, pole*2);
			
		}
		else
			console.log('brak obsługi canvas');
}

function DrawPionki () {
	var plotno = $('#plotno2')[0];
		if(plotno.getContext) {
			var kontekst = plotno.getContext('2d');
			kontekst.strokeStyle = "rgb(0, 0, 0)";
			kontekst.fillStyle = "rgb(240, 230, 220)";
			
						
			// kontekst.fillRect(0,0,100,100);
			// kontekst.strokeRect(0,0,100,100);
			var szerokosc = 550;
			var pole = szerokosc / 11; // Szerokość / ilość pól
			kontekst.clearRect(0,0,szerokosc,szerokosc);
			var gracz_s = [ "rgb(25, 22, 15)", "rgb(5, 50, 75)", "rgb(5, 15, 0)", "rgb(50, 5, 5)"];
			var gracz_f = [ "green", "rgb(10, 200, 250)", "yellow", "rgb(220, 40, 40)"];
			var domki = [[{x:0, y:9},{x:1, y:9},{x:0, y:10}, {x:1, y:10}],
						[{x:9, y:0},{x:10, y:0},{x:9, y:1}, {x:10, y:1}],
						[{x:0, y:0},{x:1, y:0},{x:0, y:1}, {x:1, y:1}],
						[{x:9, y:9},{x:10, y:9},{x:9, y:10}, {x:10, y:10}]];
						
			for (var i=0; i<4; i++){                               //i to numer gracz
				kontekst.strokeStyle = gracz_s[i];
				kontekst.fillStyle = gracz_f[i];
				
				for (var j=0; j<4; j++){                             // j numer pionka gracz
					if(moja_gra.gracz[i].pionki[j] == 0){
						RysujPionek(domki[i][j].y, domki[i][j].x, pole, kontekst);
					}
				}
			
			}
			
}
}

function RysujPole(i,j,pole,kontekst, typ){
	if(typ=="kwadrat"){
						kontekst.fillRect(j*pole+2,i*pole+2, pole-4,pole-4);
						kontekst.strokeRect(j*pole+2,i*pole+2, pole-4,pole-4);
	}
	else if(typ=="kolo"){
						kontekst.beginPath();
						//kontekst.moveTo(j*pole+pole-2,i*pole+(pole/2));
						kontekst.arc(j*pole+(pole/2),i*pole+(pole/2), (pole-4)/2, 0, 2*Math.PI, true);
						kontekst.closePath();
						kontekst.fill();
						kontekst.stroke();
	}
}

function RysujPionek(i,j,pole,kontekst) {
	kontekst.fillRect(j*pole+(pole/4),i*pole+4, pole/2,pole-8);
	kontekst.strokeRect(j*pole+(pole/4),i*pole+4, pole/2,pole-8);
}

	var moja_gra;
$(document).ready(function () {
    'use strict';
	Draw();
    var socket = io.connect('http://localhost:3000'),
        entry_el = $('#entry');
	var input_msg = $('#msg');
	var input_start = $('#start');
	var input_losuj = $('#losuj');
	var username = null;
	var id = null;
	var gra;
	input_start.hide(); 
	input_losuj.hide();
	
	
    console.log('connecting…');

    socket.on('connect', function () {
        console.log('Połączony!');
		$('#panel').show();
    });
    socket.on('disconnect', function () {
        console.log('Rozłączony!');
		username = false;
		//$('#panel').hide();
    });

    socket.on('message', function (msg) {
		var data = JSON.parse(msg);
        console.debug('recv gracz: %s, msg json: %o ', typeof data.gracz,data);
		
		if(typeof data.gracz >= 0){ // Wiadomość od gracza
			var nick_gracza = gra.gracz[data.gracz].nazwa + ": ";
		
		}
		else {
			var nick_gracza="";
		}
		
		if(data.myid >= 0){ // Dostajemy własne ID gracza
			id = data.myid;
			
		}
		else if (typeof data.id != "undefinied"){ // Dostajemy ID innego gracza
			//id = data.myid;
		}
		
        var datamsg = data.msg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		
        $('#log ul').append('<li>' + nick_gracza + datamsg + '</li>');
        entry_el.focus();
    });
	
    socket.on('json', function (msg) {
        var data = JSON.parse(msg);
        console.debug('recv json: %o ', data);
		gra = data.gracze;
		if(username && id == null){
			id = data.myid;
		}
		if(typeof id != "undefinied"){
			moja_gra = {gracz: [,,,]};
			moja_gra.gracz[0] = gra.gracz[id];
			if(id == 1){
				moja_gra.gracz[1] = gra.gracz[0];
				moja_gra.gracz[2] = gra.gracz[3];
				moja_gra.gracz[3] = gra.gracz[2];
				
			}
			else if(id == 2){
				moja_gra.gracz[1] = gra.gracz[3];
				moja_gra.gracz[2] = gra.gracz[1];
				moja_gra.gracz[3] = gra.gracz[0];
			
			}
			else if(id == 3){
				moja_gra.gracz[1] = gra.gracz[2];
				moja_gra.gracz[2] = gra.gracz[0];
				moja_gra.gracz[3] = gra.gracz[1];
			
			}
			else {				
				moja_gra.gracz[0] = gra.gracz[0];
				moja_gra.gracz[1] = gra.gracz[1];
				moja_gra.gracz[2] = gra.gracz[2];
				moja_gra.gracz[3] = gra.gracz[3];
			
			}			
			console.debug('moja_gra: %o ', moja_gra);
		
		
			var plotno = $('#plotno')[0];
			if(plotno.getContext) {
				var kontekst = plotno.getContext('2d');
				kontekst.strokeStyle = "rgb(0, 0, 0)";
				
							kontekst.font = "14pt Arial";
							kontekst.textAlign = "left";
							kontekst.textBaseline = "top";
							
				// kontekst.fillRect(0,0,100,100);
				// kontekst.strokeRect(0,0,100,100);
				var szerokosc = $('#plotno').width();
				var pole = szerokosc / 11; // Szerokość / ilość pól
				var pozycje = [{x:0, y:8}, {x:9, y:2}, {x:0, y:2}, {x:9, y:8}];
				
				for(var i=0; i<4; i++) {
					
				kontekst.fillStyle = "#eeeeee";
					kontekst.fillRect(pozycje[i].x*pole, pozycje[i].y*pole, pole*2, pole);
				kontekst.fillStyle = "rgb(0, 0, 0)";
					kontekst.fillText(moja_gra.gracz[i].nazwa, pozycje[i].x*pole, pozycje[i].y*pole+(pole/2),pole*2);
					
					
				}
			}
			
			
		}
    });
	
	input_msg.click(function (event) {
		if (!username) {
			var msg = entry_el.attr('value');
			if (msg) {
				username = msg;
				var obj = jQuery.parseJSON('{"nick": "'+msg+'"}');
				//alert( obj.nick === "kkk" );
				socket.send(JSON.stringify(obj));
				entry_el.attr('value', '');
				
				input_start.show(); 
				
			}
		}
		else {
			var msg = entry_el.attr('value');
			if (msg) {
				
				var obj = jQuery.parseJSON('{"msg": "'+msg+'"}');
				socket.send(JSON.stringify(obj));
				console.debug('msg send: %o', obj);
				entry_el.attr('value', '');
			}
		}
			
	});
	
	input_start.click(function (event) {
		socket.emit("start", true);
		input_start.hide();
	});
	
	socket.on('start', function (m) {
	console.debug('recv json: %d', id);
        $('#log ul').append('<li>Gra sie rozpoczela</li>');
		DrawPionki();
		if (id === 0){
			input_losuj.show();
		}
	});
	
	input_losuj.click(function (event) {
		socket.emit('losuj', null);
	});
	
	socket.on('losuj', function (l) {
		var kostka = $('#kostka');
		kostka.html("oczek: "+l);
	});
    /* entry_el.keypress(function (event) {
        if (event.keyCode !== 13) {
            return;
        }
        var msg = entry_el.attr('value');
        if (msg) {
            socket.send(msg);
            entry_el.attr('value', '');
        }
     });*/
});
