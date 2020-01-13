import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useField, FieldHookConfig } from 'formik';

type FormTextFieldProps = {
  label: string;
  additionalChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & FieldHookConfig<string>;

const FormTextField: React.FC<FormTextFieldProps> = ({
  label,
  type,
  disabled,
  additionalChangeHandler,
  autoFocus,
  ...props
}) => {
  const [field, meta] = useField<string>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (additionalChangeHandler) additionalChangeHandler(e);
    field.onChange(e);
  };
  return (
    <TextField
      fullWidth
      autoFocus={autoFocus}
      color="secondary"
      disabled={disabled}
      error={!!errorText}
      helperText={errorText}
      label={label}
      margin="normal"
      name={field.name}
      type={type}
      value={field.value}
      variant="outlined"
      onBlur={field.onBlur}
      onChange={handleChange}
    />
  );
};

export default FormTextField;
