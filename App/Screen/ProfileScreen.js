import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { COLORS } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';
import { auth, getCurrentUser } from '../../firebase'; 
import { ProgressBar } from 'react-native-paper';
import ProfileValue from '../../src/component/ProfileValue';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    // Fetch user data when component mounts
    console.log("Fetching user data...");
    getCurrentUser()
      .then((data) => {
        console.log("User data fetched successfully:", data);
        setUserData(data); // Set user data to state
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      navigation.navigate('StartScreen'); // Navigate to LoginScreen after signing out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.profileText}>
          PROFILE
        </Text>
        <MaterialIcons style={styles.sunIcon} name="wb-sunny" size={30} color={COLORS.primary} />
      </View>
    );
  }

  function renderProfileCard() {
    return (
      <View style={styles.profileCard}>
        <ImageBackground
          source={require('../../assets/images/homeGradient.png')} // Background image
          style={styles.backgroundImage}
          imageStyle={styles.imageStyle}
        >
          <TouchableOpacity style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/homeaccounticon.png')} // User avatar
              style={styles.icon}
            />

            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  marginBottom: -40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft:40,
                  borderRadius: 15,
                  backgroundColor: COLORS.blue,
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/Cam.png')} // Upload image
                  style={{ width: 17, height: 17 }}
                ></Image>
              </View>
            </View>
            
          </TouchableOpacity>

          {/* Display username */}
          {userData && (
            <View style={styles.detailsContainer}>
              <Text style={styles.username}>{userData.email}</Text>
              <Text style={{
                color:COLORS.white,
              }}>初學者</Text>
            </View>
          )}
        </ImageBackground>
       
      </View>
    );
  }

    function renderProfileSection() {
        return (
            <View style={styles.profileSectionContainer}>
                <ProfileValue
                    label="個人資料設定"
                    value=""
                    icon={require('../../assets/images/user-duotone.png')}
                />
                
                <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.lightGray }} />
                <ProfileValue
                    label="我的課程"
                    value=""
                    icon={require('../../assets/images/book-sharp.png')}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.lightGray }} />
                <ProfileValue
                    label="我的收藏"
                    value=""
                    icon={require('../../assets/images/collection.png')}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.lightGray }} />
                <ProfileValue
                    label="我的購物車"
                    value=""
                    icon={require('../../assets/images/cart.png')}
                />
            </View>
        );
    }

    function renderLogout(){
      return(
        <View>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignOut} >
            <Text style={styles.signInText}>登出</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            {renderHeader()}

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* ProfileCard */}
                {renderProfileCard()}

                {/* ProfileSection */}
                {renderProfileSection()}

                  {/* Logout */}
                  {renderLogout()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-between',
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sunIcon: {
    marginRight: 10,
  },
  profileCard: {
    marginTop: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  iconContainer: {
    width: 80,
    height: 80,
  },
  icon: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    borderWidth: 2,
    marginTop: 30,
    marginLeft: 20,
    borderColor: COLORS.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 120,
    marginBottom:40,
    alignItems: 'flex-start'
  },
  username: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight:'bold',
    marginTop:-30,
  },
  scrollViewContent: {
    paddingBottom: 150,
    paddingHorizontal:10,
  },
  profileSectionContainer:{
    marginTop:20,
    paddingHorizontal:20,
    borderWidth:1,
    borderRadius:10,
    borderColor:COLORS.lightGray,
  },
  signInButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  signInText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
