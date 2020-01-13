import ApolloClient from 'apollo-boost';

// eslint-disable-next-line no-restricted-globals
const url = location.hostname;
const port = url === 'localhost' ? '4000' : '44445';

const client = new ApolloClient({
  uri: `http://${url}:${port}/graphql`,
  request: (operation) => {
    const token = localStorage.getItem('xt');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
});

export default client;
