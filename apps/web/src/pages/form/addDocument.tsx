import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { useAddFormDocumentMutation, useGetFormFieldInputDataQuery } from '../../graphql';
import AnyFormField from '../../components/form/AnyFormField';

const useStyles = makeStyles((theme) =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 20
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  })
);

const AddDocumentPage: React.FC<RouteComponentProps<{ gid: string; fid: string }>> = ({
  gid,
  fid
}) => {
  const classes = useStyles();
  const variables = { gid: parseInt(gid!, 10), fid: parseInt(fid!, 10) };
  const formInputDataQuery = useGetFormFieldInputDataQuery({ variables });
  const [addDocument, addDocumentMutation] = useAddFormDocumentMutation();
  if (formInputDataQuery.loading) return <div>Loading...</div>;
  const formInputData =
    formInputDataQuery &&
    formInputDataQuery.data &&
    formInputDataQuery.data.getFormFieldInputData &&
    formInputDataQuery.data.getFormFieldInputData.map((d) => ({
      name: d.name,
      displayName: d.displayName,
      inputType: d.inputType,
      options: d.options
    }));
  const initialValues =
    formInputData &&
    Object.fromEntries(
      formInputData.map((d) =>
        // eslint-disable-next-line no-nested-ternary
        [d.name, d.inputType === 'number' ? 0 : d.inputType === 'checkbox' ? false : '']
      )
    );
  return (
    <Container component="main" maxWidth="xl" style={{ paddingBottom: 20 }}>
      <div className={classes.paper}>
        <Typography color="secondary" component="h1" variant="h5">
          Add Document
        </Typography>
        <Formik<any>
          initialValues={initialValues}
          validate={(values) => {
            return Object.fromEntries(
              Object.entries(values)
                .map(([k, v]) => {
                  if (v === '' || v === 0) return [k, `${k} is required`];
                  return null;
                })
                .filter((v) => v !== null) as [string, string][]
            );
          }}
          onSubmit={async (values, { resetForm }) => {
            console.log('Adding document...');
            const document = JSON.stringify(values);
            const result = await addDocument({
              variables: { ...variables, document }
            });
            if (!result.errors) resetForm();
          }}
        >
          {({ values }) => (
            <>
              <Form key="add-document">
                <Grid container alignContent="center" alignItems="center" spacing={1}>
                  {formInputData &&
                    formInputData.map((d) => (
                      <Grid key={d.name} item sm={12}>
                        <AnyFormField
                          label={d.displayName}
                          name={d.name}
                          options={d.options}
                          type={d.inputType}
                        />
                      </Grid>
                    ))}
                </Grid>
                <Button
                  fullWidth
                  className={classes.submit}
                  color="secondary"
                  disabled={addDocumentMutation.loading}
                  type="submit"
                  variant="contained"
                >
                  Add Document
                </Button>
              </Form>
              <pre key="data-add-document">{JSON.stringify(values, null, 2)}</pre>
            </>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default AddDocumentPage;
