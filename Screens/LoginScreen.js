import React, { useEffect, useState } from 'react';
import { View,Text, Dimensions, StyleSheet,TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {auth} from '../firebase';
import { FontAwesome } from '@expo/vector-icons';

const {width} = Dimensions.get('screen')
const LoginScreen = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((userCredential) => {
        if (userCredential) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          navigation.replace('Home')
          const user = userCredential.user;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    return unsubscribe;
    }, []);

    const signIn =  () =>{
  auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    navigation.replace('Home')
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage)
  });
}

    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView automaticallyAdjustKeyboardInsets={true}  style={{flex: 1, padding: 10}}>
        <Image style={{width, height: '80%', alignSelf: 'center', marginTop: 30}} source={{uri:"https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=740&t=st=1690034860~exp=1690035460~hmac=8ceb8285cd76d44e8e74d403960761f961f8d7661b06c370405fd7e8093e0a0c"}}/>
        <Text style={styles.greetings}>Login To Your Account</Text>  
          <View style={styles.contentContainer}>      
        <View style={styles.email}>
        <TextInput style={{padding: 5, fontSize: 16}} value={email} onChangeText={text => setEmail(text)} placeholder='Email'/>
        </View>
        <View style={styles.password}>
        <TextInput style={{padding: 5, fontSize: 16}} secureTextEntry value={password} onChangeText={text => setPassword(text)} placeholder='Password' />
        </View>
        <TouchableOpacity style={{alignSelf: 'flex-start', bottom: 5, marginHorizontal: 20}}><Text>Forgotten Password?</Text></TouchableOpacity>
        <TouchableOpacity onPress={signIn} style={styles.buttonContainer}>
            <Text style={{color: '#fff', fontSize: 18}}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer2} onPress={() => navigation.navigate('Register')}>
            <Text style={{color: 'royalblue', fontSize: 18}}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.social}>
        <FontAwesome name="google" size={24} color="black" />
        <FontAwesome name="facebook-official" size={24} color="black" />
        </View>
        </View>
        <Text style={{fontWeight: 'bold', alignSelf:'center', marginTop: 68, color: 'lightgray'}}>&#169; 2023 Jay Tech</Text>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff'
    },
    email:{
        backgroundColor: '#ededed',
        width: '95%',
        borderRadius: 20,
        justifyContent: 'center',
        padding: 8
    },
    password:{
      backgroundColor: '#ededed',
      width: '95%',
      padding: 8,
      borderRadius: 20,
    margin: 10,
      justifyContent: 'center'
    },
    buttonContainer:{
        width: '90%',
        backgroundColor: 'royalblue',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
  greetings:{
      fontWeight: 'bold',
      fontSize: 30,
      marginVertical: 15,
      bottom: 20
  },
    buttonContainer2:{
      width: '90%',
      backgroundColor: 'whitesmoke',
      padding: 10,
      borderRadius: 20,
      alignItems: 'center',
      borderColor: 'royalblue',
      borderWidth: 0.5,
      margin: 10
    },
    contentContainer:{
      width,
      alignItems: 'center',
      alignSelf: 'center',
    },
    social:{
      flexDirection: 'row',
      width: 60,
      justifyContent: 'space-between',
    }

})