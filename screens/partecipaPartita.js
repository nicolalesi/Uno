// partecipaPartita

import React, { Component,useContext,useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, Button, BackHandler, Alert, ImageBackground, Pressable,TouchableOpacity } from 'react-native';
window.navigator.userAgent='react-native';
import client from '../logica/client';
import * as ScreenOrientation from 'expo-screen-orientation';
import cards from '../logica/cards';
import {carte} from '../logica/cards';
import { cardName } from '../logica/cards';
import table from '../resources/Table_3.png';
import deck from '../resources/Deck.png';
import { wildColor } from '../logica/cards';

const showAlert = () =>
  Alert.alert(
    "Non puoi giocare questa carta",
    "Scegli un'altra carta da giocare",
    [
      {
        text: "Riprova",
        style: "cancel",
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


var instanceCards=new cards();
var clientConnection;

export default function partecipaPartita (){

    const [nomeUtente, setNomeUtente] = useState("Toccami e scegli nome utente");
    const [usernameInserito,setUsernameInserito]=useState(false);
    const [cartaCentrale,setCartaCentrale]=useState();
    const [hand,setHand]=useState(instanceCards.initialCards());
    const [enemyCardNumber,setEnemyCardNumber]=useState(5);
    const [userCarteRicevute,setUserCarteRicevute]=useState();
    const [statoDiGioco,setStatoDiGioco]=useState(false);
    const [turno,setTurno]=useState();
    const [endGame,setEndGame]=useState(false);
    const [winner,setWinner]=useState(false);
    const [showChoseColor,setChoseColor]=useState(false);
    
    function insertUser(){

      return (
        <View style={styles.inputUsername}>
        {!usernameInserito ?
          <TextInput onChangeText={setNomeUtente} value={nomeUtente} placeholder={nomeUtente} onSubmitEditing={()=>sendNomeUtente()}/>
                : 
           <Text> {nomeUtente} Attendi che si connetta un altro giocatore </Text> 
               }
        </View>
      )
    
    }

    function choseColor(){

      return (
          <View style={styles.choseColor}>
            <TextInput placeholder="Scegli colore" />
          </View>
      );
    }

    function sendNomeUtente(){

      clientConnection=new client();

      clientConnection.socket.on("User",utente=>{
        console.log(utente);  
      });

      clientConnection.socket.on("carteAvversario",({user,numeroCarte})=>{

        console.log("Ricevute carte di "+user+" ne restano "+numeroCarte)

          setEnemyCardNumber(numeroCarte);
          setUserCarteRicevute(user);
        
      });

      clientConnection.socket.on("cartaGiocata",carta=>{
        cartaEstratta=instanceCards.estraiCarta();
        changeCard=cartaEstratta;
      });

      clientConnection.socket.on("Start game",msg=>{
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        console.log(msg);
        setStatoDiGioco(true);  
        setTurno(msg);
      });

      clientConnection.socket.on("cambioTurno",nomeUtente=>{
        setTurno(nomeUtente);
      });

      clientConnection.socket.on("cartaCentrale",carta=>{
        setCartaCentrale(carta);
      });

      clientConnection.socket.on("firstCentralCard",carta=>{
        console.log("Carta centrale "+carta);
        console.log("Carta centrale nome "+cardName[carta]);
        setCartaCentrale(carta);
        socket.emit("firstRandomCard",cardName[carta]);
      });

      clientConnection.socket.on("vittoria",msg=>{
        console.log(msg);
        setWinner(true);
        setEndGame(true);
      });

      clientConnection.socket.on("sconfitta",msg=>{
        console.log(msg);
        setWinner(false);
        setEndGame(true);
      });

      clientConnection.socket.on("addCards",number=>{
        console.log("Aggiungi carte "+ number);

        if(number==2)
        setHand(instanceCards.addedCards(hand,3));
    
        if(number==4)
          setHand(instanceCards.addedCards(hand,5)); 
      });

      clientConnection.socket.on("changeColor",color=>{
        wildColor=color;
      });

      clientConnection.socket.emit("NomeUtente",nomeUtente);
      setUsernameInserito(true);
      

    }
    

    useEffect(() => {

        return () => {

          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

          clientConnection.socket.emit("disconnection",nomeUtente);

        }
    }, [])

  pesca = () => {
      console.log("Pesca");
      setHand(instanceCards.addedCards(hand,1));

    }

  passo = () => {
      console.log("Passo");
      if(instanceCards.canYouPass(hand,cartaCentrale))
        console.log("Non puoi passare hai carte da giocare in mano");
      else
        clientConnection.socket.emit("cambioTurno",nomeUtente);  
    }


  onCardPress = (numberOfCard) =>{

  var canPlayCard=instanceCards.cartaGiocata(cardName[cartaCentrale],cardName[hand[numberOfCard]]);

  if(canPlayCard!=false){
   console.log(hand[numberOfCard]);
   clientConnection.socket.emit("cartaCentrale",({forClients: hand[numberOfCard],forServer: cardName[hand[numberOfCard]]}));
   reorderHand(hand[numberOfCard]);
   clientConnection.socket.emit("enemyCardNumber",hand.length);
 

  if(canPlayCard=='reverse' || instanceCards.turnoExtra(hand,cartaCentrale))
    console.log("Tocca ancora a te");
  else  
    clientConnection.socket.emit("cambioTurno",nomeUtente);  
    
  if(canPlayCard==2)
  clientConnection.socket.emit("addCards",{user:nomeUtente,number: 2});  
  
  if(canPlayCard==4){
    clientConnection.socket.emit("addCards",{user:nomeUtente,number: 4});
    setChoseColor(true);
  }

  if(canPlayCard=='Wild')
    clientConnection.socket.emit("changeColor",wildColor);
   
    console.log("Carta giocata"+canPlayCard);

   console.log("Io sono "+nomeUtente);
   clientConnection.socket.emit("myCards", 
   {user: nomeUtente,
    hand: hand.length,

  })
  }
  else{
   showAlert();
  }

  //if turnoextra non invio segnale di cambioturno altrimenti si if reverse non cambio turno

}

  function reorderHand  (carta) {

    const index = hand.indexOf(carta);
    hand.splice(index,1);
      
  }

//estrai mano random
          //{userCarteRicevute!=nomeUtente ?  setEnemyCardNumber(receivedCardNumber) : enemyCardNumber}
            return (
              <>
              {! endGame ? 
              <View style={styles.container}>
              {statoDiGioco   ? 
              <ImageBackground source={table} resizeMode="cover" style={styles.background}>
                <View style={styles.campoGioco}> 
                <View style={styles.enemyCard}>         
                {[...Array(enemyCardNumber)].map((item,index)=>{
                      return <Image key={index} source={deck} style={styles.deck}></Image>
                      })}
                  </View>                                 
                  <View style={styles.deckContainer}>
                      <TouchableOpacity style={styles.surrenderButton} onPress={()=>pesca()}>
                        <Text style={styles.surrenderText}> Pesca</Text>
                      </TouchableOpacity>
                      <Image source={deck} style={styles.centerCard}></Image>
                      <Image source={carte[cartaCentrale]} style={styles.centerCard}></Image>
                      <TouchableOpacity style={styles.passoButton} onPress={()=>passo()}>
                        <Text style={styles.passoText}> Passo </Text>
                      </TouchableOpacity>
                  </View>
                  {nomeUtente==turno ?
                  <View style={styles.myCards}>
                    <Text style={styles.yourName}>{nomeUtente}</Text>
                  {hand.map((item,index)=>{
                      return(
                      <TouchableOpacity style={styles.myTouchableCard} key={index} onPress={() => onCardPress(index)}>
                       <Image key={index} source={carte[item]} style={styles.img}></Image>
                      </TouchableOpacity> 
                      )
                      })}
                      <Text style={styles.scrittaTurno}> Tocca a te</Text>                  
                  </View>  
                  :<View style={styles.myCards}>
                    <Text style={styles.yourName}>{nomeUtente}</Text>
                    {hand.map((item,index)=>{
                      return(
                       <Image key={index} source={carte[item]} style={styles.enemy}></Image>
                      )
                      })}
                                        <Text style={styles.scrittaTurno}> Tocca a {turno}</Text>
                    </View>}
                </View>
              </ImageBackground>
                  :  
                  insertUser()      } 
            </View>
            : <View style={styles.container}>
              <View>
                {winner ? 
                  <Text style={styles.endTxt}> Hai vinto</Text>
                  :
                  <Text style={styles.endTxt}> Hai perso</Text>
                }
              </View>  
            </View>
            }
            </>     
              )
            }
    //      }

    const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#FAFAD2',
                },
      myTouchableCard: {
          height:87,
          width:'8%',
          marginRight:2 
      },
      img: {
          height:87,
          width:'100%',
          marginRight:2
      },
      enemy:{
          height:85,
          width:'8%',
          marginRight:2
            },
      deck: {
          height: 85,
          width : '8%',
          marginRight:2
      },
      centerCard: {
          height: 85,
          width : '8%',
      },
      enemyCard:{
          flexDirection: 'row',
          justifyContent: 'center'
      },
      myCards: {
          flexDirection: 'row',
          justifyContent: 'center'
      },
      deckContainer: {
          flexDirection:'row',
          justifyContent:'center',
          alignContent:'center',
          marginTop:'5%',
          marginBottom:'5%',
      },   
      campoGioco: {
          display: 'flex',
          flexDirection:'column',
      },
      background: {
          flex:1,
          justifyContent: 'center'
        },
      surrenderButton: {
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 100,
          backgroundColor: '#cc0000',
          marginRight:'23%'
        },
      surrenderText: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
        },
      passoButton: {
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 100,
          backgroundColor: '#ffd700',
          marginLeft:'23%'
        },
      passoText: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
        },
      inputUsername: {
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: '90%'
      },
      scrittaTurno: {
        color: 'yellow',
        marginLeft: 20,
        fontFamily: 'sans-serif-condensed'
      },
      yourName: {
        color: 'red',
        marginRight: 20,
        fontFamily: 'sans-serif-condensed'
      },
      endTxt: {
        color: 'black',
      },
      choseColor: {
        position:'absolute'
      }   
    });