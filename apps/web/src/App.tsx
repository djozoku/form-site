import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Avatar, Row, Col, Typography } from 'antd';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const handleClick = (e: { key: string }) => {
    setCurrent(e.key);
  };

  return (
    <Layout className="layout">
      <Header style={{ height: '48px', background: '#fff', padding: '0' }}>
        <Row>
          <Col span={16}>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
              <Menu.Item key="mail">
                <Icon type="home" />
                Home
              </Menu.Item>
              <Menu.Item key="app">
                <Icon type="layout" />
                Dashboard
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={2} push={6}>
            <div style={{ position: 'relative', right: '-76px', top: '-10px' }}>
              <Typography.Text style={{ position: 'relative', top: '2px', right: '10px' }}>
                Ozoku
              </Typography.Text>
              <Avatar icon="user" />
            </div>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Form Site</Footer>
    </Layout>
  );
};

export default App;
