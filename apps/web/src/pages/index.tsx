import React from 'react';
import { RouteComponentProps } from '@reach/router';

import Layout from '../components/Layout';

const IndexPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout>
      <div>Content</div>
    </Layout>
  );
};

export default IndexPage;
