import React, { useState } from 'react';
import { Menu, Icon, Avatar, Row, Col, Typography, Dropdown } from 'antd';
import { useWindowSize } from '@form/hooks';

import './Navigation.css';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" disabled>
      3rd menu item（disabled）
    </Menu.Item>
  </Menu>
);

const Navigation: React.FC = () => {
  const { width } = useWindowSize();
  const [userClassNames, setUserClassNames] = useState('navigation');
  const [current, setCurrent] = useState('home');

  const handleClick = (e: { key: string }) => {
    setCurrent(e.key);
  };

  const onHover = () => {
    if (userClassNames === 'navigation') {
      setUserClassNames('navigation navigation-hover');
    } else {
      setUserClassNames('navigation');
    }
  };

  return (
    <Row>
      <Col span={14}>
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
      <Col span={4} push={6}>
        <Dropdown overlay={menu}>
          <div
            style={{
              position: 'absolute',
              right: 0,
              lineHeight: '46px',
              paddingLeft: '20px',
              paddingRight: '6px',
              top: '1px'
            }}
            className={userClassNames}
            onMouseEnter={onHover}
            onMouseLeave={onHover}
          >
            <Typography.Text style={{ paddingRight: '20px' }}>Ozoku</Typography.Text>
            <Avatar icon="user" style={{ position: 'relative', right: '8px', top: '-2px' }} />
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Navigation;
