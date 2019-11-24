import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MUILink from '@material-ui/core/Link';
import { RouteComponentProps, navigate } from '@reach/router';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { UserValidator } from '@form/validation';

import Layout from '../Layout';
import FormTextField from '../components/form/FormTextField';
import Link from '../components/Link';
import { useRegisterMutation } from '../graphql';

const useStyles = makeStyles((theme) => ({
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
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const graphqlFetch = async (property: string, value: string) => {
  return fetch('http://djozokups.ddns.net:44445/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {userExists(type: "${property}", value: "${value}")}`
    })
  });
};

UserValidator.init(async (property: string, value: string) => {
  return graphqlFetch(property, value)
    .then((val) => val.json())
    .then((val) => val.data.userExists);
});

const RegisterPage: React.FC<RouteComponentProps> = () => {
  const [register, { loading }] = useRegisterMutation();
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
            Register
          </Typography>
          <Formik
            initialValues={{
              username: '',
              password: '',
              firstName: '',
              lastName: '',
              email: '',
              confirmEmail: '',
              confirmPassword: ''
            }}
            onSubmit={(val) => {
              const { email, firstName, lastName, username, password } = val;
              console.log('Registering');
              register({ variables: { email, firstName, lastName, username, password } }).then(
                (v) => {
                  console.log(v && v.data && v.data.register);
                  navigate('/account/login');
                }
              );
            }}
            validate={(values) => {
              const errors: Record<string, string> = {};
              if (values.firstName === '')
                errors.firstName = t('validation:required', {
                  field: t(`common:firstName`)
                });
              if (values.lastName === '')
                errors.lastName = t('validation:required', {
                  field: t(`common:lastName`)
                });
              if (values.confirmEmail !== values.email)
                errors.confirmEmail = t('validation:mismatch', {
                  field: t(`common:email`, { count: 2 })
                });
              if (values.confirmPassword !== values.password)
                errors.confirmPassword = t('validation:mismatch', {
                  field: t(`common:password`, { count: 2 })
                });
              return errors;
            }}
            validationSchema={UserValidator.schema}
          >
            {() => (
              <Form>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <FormTextField name="firstName" label="First Name" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormTextField name="lastName" label="Last Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormTextField name="username" label="Username" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormTextField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormTextField name="confirmEmail" label="Confirm Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormTextField name="password" label="Password" type="password" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormTextField
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  disabled={loading}
                >
                  Register
                </Button>
                <Grid container justify="center">
                  <Grid item>
                    <MUILink variant="body2" color="secondary" to="/account/login" component={Link}>
                      Already have an account? Login
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

export default RegisterPage;
