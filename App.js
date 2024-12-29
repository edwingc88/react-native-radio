import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, BackHandler, ImageBackground } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-clipboard/clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import Programacion from './src/Programacion';

const icon = require('./assets/logo-radio-cristiana-recorte.png');
const background = require('./assets/fondomorado2.jpg');

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Adoraciones y Alabanzas');
  const [volume, setVolume] = useState(1.0);

  const videoRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
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

        <Video
          ref={videoRef}
          source={{ uri: 'https://stream.zeno.fm/utojpczqio2tv' }}
          audioOnly={true}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch={"ignore"}
          muted={false}
          paused={!isPlaying}
          volume={volume}
          style={{ width: 0, height: 0, pointerEvents: 'none' }}
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
          onValueChange={value => setVolume(value)}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
    </ImageBackground>
  );
};

const AboutScreen = () => (
  <LinearGradient
    colors={['#1e3c72', '#2a5298']}
    style={styles.linearGradient}
  >
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerText}>
        Bienvenidos a nuestra emisora. Ofrecemos música cristiana, enseñanzas bíblicas y programas de oración para fortalecer la fe y la unidad. Respaldada por la iglesia 'Reconciliacion Church', estamos comprometidos a difundir el mensaje de amor y esperanza de nuestro Señor Jesucristo. ¡Gracias por ser parte de nuestra familia!
      </Text>
      <Text style={styles.subHeader}>Redes Sociales</Text>
      <View style={styles.linkContainer}>
        <View style={styles.socialRow}>
          <Icon name="facebook" size={24} color="#FFF" />
          <Text style={styles.linkText}>Facebook</Text>
        </View>
        <Text style={styles.link}>https://facebook.com/RadioCristiana</Text>
      </View>
      <View style={styles.linkContainer}>
        <View style={styles.socialRow}>
          <Icon name="instagram" size={24} color="#FFF" />
          <Text style={styles.linkText}>Instagram</Text>
        </View>
        <Text style={styles.link}>https://instagram.com/RadioCristiana</Text>
      </View>
      <View style={styles.linkContainer}>
        <View style={styles.socialRow}>
          <Icon name="tiktok" size={24} color="#FFF" />
          <Text style={styles.linkText}>TikTok</Text>
        </View>
        <Text style={styles.link}>https://tiktok.com/@RadioCristiana</Text>
      </View>
      <View style={styles.linkContainer}>
        <View style={styles.socialRow}>
          <Icon name="youtube" size={24} color="#FFF" />
          <Text style={styles.linkText}>YouTube</Text>
        </View>
        <Text style={styles.link}>https://youtube.com/RadioCristiana</Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.footer}>
        <Text style={styles.footerLink}>Sitio Web</Text>
        <Text style={styles.footerLink}>Políticas de Privacidad</Text>
        <Text style={styles.footerLink}>Licencias</Text>
      </View>
    </View>
  </LinearGradient>
);






const ShareAppScreen = () => {
  const iosLink = 'https://itunes.apple.com/app/id123456789'; 
  const androidLink = 'https://play.google.com/store/apps/details?id=com.example.app';

  const copyToClipboard = (link) => {
    Clipboard.setString(link);
    alert('Enlace copiado al portapapeles');
  };

  return (
    <LinearGradient
      colors={['#140530', '#2e0c3f']}
      style={styles.linearGradient}
    >
      <View style={styles.drawerContainer}>
        <Text style={styles.header}>Compartir la App</Text>

        <View style={styles.linkContainer}>
          <View style={styles.row}>
            <Icon name="apple" size={30} color="#FFF" />
            <Text style={styles.osText}>iOS</Text>
          </View>
          <Text style={styles.linkText}>{iosLink}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard(iosLink)}>
            <Text style={styles.buttonText}>Copiar</Text>
          </TouchableOpacity>
       
        </View>

        <View style={styles.linkContainer}>
          <View style={styles.row}>
            <Icon name="android" size={30} color="#FFF" />
            <Text style={styles.osText}>Android</Text>
          </View>
          <Text style={styles.linkText}>{androidLink}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard(androidLink)}>
            <Text style={styles.buttonText}>Copiar</Text>
          </TouchableOpacity>
     
        </View>
      </View>
    </LinearGradient>
  );
};


const CustomDrawerContent = (props) => (
  <LinearGradient
    colors={['#140530', '#2e0c3f']}  // Azul oscuro y azul más vivo
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
  audioPlayer: {
    width: 0,
    height: 0,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  playButtonText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  drawerContainer: {
    flex: 1,
    alignItems: 'flex-start', // Añadido para alinear los elementos a la izquierda
    justifyContent: 'flex-start', // Cambiado a flex-start para alinear todo desde arriba
    padding: 20,
  },
  drawerText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'left', // Añadido para alinear el texto a la izquierda
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
    textAlign: 'left', // Añadido para alinear el texto a la izquierda
  },
  linkText: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 10,
    textAlign: 'left', // Añadido para alinear el texto a la izquierda
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  link: {
    color: '#FFF',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  linkContainer: {
    alignItems: 'flex-start', // Añadido para alinear los elementos a la izquierda
    marginBottom: 15,
  },
  osText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 10,
    textAlign: 'left', // Añadido para alinear el texto a la izquierda
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fbdd40', 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  linkContainer: {
    alignItems: 'flex-start', // Añadido para alinear los elementos a la izquierda
    marginBottom: 20,
  },
  copyButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  logoImage: {
    marginTop:3,
    width: 180,
    height: 180,
    borderRadius: 90, // Mantén la misma relación de aspecto para que sea completamente circular
    borderWidth: 2,
    borderColor: '#FFFFFF', // Agrega un borde blanco
    marginBottom: 3,
  },
  linearGradient: {
    flex: 1,
    padding: 20,
  },
  programItem: {
    marginBottom: 15,
  },
  programName: {
    fontSize: 18,
    color: '#FFF',
  },
  programTime: {
    fontSize: 16,
    color: '#DDD',
  },
  spacer: {
    flex: 1, // Fills the remaining space, pushing the footer to the bottom
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espaciado entre los enlaces
    marginBottom: 20,
  },
  footerLink: {
    fontSize: 16,
    color: '#FFF', // Color blanco para los enlaces
    textDecorationLine: 'underline',
    marginHorizontal: 10, // Margen horizontal para separar los enlaces
    textAlign: 'left', // Añadido para alinear el texto a la izquierda
  },
});

