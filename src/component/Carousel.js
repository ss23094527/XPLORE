import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import carouselData from '../../src/json/carouselData.json'; 

const { width } = Dimensions.get('window');

const Carousel = () => {
  const scrollViewRef = useRef();

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
  };

  const handlePressNext = () => {
    scrollViewRef.current.scrollTo({ x: width, animated: true });
  };

  const handlePressPrev = () => {
    scrollViewRef.current.scrollTo({ x: -width, animated: true });
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* 在這里渲染輪播項 */}
        {carouselData.map((item, index) => (
          <View key={index} style={styles.carouselItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      {/* 添加前進和後退按鈕 */}
      <TouchableOpacity style={[styles.navButton, styles.prevButton]} onPress={handlePressPrev}>
        <Text style={styles.navButtonText}>Prev</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.navButton, styles.nextButton]} onPress={handlePressNext}>
        <Text style={styles.navButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  carouselItem: {
    width,
    height: 200,
  },
  image: {
    zIndex:1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    zIndex: 1,
  },
  prevButton: {
    left: 10,
  },
  nextButton: {
    right: 10,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Carousel;
