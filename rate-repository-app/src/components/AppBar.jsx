import React from 'react';
import { View, StyleSheet, ScrollView  } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    backgroundColor: theme.backgroundColors.AppBar,
  },
  tab: {
    flexDirection: 'row',
  }
});

const tabs = [
    {
      id: "1",
      name: "Repositories",
      link: "/"
    },
    {
      id: "2",
      name: "Sign in",
      link: "/SignIn"
    },
];

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab color="textHeading" fontSize="body" fontWeight="bold" padding="padding" tab={tabs[0]}/>
        <AppBarTab color="textHeading" fontSize="body" fontWeight="bold" padding="padding" tab={tabs[1]}/>  
      </ScrollView>
    </View>
  );
};

export default AppBar;