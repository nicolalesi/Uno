const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

var utentiConnessi=[];
var sockets=[];
var cartaCentrale;

app.get('/', (req, res) => {
    res.sendFile( __dirname + '/index.html');
  });
  
io.on("connection", (socket) => {

  console.log("Si sta connettendo "+socket.id);
  console.log(sockets);

  socket.on("NomeUtente",msg=>{
    console.log(msg);
    utentiConnessi.push(msg);
    console.log(utentiConnessi);
    sockets.push(socket.id);
    console.log(sockets);

    if(utentiConnessi.length==2){
      var randomNumber = Math.floor(Math.random() * 53) + 2;
      io.emit("Start game",utentiConnessi[0]);
      io.emit("firstCentralCard",randomNumber);
    }

    if(utentiConnessi.length>2){
      console.log("Numero massimo di utenti raggiunto");
      socket.disconnect();
    }  
  });

  socket.on("changeColor",color=>{
    io.emit("changeColor",color);
  });
    
    socket.on("enemyCardNumber",number=>{
      io.emit("enemyCardNumber",number);
    });

    socket.on("addCards",({user,number})=>{

      console.log("Aggiungi carte da "+user+" "+number);
       for(var i=0;i<utentiConnessi.length;i++){
        if(utentiConnessi[i]!=user){
             io.to(sockets[i]).emit("addCards",{
              numeroCarte:number
            });
        }
      }

    });

    
    socket.on("cartaCentrale",({forClients,forServer})=>{
      io.emit("cartaCentrale",forClients);
      console.log(forClients);
      console.log("Nome carta "+forServer);
    });

    socket.on("firstRandomCard",carta=>{
      cartaCentrale=carta;
      console.log("Carta centrale iniziale"+carta);
    });

    socket.on("chat message", msg =>{
      console.log(msg);
      io.emit("chat message",msg);
    });

    socket.on("disconnection",msg=>{
      console.log(msg);
      //io.disconnectSockets();
      
      const index = sockets.indexOf(socket);
      socket.disconnect(true);
      sockets.splice(index,1);
      utentiConnessi.splice(index,1);


    });

    socket.on("cambioTurno",nomeUtente=>{
      for(var i=0;i<utentiConnessi.length;i++){
        if(utentiConnessi[i]!=nomeUtente){
          io.emit("cambioTurno",utentiConnessi[i]);
        }
      }
    });

    socket.on("myCards",({user,hand})=>{

      console.log("Possessore carte "+user);
      console.log("Numero carte rimaste "+hand);

      for(var i=0;i<utentiConnessi.length;i++){
        if(utentiConnessi[i]!=user){
             io.to(sockets[i]).emit("carteAvversario",{
              user : user, numeroCarte:hand
            });
        }
        if(hand==0){
        if(utentiConnessi[i]==user)
          io.to(sockets[i]).emit("vittoria","Hai vinto!");
        
        if(utentiConnessi[i]!=user)
          io.to(sockets[i]).emit("sconfitta","Hai perso");   
      
         }
      }

    });

    socket.on("cartaGiocata",carta=>{
      
      console.log(carta);
      io.emit("cartaGiocata",carta);
    });


});

httpServer.listen(3000);