import React from 'react';
import { useField, FieldAttributes } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

type FormCheckboxFieldProps = {
  label: string;
} & FieldAttributes<string>;

const FormCheckboxField: React.FC<FormCheckboxFieldProps> = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel control={<Checkbox {...field} />} label={label} />;
};

export default FormCheckboxField;
