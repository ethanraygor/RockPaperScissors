import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { HandImage } from './img/Image';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* 
* APP
*/
export default function App() {
     const [winStreak, setWinStreak] = useState(0);
     const [winRecord, setWinRecord] = useState(0); 
     const [message, setMessage] = useState("Let's play rock, paper, scissors!");
     const [imageSource, setImageSource] = useState(HandImage.GetImage('fist.png'));
     const [imageRot, setImageRot] = useState('270deg');

     /*
     * SETTINGS AND STORAGE
     */
     const StoreData = async (streak, record) => {
          try {
               await AsyncStorage.setItem(
                    'streak',
                    streak.toString(),
               );
               await AsyncStorage.setItem(
                    'record',
                    record.toString(),
               );
          }catch (error){
               console.log(error.message);
          }
     }

     const GetData = async () => {
          try{
               const tmpStreak = await AsyncStorage.getItem('streak');
               if(tmpStreak!=null){
                    const streak = parseInt(tmpStreak);
                    setWinStreak(streak);
               }
               const tmpRecord = await AsyncStorage.getItem('record');
               if(tmpRecord!=null){
                    const record = parseInt(tmpRecord);
                    setWinRecord(record);
               }
          }catch (error){
               console.log(error.message);
          }
     }

     useEffect(() => {
          GetData();
     }, []);

     /*
     * TITLE
     */
     const Title = props => {
          return (
               <View style={styles.title}>
                    <Text style={styles.titleText}>Rock, Paper, Scissors</Text>
                    <View style={styles.settingsButton}>
                         <Button
                              onPress={() => {
                                   props.nav.navigate('Settings');
                              }}
                              title='⚙️'
                              style={styles.button}
                              color='#201E20'
                         />
                    </View>
               </View>
          )
     };

     /*
     * OPPONENT
     */
     const Opponent = props => {
          return (
               <View style={styles.opponent}>
                    <Counter text={'Win Streak: ' + winStreak} />
                    <Counter text={'Streak Record: ' + winRecord} />
                    <View style={styles.handContainer}>
                         <Image
                              style={styles.hand}
                              source={imageSource}
                              transform={[{rotate: imageRot }]}
                         />
                    </View>
               </View>
          )
     };

     /*
     * COUNTER
     */
     const Counter = props => {
          return (
               <View style={styles.counter}>
                    <Text style={styles.counterText}>{props.text}</Text>
               </View>
          )
     };

     /*
     * PLAYER
     */
     const Player = props => {
          return (
               <View style={styles.player}>
                    <Text style={styles.playerText}>{message}</Text>
                    <View style={styles.buttonRow}>
                         <View style={styles.buttonContainer}>
                              <Button
                                   onPress={() => {
                                        let win = playGame(0);
                                        streak(win);
                                   }}
                                   title='Rock'
                                   style={styles.button}
                                   color='#201E20'
                              />
                         </View>
                         <View style={styles.buttonContainer}>
                              <Button
                                   onPress={() => {
                                        let win = playGame(1);
                                        streak(win);
                                   }}
                                   title='Paper'
                                   style={styles.button}
                                   color='#201E20'
                              />
                         </View>
                         <View style={styles.buttonContainer}>
                              <Button
                                   onPress={() => {
                                        let win = playGame(2);
                                        streak(win);
                                   }}
                                   title='Scissors'
                                   style={styles.button}
                                   color='#201E20'
                              />
                         </View>
                    </View>
               </View>
          )
     }

     /*
     * GAME
     */
     function playGame(h) {
          let o = Math.floor(Math.random() * 3);
          setImageRot('0deg');
          if (o == 0) {
               setImageSource(HandImage.GetImage('rock.png'));
          } else if (o == 1) {
               setImageSource(HandImage.GetImage('paper.png'));
          } else {
               setImageSource(HandImage.GetImage('scissors.png'));
          }
          if (o == h) {
               return 0;
          }
          if (h == 0) {
               if (o == 1) {
                    return -1;
               } else {
                    return 1;
               }
          } else if (h == 1) {
               if (o == 0) {
                    return 1;
               } else {
                    return -1;
               }
          } else {
               if (o == 0) {
                    return -1;
               } else {
                    return 1;
               }
          }
     }

     function streak(w) {
          let tmpWinStreak;
          if(w == 0){
               setMessage("You drew!");
               tmpWinStreak = winStreak;
          }else if (w == -1) {
               setMessage("You lost!");
               if (winStreak > 0) {
                    setWinStreak(-1);
                    tmpWinStreak = -1;
               } else {
                    tmpWinStreak = winStreak - 1;
                    setWinStreak(tmpWinStreak);
               }
          } else if (w = 1) {
               setMessage("You won!");
               if (winStreak <= 0) {
                    setWinStreak(1);
                    tmpWinStreak = 1;
               } else {
                    tmpWinStreak = winStreak + 1;
                    setWinStreak(tmpWinStreak);
               }
          }
          if (winRecord < tmpWinStreak) {
               setWinRecord(tmpWinStreak);
               StoreData(tmpWinStreak, tmpWinStreak);
          }else{
               StoreData(tmpWinStreak, winRecord);
          }
     }

     /**
      * HOME SCREEN
      */
     function HomeScreen({navigation}) {
          return (
               <View style={styles.container}>
                    <Title nav={navigation} />
                    <Opponent />
                    <Player />
               </View>
          );
     }

     /**
      * SETTINGS SCREEN
      */
     function SettingsScreen({navigation}){
          const clearRecordsAlert = () =>
               Alert.alert('Clear all records?', 'This action is permenent and cannot be undone.', [
                    {
                         text: 'Cancel',
                         style: 'cancel',
                    },
                    { 
                         text: 'OK', 
                         onPress: () => {
                              StoreData(0, 0);
                              setWinStreak(0);
                              setWinRecord(0);
                         }
                    },
               ]);

          return (
               <View style={styles.settingsContainer}>
                    <View style={styles.settingsButtonContainer}>
                         <Button
                              onPress={() => {
                                   clearRecordsAlert();
                              }}
                              title='Clear Records'
                              style={styles.button}
                              color='#201E20'
                         />
                    </View>
                    <View style={styles.settingsButtonContainer}>
                         <Button
                              onPress={() => {
                                   navigation.navigate('Home');
                              }}
                              title='Back to Game'
                              style={styles.button}
                              color='#201E20'
                         />
                    </View>
               </View>
          );
     }

     /**
      * RENDER
      */
     const Stack = createNativeStackNavigator();

     return (
          <NavigationContainer>
               <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
               </Stack.Navigator>
          </NavigationContainer>
     );
}

