import { Text, View,StyleSheet } from 'react-native'
import React, { Component } from 'react'
import LottieView from 'lottie-react-native'

const LottieAnimation =()=>{


}

export default class HomeScreen extends Component {
  render() {
    return (
      <View  style={styles.container}>
        <LottieView
      source={require("../../animations/Animation - 1711464382456.json")}
      style={{width: "100%", height: "100%"}}
      autoPlay
      loop
    />
        <LottieView 
        source={require('../../animations/robotanim.json')} 
        autoPlay
        />

        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    textAlign:'center',
    justifyContent:'center',
    flex: 1,
    backgroundColor: '#fff',
  },

})