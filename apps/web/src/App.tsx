import React from 'react';
import { Router } from '@reach/router';

import Layout from './components/Layout';

const IndexPage: React.FC<{ path: string }> = () => {
  return <Layout>Content</Layout>;
};

const App: React.FC = () => {
  return (
    <Router>
      <IndexPage path="/" />
    </Router>
  );
};

export default App;
