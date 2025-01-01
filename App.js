import React, { useState, useEffect } from 'react';
import { StatusBar, BackHandler, ImageBackground } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useVideoPlayer, VideoView } from 'expo-video';
import AboutScreen from './components/AboutScreen';
import ShareAppScreen from './components/ShareAppScreen';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Programacion from './src/Programacion';

const icon = require('./assets/logo-radio-cristiana-recorte.png');
const background = require('./assets/fondomorado2.jpg');
const remoteSource = "https://stream.zeno.fm/utojpczqio2tv";

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Adoraciones y Alabanzas');
  const [volume, setVolume] = useState(1.0);

  const player = useVideoPlayer(remoteSource, (player) => {
    player.loop = true;
    player.staysActiveInBackground = true;
    player.play();
  });

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  useEffect(() => {
    const eventSource = new EventSource('http://api.zeno.fm/mounts/metadata/subscribe/utojpczqio2tv');

    eventSource.onopen = () => {
      console.log('EventSource connected');
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.streamTitle) {
          setCurrentTrack(data.streamTitle);
        } else {
          setCurrentTrack('No track info available');
        }
      } catch (error) {
        setCurrentTrack('Error fetching track info');
      }
    };

    eventSource.onerror = (error) => {
      setCurrentTrack('Error with event source');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.openDrawer()}
        >
          <Icon name="bars" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.programButton} 
          onPress={() => navigation.navigate('Programacion')}
        >
          <Icon name="calendar" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.statusText}>ONLINE</Text>
        <Image source={icon} style={styles.logoImage} />

        <VideoView 
          player={player} 
          style={styles.hiddenVideo} 
          allowsPictureInPicture={true}
        />

        <Text style={styles.currentTrack}>{currentTrack}</Text>

        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={30} color="#000" style={styles.icon} />
        </TouchableOpacity>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={value => {
            setVolume(value);
            player.volume = value;
          }}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
    </ImageBackground>
  );
};

const CustomDrawerContent = (props) => (
  <LinearGradient
    colors={['#140530', '#2e0c3f']}
    style={{ flex: 1 }}
  >
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Salir"
        onPress={() => BackHandler.exitApp()}
        labelStyle={{ color: '#FFF' }}
      />
    </DrawerContentScrollView>
  </LinearGradient>
);

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Programacion" component={Programacion} options={{ title: 'Programación' }} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerLabelStyle: { color: '#FFF' }
        }}
      >
        <Drawer.Screen name="Home" component={StackNavigator} options={{ headerShown: false }} />
        <Drawer.Screen name="Acerca de" component={AboutScreen} />
        <Drawer.Screen name="Compartir App" component={ShareAppScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  hiddenVideo: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.05,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  programButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    marginVertical: 20,
    alignSelf: 'center',
  },
  playButton: {
    backgroundColor: '#FFFFFF',
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    marginLeft: 2,
  },
  currentTrack: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 5,
  },
  statusText: {
    color: '#fbdd40',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  logoImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  }
});
