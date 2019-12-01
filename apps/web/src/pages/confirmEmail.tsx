import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import { useSearchParams } from '@form/hooks';

import Layout from '../Layout';
import { useConfirmEmailMutation } from '../graphql';

const ConfirmEmailPage: React.FC<RouteComponentProps> = ({ location }) => {
  const params = useSearchParams((location && location.search) || '');
  const id = params.has('id') ? (params.get('id') as string) : '';
  const [confirm, { error, data, loading }] = useConfirmEmailMutation();
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
    confirm({ variables: { token: id } });
  }, [confirm, id]);
  if (!loading) {
    color = 'secondary';
    text = 'Email address verified!';
  }
  if (error || (data && !data.confirmEmail)) {
    color = 'error';
    text = 'There was an error while confirming your email address';
  }
  return (
    <Layout>
      <Container maxWidth="md">
        <Paper style={{ padding: 20, textAlign: 'center' }}>
          <Typography color={color} component="h2" variant="h4">
            {text}
          </Typography>
          {!loading && !error && data && data.confirmEmail && (
            <Typography component="p" variant="body1">
              Now you can login
            </Typography>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default ConfirmEmailPage;
