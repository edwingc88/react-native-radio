
import React from 'react';
import { View, Text} from 'react-native';

export default function AboutScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 20 }}>Pantalla Acerca de RCR</Text>
    </View>
  );
}
