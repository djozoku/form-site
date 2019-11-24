import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useField, FieldAttributes } from 'formik';

type FormTextFieldProps = {
  label: string;
} & FieldAttributes<string>;

const FormTextField: React.FC<FormTextFieldProps> = ({ label, type, ...props }) => {
  const [field, meta] = useField<string>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...field}
      variant="outlined"
      label={label}
      margin="normal"
      helperText={errorText}
      error={!!errorText}
      fullWidth
      type={type}
      color="secondary"
    />
  );
};

export default FormTextField;
