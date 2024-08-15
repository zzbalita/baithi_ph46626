import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const TextInput = ({ placeholder }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#3F51B5',
    borderRadius: 10,
    borderColor: '#616161',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    color: '#FFE57F',
  },
});

export default TextInput;