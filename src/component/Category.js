
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../theme';


const Category = ({ title, image }) => {
    return (
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    justifyContent:"center",
    marginRight: 0,
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 5,
  },
  title: {
    flexWrap: 'wrap',
    position: 'absolute',
    fontSize: 15,
    margin: 10,
    marginTop: 80,
    color: COLORS.white,
    textShadowColor: '#000', // 更深的陰影顏色
    textShadowOffset: { width: 2, height: 2 }, // 增加陰影偏移量
  },

});

export default Category;
