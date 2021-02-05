import React from 'react';
import { useHistory } from "react-router-dom";
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../utils/useSignIn';

const styles = StyleSheet.create({
  container: {
  },

  button: {
    backgroundColor: theme.backgroundColors.LanguageBox,
    borderWidth: 1,
    width: 353,
    height: 30,
    left: 5,
    top: 2,
    lineHeight: 30,
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(3, 'Password must be at least 3 characters long')
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View>
        <FormikTextInput name="username" placeholder="Username" style={styles.field}/>
      </View>
      <View >
        <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} style={styles.field} />
      </View>
      <TouchableWithoutFeedback onPress={onSubmit}  >
        <Text style={styles.button}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik 
    initialValues={initialValues} 
    onSubmit={onSubmit}
    validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
export default SignIn; 