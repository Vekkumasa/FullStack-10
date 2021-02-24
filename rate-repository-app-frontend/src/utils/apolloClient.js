import ApolloClient from 'apollo-boost';

const createApolloClient = (uri, authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : ""
          }
        });

      } catch (e) {

      }
    },
    uri: uri,
  });
};

export default createApolloClient;