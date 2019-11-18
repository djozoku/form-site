import React, { useState } from 'react';
import { Menu, Icon, Avatar, Row, Col, Typography, Dropdown } from 'antd';
import { Link, Location, navigate } from '@reach/router';

import { useWindowSize } from '@form/hooks';

import './Navigation.css';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/account/login">Login</Link>
    </Menu.Item>
  </Menu>
);

const pathnameToMenuKey = (pathname: string) => {
  if (pathname === '/') return ['home'];
  const [_, ...paths] = pathname.split('/');
  if (paths.length > 1) return [];
  return [paths[0]];
};

const Navigation: React.FC = () => {
  const { width } = useWindowSize();
  const [userClassNames, setUserClassNames] = useState('navigation');

  const handleClick = (e: { key: string }) => {
    if (e.key === 'home') navigate('/');
    else navigate(`/${e.key}`);
  };

  const onHover = () => {
    if (userClassNames === 'navigation') {
      setUserClassNames('navigation navigation-hover');
    } else {
      setUserClassNames('navigation');
    }
  };

  return (
    <Location>
      {({ location }) => {
        const menuKey = pathnameToMenuKey(location.pathname);
        return (
          <Row>
            <Col span={14}>
              <Menu onClick={handleClick} selectedKeys={menuKey} mode="horizontal">
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
                  <Typography.Text style={{ paddingRight: '20px' }}>Account</Typography.Text>
                  <Avatar icon="user" style={{ position: 'relative', right: '8px', top: '-2px' }} />
                </div>
              </Dropdown>
            </Col>
          </Row>
        );
      }}
    </Location>
  );
};

export default Navigation;
