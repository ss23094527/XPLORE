import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image ,Button} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';


const DetailScreen = () => {

    const navigation = useNavigation();
 const [showPlayButton, setShowPlayButton] = React.useState(true);
    const [isPlaying, setIsPlaying] = React.useState(false);
    // Header
    function renderHeader() {
        const [activeSegment, setActiveSegment] = React.useState('introduction');

        const handleSegmentPress = (segment) => {
            setActiveSegment(segment);
        };

        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('TabNavigation')} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black} />
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
                        style={[styles.segment, activeSegment === 'comments' && styles.activeSegment]}
                        onPress={() => handleSegmentPress('comments')}>
                        <Text style={[styles.segmentText, activeSegment === 'comments' && styles.activeSegmentText]}>評論</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.segment, activeSegment === 'materials' && styles.activeSegment]}
                        onPress={() => handleSegmentPress('materials')}>
                        <Text style={[styles.segmentText, activeSegment === 'materials' && styles.activeSegmentText]}>素材</Text>
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
                    <Text style={styles.videoTitle}>影片標題</Text>
                    <Text style={styles.videoAuthor}>作者名稱</Text>
                    <Text style={styles.videoRating}>評分: 4.5/5</Text>
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
    container: {
        flex: 1,
   marginTop:20,
       
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
        top:'20%',
        left:'42%',
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
        paddingHorizontal: 15,
    },
    segmentText: {
        color: COLORS.black,
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
        fontSize: 18,
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
});

export default DetailScreen;
