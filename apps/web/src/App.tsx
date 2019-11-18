import React from 'react';
import { Router } from '@reach/router';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './apollo';
import IndexPage from './pages/index';
import LoginPage from './pages/login';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router style={{ height: '100%' }}>
        <IndexPage path="/" />
        <LoginPage path="/account/login" />
      </Router>
    </ApolloProvider>
  );
};

export default App;
