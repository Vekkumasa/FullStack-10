import { DELETE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW)

    const deleteReview = async ( review ) => {
        const { data } = await mutate({ variables: { id: review } });
        return data;
    }

    return [deleteReview, result];
}

export default useDeleteReview;