import React ,{useRef} from 'react';
import { Text, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Searchbar from '../../src/component/SearchBar';
import { FlatList } from 'react-native-gesture-handler';
import carouselData from '../../src/json/carouselData.json';
import TextButton from '../../src/component/TextButton'; // 引入 TextButton 組件
import { COLORS } from '../../theme';
import Category from '../../src/component/Category';


const CategoryScreen = () => {
  const ScrollViewRef = useRef();

  function renderTopSearches() {
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={styles.topsearch}>熱門搜尋</Text>
        <View style={styles.blueline} />
        <FlatList
          horizontal
          data={carouselData[4].data} // 將 data 改為 carouselData[4].data
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 0 }}
          renderItem={({ item, index }) => (
            
            <TextButton title={item.title} onPress={() => {}} />
            
          )}
        />
      </View>
    );
  }

  function renderBrowseCategories(index){

    const courseData = carouselData[index];
  
      if (!courseData) {
        return null; 
      }

   // 將每兩個分類一組
  const groupedData = [];
  for (let i = 0; i < courseData.data.length; i += 2) {
    groupedData.push(courseData.data.slice(i, i + 2));
  }

  return (
    <View style={styles.coursesContainer}>
      <Text style={styles.sectionTitle}>{courseData.title}</Text>
      <View style={styles.blueline} />
      {groupedData.map((group, index) => (
        <View style={styles.categoryRow} key={index}>
          {group.map((item, itemIndex) => (
            <TouchableOpacity
              key={itemIndex}
              onPress={() => {}}
              style={[styles.categoryItem, itemIndex === 1 && styles.categoryItemRight]}>
              <Category title={item.title} image={item.image} />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

  return (
    <View style={styles.container}>
      <Searchbar />
      <View>
        {/*top searches */}
        {renderTopSearches(4)}

        {/*Browse Categories */}
        {renderBrowseCategories(3) }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 20,
    flex: 1,
  },
  topsearch: {
    marginBottom: 6,
    fontSize: 17,
    fontFamily: 'KiwiMaru-Regular',
    fontWeight: 'bold',
    color: COLORS.black,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'KiwiMaru-Regular',
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 6,
    marginTop:30,
   
  },
  blueline: {
    marginLeft: 0,
    borderRadius: 30,
    width: 40,
    height: 4,
    backgroundColor: COLORS.primary, 
    marginBottom: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryItem: {
    width:400,
    flex: 1,
    marginRight: 10,
  },
  categoryItemRight: {
    marginRight: 0,
  },
});

export default CategoryScreen;
