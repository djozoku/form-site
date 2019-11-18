import React from 'react';
import { Layout as AntdLayout, Breadcrumb } from 'antd';

import Navigation from './Navigation';

const { Header, Content, Footer } = AntdLayout;

const Layout: React.FC = ({ children }) => {
  return (
    <AntdLayout className="layout" style={{ height: '100%' }}>
      <Header
        style={{
          height: '48px',
          background: '#fff',
          padding: '0',
          position: 'sticky',
          zIndex: 1,
          width: '100%',
          top: 0
        }}
      >
        <Navigation />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Form Site</Footer>
    </AntdLayout>
  );
};

export default Layout;
