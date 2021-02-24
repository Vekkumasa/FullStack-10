import React, { useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepositoryView';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
    container: {
        margin: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => {

    const [ visible, setVisible ] = useState(false);

    return (
        <View style={styles.container}>
            <AppBar visible={visible} setVisible={setVisible} />
            <Switch>
                <Route path="/repository/:id" exact>
                    <SingleRepository />    
                </Route>
                <Route path="/CreateReview">
                    <CreateReview />
                </Route>
                <Route path="/" exact>
                    <RepositoryList visible={visible} setVisible={setVisible} />
                </Route>
                <Route path="/SignIn" exact>
                    <SignIn />
                </Route>
                <Route path="/SignUp" exact>
                    <SignUp />
                </Route>
                <Route path="/MyReviews" exact>
                    <MyReviews />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;