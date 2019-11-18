import React from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'antd';

import { Link, RouteComponentProps } from '@reach/router';
import Layout from '../components/Layout';
import FormItem from '../components/form/FormItem';
import FormInput from '../components/form/Input';

const LoginPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout>
      <div style={{ padding: '0 42rem', marginTop: 300 }}>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(val, { setSubmitting }) => {
            setSubmitting(true);
            console.log(val);
            setSubmitting(false);
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (values.username === '') errors.username = 'Username is required';
            if (values.password === '') errors.password = 'Password is required';
            return errors;
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormInput name="username" icon="user" placeholder="Username" />
              <FormInput name="password" icon="lock" placeholder="Password" />
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginRight: '0.4rem' }}
                  disabled={isSubmitting}
                >
                  Log in
                </Button>
                Or <Link to="/account/register">register</Link>
              </FormItem>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default LoginPage;
