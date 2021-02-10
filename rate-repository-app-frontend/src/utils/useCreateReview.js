import { CREATE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW)

    const createReview = async ( review ) => {
        console.log('Review usecreatereview', review);
        const { data } = await mutate({ variables: { input: review } });
        console.log('DATA', data);
        return data;
    }

    return [createReview, result];
}

export default useCreateReview;