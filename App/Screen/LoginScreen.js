import React from 'react';
import { View, Text, ImageBackground, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper'; 
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 
import app from './../../assets/images/loginGradient.png'; 
import Google from './../../assets/images/google.png'; 
import facebook from './../../assets/images/Facebook.png'; 
import LOGO from './../../assets/images/logo.png'; 

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={app} style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
        <Image source={LOGO} style={styles.logo}></Image>
          
        </View>
        <Card style={styles.card}>
          {/* 卡片内容 */}
          <Text style={styles.welcomeText}>歡迎使用 X-Plore APP！</Text>
          <Text style={styles.subText}>探索你的學習領域，開啟新世界。</Text>
          <TextInput label="Username" style={styles.input} />
          <TextInput label="Password" secureTextEntry={true} style={styles.input} />

          <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>忘記密碼?</Text>
        </TouchableOpacity>

          <Button mode="contained" style={styles.loginbutton}>登入</Button>
          <Button mode="outlined" style={styles.regibutton} labelStyle={styles.regibutton}>註冊帳號</Button>
        </Card>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>使用以下方式登入</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.socialLoginContainer}>
          <Image source={Google} style={styles.socialIcon}></Image>
          <Image source={facebook} style={styles.socialIcon}></Image>
         
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    height:500,
  
    borderRadius:100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    width:200,
    height:100,
    justifyContent: 'center',
    alignItems: 'center',

  },
  logoContainer: {
    marginBottom: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    width: '85%',
    height:'45%',
    padding: 20,
    borderRadius: 20,
    elevation: 5, // 卡片阴影效果
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // 卡片背景颜色
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    textAlign: 'center',
    fontSize: 11,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  loginbutton: {
    backgroundColor:'#25A6FC',
    marginBottom: 10,
  },
  regibutton: {
    fontWeight:'bold',
    marginBottom: 10,
    borderColor: '#25A6FC', 
    color: '#25A6FC', 
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#666',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: 'blue',
    fontSize: 12,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});

export default LoginScreen;
