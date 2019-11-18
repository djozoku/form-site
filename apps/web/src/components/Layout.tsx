import React from 'react';
import { Layout as AntdLayout, Breadcrumb } from 'antd';
import { Location } from '@reach/router';

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
      <Content style={{ padding: '0 50px', height: '100%' }}>
        <Location>
          {({ location }) => {
            const [_, ...path] = location.pathname.split('/');
            let breadcrumb;
            if (path.length === 1 && path[0] === '')
              breadcrumb = (
                <>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                </>
              );
            else
              breadcrumb = (
                <>
                  {path.map((p) => {
                    const [f, ...other] = p.split('');
                    return (
                      <Breadcrumb.Item>{[f.toUpperCase(), ...other].join('')}</Breadcrumb.Item>
                    );
                  })}
                </>
              );
            return (
              <>
                <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumb}</Breadcrumb>
                <div style={{ background: '#fff', padding: 24, height: '100%' }}>{children}</div>
              </>
            );
          }}
        </Location>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Form Site</Footer>
    </AntdLayout>
  );
};

export default Layout;
