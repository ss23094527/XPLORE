import { Text, View, Image,StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../App/Screen/HomeScreen';
import CategoryScreen from '../App/Screen/CategoryScreen';
import LikeScreen from '../App/Screen/LikeScreen';
import ProfileScreen from '../App/Screen/ProfileScreen';
import LearnAIScreen from '../App/Screen/LearnAIScreen';
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';


const Tab = createBottomTabNavigator();


export default class TavNavigation extends Component {
  render() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="首頁" component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../assets/images/home.png')}
                style={{ width: size, height: size, tintColor: color }}
              />
            )
          }}
        />
        <Tab.Screen name="分類" component={CategoryScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="category" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen name="AI" component={LearnAIScreen}
         options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="category" size={size} color={color} />
          )
        }}
        />
        <Tab.Screen name="Likelist" component={LikeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="category" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="category" size={size} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
 
  icon: {
    height: 36,
    width: 36,
  }
})