import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, TouchableOpacity, Image, Text, Animated } from 'react-native';
import HomeScreen from '../App/Screen/HomeScreen';
import CategoryScreen from '../App/Screen/CategoryScreen';
import LikeScreen from '../App/Screen/LikeScreen';
import ProfileScreen from '../App/Screen/ProfileScreen';
import LearnAIScreen from '../App/Screen/LearnAIScreen';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';


const Tab = createBottomTabNavigator();

export default class TavNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgPosition: new Animated.Value(0),
    };
  }

  handleTabPress = (index) => {
    const { bgPosition } = this.state;
    // 计算背景位置
    const position = index * 76; // 假设每个选项卡宽度为100
    // 执行动画
    Animated.timing(bgPosition, {
      toValue: position,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const { bgPosition } = this.state;

    return (
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              height: 60,
              bottom: 16,
              right: 16,
              left: 16,
              borderRadius: 20,
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -1,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
              paddingBottom: 10,
            },
          }}
        >
          <Tab.Screen
            name="首頁"
            component={HomeScreen}
            options={{
              tabBarButton: ({ onPress, accessibilityState }) => (
                <TouchableOpacity onPress={() => { onPress(); this.handleTabPress(0); }} activeOpacity={1} style={styles.tabBarButton}>
                   <Animated.View style={[styles.gradientContainer, { left: bgPosition }]}>
                      <LinearGradient
                        colors={['#006BF9', '#01C2E0', '#60FEF9']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                      />
                    </Animated.View>
                  <Animatable.View
                    style={[
                      styles.tabBarButtonContainer,
                      accessibilityState.selected && styles.tabBarButtonActiveContainer
                    ]}
                    animation={accessibilityState.selected ? 'zoomIn' : undefined}
                    duration={500}
                    easing="ease-in-out"
                  >
                    <Image
                      source={require('../assets/images/home.png')}
                      style={[styles.icon, accessibilityState.selected && styles.iconActive]}
                    />
                    <Text style={[styles.tabBarText, accessibilityState.selected && styles.tabBarActiveText]}>
                      首頁
                    </Text>
                  </Animatable.View>
                </TouchableOpacity>
              ),
            }}
          />

          
          <Tab.Screen
            name="分類"
            component={CategoryScreen}
            options={{
              tabBarButton: ({ onPress, accessibilityState }) => (
                <TouchableOpacity onPress={() => { onPress(); this.handleTabPress(1); }} activeOpacity={1} style={styles.tabBarButton}>
                  <Animatable.View
                    style={[
                      styles.tabBarButtonContainer,
                      accessibilityState.selected && styles.tabBarButtonActiveContainer
                    ]}
                    animation={accessibilityState.selected ? 'zoomIn' : undefined}
                    duration={500}
                    easing="ease-in-out"
                  >
                    <Image
                      source={require('../assets/images/Dashboard.png')}
                      style={[styles.icon, accessibilityState.selected && styles.iconActive]}
                    />
                    <Text style={[styles.tabBarText, accessibilityState.selected && styles.tabBarActiveText]}>
                      分類
                    </Text>
                  </Animatable.View>
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="AI"
            component={LearnAIScreen}
            options={{
              tabBarButton: ({ onPress, accessibilityState }) => (
                <TouchableOpacity onPress={() => { onPress(); this.handleTabPress(2); }} activeOpacity={1} style={styles.tabBarButton}>
                  
                  <Animatable.View
                    style={[
                      styles.tabBarButtonContainer,
                      accessibilityState.selected && styles.tabBarButtonActiveContainer
                    ]}
                    animation={accessibilityState.selected ? 'zoomIn' : undefined}
                    duration={500}
                    easing="ease-in-out"
                  >
                    <LottieView
                      source={require('../animations/Animation - 1711464382456.json')}
                      autoPlay
                      loop
                      style={{ width: 120, height: 120 }}
                    />
                  </Animatable.View>
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="願望清單"
            component={LikeScreen}
            options={{
              tabBarButton: ({ onPress, accessibilityState }) => (
                <TouchableOpacity onPress={() => { onPress(); this.handleTabPress(3); }} activeOpacity={1} style={styles.tabBarButton}>
                  <Image
                      source={require('../assets/images/favorite.png')}
                      style={[styles.icon, accessibilityState.selected && styles.iconActive]}
                    />
                    <Text style={[styles.tabBarText, accessibilityState.selected && styles.tabBarActiveText]}>
                      願望清單
                    </Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="我的"
            component={ProfileScreen}
            options={{
              tabBarButton: ({ onPress, accessibilityState }) => (
                <TouchableOpacity onPress={() => { onPress(); this.handleTabPress(4); }} activeOpacity={1} style={styles.tabBarButton}>
                 <Image
                      source={require('../assets/images/profile.png')}
                      style={[styles.icon, accessibilityState.selected && styles.iconActive]}
                    />
                    <Text style={[styles.tabBarText, accessibilityState.selected && styles.tabBarActiveText]}>
                      我的
                    </Text>
                </TouchableOpacity>
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tabBarButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: '#888',
  },
  tabBarText: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'KiwiMaru-Regular', 
  },
  tabBarActiveText: {
    color: '#fff',
  },
  iconActive: {
    tintColor: '#fff',
  },
  gradientContainer: {
    
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: 60,
    width: '100%', // 宽度为两倍屏幕宽度，以确保在动画中无缝连接
    zIndex: -1,
  },
  gradient: {
    height: 60,
    borderRadius: 20,
    flex: 1,
    zIndex: -1,
  },
});
