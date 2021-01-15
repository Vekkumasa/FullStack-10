import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { ItemSeparator } from '../theme';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    backgroundColor: theme.backgroundColors.AppBar

    // ...
  },
  // ...
});

const tabs = [
    {
        id: "Repositories",
        name: "Repositories"
    },
];

const AppBar = () => {
  return (
    <View style={styles.container}>
        <FlatList
        data={tabs}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ index }) => <AppBarTab color="textHeading" fontSize="heading" fontWeight="bold" tab={tabs[index]}/>}
        />
    </View>
  );
};

export default AppBar;