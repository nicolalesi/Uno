import React, { Component,useContext,useState,useEffect} from 'react';
window.navigator.userAgent='react-native';
import io from 'socket.io/client-dist/socket.io';

export var numberOfUsers=0;

export default class client extends React.Component{

    constructor(props){
        super(props);

        numberOfUsers++;
        this.socket=io("http://192.168.1.55:3000");
        
        this.username='';
      }

      /*componentDidMount(){    
    
        this.socket.on("User",utente=>{
          this.user=utente;
        });

        this.socket.on("cartaGiocata",carta =>{
            console.log(carta);
        });
    
      }*/

      disconnection(){
        this.socket.emit("disconnection",true);
      }

     comunicateCard(typeOfComunication,nameOfCard){

        this.socket.emit(typeOfComunication,nameOfCard);
      }
      

}