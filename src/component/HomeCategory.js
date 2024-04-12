
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../theme';
import { selectCounter,selectColorMode,toggleColorMode } from "../../src/redux/counterSlice";
import { useDispatch, useSelector } from 'react-redux';


const HomeCategory = ({ title, image }) => {
 //redux
 const counterValue =useSelector(selectCounter);
 const colorMode = useSelector(selectColorMode);
 const dispatch = useDispatch();

    return (
      <View style={[styles.container, { backgroundColor: colorMode === 'dark' ? COLORS.black : COLORS.white }]}>
        <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 93,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 5,
  },
  title: {
    flexWrap: 'wrap',
    position:'absolute',
    fontSize: 13,
    margin:10,
    marginTop: 60,
    color:COLORS.white,
    fontFamily: 'KiwiMaru-Regular',
    textShadowColor: COLORS.black, // 设置阴影颜色
    textShadowOffset: { width: 1, height: 1 },
    
  },
  author: {
    flexWrap: 'wrap',
    fontSize: 10,
    color: COLORS.gray,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  comment: {
    marginLeft: 5,
    fontSize: 12,
    color: COLORS.gray,
  },
  price: {
    flexWrap: 'wrap',
    fontSize: 15,
    fontWeight:'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
});

export default HomeCategory;
