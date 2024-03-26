import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { auth, createUserWithEmailAndPassword, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import app from './../../assets/images/loginGradient.png';
import LOGO from './../../assets/images/logo.png';
import Google from './../../assets/images/google.png';
import facebook from './../../assets/images/Facebook.png';

const RegiScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    try {
      if (!username || !email || !password) {
        alert('請填寫完整資訊');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        username: username,
        email: email,
      });

      navigation.navigate('Home', { user: user });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('帳號已註冊過');
      } else if (error.code === 'auth/invalid-email' || error.code === 'auth/weak-password') {
        alert('請輸入完整的帳號和密碼');
      } else {
        alert('註冊失敗: ' + error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={app} style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
          <Image source={LOGO} style={styles.logo} />
        </View>
        <Card style={styles.card}>
          <Text style={styles.welcomeText}>歡迎註冊 X-Plore APP!</Text>
          <TextInput
            label="用戶名稱"
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.input}
          />
          <TextInput
            label="電子郵箱"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            label="密碼"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
        
          <View style={styles.buttonContainer}>
            <Button mode="contained" style={styles.regibutton} labelStyle={styles.regibutton} onPress={handleSignUp}>
              註冊帳號
            </Button>
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>已有帳號？登入</Text>
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
        </Card>
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
    marginBottom: 15,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#25A6FC',
  },
  regibutton: {
    fontWeight: 'bold',
    width: '100%',
    marginTop:10,
    marginBottom: 10,
    backgroundColor: '#25A6FC',
    color: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  signInButton: {
    alignSelf: 'flex-end',
  },
  signInButtonText: {
    color: '#25A6FC',
    fontSize: 12,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
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

export default RegiScreen;
