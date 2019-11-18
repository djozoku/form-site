import React from 'react';
import { Router } from '@reach/router';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './apollo';
import IndexPage from './pages/index';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router style={{ height: '100%' }}>
        <IndexPage path="/" />
      </Router>
    </ApolloProvider>
  );
};

export default App;
