import { Text, View,StyleSheet } from 'react-native'
import React, { Component } from 'react'
import LottieView from 'lottie-react-native'

const LottieAnimation =()=>{


}

export default class HomeScreen extends Component {
  render() {
    return (
      <View  style={styles.container}>
      <Text>HOME</Text>
        
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