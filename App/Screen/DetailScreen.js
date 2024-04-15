import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../theme';
import { useNavigation, useRoute } from '@react-navigation/native'; // 添加 useRoute
import { Video, ResizeMode } from 'expo-av';
import StarList from '../../src/component/StarList';
import { selectCounter, selectColorMode } from "../../src/redux/counterSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const DetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [showPlayButton, setShowPlayButton] = React.useState(true);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const colorMode = useSelector(selectColorMode);
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeSegment, setActiveSegment] = React.useState('introduction'); // Add activeSegment state

    const title = route.params.title;
    const author = route.params.author;
    const price = route.params.price;
    const image = route.params.image;
    const stars = route.params.stars;
    const comment = route.params.comment;

    // Function to render different content based on activeSegment value
    function renderVideoContent(activeSegment) {
        switch (activeSegment) {
            case 'introduction':
                return (
                    <View style={styles.segmentcontainer}>
                        <Text style={styles.contentTitle}>課程介紹</Text>
                        <Text style={styles.contentText}>這是一個關於課程介紹的內容。</Text>
                    </View>
                );
            case 'catalog':
                return (
                    <View style={styles.segmentcontainer}>
                        <Text style={styles.contentTitle}>課程目錄</Text>
                        <Text style={styles.contentText}>這是一個關於課程目錄的內容。</Text>
                    </View>
                );
            case 'comment':
                return (
                    <View style={styles.container}>
                        <Text style={styles.contentTitle}>課程評論</Text>
                        <Text style={styles.contentText}>這是一個關於課程評論的內容。</Text>
                    </View>
                );
            case 'material':
                return (
                    <View style={styles.container}>
                        <Text style={styles.contentTitle}>課程素材</Text>
                        <Text style={styles.contentText}>這是一個關於課程素材的內容。</Text>
                    </View>
                );
            default:
                return null;
        }
    }

    // Header
    function renderHeader() {
        const handleSegmentPress = (segment) => {
            setActiveSegment(segment);
            console.log('Active Segment:', segment); // 新增 log 語句
        };
    
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('TabNavigation')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <View style={styles.segmentedControl}>
                    <TouchableOpacity
                        style={[styles.segment, activeSegment === 'introduction' && styles.activeSegment]}
                        onPress={() => handleSegmentPress('introduction')}>
                        <Text style={[styles.segmentText, activeSegment === 'introduction' && styles.activeSegmentText]}>介紹</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.segment, activeSegment === 'catalog' && styles.activeSegment]}
                        onPress={() => handleSegmentPress('catalog')}>
                        <Text style={[styles.segmentText, activeSegment === 'catalog' && styles.activeSegmentText]}>目錄</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.segment, activeSegment === 'comment' && styles.activeSegment]}
                        onPress={() => handleSegmentPress('comment')}>
                        <Text style={[styles.segmentText, activeSegment === 'comment' && styles.activeSegmentText]}>評論</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.segment, activeSegment === 'material' && styles.activeSegment]}
                        onPress={() => handleSegmentPress('material')}>
                        <Text style={[styles.segmentText, activeSegment === 'material' && styles.activeSegmentText]}>素材</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Video
    function renderVideo() {
        const video = React.useRef(null);
        const [status, setStatus] = React.useState({});

        const togglePlay = () => {
            if (isPlaying) {
                video.current.pauseAsync();
            } else {
                video.current.playAsync();
            }
            setIsPlaying(!isPlaying);
        };

        return (
            <View style={styles.videoContainer}>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.COVER}
                    isLooping
                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
                {!isPlaying && (
                    <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
                        <AntDesign name="play" size={40} color={COLORS.white} />
                    </TouchableOpacity>
                )}
                <View style={styles.videoInfo}>
                    <Text style={styles.videoTitle}>{title}</Text>
                    <Text style={styles.videoAuthor}>{author}</Text>
                    <View style={styles.ratingContainer}>
                        <StarList stars={stars} />
                        <Text style={[styles.comment, { color: colorMode === 'dark' ? COLORS.white : COLORS.black }]}>{comment}</Text>
                    </View>
                    <Text style={[styles.price, { color: colorMode === 'dark' ? COLORS.white : COLORS.primary }]}>{price}</Text>
                    <View style={styles.separator}></View>
                   
                    {renderVideoContent(activeSegment)}
                </View>
                
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            {renderHeader()}
            {/* Video */}
            {renderVideo()}
        </View>
    );
};

const styles = StyleSheet.create({
    segmentcontainer:{
        
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    video: {
        alignSelf: 'center',
        width: 450,
        height: 200,
    },
    playButton: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        top: '15%',
        left: '42%',
        width: 80,
        height: 80,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    backButton: {
        marginRight: 20,
    },
    segmentedControl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    segment: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    segmentText: {
        fontSize: 17,
        color: COLORS.black,
        fontWeight: 'bold',
    },
    activeSegment: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    activeSegmentText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    videoContainer: {
        marginTop: 0,
        paddingHorizontal: 20,
    },
    videoInfo: {
        marginTop: 10,
    },
    videoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    videoAuthor: {
        fontSize: 16,
        color: COLORS.gray,
    },
    videoRating: {
        fontSize: 16,
        color: COLORS.black,
        marginTop: 5,
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
        fontSize: 23,
        fontWeight:'bold',
        color: COLORS.black,
        marginBottom: 5,
    },
    separator: {
        borderRadius: 30,
        width: '100%',
        height: 1,
        backgroundColor: COLORS.lightGray,
        marginTop: 10,
    },
    Title:{
        fontSize:100,
        marginTop:200,
    },
    contentTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default DetailScreen;

