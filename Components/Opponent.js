import React, {useState} from 'react';
import {Text, Button, View, StyleSheet, Image} from 'react-native';
import Counter from './Counter';

export default Opponent = props => {
    return (
        <View style={styles.opponent}>
            <Counter />
            <Counter />
            <View style={styles.handContainer}>
                <Text style={styles.hand}>👊</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    opponent: {
        flex: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#000000',
        width: '100%',
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
    }
})