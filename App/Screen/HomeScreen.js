import React,{useRef} from 'react';
import { Text, View, StyleSheet, ImageBackground, Image ,Animated} from 'react-native';
import { COLORS } from '../../theme';
import Searchbar from '../../src/component/SearchBar';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from '../../src/component/MyCarousel';
import carouselData from '../../src/json/carouselData.json';
import VerticalCourseCard from '../../src/component/VerticalCourseCard';
import {LinearGradient} from 'expo-linear-gradient';
import HomeCategory from '../../src/component/HomeCategory';
import Newest from '../../src/component/Newest';



const HomeScreen = () => {

  const scrollY = useRef(new Animated.Value(0)).current;

  const linearOpacity = scrollY.interpolate({
    inputRange: [0, 250], 
    outputRange: [1, 0], 
    extrapolate: 'clamp', 
  });

  function renderHeader() {
    return (
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Searchbar />
        </View>
      </View>
    );
  }

  function renderCarousel() {
    return (
      <View style={styles.container}>
        <Carousel layout={'default'} />
      </View>
    );
  }
 

  function renderCourses(index) {
  const courseData = carouselData[index];

  if (!courseData) {
    return null; 
  }

  return (
    <View style={[styles.coursesContainer, index === 2 && styles.horizontalContainer]}>
      <Text style={styles.sectionTitle}>{courseData.title}</Text>
      <View style={styles.blueline} />
      <FlatList
        data={courseData.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
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
        horizontal={courseData.horizontal}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

function renderNewest(index) {
  const courseData = carouselData[index];

  if (!courseData) {
    return null; 
  }

  return (
    <View style={[styles.coursesContainer, index === 2 && styles.horizontalContainer]}>
      <Text style={styles.sectionTitle}>{courseData.title}</Text>
      <View style={styles.blueline} />
      <FlatList
        data={courseData.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <Newest
              title={item.title}
              image={item.image}
              author={item.author}
              price={item.price}
              stars={item.stars}
              comment={item.comment}
            />
          </TouchableOpacity>
        )}
        horizontal={courseData.horizontal}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

  function renderCategory(index) {
    const courseData = carouselData[index];
  
    if (!courseData) {
      return null; 
    }
    return(
      
      <View style={styles.coursesContainer}>
         <Text style={styles.sectionTitle}>{courseData.title}</Text>
        <View style={styles.blueline} />
        <FlatList
          data={courseData.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {}}>
              <HomeCategory
                title={item.title}
                image={item.image}
              />
            </TouchableOpacity>
          )}
          horizontal={courseData.horizontal}
          showsHorizontalScrollIndicator={false}
        />
 
      </View>)
  }

  return ( 
    <View  style={styles.background}>
      <Animated.View style={[styles.linear, { opacity: linearOpacity }]}>
  <LinearGradient style={styles.linear} colors={['#00fbff', '#0085ff', '#00ffda']}
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 0 }}
  />
</Animated.View>
      <View style={styles.container}>
      
        <ScrollView 
        
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // 必須為false，因為在Android上不支持原生驅動
        )}
        scrollEventThrottle={16}
          contentContainerStyle={{paddingBottom: 150}}
          showsVerticalScrollIndicator={false}
        >
            {/* Header */}
        {renderHeader()}
        {/* Content */}
          {/* Carousel */}
          {renderCarousel()}
          {/* HOTRecommdation */}
          {renderCourses(1)}

          {/*Course Category */}
          {renderCategory(3)}
          {/* Newest */}
          {renderNewest(2)}
          
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linear: {
    position: "absolute",
    zIndex: -1,
    borderRadius: 100,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    resizeMode: 'cover',
    width: "100%",
    height: 250, // 設定固定高度
  },
  background: {
    flex: 1,
    position: "relative",
    borderRadius: 100,
    resizeMode: 'cover',

  },
  container: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  coursesContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'KiwiMaru-Regular',
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 6,
    marginLeft: 5,
  },
  blueline: {
    marginLeft: 4,
    borderRadius: 30,
    width: 40,
    height: 4,
    backgroundColor: COLORS.primary, 
    marginBottom: 20,
  },

});

export default HomeScreen;
