import {React, useLayoutEffect, useState, useEffect} from 'react';
import {StyleSheet, View, TextInput, Keyboard, FlatList, KeyboardAvoidingView,Platform, ImageBackground} from 'react-native';
import Message from '../Components/Messages';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import bg from '../assets/BG.png';
import { useRoute, useNavigation } from '@react-navigation/native';
import {auth, db, firebase} from '../firebase';


    const ChatScreen = ({}) => {
 
      const route = useRoute();
    const navigation = useNavigation();
    useLayoutEffect(() =>{
      navigation.setOptions({
        headerBackTitle:'Chats',
        title: route.params.recipientUserName
      })
    },)
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() =>{
      const unsubscribe = db
      .collection("chats")
      .doc(route.params.chatId)
      .collection("messages")
      .orderBy("timestamp" ,"desc")
      .onSnapshot((snapshot)=>
      setMessages(snapshot.docs.map((doc)=>({
        _id: doc.id,
        ...doc.data(),
      }))))
      return unsubscribe;
    }, [route]);

    
   const onSend = async () => {
    if (newMessage.trim() === '') {
        return;
      }
      setNewMessage('');
      try {
        await db.collection('chats').doc(route.params.chatId).collection('messages').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          text: newMessage,
          recipientName: route.params.recipientUserName,
          recipient: route.params.recipientUserId,
          recipientPhoto: route.params.recipientPhoto,
          email: auth.currentUser.email,
          sender: auth.currentUser.uid,
          senderName: auth.currentUser.displayName,
          senderPhoto: auth.currentUser.photoURL,
          isRead: false,
        });
        // Clear the newMessage state after successfully adding the message
        console.log('Message sent successfully!');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
  

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80} behavior={Platform.OS === 'ios' ? 'padding': 'height'}>
      <ImageBackground source={bg} style={{flex:1}}>

      <FlatList
            data={messages}
            renderItem={({item}) => <Message message={item}/>}
            keyExtractor={(item) => item._id} 
          inverted/>
          <View style ={{flexDirection: 'row',
        padding: 16, backgroundColor: 'whitesmoke', alignItems: 'center',
        }}>
        <FontAwesome5 name="plus" size={20} color="royalblue" />     
        <TextInput value={newMessage} onChangeText={(text)=> setNewMessage(text)} style={styles.input} placeholder='Type here...' />
        <MaterialCommunityIcons onPress={onSend} style={styles.send} name="send" size={20} color="white" />
        </View>
          </ImageBackground>
          </KeyboardAvoidingView>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
},
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