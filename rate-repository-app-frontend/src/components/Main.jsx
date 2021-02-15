import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepositoryView';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const styles = StyleSheet.create({
    container: {
        margin: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/repository/:id" exact>
                    <SingleRepository />    
                </Route>
                <Route path="/CreateReview">
                    <CreateReview />
                </Route>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Route path="/SignIn" exact>
                    <SignIn />
                </Route>
                <Route path="/SignUp" exact>
                    <SignUp />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;