import 'react-native-gesture-handler';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './App/Screen/LoginScreen';
import StartScreen from './App/Screen/StartScreen';
import Navigation from './Navigation/TavNavigation'; 
import { auth } from './firebase'; 
import {  configureStore,createSlice  } from '@reduxjs/toolkit';
import { Provider,useDispatch,useSelector } from 'react-redux'; 
import store from './src/redux/store';
import * as Updates from 'expo-updates';

export default function App() {

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  const Stack = createStackNavigator();
  const [fontsLoaded, fontError] = useFonts({
    'DelaGothicOne': require('./assets/fonts/DelaGothicOne-Regular.ttf'),
    'Outfit': require('./assets/fonts/Outfit-Light.ttf'),
    'Roboto': require('./assets/fonts/Roboto-Bold.ttf'),
    'KiwiMaru-Regular': require('./assets/fonts/KiwiMaru-Regular.ttf'),
  });
  
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // 使用者已登入，導航至 TabNavigation
        navigation.navigate('TabNavigation');
      } else {
        // 使用者已登出，導航至 StartScreen
        navigation.navigate('StartScreen');
      }
    });
    
    return unsubscribe;
  }, []);

  useEffect(()=>{
    onFetchUpdateAsync()
  },[])

  return (
    <Provider store={store}>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="StartScreen" component={StartScreen} />
          {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
          <Stack.Screen name="TabNavigation" component={Navigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
