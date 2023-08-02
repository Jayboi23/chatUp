import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image,Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { db, auth } from "../firebase";
import { Feather } from '@expo/vector-icons';

const ChatListComponents = ({handleNavigation,id, chatName, recipientPhoto, recipientUserId, senderPhoto, senderName}) => {
  const [chatMessages, setChatMesaages] = useState([]);
    
  dayjs.extend(relativeTime);
    useEffect(() =>{
        const unsubscribe = db.collection("chats").doc(id).collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot)=>{
          setChatMesaages(snapshot.docs.map((doc) => ({
            _id: doc.id,
            ...doc.data()
          })))
        })
        return unsubscribe;
    },[]);

    useEffect(() => {
      if (chatMessages.length > 0 && chatMessages[0].recipient === auth.currentUser.uid) {
        // Get the first message in the chatMessages array (latest message)
        const latestMessage = chatMessages[0];
        // Check if the latest message is not read and is not sent by the current user
        if (!latestMessage.isRead && latestMessage.sender !== auth.currentUser.uid) {
          // Update the message status as read
          updateMessageReadStatus(latestMessage._id);
        }
      }
    }, [chatMessages]);
  
    const updateMessageReadStatus = async (messageId) => {
      try {
        await db.collection("chats").doc(id).collection("messages").doc(messageId).update({
          isRead: true
        });
        console.log("Message read status updated.");
      } catch (error) {
        console.error("Error updating message read status:", error);
      }
    };
  
    return (
      <View key={id} style={styles.container}>
      <TouchableOpacity style={styles.chat} onPress={() => handleNavigation(id, chatName === auth.currentUser.displayName ? senderName : chatName, recipientPhoto, recipientUserId)}>
          <View style={{flexDirection: 'row', width: '100%'}}>
          <Image style={styles.avatar} source={{ uri: recipientPhoto === auth.currentUser.photoURL ? senderPhoto : recipientPhoto }} />
          <View style={{width:'85%', marginHorizontal: 5}}>
            <View style={{ flexDirection: 'row',marginTop: 5, justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{flexDirection: 'row',}}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }} maxWidth={170} numberOfLines={1}>{chatName === auth.currentUser.displayName ? senderName : chatName}</Text>
              <MaterialIcons style={{}} name="verified" size={15} color="royalblue" />
              </View>
              <Text style={{alignSelf: 'flex-end'}}>{dayjs(chatMessages?.[0]?.timestamp).fromNow()}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{ }} numberOfLines={1} maxWidth={265}>{chatMessages?.[0]?.text}</Text>
              <Text style={styles.messageCount}>1</Text>
            </View>
            </View>
          </View>
    </TouchableOpacity>
    </View>
  );
};

 export default ChatListComponents;

const styles = StyleSheet.create({
    container: {
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'gray',
    },
    chat: {
      width: '100%',
      padding: 5,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 5,
      borderRadius: 10
    },
    messageCount:{
      backgroundColor: 'royalblue',
      color: 'whitesmoke',
      maxWidth: 40,
      textAlign: 'center',
      textAlignVertical: 'center',
      borderRadius: 5,
      overflow: 'hidden',
      padding: 3,
      alignSelf: 'flex-end'
    } 
  });