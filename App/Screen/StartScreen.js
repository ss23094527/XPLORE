import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import backgroundImage from './../../assets/images/loginGradient.png'; 
import logo from './../../assets/images/xploreWHITEword.png';
import LoginScreen from './LoginScreen';
import RegiScreen from './RegiScreen';
import HomeScreen from './HomeScreen';
import APP from '../../App';


const Stack = createStackNavigator();

export default class StartScreen extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false,gestureEnabled: false }}>
        <Stack.Screen name="StartScreen" component={StartScreenContent} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegiScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="APP" component={APP} />
      </Stack.Navigator>
    );
  }
}

class StartScreenContent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <Image source={logo} style={styles.logo}></Image>
          <Text style={styles.Text}>   探索你的學習領域，開啟新世界。</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Let's GO!</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  Text: {
    textAlign: 'center',
    fontSize: 12,
    color: '#fff',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 40,
    marginTop: 20,
  },
  buttonText: {
    color: '#006BF9',
    fontSize: 16,
    fontWeight: 'bold',
  },
});