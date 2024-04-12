// HomeAcountIcon.js

import React from 'react';
import { View, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme';


const HomeAcountIcon = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity >
      <Image
      onPress={() => navigation.navigate('我的')}
        source={require('../../assets/images/homeaccounticon.png')} // 將圖片路徑更換為你的帳號頭像路徑
        style={styles.icon}
      />
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flexDirection:'row',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginTop:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
});

export default HomeAcountIcon;
