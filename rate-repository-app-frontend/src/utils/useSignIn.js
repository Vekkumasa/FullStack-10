import { SIGN_IN } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
  
    const signIn = async ( credentials ) => {
      console.log('credentials: ', credentials);
      return mutate({ variables: { credentials } });
    };
    
    return [signIn, result];
  };

export default useSignIn;