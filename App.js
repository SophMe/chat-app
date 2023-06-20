import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/firestore';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';

import { useNetInfo }from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// create navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB4P_lmVzTlfO9yNGC_etvU1IuV5lTaw94",
    authDomain: "chatapp-35406.firebaseapp.com",
    projectId: "chatapp-35406",
    storageBucket: "chatapp-35406.appspot.com",
    messagingSenderId: "184074376841",
    appId: "1:184074376841:web:fdc5f9069d721903a51858",
    measurementId: "G-5DSNJ7DHDH"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Start'
      >
        <Stack.Screen
        name='Start'
        component={Start}
        />
        <Stack.Screen
        name='Chat'
        >
        {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;