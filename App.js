import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  BackHandler,
  ImageBackground
} from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import AboutScreen from './components/AboutScreen';
import ShareAppScreen from './components/ShareAppScreen';
import Programacion from './src/Programacion';
import ThemeColor from './components/ThemeColor';

const icon = require('./assets/icon.png');
/* const background = require('./assets/fondo_morado.jpg'); */
const fondoMorado = require('./assets/fondo_morado.jpg');
const fondoNegro = require('./assets/fondo_negro.png');
const fondoAzul = require('./assets/fondo_azul.png');
const remoteSource = "https://s2.radio.co/sb8a87a94f/listen";
const { width } = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Mapea los temas a sus imágenes
const THEME_IMAGES = {
  '#2196F3': fondoAzul,
  '#000000': fondoNegro,
  '#4b1759ff': fondoMorado,
};


const HomeScreen = ({
  navigation,
  themeColor = '#8e24aa',
  isPlaying,
  handlePlayPause,
  volume,
  handleVolumeChange
}) => {

  // Selecciona la imagen de fondo según el tema
  const backgroundImage = THEME_IMAGES[themeColor] || fondoMorado;

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Icon name="bars" size={24} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.programButton} onPress={() => navigation.navigate('Programacion')}>
          <Icon name="calendar" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.statusOnline}>ONLINE</Text>
        <Text style={styles.statusText}>RADIO CRISTIANA RADIO</Text>
        <View style={styles.logoBackground}>
            <Image source={icon} style={styles.logoImage}  resizeMode="cover" />
        </View>

        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={30} color="#000" style={styles.icon} />
        </TouchableOpacity>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />

      </View>
    </ImageBackground>
  );
};

const CustomDrawerContent = (props) => {
  const { themeColor } = props;
  return (
    <LinearGradient colors={[themeColor, '#000000ff']} style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Salir"
          onPress={() => BackHandler.exitApp()}
          labelStyle={{ color: '#FFF' }}
          icon={() => <Icon name="sign-out" size={22} color="#FFF" />}
        />
      </DrawerContentScrollView>
    </LinearGradient>
  );
};


const StackNavigator = ({ themeColor, isPlaying, handlePlayPause, volume, handleVolumeChange }) => (
  <Stack.Navigator initialRouteName="HomeScreen">
    <Stack.Screen
      name="HomeScreen"
      options={{ headerShown: false }}
    >
{/*       {props => <HomeScreen {...props} themeColor={themeColor} />} */}
    
          {props => (
        <HomeScreen
          {...props}
          themeColor={themeColor}
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="Programacion" component={Programacion} options={{ title: 'Programación' }} />
  </Stack.Navigator>
);


export default function App() {


const soundRef = useRef(new Audio.Sound());
const [volume, setVolume] = useState(1.0);
const [isPlaying, setIsPlaying] = useState(false);

const loadStream = async () => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    await soundRef.current.loadAsync(
      { uri: remoteSource },
      { shouldPlay: false, volume }
    );

    await soundRef.current.playAsync();
    setIsPlaying(true);
  } catch (error) {
    console.warn('Error al cargar el stream:', error);
  }
};

const unloadStream = async () => {
  try {
    await soundRef.current.unloadAsync();
  } catch (error) {
    console.warn('Error al descargar el stream:', error);
  }
};

const handlePlayPause = async () => {
  try {
    if (isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  } catch (error) {
    console.warn('Error en reproducción:', error);
  }
};

const handleVolumeChange = async (value) => {
  setVolume(value);
  await soundRef.current.setVolumeAsync(value);
};

useEffect(() => {
  loadStream();
  return () => {
    unloadStream();
  };
}, []);


  const [themeColor, setThemeColor] = useState('#8e24aa');


const ThemeColorScreen = (props) => (
  <ThemeColor {...props} onChangeTheme={setThemeColor} themeColor={themeColor} />
);


    return (
  <NavigationContainer>
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} themeColor={themeColor} />}
      screenOptions={{
        drawerLabelStyle: { color: '#FFF' },
        headerStyle: { backgroundColor: themeColor }, // Cambia el color de la cabecera
        headerTintColor: '#FFF',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Drawer.Screen
          name="Inicio"
          options={{ headerShown: false, drawerIcon:()=>(<Icon name="home" size={24} color="#FFF" />) }}
        >
        {/*           {props => <StackNavigator {...props} themeColor={themeColor} />} */}

        {props => (
          <StackNavigator
            {...props}
            themeColor={themeColor}
            isPlaying={isPlaying}
            handlePlayPause={handlePlayPause}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Acerca de RCR"
        options={({ navigation }) => ({
          drawerLabel: 'Acerca de RCR',
          title: '',
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Inicio' }],
                });
              }}
            >
              <Icon name="close" size={26} color="#FFF" />
            </TouchableOpacity>
          ),
       headerBackground: () => (
      <LinearGradient
        colors={['#111', themeColor]}
        style={{ flex: 1 }}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      />
    ),
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: '600' },
        })}
      >
        {props => <AboutScreen {...props} themeColor={themeColor} />}
      </Drawer.Screen>

       <Drawer.Screen
        name="Compartir App"
        options={({ navigation }) => ({
        drawerLabel: 'Compartir App', // Nombre en el menú
        title: '',   
                headerLeft: () => null, 
          headerRight: () => ( // Nombre en la cabecera
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Inicio' }],
                });
              }}
            >
              <Icon name="close" size={26} color="#FFF" />
            </TouchableOpacity>
          ),
       headerBackground: () => (
      <LinearGradient
        colors={['#111', themeColor]}
        style={{ flex: 1 }}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      />
    ),
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: '600' },
        })}
       >
                {props => <ShareAppScreen {...props} themeColor={themeColor} />}
      </Drawer.Screen>


       <Drawer.Screen
        name="Color del Tema"
        component={ThemeColorScreen}
        options={({ navigation }) => ({
        drawerLabel: 'Color del Tema', // Nombre en el menú
        title: '',    // Nombre en la cabecera
         headerLeft:() => null,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Inicio' }],
                });
              }}
            >
              <Icon name="close" size={26} color="#FFF" />
            </TouchableOpacity>
          ),
                headerBackground: () => (
      <LinearGradient
        colors={['#111', themeColor]}
        style={{ flex: 1 }}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      />
    ),
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: '600' },
        })}
      />
      </Drawer.Navigator>

      
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
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
    marginTop: 32,
  },
  icon: {
    marginLeft: 2,
  },
  statusText: {
    color: '#fbdd40',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
    statusOnline: {
    color: '#fafafaff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
logoBackground: {
  backgroundColor: 'rgba(0,0,0,0.8)',
  borderRadius: 70,           // Igual o mayor que el radio del logo
  padding: 8,                 // Espacio alrededor del logo
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
},
logoImage: {
  width: 120,                 // Ajusta el ancho como prefieras
  aspectRatio: 1,             // Alto = ancho, mantiene la imagen cuadrada
  borderRadius: 60,           // La mitad del ancho para que sea circular
  borderWidth: 2,
  borderColor: '#FFFFFF',
  maxHeight: 120,             // Limita la altura máxima
},
});
