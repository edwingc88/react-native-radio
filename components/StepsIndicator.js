import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StepsIndicator = () => {
  return (
    <View style={styles.container}>
      <Text>Steps Indicator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});

export default StepsIndicator;
