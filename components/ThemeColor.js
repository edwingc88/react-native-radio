import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = [
    { name: 'Morado', value: '#8e24aa' },
  { name: 'Azul', value: '#2196F3' },
 { name: 'Negro', value: '#000000' },
];

const ThemeColor = ({ onChangeTheme, themeColor }) => {
  return (
    <LinearGradient colors={[themeColor || '#8e24aa', '#000000ff']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Elige un color de fondo:</Text>
        <View style={styles.options}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color.value}
              style={[
                styles.colorButton,
                { backgroundColor: color.value },
                themeColor === color.value && styles.selectedButton,
              ]}
              onPress={() => onChangeTheme && onChangeTheme(color.value)}
            >
              <Text
                style={[
                  styles.buttonText,
                  themeColor === color.value && styles.selectedContentSmall,
                ]}
              >
                {color.name}
              </Text>
              {themeColor === color.value && (
                <Text
                  style={[
                    styles.selectedText,
                    styles.selectedContentSmall,
                  ]}
                >
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    margin: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedButton: {
    borderColor: '#fbdd40',
    shadowColor: '#fbdd40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedText: {
    color: '#fbdd40',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 18,
  },
  selectedContentSmall: {
  fontSize: 13,
},
});

export default ThemeColor;