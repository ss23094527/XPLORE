import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../theme';
import StarList from './StarList'; 
import { selectCounter, selectColorMode } from "../../src/redux/counterSlice";
import { useDispatch, useSelector } from 'react-redux';

const VerticalCourseCard = ({ author, title, image, price, stars, comment }) => {
  
  const [isFavorite, setIsFavorite] = useState(false);
  const colorMode = useSelector(selectColorMode);
  const dispatch = useDispatch();

  return (
      <View style={[styles.container, { backgroundColor: colorMode === 'dark' ? 'rgba(0,0,0,0.5)' : 'transparent' }]}>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={styles.favoriteButton}>
          <View style={[styles.favoriteBackground, { backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }]}>
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={20}
              color={isFavorite ? COLORS.primary : COLORS.white}
            />
          </View>
        </TouchableOpacity>
        <Image source={{ uri: image }} style={styles.image} />
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
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 5,
    padding: 10,
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 11,
    marginBottom: 15,
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
  favoriteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  favoriteBackground: {
    borderRadius: 100,
    padding: 5,
  },
});

export default VerticalCourseCard;
