import React, { useContext }from 'react';
import { View, StyleSheet, ScrollView  } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { GET_USER } from '../graphql/queries';
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
    },
    {
      id: "4",
      name: "Create Review",
      link: "/CreateReview"
    },
    {
      id: "5",
      name: "Sign Up",
      link: "/SignUp"
    },
    {
      id: "6",
      name: "My reviews",
      link: "/MyReviews"
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
    <ScrollView horizontal>
      <AppBarTab color="textHeading" fontSize="body" fontWeight="bold" padding="padding" tab={tabs[3]}/>
      <AppBarTab color="textHeading" fontSize="body" fontWeight="bold" padding="padding" onClick={onClick} tab={tabs[2]}/>
    </ScrollView>
  );
};

const AppBar = ({ visible, setVisible }) => {
  const user = useQuery(GET_USER);

  const openMenu = () => {
    setVisible(!visible);
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab color="textHeading" fontSize="body" fontWeight="bold" padding="padding" tab={tabs[0]}/>
        {user.data?.authorizedUser ?
          <>
            <AppBarTab color="textHeading" fontSize="body" fontWeight="bold" padding="padding" tab={tabs[5]}/>
            <LogOut/>           
          </>
          :
          <AppBarTab color="textHeading" fontSize="body" fontWeight="bold" padding="padding" tab={tabs[1]}/> 
        }
        {user.data?.authorizedUser ?
          <View></View>
          :
          <AppBarTab color="textHeading" fontSize="body" fontWeight="bold" padding="padding" tab={tabs[4]}/> 
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;