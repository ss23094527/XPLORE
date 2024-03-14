import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './App/Screen/LoginScreen';


export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'DelaGothicOne': require('./assets/fonts/DelaGothicOne-Regular.ttf'),
    'NotoSansTC': require('./assets/fonts/NotoSansTC-VariableFont_wght.ttf'),
    'Outfit': require('./assets/fonts/Outfit-Light.ttf'),
    'Roboto': require('./assets/fonts/Roboto-Bold.ttf'),
    'DotGothic': require('./assets/fonts/DotGothic16-Regular.ttf'),
  });

  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
});
