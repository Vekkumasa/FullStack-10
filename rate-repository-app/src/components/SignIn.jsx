import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    
  },

  button: {
    backgroundColor: theme.backgroundColors.LanguageBox,
    borderWidth: 1,
    width: 50,
    height: 25,
    left: 5,
    top: 2,
    textAlign: "center",
  },

  field: {
    borderWidth: 1,
    padding: 3,
    margin: 5
  }
});

const initialValues = {
  username: '', 
  password: ''
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.field}>
      <FormikTextInput name="username" placeholder="Username"/>
      </View>
      <View style={styles.field}>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      </View>
      <TouchableWithoutFeedback onPress={onSubmit}  >
        <Text style={styles.button}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
export default SignIn; 