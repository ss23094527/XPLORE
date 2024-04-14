import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import backgroundImage from './../../assets/images/loginGradient.png'; 
import logo from './../../assets/images/xploreWHITEword.png';
import LoginScreen from './LoginScreen';
import RegiScreen from './RegiScreen';
import HomeScreen from './HomeScreen';
import { useNavigation } from '@react-navigation/native'; 
import Animated,{FadeIn,FadeInDown,FadeInUp,FadeOut} from 'react-native-reanimated';

const Stack = createStackNavigator();

export default class StartScreen extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="StartScreenContent" screenOptions={{ headerShown: false,gestureEnabled: false }}>
        <Stack.Screen name="StartScreenContent" component={StartScreenContent} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegiScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
       
      </Stack.Navigator>
    );
  }
}

const StartScreenContent = () => {
  const navigation = useNavigation(); 

  return (
    <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.Text}>   探索你的學習領域，開啟新世界。</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Let's GO!</Text>
        </TouchableOpacity>
      </ImageBackground>
    </Animated.View>
  );
};


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