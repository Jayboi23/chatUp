import {React, useState} from 'react';
import { View,Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';

const SettingsScreen = ({navigation}) =>{
    const [darMode,setDarkMode] = useState(false);
    const [notifications,setNotification] = useState(false);
   const logOut = () =>{
    auth.signOut().then(() => {
        // Sign-out successful.
        navigation.replace('Login')
          }).catch((error) => {
        // An error happened.
          });
   }
    const buttonPressed = () =>{
        console.warn("Button Pressed")
    }
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
            <Image style={styles.avatar} source={{uri: auth?.currentUser?.photoURL}} />
            <Text style={styles.username}>{auth?.currentUser.displayName}</Text>
            <Text style={styles.email}>{auth?.currentUser?.email}</Text>
            <TouchableOpacity onPress={buttonPressed} style={styles.buttonContainer}>
                <Text style={{color: '#fff', fontWeight: '600', fontSize: 17}}>Edit Profile</Text>
                <Feather style={{marginLeft: 15}} name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
            </View>
            <Text style={styles.preference}>Account</Text>
            <TouchableOpacity style={styles.subcontainer2}>
            <Text style={{fontSize: 15, fontWeight:'500', marginRight:80}}>Change Email</Text>
            <Feather name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.subcontainer2}>
            <Text style={{fontSize: 15, fontWeight:'500', marginRight:80}}>Change Password</Text>
            <Feather name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.preference}>Prefrences</Text>
            <TouchableOpacity style={styles.subcontainer2}>
            <Fontisto name="world-o" size={24} color="black" />
            <Text style={{fontSize: 18, fontWeight:'400', marginRight:80}}>Language</Text>
            <Text style={{fontSize: 18, fontWeight:'400', color:'gray'}}>English</Text>
            <Feather name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.subcontainer2}>
            <Feather name="moon" size={24} color="black" />
            <Text style={{fontSize: 18, fontWeight:'400', marginRight:135}}>Dark Mode</Text>
            <Switch value={darMode} onValueChange={(value) => {setDarkMode(value)}}/>
            </View>
            <View style={styles.subcontainer2}>
            <Ionicons name="notifications" size={24} color="black" />
            <Text style={{fontSize: 18, fontWeight:'400', marginRight:135}}>Notifications</Text>
            <Switch value={notifications} onValueChange={(value) => {setNotification(value)}}/>
            </View>
            <TouchableOpacity onPress={logOut} style={styles.subcontainer2}>
            <Entypo name="log-out" size={24} color="black" />
            <Text style={{fontSize: 18, fontWeight:'400', marginRight:180}}>Log out</Text>
            <Feather name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },
    avatar:{
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    username:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonContainer:{
        flexDirection:'row',
        backgroundColor: 'royalblue',
        width: '50%',
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginTop: 5
    },
    preference:{
        backgroundColor: 'lightgray',
        width: '100%',
        padding: 10,

    },
    subcontainer:{
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        padding: 10
    },
    subcontainer2:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between'
    }
})