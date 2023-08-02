import React, { useLayoutEffect, useState, useEffect } from 'react';
import {View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { auth, db} from '../firebase';
import chats from '../Components/chats.json'
import ChatListComponents from '../Components/ChatListComponents';

function ChatList({navigation}) {
  const [chatList, setChatLists] =useState([]);

 useEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .where("participants","array-contains", auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        setChatLists(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  
    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          <Image style={{ width: 35, height: 35, borderRadius: 25, marginLeft: 10 }} source={{ uri: auth?.currentUser?.photoURL }} />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Users')}>
          <Feather style={{ marginRight: 15 }} name="edit" size={24} color="royalblue" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const handleChat = (chatId, recipientUserName, recipientPhoto,recipientUserId) =>{
    navigation.navigate('ChatScreen' ,{recipientUserName, chatId, recipientPhoto, recipientUserId} )
  };
    return (
    <View style={{padding:5, }}>
      <FlatList
        data={chatList}
        renderItem={({item}) => <ChatListComponents handleNavigation={handleChat} id={item.id} chatName={item.chatName} recipientPhoto={item.recipientImage} recipientUserId={item.recipientId} senderPhoto={item.senderPhoto} senderName={item.senderName}/>}
        keyExtractor={(item) => item.id}
        style={{ height: '100%' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default ChatList;

