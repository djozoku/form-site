import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Layout from '../Layout';
import { useLogoutMutation } from '../graphql';

const LogoutPage: React.FC<RouteComponentProps> = () => {
  const [logout, { error, data, loading, client }] = useLogoutMutation();
  let color:
    | 'error'
    | 'secondary'
    | 'inherit'
    | 'initial'
    | 'primary'
    | 'textPrimary'
    | 'textSecondary'
    | undefined = 'initial';
  let text = 'Loading...';
  useEffect(() => {
    logout()
      .then(() => localStorage.removeItem('xt'))
      .then(() => client && client.resetStore());
  }, [client, logout]);
  if (!loading) {
    color = 'secondary';
    text = 'Logged out!';
  }
  if (error || (data && !data.logout)) {
    color = 'error';
    text = 'There was an error while logging out,';
  }
  return (
    <Layout>
      <Container maxWidth="md">
        <Paper style={{ padding: 20, textAlign: 'center' }}>
          <Typography color={color} component="h2" variant="h4">
            {text}
          </Typography>
          {(error || (data && !data.logout)) && (
            <Typography component="p" variant="body1">
              To log out manually, clear this website&apos;s cache in your browser.
            </Typography>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default LogoutPage;
