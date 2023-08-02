import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatList from './Screens/ChatList';
import ChatScreen from './Screens/ChatScreen';
import MainBottomTab from './Components/MainBottomTabs';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import UsersListScreen from './Screens/UsersListScreen';
import WelcomeScreen from './Screens/WelcomeScreen';


const Stack = createStackNavigator();
export default function App() {
  return (
  
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Welcome' >
      <Stack.Screen name='Home' component={MainBottomTab} options={{headerShown: false}}/>
      <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name='Register' component={RegisterScreen} options={{headerTitle: '', headerBackTitle: ''}}/>
      <Stack.Screen name='Users' component={UsersListScreen}/>
      <Stack.Screen name='Chats' component={ChatList}/>
      <Stack.Screen name='Welcome' component={WelcomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name='ChatScreen' component={ChatScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}


