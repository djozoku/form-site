import React from 'react';
import { Router } from '@reach/router';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './apollo';
import Layout from './components/Layout';

const IndexPage: React.FC<{ path: string }> = () => {
  return (
    <Layout>
      <div style={{ minHeight: 1000 }}>Content</div>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <IndexPage path="/" />
      </Router>
    </ApolloProvider>
  );
};

export default App;
