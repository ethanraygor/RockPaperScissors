import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';



/*
* APP
*/
export default function App() {
     const [winStreak, setWinStreak] = useState(0);
     const [winRecord, setWinRecord] = useState(0); 
     const [message, setMessage] = useState("Let's play rock, paper, scissors!");

     /*
     * TITLE
     */
     const Title = props => {
          return (
               <View style={styles.title}>
                    <Text style={styles.titleText}>Rock, Paper, Scissors</Text>
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
                         <Text style={styles.hand}>👊</Text>
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
          }else if (w == -1) {
               setMessage("You lost!");
               if (winStreak > 0) {
                    setWinStreak(-1);
               } else {
                    tmpWinStreak = winStreak - 1;
                    setWinStreak(tmpWinStreak);
               }
          } else if (w = 1) {
               setMessage("You won!");
               if (winStreak < 0) {
                    setWinStreak(1);
               } else {
                    tmpWinStreak = winStreak + 1;
                    setWinStreak(tmpWinStreak);
               }
          }
          if (winRecord < tmpWinStreak) {
               setWinRecord(tmpWinStreak);
          }
     }

     /**
      * RENDER
      */
     return (
          <View style={styles.container}>
               <Title />
               <Opponent />
               <Player />
          </View>
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
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 150,
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
});
