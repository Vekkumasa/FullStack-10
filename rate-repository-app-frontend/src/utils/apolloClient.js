import ApolloClient from 'apollo-boost';

const createApolloClient = (uri) => {
  return new ApolloClient({
    uri: uri,
  });
};

export default createApolloClient;