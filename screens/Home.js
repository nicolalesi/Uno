// Home.js

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

export class Home extends Component {
  render() {
    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.titolo} > UNO </Text>
          <View style={styles.buttonsLabel}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('partecipaPartita')} title="partecipa a partita "
              style={{ backgroundColor: '#F08080', marginTop:40, borderRadius:5 }}>
              <Text style={styles.textStyle}>Partecipa a partita</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert("1. Uno dei giocatori deve ospitare la partita; \n2.Gli altri devono inserire il codice creato dall'host nel campo di testo")} title="Istruzioni connessione "
              style={{ backgroundColor: '#F08080', marginTop:40, borderRadius:5 }}>
              <Text style={styles.textStyle}>Istruzioni connessione</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FAFAD2',
    },
    titolo:{
      fontSize:30,
      fontWeight: 'bold',
      color: '#FA8072', 
      marginTop: -90
    },
    buttonsLabel:{
      display:'flex',
      marginTop:100
    },
    textStyle:{
      fontSize: 20, 
      color: '#fff', 
      padding:20, 
      alignSelf:'center'
    }
  });
  
  
export default Home