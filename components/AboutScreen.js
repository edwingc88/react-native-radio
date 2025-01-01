import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AboutScreen = () => (
  <LinearGradient
    colors={['#140530', '#2e0c3f']}
    style={styles.linearGradient}
  >
    <View style={styles.drawerContainer}>
      <Text style={styles.header}>Radio Cristiana Radio</Text>
      <Text style={styles.drawerText}>
        Bienvenidos a nuestra emisora cristiana, donde podrás escuchar alabanzas, adoraciones, enseñanzas bíblicas y programas de oración, diseñados para fortalecer la fe, la esperanza y la unidad.
      </Text>
      <Text style={styles.subHeader}>Redes Sociales</Text>
      <View style={styles.linkContainer}>
        <View style={styles.socialRow}>
          <Icon name="facebook" size={22} color="#FFF" />
          <Text style={styles.linkText} onPress={() => Linking.openURL('https://facebook.com/RadioCristiana')}> Facebook</Text>
        </View>
      </View>
      <View style={styles.linkContainer}>
        <View style={styles.socialRow}>
          <Icon name="instagram" size={22} color="#FFF" />
          <Text style={styles.linkText} onPress={() => Linking.openURL('https://instagram.com/RadioCristiana')}> Instagram</Text>
        </View>
      </View>
      <View style={styles.linkContainer}>
        <View style={styles.socialRow}>
          <Icon name="youtube" size={22} color="#FFF" />
          <Text style={styles.linkText} onPress={() => Linking.openURL('https://youtube.com/RadioCristiana')}>YouTube</Text>
        </View>
      </View>
      <View style={styles.linkContainer}>
        <View style={styles.socialRow}>
          <Icon name="tiktok" size={22} color="#FFF" />
          <Text style={styles.linkText} onPress={() => Linking.openURL('https://tiktok.com/@RadioCristiana')}> TikTok</Text>
        </View>
      </View>
      <View style={styles.spacer} />
      <View style={styles.footer}>
        <Text style={styles.footerLink} onPress={() => Linking.openURL('https://yourwebsite.com')}>Sitio Web</Text>
        <Text style={styles.footerLink} onPress={() => Linking.openURL('https://yourwebsite.com/privacy')}>Políticas de Privacidad</Text>
        <Text style={styles.footerLink} onPress={() => Linking.openURL('https://yourwebsite.com/licenses')}>Licencias</Text>
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 20,
  },
  drawerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fbdd40',
  },
  drawerText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'left',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
    textAlign: 'left',
    marginBottom: 8,
  },
  linkContainer: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  linkText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'left',
    marginLeft: 10,
    lineHeight: 24,
  },
  spacer: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  footerLink: {
    fontSize: 16,
    color: '#FFF',
    textDecorationLine: 'underline',
    marginHorizontal: 10,
    textAlign: 'left',
  },
});

export default AboutScreen;
