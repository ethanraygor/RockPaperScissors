import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Title from './Components/Title';
import Opponent from './Components/Opponent';

export default function App() {    
     return (
          <View style={styles.container}>
               <Title />
               <Opponent />
               <View style={styles.player}>

               </View>
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
     },
     player: {
          flex: 2,
     },
});
