import { SIGN_IN } from '../graphql/mutations';
import { useMutation, useApolloClient } from '@apollo/client';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(SIGN_IN);
    
    const signIn = async ( credentials ) => {
      const { data }  = await mutate({ variables: { credentials } });

      await authStorage.setAccessToken(data.authorize.accessToken);
      
      apolloClient.resetStore();
      return data;
    };
    
    return [signIn, result];
  };

export default useSignIn;