/*
* STYLESHEET
*/
const styles = StyleSheet.create({
     /* APP */
     container: {
          flex: 1,
          backgroundColor: '#E0A96D',
          alignItems: 'center',
          justifyContent: 'center',
     },
     /* TITLE */
     title: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingTop: '10%',
          backgroundColor: '#DDC3A5',
     },
     titleText: {
          fontWeight: 'bold',
          fontSize: 30,
          color: '#201E20',
     },
     settingsButton: {
          backgroundColor: '#DDC3A5',
          width: '11%',
          borderWidth: 3,
          borderColor: '#201E20',
          position: 'absolute',
          top: 40,
          right: 20,
     },
     /* OPPONENT */
     opponent: {
          flex: 3,
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          borderBottomWidth: 5,
          borderTopWidth: 5,
          borderColor: '#201E20',
     },
     handContainer: {
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20%',
     },
     hand: {
          height: '75%',
          width: '75%',
          resizeMode: 'contain',
     },
     /* COUNTER */
     counter: {
          flex: 1,
          backgroundColor: '#DDC3A5', 
          alignItems: 'center',
          justifyContent: 'center',
          height: '10%',
          margin: 10,
          borderColor: '#201E20',
          borderWidth: 3,
     },
     counterText: {
          color: '#201E20'
     },
     /* PLAYER */
     player: {
          flex: 2,
          flexWrap: 'wrap',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
     },
     buttonRow: {
          flex: 9,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
     },
     buttonContainer: {
          backgroundColor: '#DDC3A5',
          width: '25%',
          borderWidth: 3,
          borderColor: '#201E20',
     },
     button: {
          alignItems: 'center',
          justifyContent: 'center',
     },
     playerText: {
          flex: 1,
          color: '#201E20',
          fontSize: 20, 
     },
     /**
      * SETTINGS
      */
     settingsContainer: {
          flex: 1,
          backgroundColor: '#E0A96D',
          alignItems: 'center',
          justifyContent: 'space-evenly',
     },
     settingsButtonContainer: {
          backgroundColor: '#DDC3A5',
          width: '50%',
          borderWidth: 3,
          borderColor: '#201E20',
     },
});
