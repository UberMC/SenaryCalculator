import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export type Props = {
  number: string,
  operation: string,
  onPress: () => void
};

// Pure Component
const Button = ({ onPress, number, operation }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.buttonContainer}
  >
    <Text style={styles.buttonText}>{number || operation}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonText: {
    color: '#e0ffe2',
    fontSize: 22,
    fontWeight: '500'
  },
  buttonContainer: {
    flexBasis: '25%',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: 'darkgreen',
    borderRadius: 0,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  }
});

export default Button;
