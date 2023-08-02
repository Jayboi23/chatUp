import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CallsScreen = (props) =>{
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Calls history will appear here</Text>
        </View>
    );
}

export default CallsScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        fontSize: 20
    }
});