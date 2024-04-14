import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme';
import StarList from './StarList'; 
import { selectCounter, selectColorMode } from "../../src/redux/counterSlice";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

const MoreCourses = ({ author, title, image, price, stars, comment }) => {
  
  // Redux
  const colorMode = useSelector(selectColorMode);
  const dispatch = useDispatch();
  
  // State for favorite button
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <View style={[styles.container, { backgroundColor: colorMode === 'dark' ? COLORS.black : null }]}>
      <Image source={{ uri: image }} style={styles.image} />
      <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={styles.favoriteButton}>
        <View style={[styles.favoriteBackground, { backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]}>
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            size={20}
            color={isFavorite ? COLORS.primary : COLORS.white}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: colorMode === 'dark' ? COLORS.white : COLORS.black }]}>{title}</Text>
        <Text style={[styles.author, { color: colorMode === 'dark' ? COLORS.white : COLORS.black }]}>{author}</Text>
        <View style={styles.ratingContainer}>
          <StarList stars={stars} />
          <Text style={[styles.comment, { color: colorMode === 'dark' ? COLORS.white : COLORS.black }]}>{comment}</Text>
        </View>
        <Text style={[styles.price, { color: colorMode === 'dark' ? COLORS.white : COLORS.primary }]}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    alignItems:'baseline',
    marginRight: 10,
    position: 'relative', // Ensure proper stacking of elements
  },
  image: {

    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    marginbottom:'10%',
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.black,
  },
  author: {
    flexWrap: 'wrap',
    fontSize: 15,
    color: COLORS.gray,
    marginBottom: 5,
  },
  ratingContainer: {
    
    flexDirection: 'row',
   
    marginBottom: 5,
  },
  comment: {
    marginLeft: 5,
    fontSize: 12,
    color: COLORS.gray,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 25,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 15, // 調整底部偏移量
    right: 5, // 調整右側偏移量
    zIndex: 1,
  },
  favoriteBackground: {
    borderRadius: 100,
    padding: 5,
  },
});

export default MoreCourses;
