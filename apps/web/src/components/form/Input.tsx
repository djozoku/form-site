import React from 'react';
import { Input, Icon } from 'antd';
import { useField, FieldAttributes } from 'formik';
import FormItem from './FormItem';

type InputProps = {
  icon?: string;
  placeholder?: string;
} & FieldAttributes<any>;

const FormInput: React.FC<InputProps> = ({ icon, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const error = !!meta.error && !!meta.touched;
  const errorText = error ? meta.error : '';
  return (
    <FormItem validateStatus={error ? 'error' : ''} help={errorText}>
      <Input
        {...field}
        prefix={icon ? <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} /> : null}
        placeholder={placeholder}
      />
    </FormItem>
  );
};

export default FormInput;
