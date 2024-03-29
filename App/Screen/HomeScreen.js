import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { COLORS } from '../../theme';
import Searchbar from '../../src/component/SearchBar'; // 引入搜索组件
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from '../../src/component/Carousel';
import {carouselData}from '../../src/json/carouselData.json'

const HomeScreen = () => {
  function renderHeader() {
    return (
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Searchbar />
        </View>
      </View>
    );
  }

  function rendercarosuel(){
    return(
    <View style={styles.container}>
     <Carousel data={carouselData} />
    </View>

    );
  }

  return (
    <ImageBackground source={require('../../assets/images/homeGradient.png')} style={styles.background}>
      <View style={styles.container}>
        {/* Header */}
        {renderHeader()}
        {/* content */}
        <ScrollView 
            contentContainerStyle={{paddingBottom:150}}
            showsVerticalScrollIndicator={false}
        >
        {/* 幻燈片 */}
        {rendercarosuel()}


        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode:'contain',
    height:240, 
  },
  container: {
    justifyContent: 'flex-start',
    flex: 1,
   
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  headertitle: {
    fontSize: 22,
    color: COLORS.black,
    fontFamily: 'DelaGothicOne',
  },
  headertext: {
    fontSize: 14,
    color: COLORS.gray,
  },
});

export default HomeScreen;
