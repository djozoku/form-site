import React from 'react';
import { useField, FieldAttributes } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export interface Item {
  label: string;
  value: any;
  key: string;
}

export const createItem = (key: string, label?: string, value?: any): Item => {
  if (!label) return { key, label: key, value: key };
  if (!value) return { key, label, value: label };
  return { key, label, value };
};

type FormSelectFieldProps = {
  label: string;
  items: Item[];
  additionalChangeHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & FieldAttributes<string>;

const FormSelectField: React.FC<FormSelectFieldProps> = ({
  label,
  type,
  disabled,
  additionalChangeHandler,
  autoFocus,
  items,
  ...props
}) => {
  const [field, meta] = useField<string>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const changeHandler = additionalChangeHandler
    ? (e: React.ChangeEvent<any>) => {
        additionalChangeHandler(e);
        field.onChange(e);
      }
    : field.onChange;
  const labelId = `${label.toLowerCase()}-label`;
  return (
    <FormControl fullWidth color="secondary" disabled={disabled} error={!!errorText}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        autoFocus={autoFocus}
        defaultValue=""
        labelId={labelId}
        name={field.name}
        value={field.value}
        variant="outlined"
        onChange={changeHandler}
      >
        {items.map((item) => (
          <MenuItem key={item.key} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

export default FormSelectField;
