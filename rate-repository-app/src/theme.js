import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      textHeader: 'white',
      primary: '#0366d6',
    },
    backgroundColors: {
      AppBar: '#24292e',
      LanguageBox: "#61dafb"
    },
    fontSizes: {
      body: 14,
      subheading: 16,
      heading: 22,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System'
      })
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });

  export const ItemSeparator = () => <View style={styles.separator} />;

  export default theme;