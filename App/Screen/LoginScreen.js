import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, TextInput, Button, Snackbar } from 'react-native-paper';
import { auth, signInWithEmailAndPassword } from '../../firebase';
import app from './../../assets/images/loginGradient.png';
import LOGO from './../../assets/images/logo.png';
import Google from './../../assets/images/google.png';
import facebook from './../../assets/images/Facebook.png';
import { useNavigation } from '@react-navigation/native'; // 導入 useNavigation 鉤子
import TabNavigation from '../../Navigation/TavNavigation'; // 導入 TabNavigation

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation(); 

  const handleLogin = () => {
    if (!email || !password) {
      setError('請輸入帳號和密碼');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        setError('');
        // 登入成功後導航至 TabNavigation
        navigation.navigate('TabNavigation');
      })
      .catch(error => {
        console.error('Login Error:', error.message);
        setError('帳號或密碼錯誤');
      });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground source={app} style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
          <Image source={LOGO} style={styles.logo}></Image>
        </View>
        <Card style={styles.card}>
          <Text style={styles.welcomeText}>歡迎使用 X-Plore APP!</Text>
          <Text style={styles.subText}>探索你的學習領域，開啟新世界。</Text>

          <TextInput
            placeholder="請輸入電子信箱"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="請輸入密碼"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>忘記密碼?</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin}>
              <Button mode="contained" style={styles.loginbutton}>登入</Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister}>
              <Button mode="outlined" style={styles.regibutton} labelStyle={styles.regibutton}>註冊帳號</Button>
            </TouchableOpacity>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>使用以下方式登入</Text>
              <View style={styles.divider} />
            </View>
            <View style={styles.socialLoginContainer}>
              <Image source={facebook} style={styles.socialIcon}></Image>
              <Image source={Google} style={styles.socialIcon}></Image>

            </View>
          </View>
        </Card>

        <Snackbar
          visible={!!error}
          onDismiss={() => setError('')}
          action={{
            label: '關閉',
            onPress: () => setError(''),
          }}>
          {error}
        </Snackbar>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    height: 500,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    width: '85%',
    height: '45%',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: 'white',
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
    backgroundColor: '#fff',
    color: '#25A6FC',
  },
  loginbutton: {
    marginTop: 10,
    backgroundColor: '#25A6FC',
    marginBottom: 10,
  },
  regibutton: {
    fontWeight: 'bold',
    marginBottom: 10,
    borderColor: '#25A6FC',
    color: '#25A6FC',
  },
  registerButton: {
    textAlign: 'center',
    color: '#25A6FC',
    fontSize: 12,
    marginTop: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    marginTop: 20,
    backgroundColor: '#ccc',
  },
  
  dividerText: {
    marginHorizontal: 10,
    marginTop: 40,
    fontSize: 12,
    color: '#666',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,

  },
  forgotPasswordText: {
    color: '#25A6FC',
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
