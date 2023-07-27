import React, {useState} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';

export default Counter = props => {
    return (
        <View style={styles.counter}>
            
        </View>
    )
};

const styles = StyleSheet.create({
    counter: {
        flex: 1,
        backgroundColor: '#FF0000',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%',
        margin: 10,
        borderColor: 'yellow',
        borderWidth: 3,
    },  
})