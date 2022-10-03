import React, { Component, useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ImageBackground, TouchableOpacity, InteractionManager, Alert } from 'react-native';

import {storeContext} from '../utilities/storeContext';
import Blue_0 from '../resources/Blue_0.png';
import Blue_1 from '../resources/Blue_1.png';
import Blue_2 from '../resources/Blue_2.png';
import Blue_3 from '../resources/Blue_3.png';
import Blue_4 from '../resources/Blue_4.png';
import Blue_5 from '../resources/Blue_5.png';
import Blue_6 from '../resources/Blue_6.png';
import Blue_7 from '../resources/Blue_7.png';
import Blue_8 from '../resources/Blue_8.png';
import Blue_9 from '../resources/Blue_9.png';
import Blue_Draw from '../resources/Blue_Draw.png';
import Blue_Reverse from '../resources/Blue_Reverse.png';
import Blue_Skip from '../resources/Blue_Skip.png';
import Green_0 from '../resources/Green_0.png';
import Green_1 from '../resources/Green_1.png';
import Green_2 from '../resources/Green_2.png';
import Green_3 from '../resources/Green_3.png';
import Green_4 from '../resources/Green_4.png';
import Green_5 from '../resources/Green_5.png';
import Green_6 from '../resources/Green_6.png';
import Green_7 from '../resources/Green_7.png';
import Green_8 from '../resources/Green_8.png';
import Green_9 from '../resources/Green_9.png';
import Green_Draw from '../resources/Green_Draw.png';
import Green_Reverse from '../resources/Green_Reverse.png';
import Green_Skip from '../resources/Green_Skip.png';
import Red_0 from '../resources/Red_0.png';
import Red_1 from '../resources/Red_1.png';
import Red_2 from '../resources/Red_2.png';
import Red_3 from '../resources/Red_3.png';
import Red_4 from '../resources/Red_4.png';
import Red_5 from '../resources/Red_5.png';
import Red_6 from '../resources/Red_6.png';
import Red_7 from '../resources/Red_7.png';
import Red_8 from '../resources/Red_8.png';
import Red_9 from '../resources/Red_9.png';
import Red_Draw from '../resources/Red_Draw.png';
import Red_Reverse from '../resources/Red_Reverse.png';
import Red_Skip from '../resources/Red_Skip.png';
import Wild_Draw from '../resources/Wild_Draw.png';
import Wild from '../resources/Wild.png';
import Yellow_0 from '../resources/Yellow_0.png';
import Yellow_1 from '../resources/Yellow_1.png';
import Yellow_2 from '../resources/Yellow_2.png';
import Yellow_3 from '../resources/Yellow_3.png';
import Yellow_4 from '../resources/Yellow_4.png';
import Yellow_5 from '../resources/Yellow_5.png';
import Yellow_6 from '../resources/Yellow_6.png';
import Yellow_7 from '../resources/Yellow_7.png';
import Yellow_8 from '../resources/Yellow_8.png';
import Yellow_9 from '../resources/Yellow_9.png';
import Yellow_Draw from '../resources/Yellow_Draw.png';
import Yellow_Reverse from '../resources/Yellow_Reverse.png';
import Yellow_Skip from '../resources/Yellow_Skip.png';
import deck from '../resources/Deck.png';
import client from '../logica/client';
import table from '../resources/Table_3.png';

export const carte=[Blue_0,Blue_1,Blue_2,Blue_3,Blue_4,Blue_5,Blue_6,Blue_7,Blue_8,Blue_9,Blue_Draw,Blue_Reverse,Blue_Skip,
    Green_0,Green_1,Green_2,Green_3,Green_4,Green_5,Green_6,Green_7,Green_8,Green_9,Green_Draw,Green_Reverse,Green_Skip,
    Red_0,Red_1,Red_2,Red_3,Red_4,Red_5,Red_6,Red_7,Red_8,Red_9,Red_Draw,Red_Reverse,Red_Skip,
    Wild_Draw,Wild,
    Yellow_0,Yellow_1,Yellow_2,Yellow_3,Yellow_4,Yellow_5,Yellow_6,Yellow_7,Yellow_8,Yellow_9,Yellow_Draw,Yellow_Reverse,Yellow_Skip
];

