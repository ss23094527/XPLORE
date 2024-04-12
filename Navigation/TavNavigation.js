import React, { Component } from 'react';
import  { useEffect, useState } from 'react';
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
import { FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { COLORS } from '../theme';

import { getCurrentUser } from '../firebase';
import HomeAcountIcon from '../src/component/HomeAcountIcon';
import { selectCounter,selectColorMode,toggleColorMode } from "../src/redux/counterSlice";
import { useDispatch, useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();



export default class TavNavigation extends Component {

  

  constructor(props) {
    super(props);
    this.state = {
      bgPosition: new Animated.Value(0),
      user: null, // 添加用戶狀態以保存當前用戶
    };
  }

  componentDidMount() {
   
    const currentUser = getCurrentUser();
    this.setState({ user: currentUser });
  }

  handlePress = (index) => {
    const { bgPosition } = this.state;
    const position = index * 76;
    Animated.timing(bgPosition, {
      toValue: position,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const { bgPosition, user } = this.state;

    return (
      <Drawer.Navigator 
        screenOptions={{ 
          headerShown: false 
        }}
        drawerContent={props => <CustomDrawerContent {...props} user={user} />}
      >
        <Drawer.Screen name=" ">
          {props => <TabNavigation {...props} bgPosition={this.state.bgPosition} handlePress={this.handlePress} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  }
}

function CustomDrawerContent({ navigation, user }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        setUserData(user); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    
    <View style={styles.drawerContainer}>
      {/* 添加用戶名稱和頭像 */}
      {user && (
        
        <View style={styles.userInfoContainer}>
           <HomeAcountIcon  />
           {userData && (
            
            <View style={styles.detailsContainer}>
              
              <Text style={styles.username}>{userData.username}</Text>
           
            </View>
          )}
  
          {/* <Image source={{ uri: user.photoURL }} style={styles.userAvatar} /> */}
         
        </View>
      )}

      
      <DrawerContentScrollView>
      <DrawerItem
          label="個人檔案"
          onPress={() => navigation.navigate('我的')}
          icon={({ color, size }) => (
            <FontAwesome name="user" color={COLORS.primary} size={size} />
          )}
        />
        <DrawerItem
          label="設定"
          onPress={() => navigation.navigate('Settings')}
          icon={({ color, size }) => (
            <FontAwesome name="cog" color={color} size={size} />
          )}
        />
        <DrawerItem
          label="願望清單"
          onPress={() => navigation.navigate('願望清單')}
          icon={({ color, size }) => (
            <FontAwesome name="heart" color={color} size={size} />
          )}
        />
        <DrawerItem
          label="登出"
          onPress={() => navigation.navigate('Login')}
          icon={({ color, size }) => (
            <FontAwesome name="sign-out" color={color} size={size} />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );
}

function TabNavigation({ navigation, bgPosition, handlePress }) {

  const counterValue =useSelector(selectCounter);
  const colorMode = useSelector(selectColorMode);
  const dispatch = useDispatch();

  return (
    <View style={[styles.container, { backgroundColor: colorMode === 'dark' ? COLORS.black : COLORS.white }]}>
       {/* DrawerButton */}
       <TouchableOpacity style={styles.drawerIconContainer} onPress={() => navigation.openDrawer()}>
       <Image source={require('../assets/images/drawer.png')} style={styles.drawerIcon} />
      </TouchableOpacity>

      {/* TabNavigator */}
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
            backgroundColor: colorMode === 'dark' ? COLORS.black : COLORS.white,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
            paddingBottom: 10,
          },
        }}>
        <Tab.Screen
            name="首頁"
            component={HomeScreen}
            options={{
              tabBarButton: ({ onPress, accessibilityState }) => (
                <TouchableOpacity onPress={() => { onPress(); handlePress(0); }} activeOpacity={1} style={styles.tabBarButton}>
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
                <TouchableOpacity onPress={() => { onPress(); handlePress(1); }} activeOpacity={1} style={styles.tabBarButton}>
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
                <TouchableOpacity onPress={() => { onPress(); handlePress(2); }} activeOpacity={1} style={styles.tabBarButton}>
                  
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
                <TouchableOpacity onPress={() => { onPress(); handlePress(3); }} activeOpacity={1} style={styles.tabBarButton}>
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
                <TouchableOpacity onPress={() => { onPress(); handlePress(4); }} activeOpacity={1} style={styles.tabBarButton}>
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
        {/* Add other Tab.Screen components for Category, AI, Like, and Profile */}

      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  username: {
    marginTop:45,
    marginHorizontal:5,
    color: COLORS.black,
    fontSize: 20,
    alignItems:"center",
    alignSelf:"center",
    justifyContent:"center",
    fontWeight:'bold',
    
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
    
    marginTop: 10,
    width: 30,
    height: 30,
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
    width: '100%',
    zIndex: -1,
  },
  gradient: {
    height: 60,
    borderRadius: 20,
    flex: 1,
    zIndex: -1,
  },
  drawerContent: {
    flex: 1,
  },
  drawerContainer: {
    flex: 1,
  
  },
  usericon: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    borderWidth: 2,
    marginTop: 30,
    marginLeft: 20,
    borderColor: COLORS.white,
  },

  drawerIcon: {
    marginTop:10,
    marginBottom:10,
    width: 30,
    height: 30,
    tintColor: '#FFFFFF', 
  },

  drawerIconContainer: {
    position: 'absolute',
    padding:10,
    top: 16,
    left: 16,
    zIndex: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  
});
