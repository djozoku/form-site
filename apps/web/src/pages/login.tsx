import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MUILink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RouteComponentProps, navigate } from '@reach/router';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import Layout from '../Layout';
import FormTextField from '../components/form/FormTextField';
import Link from '../components/Link';
import { useLoginMutation } from '../graphql';

const useStyles = makeStyles((theme) =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  })
);

const LoginPage: React.FC<RouteComponentProps> = () => {
  const [login, { loading }] = useLoginMutation();
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async ({ username, password }) => {
              console.log('Logging in...');
              const logindata = await login({ variables: { username, password } });
              const token =
                logindata.data && logindata.data.login ? logindata.data.login.accessToken : '';
              localStorage.setItem('xt', token);
              navigate('/dashboard');
            }}
            validate={(values) => {
              const errors: Record<string, string> = {};
              if (values.username === '')
                errors.username = t('validation:required', { field: t('common:username') });
              if (values.password === '')
                errors.password = t('validation:required', { field: t('common:password') });
              return errors;
            }}
          >
            {() => (
              <Form>
                <FormTextField label="Username" name="username" />
                <FormTextField label="Password" name="password" type="password" />
                <FormControlLabel
                  control={<Checkbox value="remember" color="secondary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  disabled={loading}
                >
                  Login
                </Button>
                <Grid container justify="center">
                  <Grid item>
                    <MUILink
                      variant="body2"
                      color="secondary"
                      to="/account/register"
                      component={Link}
                    >
                      Don&apos;t have an account? Register
                    </MUILink>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </Layout>
  );
};

export default LoginPage;
