import {React, useState} from 'react';
import {Image, View,Text,Dimensions, StyleSheet,TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import {auth, db} from '../firebase';
import { FontAwesome } from '@expo/vector-icons';

const {width} = Dimensions.get('screen')

const RegisterScreen = ({navigation}) =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState('');

    const signUp = () => {
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in 
    navigation.replace('Home')
    const user = userCredential.user;
    user.updateProfile({
    displayName: name, 
    photoURL: photo? photo:"https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png",
    }).then(() => {
    // Profile updated!
    console.log("User", user)
    db.collection('users')
    .doc(auth.currentUser.uid)
    .set({
        id: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      phoneNumber: auth.currentUser.phoneNumber,
      photoURL: auth.currentUser.photoURL,
      statusDisplay: "Hey!, i'm using chatUp"
    })
    .then(() => {
      console.log('User added to Firestore');
      console.log('User:', user)
    })
    .catch((error) => {
      console.error('Error adding user to Firestore:', error);
    });
    // ...
    }).catch((error) => {
    // An error occurred
    // ...
    });
    })
    .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
    });
    
    }
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1,}}>
        <ScrollView automaticallyAdjustKeyboardInsets={true} style={{flex: 1, padding: 10, backgroundColor: '#fff' }}>
            <Image style={{width, height: '40%', alignSelf: 'center'}} source={{uri: 'https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1690046091~exp=1690046691~hmac=62523d8cebd2af81c540c7bcc9ca750cbd2c4c857911d0300c6b3ff43864019e'}}/>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.scrollContent}>
           <View style={styles.name}>
            <TextInput style={{padding: 5, fontSize: 16}} value={name} onChangeText={text => setName(text)} placeholder='Name'/>
        </View>
        <View style={styles.email}>
            <TextInput style={{padding: 5, fontSize: 16}} value={email} onChangeText={text => setEmail(text)} placeholder='Email'/>
        </View>
        <View style={styles.password}>
            <TextInput style={{padding: 5, fontSize: 16}} secureTextEntry value={password} onChangeText={text => setPassword(text)} placeholder='Password' />
        </View>
        <View style={styles.imageUrl}>
            <TextInput style={{padding: 5, fontSize: 16}} value={photo} onChangeText={text => setPhoto(text)} placeholder='Image url (Optional)'/>
        </View>
        <TouchableOpacity onPress={signUp} style={styles.buttonContainer}>
            <Text style={{color: '#fff', fontSize: 18}}>Sign Up</Text>
        </TouchableOpacity>
        </View>
        <Text style={{alignSelf: 'center', marginTop: 50}}>Or Sign up with your Social Accounts</Text>
        <View style={styles.social}>
        <FontAwesome name="google" size={24} color="black" />
        <FontAwesome name="facebook-official" size={24} color="black" />
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    email:{
        backgroundColor: '#ededed',
        padding: 8,
        width: '100%',
        margin: 10,
        borderRadius: 20,
    },
    password:{
        backgroundColor: '#ededed',
        padding: 8,
        width: '100%',
        borderRadius: 20
    },
    buttonContainer:{
        width: '90%',
        backgroundColor: 'royalblue',
        borderRadius: 20,
        padding: 12,
        marginTop: 10,
        alignItems: 'center',
    },
    imageUrl:{
        backgroundColor: '#ededed',
        padding: 8,
        width: '100%',
        marginTop: 10,
        borderRadius: 20
    },
    name:{
        backgroundColor: '#ededed',
        padding: 8,
        width: '100%',
        marginTop: 10,
        borderRadius: 20 
    },
    scrollContent:{
        flexGrow: 1,
        alignItems: 'center',
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 20
    },
    social:{
        flexDirection: 'row',
        width: 60,
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginVertical: 10
      },
})