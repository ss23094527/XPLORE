import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../theme';
import StarList from './StarList'; 

const Newest = ({ author, title, image, price, stars, comment }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        <View style={styles.ratingContainer}>
          <StarList stars={stars} />
          <Text style={styles.comment}>{comment}</Text>
        </View>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 160,
    height: 100,
    marginBottom:15,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 12,
    fontWeight:'bold',
    marginBottom: 5,
    color: COLORS.black,
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
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});

export default Newest;
