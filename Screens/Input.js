import {React, useState} from 'react';
import { View, StyleSheet,TextInput, TouchableOpacity,Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import '../firebase'


const InputBox =() => {
    const auth = getAuth();
    const [newMessage, setNewMessage] = useState('');
    const onSend =() =>{
        Keyboard.dismiss(),
        console.warn("Sending a new Message:", newMessage)
        
        db.collection('chats').doc(route.params.name).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: newMessage,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL

        })
    setNewMessage ('');
    }
    return (
        <View style ={{flexDirection: 'row',
        padding: 20, backgroundColor: 'whitesmoke', alignItems: 'center',
        }}>
        <FontAwesome5 name="plus" size={20} color="royalblue" />     
        <TextInput value={newMessage} onChangeText={setNewMessage} style={styles.input} placeholder='Type here...'></TextInput>
        <MaterialCommunityIcons onPress={onSend} style={styles.send} name="send" size={20} color="white" />
        </View>
    );
}

export default InputBox;

const styles = StyleSheet.create({
    input:{
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 10,
        paddingHorizontal: 10,
        borderColor: 'lightgray',
        borderWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 10,
    },
    send:{
        backgroundColor: 'royalblue',
        padding: 7,
        borderRadius: 16,
        overflow: 'hidden'
    }
})