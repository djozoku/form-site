/* eslint-disable react/no-array-index-key */
import React from 'react';
import clonedeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import { RouteComponentProps, navigate } from '@reach/router';
import { Formik, Form, FieldArray } from 'formik';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AddIcon from '@material-ui/icons/Add';

import {
  FormData,
  FormFieldDataType,
  FormFieldDatabaseType,
  ValueConditionTypes
} from '@form/interfaces/types/FormData';

import FormField from '../../components/pageComponents/form/FormField';
import DataDisplay, {
  defaultDisplay,
  countDisplay,
  defaultCondition,
  booleanCondition
} from '../../components/pageComponents/form/DataDisplay';
import FormTextField from '../../components/form/FormTextField';
import { useCreateFormMutation, useGroupQuery } from '../../graphql';

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
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    stepperActive: {
      color: '#1976d2 !important'
    },
    stepperText: {
      fill: '#fff'
    }
  })
);

const steps = ['Form Name', 'Fields', 'Data Display'];

interface CreateFormValues {
  formName: string;
  formData: FormData;
}

const CreateFormPage: React.FC<RouteComponentProps<{ id: string }>> = ({ id }) => {
  const { data } = useGroupQuery({ variables: { groupId: parseInt(id!, 10) } });
  const [activeStep, setActiveStep] = React.useState(1);
  const [createForm, { loading }] = useCreateFormMutation();
  const classes = useStyles();

  const handleFormNameChange = (
    setFieldValue: (field: 'formName' | 'formData', value: any) => void
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('formName', e.currentTarget.value.replace(/\s/g, '_'));
  };

  return (
    <Container component="main" maxWidth="xl" style={{ paddingBottom: 20 }}>
      <div className={classes.paper}>
        <Typography color="secondary" component="h1" variant="h5">
          Create Form
        </Typography>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    active: classes.stepperActive,
                    text: classes.stepperText,
                    completed: classes.stepperActive
                  }
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Formik<CreateFormValues>
          initialValues={{
            formName: '',
            formData: { displayName: '', fields: [], dataDisplay: [] }
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (values.formName === '') errors.formName = 'Form name is required';
            return errors;
          }}
          onSubmit={async ({ formData: fd, formName }) => {
            console.log('Creating form...');
            const formData = JSON.stringify(fd);
            const result = await createForm({
              variables: { formData, formName, groupName: data!.group!.name }
            });
            navigate(`/dashboard/group/${id}/form/${result.data!.createForm}`);
          }}
        >
          {({ values, setFieldValue }) => (
            <>
              <Form key="create-form">
                <Grid container alignContent="center" alignItems="center" spacing={1}>
                  <Grid item sm={12}>
                    <FormTextField
                      autoFocus
                      additionalChangeHandler={handleFormNameChange(setFieldValue)}
                      label="Form name"
                      name="formData.displayName"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <FormTextField disabled label="Internal Form name" name="formName" />
                  </Grid>
                  <FieldArray name="formData.fields">
                    {(arrayHelpers) => (
                      <>
                        {values.formData.fields.map((v, i) => (
                          <Grid key={i} item sm={12}>
                            <FormField
                              deleteField={() => {
                                arrayHelpers.remove(i);
                              }}
                              fieldNameChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                arrayHelpers.replace(i, {
                                  ...v,
                                  name: e.target.value.replace(/\s/g, '_')
                                });
                              }}
                              fieldOptions={v.options!}
                              fieldTypeChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const val = e.target.value;
                                let dataType: FormFieldDataType = v.dataType;
                                if (val === 'checkbox') dataType = 'boolean';
                                else if (val === 'number') dataType = 'number';
                                else dataType = 'string';
                                let databaseType: FormFieldDatabaseType = v.databaseType;
                                if (val === 'checkbox') databaseType = 'bool';
                                else if (val === 'number' && databaseType !== 'int')
                                  databaseType = 'real';
                                else if (val === 'number' && databaseType === 'int')
                                  databaseType = 'int';
                                else databaseType = 'text';
                                arrayHelpers.replace(i, { ...v, dataType, databaseType });
                              }}
                              index={i}
                              inputType={v.inputType || 'text'}
                            />
                          </Grid>
                        ))}
                        <Grid key="add-field-button" item sm={12}>
                          <Button
                            fullWidth
                            color="secondary"
                            endIcon={<AddIcon />}
                            variant="contained"
                            onClick={() => {
                              arrayHelpers.push({
                                name: '',
                                displayName: '',
                                databaseType: 'text',
                                dataType: 'string',
                                inputType: 'text',
                                options: []
                              });
                            }}
                          >
                            Add Field
                          </Button>
                        </Grid>
                      </>
                    )}
                  </FieldArray>
                </Grid>
                <Grid container alignContent="center" alignItems="center" spacing={1}>
                  <FieldArray name="formData.dataDisplay">
                    {(arrayHelpers) => {
                      const switchDisplay = (index: number) => (path: string) => (
                        e: React.ChangeEvent<HTMLSelectElement>
                      ) => {
                        const switchTo =
                          e.target.value === 'calculation' ? defaultDisplay() : countDisplay();
                        const copy = clonedeep(values);
                        set(copy, path, switchTo);
                        arrayHelpers.replace(index, {
                          ...values.formData.dataDisplay[index],
                          display: { ...copy.formData.dataDisplay[index].display }
                        });
                      };
                      const valueTypes: ValueConditionTypes[] = ['=', '<', '>', '<=', '>=', '!='];
                      const switchCondition = (index: number) => (path: string) => (
                        e: React.ChangeEvent<HTMLSelectElement>
                      ) => {
                        const switchTo =
                          valueTypes.indexOf(e.target.value as ValueConditionTypes) < 0
                            ? defaultCondition()
                            : booleanCondition();
                        const copy = clonedeep(values);
                        set(copy, path, switchTo);
                        arrayHelpers.replace(index, {
                          ...values.formData.dataDisplay[index],
                          display: { ...copy.formData.dataDisplay[index].display }
                        });
                      };
                      return (
                        <>
                          {values.formData.dataDisplay.map((v, i) => (
                            <Grid key={i} item sm={12}>
                              <DataDisplay
                                deleteDisplay={() => {
                                  arrayHelpers.remove(i);
                                }}
                                displayNameChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  arrayHelpers.replace(i, { ...v, name: e.target.value });
                                }}
                                formData={values.formData}
                                index={i}
                                switchCondition={switchCondition(i)}
                                switchDisplay={switchDisplay(i)}
                              />
                            </Grid>
                          ))}
                          <Grid key="add-data-display-button" item sm={12}>
                            <Button
                              fullWidth
                              color="secondary"
                              endIcon={<AddIcon />}
                              variant="contained"
                              onClick={() => {
                                arrayHelpers.push({
                                  name: '',
                                  displayName: '',
                                  display: defaultDisplay()
                                });
                              }}
                            >
                              Add Data Display
                            </Button>
                          </Grid>
                        </>
                      );
                    }}
                  </FieldArray>
                </Grid>
                <Button
                  fullWidth
                  className={classes.submit}
                  color="secondary"
                  disabled={loading}
                  type="submit"
                  variant="contained"
                >
                  Create
                </Button>
              </Form>
              <pre key="data-create-form">{JSON.stringify(values, null, 2)}</pre>
            </>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default CreateFormPage;
