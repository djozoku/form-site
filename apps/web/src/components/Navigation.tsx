import React, { useState } from 'react';
import { Menu, Icon, Avatar, Row, Col, Typography } from 'antd';

const Navigation: React.FC = () => {
  const [current, setCurrent] = useState('home');
  const handleClick = (e: { key: string }) => {
    setCurrent(e.key);
  };
  return (
    <Row>
      <Col span={16}>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="home">
            <Icon type="home" />
            Home
          </Menu.Item>
          <Menu.Item key="dashboard">
            <Icon type="layout" />
            Dashboard
          </Menu.Item>
        </Menu>
      </Col>
      <Col span={2} push={6}>
        <div style={{ position: 'absolute', right: '10px', top: '-10px', height: '48px' }}>
          <Typography.Text style={{ position: 'relative', top: '2px', right: '10px' }}>
            Ozoku
          </Typography.Text>
          <Avatar icon="user" />
        </div>
      </Col>
    </Row>
  );
};

export default Navigation;
