import { SIGN_IN, SIGN_UP } from '../graphql/mutations';
import { useMutation, useApolloClient } from '@apollo/client';

const useSignUp = () => {
    const [mutate, result] = useMutation(SIGN_UP);

    const signUp = async ( credentials ) => {

        const { data }  = await mutate({ variables: { credentials } });

        return data;
      };
      
      return [signUp, result];
}

export default useSignUp;