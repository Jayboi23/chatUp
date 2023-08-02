import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { auth } from '../firebase';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Feather } from '@expo/vector-icons';

const Message = ({message}) => {
    const isMyMessage = () =>{
        return message.email === auth.currentUser.email;
    }

    // const formatTimestamp = (timestamp) => {
    //     // Convert timestamp to a string representation
    //     // Modify this formatting logic as per your requirement
    //     return dayjs(timestamp).format('MMM D, YYYY h:mm A');
    //   };
    dayjs.extend(relativeTime);
    return (
        <View key={message._id} style={styles.container}>
            <View style={[styles.conatiner2, {flexDirection: isMyMessage() ? 'rowreverse' : 'row'}]}>
            {isMyMessage() ? null :<Image style={styles.image} source={{uri: message.recipientPhoto=== auth.currentUser.photoURL ? message.senderPhoto : message.recipientPhoto}}/>}
        <View style={[styles.chatContainer, {backgroundColor: isMyMessage() ? 'royalblue' : 'white', alignSelf:
         isMyMessage() ? 'flex-end':'flex-start', borderBottomLeftRadius: isMyMessage() ? 15 : 0, borderBottomRightRadius:isMyMessage() ? 0 : 15}]}>
        <Text style={[styles.chatText, {color: isMyMessage()? '#fff' : '#000'}]}>{message.text}</Text>
            <Text style={[styles.chatTime, {color: isMyMessage()? 'whitesmoke' : 'gray'}]}>
        {dayjs(message.timestamp).fromNow()}
            </Text>
            {isMyMessage() ? <Feather style={{alignSelf: 'flex-end', marginTop: 5}} name={message.isRead === false ? "check" : "check-circle"} size={15} color="#fff" /> : null}
            </View>
            </View>
    </View>
    
    );
}

export default Message;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
    },
    chatContainer:{
        backgroundColor: 'white',
        maxWidth: '80%',
        padding: 10,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderColor: 'lightgray',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    chatText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15
    },
    chatTime: {
        color: 'gray',
        fontSize: 12,
        alignSelf: 'flex-end'
    },
    image:{
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal:2,
        top: 8
    },
    conatiner2:{
        flexDirection: 'row',
        alignItems: 'center'
    }
})