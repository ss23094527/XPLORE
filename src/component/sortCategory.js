import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme';
import carouselData from '../json/carouselData.json';
import VerticalCourseCard from './VerticalCourseCard';

export default function SortCategory() {
  const [activeSort, setActiveSort] = useState('Popular');
  const titles = carouselData[5].data;
  const Data = carouselData[5];

  const renderItem = ({ item }) => {
    const isActive = item.title === activeSort;
    const activeButtonStyle = isActive ? styles.activeButton : null;
    const activeButtonTextStyle = isActive ? styles.activeButtonText : null;
    const titleTextStyle = [styles.title, activeButtonTextStyle];

    return (
      <TouchableOpacity
        onPress={() => setActiveSort(item.title)}
        style={[styles.table, activeButtonStyle]}
      >
        <Text style={titleTextStyle}>{item.title}</Text>
        {isActive && <View style={styles.blueLine} />}
      </TouchableOpacity>
    );
  };

  return (
    <View >
       <View style={styles.container}>
      <FlatList
        data={titles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      </View>

      <View style={styles.coursecontainer}>
      {/* Add the FlatList for courseData here */}
      <FlatList
        data={Data.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { }}>
            <VerticalCourseCard
              title={item.title}
              image={item.image}
              author={item.author}
              price={item.price}
              stars={item.stars}
              comment={item.comment}
            />
          </TouchableOpacity>
        )}
        horizontal={Data.horizontal}
        showsHorizontalScrollIndicator={false}
      />
      
       </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  table: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Frosted glass effect
    backdropFilter: 'blur(10px)', // Apply blur effect
  },
  title: {
    fontSize: 15,
    color: COLORS.black,
    fontFamily: 'Roboto',
  },
  activeButton: {
    shadowColor: COLORS.primary,
    shadowRadius: 10,
    borderRadius: 100,
  },
  activeButtonText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: COLORS.primary,
  },
  blueLine: {
    backgroundColor: COLORS.primary,
    width: '30%',
    height: 2.5,
    position: 'absolute',
    bottom: 3,
    alignSelf: 'center',
    borderRadius: 100,
  },
});
