import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from '@reach/router';
import React from 'react';

import client from './apollo';
import theme from './theme';
import IndexPage from './pages';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashboardPage from './pages/dashboard';
import ConfirmEmailPage from './pages/confirmEmail';
import LogoutPage from './pages/logout';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router style={{ height: '100%' }}>
          <IndexPage path="/" />
          <DashboardPage path="dashboard/*" />
          <LoginPage path="account/login" />
          <RegisterPage path="account/register" />
          <ConfirmEmailPage path="account/confirm" />
          <LogoutPage path="account/logout" />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
