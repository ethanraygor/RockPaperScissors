import React, {useState} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';

export default Title = props => {
    return (
        <View style={styles.title}>
            <Text style={styles.titleText}>Rock, Paper, Scissors</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        flex: 1,
        backgroundColor: '#AFDCEC',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '10%',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 30,
    }
})