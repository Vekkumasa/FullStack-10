import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";
import useCreateReview from '../utils/useCreateReview';

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
    repositoryOwner: yup
        .string()
        .required('Repository owner is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0)
        .max(100)
        .required('Rating is required')
});

const initialValues = {
    repositoryOwner: '', 
    repositoryName: '',
    rating: '',
    review: ''
  };

const CreateReviewForm = ({ onSubmit }) => {

    return (
        <View style={styles.container}>
          <View>
            <FormikTextInput name="repositoryOwner" placeholder="Repository owner name" style={styles.field}/>
          </View>
          <View >
            <FormikTextInput name="repositoryName" placeholder="Repository name" style={styles.field} />
          </View>
          <View>
              <FormikTextInput name="rating" placeholder="Rating 0 - 100" style={styles.field} />
          </View>
          <View>
              <FormikTextInput name="review" placeholder="Review" style={styles.field} multiline={true}/>
          </View>
          <TouchableWithoutFeedback onPress={onSubmit} >
            <Text style={styles.button}> Create Review </Text>
          </TouchableWithoutFeedback>
        </View>
      );
}

const CreateReview = () => {
    const [createReview] = useCreateReview();
    let history = useHistory();

    const onSubmit = async (values) => {
        const { repositoryName, repositoryOwner, rating, review } = values;
        const number = Number(rating);

        try {
            const data = await createReview({ 
                repositoryName, 
                ownerName: repositoryOwner,
                rating: number, 
                text: review
            });
        
            console.log('id', data.createReview.repositoryId)
            history.push(`/repository/${data.createReview.repositoryId}`)

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Formik  
            initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
}

export default CreateReview;