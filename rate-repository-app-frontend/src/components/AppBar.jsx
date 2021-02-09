import React, { useContext }from 'react';
import { View, StyleSheet, ScrollView  } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { GET_USER } from '../graphql/queries/';
import { useQuery, useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';

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
    {
      id: "3",
      name: "Log Out",
      link: "/"
    }
];

const LogOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const onClick = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <AppBarTab color="textHeading" fontSize="body" fontWeight="bold" padding="padding" onClick={onClick} tab={tabs[2]}/>
  );
};

const AppBar = () => {
  const user = useQuery(GET_USER);
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab color="textHeading" fontSize="body" fontWeight="bold" padding="padding" tab={tabs[0]}/>
        {user.data?.authorizedUser ?
          <LogOut/> :
          <AppBarTab color="textHeading" fontSize="body" fontWeight="bold" padding="padding" tab={tabs[1]}/> 
        } 
      </ScrollView>
    </View>
  );
};

export default AppBar;