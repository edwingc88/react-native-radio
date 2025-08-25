import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';
import Icon from 'react-native-vector-icons/FontAwesome5';



const ShareAppScreen = () => {
  const iosLink = 'https://itunes.apple.com/app/id123456789'; 
  const androidLink = 'https://play.google.com/store/apps/details?id=com.example.app';

  const copyToClipboard = async (link) => {
    await Clipboard.setStringAsync(link);
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
          <TouchableOpacity /* style={styles.copyButton} */       style={{ ...styles.copyButton, pointerEvents: 'auto' }} onPress={() => copyToClipboard(iosLink)}>
            <Text style={styles.buttonText}>Copiar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linkContainer}>
          <View style={styles.row}>
            <Icon name="android" size={30} color="#FFF" />
            <Text style={styles.osText}>Android</Text>
          </View>
          <Text style={styles.linkText}>{androidLink}</Text>
          <TouchableOpacity /* style={styles.copyButton} */       style={{ ...styles.copyButton, pointerEvents: 'auto' }} onPress={() => copyToClipboard(androidLink)}>
            <Text style={styles.buttonText}>Copiar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 20,
  },
  drawerContainer: {
    flex: 1,
    alignItems: 'flex-start', // Añadido para alinear los elementos a la izquierda
    justifyContent: 'flex-start', // Cambiado a flex-start para alinear todo desde arriba
    padding: 10,
  }, 
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fbdd40',
  },
  linkContainer: {
    alignItems: 'flex-start', // Añadido para alinear los elementos a la izquierda
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  osText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 10,
    textAlign: 'left', // Añadido para alinear el texto a la izquierda
  },
  linkText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'left', // Añadido para alinear el texto a la izquierda
    marginLeft: 10,
    lineHeight: 24, // Añadido para alinear el texto verticalmente con el icono
  },
  copyButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ShareAppScreen;
