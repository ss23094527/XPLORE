import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import carouselData from '../../src/json/carouselData.json'; 
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Carousel = () => {
  const scrollViewRef = useRef();

  useEffect(() => {
    const interval = setInterval(handlePressNext, 3000); // 自動輪播間隔為 3 秒
    return () => clearInterval(interval); // 清除定時器
  }, []);

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
        scrollEventThrottle={16}
      >
        {/* 渲染輪播項 */}
        {carouselData.map((item, index) => (
          <View key={index} style={styles.carouselItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      {/* 添加前進和後退按鈕 */}
      <TouchableOpacity style={[styles.navButton, styles.prevButton]} onPress={handlePressPrev}>
        <AntDesign name="left" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.navButton, styles.nextButton]} onPress={handlePressNext}>
        <AntDesign name="right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 20,
    height: 300,
  },
  carouselItem: {
    width,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    paddingHorizontal: 20,
    paddingVertical: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
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
