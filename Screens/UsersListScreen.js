import {React, useState, useEffect} from 'react';
import {Text, FlatList, View, StyleSheet, TextInput, TouchableOpacity,Image} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { db, auth } from '../firebase';

const UsersListScreen = ({navigation}) => {
    const [userList, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    const filteredUserList = userList.filter((user) =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );
    useEffect(() => {
        // Fetch the authenticated users from Firebase
        const fetchUsers = async () => {
          const usersSnapshot = await db.collection('users').get();
          const users = usersSnapshot.docs.map((doc) => doc.data());

          const filteredUsers = users.filter((user) => user.id !== auth.currentUser?.uid);


          setUserList(filteredUsers);
        };
    
        fetchUsers();
      }, []);

      const handleStartChat = async (recipientUserId, recipientUserName, recipientPhoto) => {
        const chatName = recipientUserName;
      
        // Check if a chat with the given chatName already exists for the current user
        const chatQueryByName = db
          .collection("chats")
          .where("chatName", "==", chatName)
          .get();
      
        // Check if a chat exists where the current user is a participant
        const chatQueryByParticipant = db
          .collection("chats")
          .where("participants", "array-contains", auth.currentUser.uid)
          .get();
      
        // Run both queries concurrently using Promise.all
        const [chatQueryByNameSnapshot, chatQueryByParticipantSnapshot] = await Promise.all([
          chatQueryByName,
          chatQueryByParticipant,
        ]);
      
        if (!chatQueryByNameSnapshot.empty) {
          // Chat with the same name already exists, get the existing chatId
          const chatId = chatQueryByNameSnapshot.docs[0].id;
          navigation.replace('ChatScreen', { chatId, recipientUserId, recipientUserName, recipientPhoto });
        } else if (!chatQueryByParticipantSnapshot.empty) {
          
          const chatId = chatQueryByParticipantSnapshot.docs[0].id;
          navigation.replace('ChatScreen', { chatId, recipientUserId, recipientUserName, recipientPhoto });
          // Chat with the same name doesn't exist, but a chat with the current user as a participant exists
          // You can handle this case or ignore it based on your application's requirements
          // For example, you can display a message saying that a chat with the same name exists
        } else {
          // Chat with the same name doesn't exist, create a new chat
          const chatRef = await db.collection("chats").add({
            chatName: recipientUserName,
            participants: [auth.currentUser.uid, recipientUserId],
            recipientId: recipientUserId,
            recipientImage: recipientPhoto,
            senderPhoto: auth.currentUser.photoURL,
            senderName: auth.currentUser.displayName,
          });
      
          // Get the newly created chatId and navigate to the ChatScreen
          navigation.replace('ChatScreen', { chatId: chatRef.id, recipientUserId, recipientUserName, recipientPhoto });
        }
      };
      
        

      const renderItem = ({ item }) => (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => handleStartChat(item.id, item.displayName, item.photoURL)}>
        <View style={styles.chat}>
        <Image style={styles.avatar} source={{uri: item.photoURL}}/>
        <View style={{padding: 5}}>
        <View style ={{flexDirection: 'row', width: '75%', marginTop: -5}}>
        <Text style={{fontWeight: 'bold', justifyContent: 'center', alignItems: 'center'}} width={200} numberOfLines={1}>{item.displayName}</Text>
        </View>
        <View style={{flexDirection:'row', width: '75%', marginTop: 8,}}>
        <Text style={{alignSelf: 'center'}} numberOfLines={1} width={250}>{item.statusDisplay}</Text>
        </View>
        </View>
        </View>
        </TouchableOpacity>
    </View>
      );
    
      return (
        <View style={{flex: 1, padding: 5}}>
            <View style={styles.search}>
        <EvilIcons name="search" size={24} color="black" />
        <TextInput value={searchQuery} onChangeText={setSearchQuery} style={{width: '95%', padding: 5}} placeholder='Search'/>
        </View>
        <FlatList
          data={filteredUserList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
            style={{marginTop: 5 }}
        />
        </View>
      );
    };

export default UsersListScreen;

const styles = StyleSheet.create({
   container:{
    flex: 1,
   },
   search:{
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'lightgray',
    padding: 5,
    alignItems: 'center',
    borderRadius: 25
   },
   avatar:{
    width: 50,
    height: 50,
    borderRadius: 25
   },
   chat:{
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    alignItems: 'center'
   }
})