export const cardName=['Blue_0','Blue_1','Blue_2','Blue_3','Blue_4','Blue_5','Blue_6','Blue_7','Blue_8','Blue_9','Blue_Draw','Blue_Reverse','Blue_Skip',
    'Green_0','Green_1','Green_2','Green_3','Green_4','Green_5','Green_6','Green_7','Green_8','Green_9','Green_Draw','Green_Reverse','Green_Skip',
    'Red_0','Red_1','Red_2','Red_3','Red_4','Red_5','Red_6','Red_7','Red_8','Red_9','Red_Draw','Red_Reverse','Red_Skip',
    'Wild_Draw','Wild',
    'Yellow_0','Yellow_1','Yellow_2','Yellow_3','Yellow_4','Yellow_5','Yellow_6','Yellow_7','Yellow_8','Yellow_9','Yellow_Draw','Yellow_Reverse','Yellow_Skip'
    ];

export var wildColor;
const showAlert = () =>
  Alert.alert(
    "Scegli il colore",
    "Scegli un'altra carta da giocare",
    [
      {
        text: "Rosso",
        onPress: () => {changeColor("Red");}
      },
      {
        text: "Giallo",
        onPress: () =>  {changeColor("Yellow");}
      },
      {
        text: "Verde",
        onPress: () =>  {changeColor("Green");}
      },
      {
        text :"Blue",
        onPress: () =>  {changeColor("Blue");}
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
  );

function changeColor(color){
  wildColor=color;
}  


export default class cards extends React.Component{


    constructor(props){
        super(props);
    }


    estraiCarta(){

        return this.random();

    }


    random(){
    
            var randomNumber = Math.floor(Math.random() * carte.length);
    
            return randomNumber;
    }
    
    initialCards(){
    
            var firstHand=[];
    
            for(var i=0;i<5;i++){
            
                var randomCard=this.random();
    
                firstHand[i]=randomCard;

            }
    
            return firstHand;
    }

    addedCards(hand,number){

      var handWithNewCards=[];

      for(var i=0;i<hand.length;i++){

        handWithNewCards[i]=hand[i];

      }

      for(var i=0;i<number;i++){

        var randomCard=this.random();

        handWithNewCards.push(randomCard);

      }

      return handWithNewCards;
    }


    cartaGiocata(centralCard,usedCard){
        var nomeCartaCentrale=centralCard.split("_");
        var coloreCartaCentrale=nomeCartaCentrale[0];
        var numeroCartaCentrale=nomeCartaCentrale[1];

        var nomeCartaUsata=usedCard.split("_");
        var coloreCartaUsata=nomeCartaUsata[0];
        var numeroCartaUsata=nomeCartaUsata[1];

        if(coloreCartaUsata==coloreCartaCentrale || coloreCartaUsata==wildColor){

            if(numeroCartaUsata=='Draw')
                return 2;
            
            if(numeroCartaUsata=='Reverse')
                return 'reverse';

            if(numeroCartaUsata=='Skip')
                return 'reverse';    

            return true;
        }
        else if(numeroCartaUsata==numeroCartaCentrale){
            return true;
        }
        else if(coloreCartaUsata=='Wild'){

            showAlert();
            console.log("Colore scelto "+wildColor);

            if(numeroCartaUsata=='Draw'){
                return 4;
            }
            return 'Wild';
        }
             
        console.log("Carta centrale "+centralCard);
        console.log("Carta giocata "+usedCard);
        console.log("Carta centrale splittata "+coloreCartaCentrale);
        console.log("Numero carta centrale "+numeroCartaCentrale); 

        console.log("Wild color "+wildColor);
        return false;
    }

    turnoExtra(hand,cartaCentrale){

      for(var i=0;i<hand.length;i++){
        var nomeCarta=cardName[hand[i]].split("_");
        var coloreCarta=nomeCarta[0];
        var numeroCarta=nomeCarta[1];
    
        var nomeCartaCentrale=cardName[cartaCentrale].split("_");
        var coloreCartaCentrale=nomeCartaCentrale[0];
        var numeroCartaCentrale=nomeCartaCentrale[1];
    
        if(numeroCarta==numeroCartaCentrale)
          return true;
      }

      return false;
    }

    canYouPass(hand,cartaCentrale){
      for(var i=0;i<hand.length;i++){
        var nomeCarta=cardName[hand[i]].split("_");
        var coloreCarta=nomeCarta[0];
        var numeroCarta=nomeCarta[1];
    
        var nomeCartaCentrale=cardName[cartaCentrale].split("_");
        var coloreCartaCentrale=nomeCartaCentrale[0];
        var numeroCartaCentrale=nomeCartaCentrale[1];
    
        if(coloreCarta==coloreCartaCentrale || numeroCarta==numeroCartaCentrale || coloreCarta=='Wild')
          return true;
      }

      return false;
    }

 
}


