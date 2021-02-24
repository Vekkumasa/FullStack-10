import React from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import theme from '../theme';
import { useHistory } from "react-router-dom";
import useSignUp from '../utils/useSignUp';
import useSignIn from '../utils/useSignIn';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';
import { max } from 'date-fns';

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

const validationSchema = yup.object().shape({
    username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username must be at least 1 characters long')
    .max(50, 'Username must be less than 50 characters long'),
    password: yup
    .string()
    .required()
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be less than 50 characters long'),
    confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required')
})

const SignUpForm = ({ onSubmit }) => {
    return (
      <View style={styles.container}>
        <View>
          <FormikTextInput 
          testID="username" 
          name="username" 
          placeholder="Username" 
          style={styles.field}/>
        </View>
        
        <View >
          <FormikTextInput 
          testID="password" 
          name="password" 
          placeholder="Password" 
          secureTextEntry={true} 
          style={styles.field}/>
        </View>

        <View >
          <FormikTextInput 
          testID="confirmation" 
          name="confirmation" 
          placeholder="Password confirmation" 
          secureTextEntry={true} 
          style={styles.field}/>
        </View>

      <TouchableWithoutFeedback onPress={onSubmit} testID="submit" >
        <Text style={styles.button}>Sign Up</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const initialValues = {
    username: '',
    password: '',
    confirmation: '',
}

export const SignUpFormContainer = ({ handleSubmit }) => {
    return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    );
  };

const SignUp = () => {
    const history = useHistory();
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();

    const onSubmit = async ( values ) => {
        const { username, password, confirmation } = values;
        
        try {
          await signUp({ username, password });
        
        } catch (e) {

        }

        try {
            await signIn({ username, password });
            history.push("/");
        } catch (e) {
        }
    }
    return (
        <View>
            <SignUpFormContainer handleSubmit={onSubmit} />
        </View>
    )
}

export default SignUp;