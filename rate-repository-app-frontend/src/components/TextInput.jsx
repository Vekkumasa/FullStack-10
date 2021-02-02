import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  errorBorder: {
    borderColor: "red",
  }
});

const TextInput = ({ style, error, ...props }) => {
  let textInputStyle;
  if (error) {
    textInputStyle = [style, styles.errorBorder];
  } else {
    textInputStyle = [style];
  }
    return (
        <NativeTextInput style={textInputStyle} {...props} /> 
      );
};

export default TextInput;