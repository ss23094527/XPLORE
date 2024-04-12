import React, { useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../theme';
import Searchbar from '../../src/component/SearchBar';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from '../../src/component/MyCarousel';
import carouselData from '../../src/json/carouselData.json';
import VerticalCourseCard from '../../src/component/VerticalCourseCard';
import { LinearGradient } from 'expo-linear-gradient';
import HomeCategory from '../../src/component/HomeCategory';
import Newest from '../../src/component/Newest';
import HomeAcountIcon from '../../src/component/HomeAcountIcon';
import ShoppingCartIcon from '../../src/component/ShoppingCartIcon';
import LottieView from 'lottie-react-native';
import Reanimated, { FadeIn, FadeInDown, FadeInUp, FadeOut, } from 'react-native-reanimated';
import SortCategory from '../../src/component/sortCategory';
import { selectCounter,selectColorMode,toggleColorMode } from "../../src/redux/counterSlice";
import { useDispatch, useSelector } from 'react-redux';


const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  

  const linearOpacity = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  //redux
  const counterValue =useSelector(selectCounter);
  const colorMode = useSelector(selectColorMode);
  const dispatch = useDispatch();

  function renderHeader() {
    return (
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Searchbar />
        </View>
        <ShoppingCartIcon onPress={() => {
          /* 添加購物車按鈕功能 */
        }} />
        <HomeAcountIcon />
      </View>
    );
  }

  function renderCarousel() {
    return (
      <Reanimated.View entering={FadeInUp.delay(200).duration(1000).springify()}  style={styles.container}>
        <Carousel layout={'default'} />
      </Reanimated.View>
    );
  }

 
  
  function rendersortCategory() {
    return (
      <Reanimated.View entering={FadeInUp.delay(200).duration(1000).springify()}  style={styles.container}>
        <SortCategory  />
      </Reanimated.View>
    );
  }
  

  function renderCourses(index) {
    const courseData = carouselData[index];

    if (!courseData) {
      return null;
    }

    return (
      <Reanimated.View entering={FadeIn.delay(200).duration(1000)} style={[styles.coursesContainer, index === 2 && styles.horizontalContainer]}>
        <Text style={styles.sectionTitle}>{courseData.title}</Text>
        <View style={styles.blueline} />
        <FlatList
          data={courseData.data}
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
          horizontal={courseData.horizontal}
          showsHorizontalScrollIndicator={false}
        />
      </Reanimated.View>
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
            <TouchableOpacity onPress={() => { }}>
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
    return (
      <Reanimated.View entering={FadeInUp.delay(200).duration(1000)} style={styles.coursesContainer}>
        <Text style={styles.sectionTitle}>{courseData.title}</Text>
        <View style={styles.blueline} />
        <FlatList
          data={courseData.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { }}>
              <HomeCategory
                title={item.title}
                image={item.image}
              />
            </TouchableOpacity>
          )}
          horizontal={courseData.horizontal}
          showsHorizontalScrollIndicator={false}
        />
      </Reanimated.View>
    );
  }

  return (
    <View style={styles.background}>
      <Animated.View style={[styles.linear, { opacity: linearOpacity }]}>
        <LinearGradient style={styles.linear} colors={['#00fbff', '#0085ff', '#00ffda']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
        <LottieView
          source={require('../../animations/wave.json')}
          autoPlay
          loop
          style={{
            width: "100%",
            height: 300,
            resizeMode: 'contain',
          }}
        />
      </Animated.View>
      <View style={[styles.container, { backgroundColor: colorMode === 'dark' ? COLORS.black : null }]}>
        <ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          {renderHeader()}
        
          {/* Content */}
          
          {/* Carousel */}
          {renderCarousel()}
          {/* {rendersortCategory()} */}
          
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
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 6,
    marginLeft: 5,
  },
  NewestTitle: {
    padding: 10,
    fontSize: 17,
    fontFamily: 'Roboto',
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
