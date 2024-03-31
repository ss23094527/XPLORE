import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import carouselData from '../../src/json/carouselData.json'; 

const MyCarousel = () => {
  const carouselRef = useRef();

  

  const renderCarouselItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    );
  };

  return (
    <Carousel
      
      data={carouselData[0].data} 
      renderItem={renderCarouselItem}
      sliderWidth={415} 
      itemWidth={300} 
      loop
      autoplay
      
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    marginTop: 20,
    width: 300, 
    height: 170, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    overflow: 'hidden', 
  },
  image: {
    width: '100%',
    height: '110%',
    resizeMode: 'cover', 
  },
});

export default MyCarousel;
