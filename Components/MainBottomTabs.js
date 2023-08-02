import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ChatScreen from '../Screens/ChatScreen';
import CallsScreen from '../Screens/CallsScreen';
import CameraScreen from '../Screens/CameraScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import ChatList from '../Screens/ChatList';


const Tab = createBottomTabNavigator();
const  MainBottomTab = ()=> {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Chats') {
              iconName = focused
                ? 'chatbubbles'
                : 'chatbubbles-outline';
            } else if (route.name === 'Calls') {
              iconName = focused ? 'call' : 'call-outline';
            } else if (route.name === 'Camera') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            } 
  
            return <Ionicons name={iconName} size={size} color={ focused ?'royalblue' : 'lightgray'} />;
          },
        })}
        initialRouteName='Chats'
      >
        <Tab.Screen name="Calls" component={CallsScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Chats" component={ChatList} />
        <Tab.Screen name="Settings" component={SettingsScreen}/>
      </Tab.Navigator>
    );
  }

export default MainBottomTab;