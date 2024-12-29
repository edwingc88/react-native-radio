import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const programs = [
  { id: '1', name: 'Matutinos de Palabra y Oración ', time: 'Lunes a Viernes a las 4:00 AM - 6:00 AM' },
  { id: '2', name: 'Una Mañana Diferente', time: 'Lunes a Viernes 10:00 PM - 12:00 PM' },
  { id: '3', name: 'Mujer El Vaso Más Frágil', time: 'Martes 6:00 PM - 8:00 PM' },
  { id: '4', name: 'Predicando el Evangelio', time: 'Lunes a Viernes 9:00 PM - 11:00 PM' },
];

const Programacion = () => {
  return (
    <LinearGradient
      colors={['#140530', '#2e0c3f']}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Programación Semanal hora del Este USA</Text>
        <FlatList
          data={programs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.programItem}>
              <Text style={styles.programName}>{item.name}</Text>
              <Text style={styles.programTime}>{item.time}</Text>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Cambiado a transparente
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fbdd40', 
  },
  programItem: {
    marginBottom: 15,
  },
  programName: {
    fontSize: 18,
    color: '#FFF', // Cambiado a blanco para mejor visibilidad
  },
  programTime: {
    fontSize: 16,
    color: '#DDD', // Cambiado a un color claro para mejor visibilidad
  },
  linearGradient: {
    flex: 1,
    padding: 20,
  },
});

export default Programacion;
