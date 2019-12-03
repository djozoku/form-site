import React from 'react';
import { useField, FieldAttributes } from 'formik';
import FormControl from '@material-ui/core/FormControl';

import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Item } from './Item';

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
  const [{ value, ...field }] = useField<string>(props);
  return (
    <FormControl fullWidth color="secondary" component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label={label} value={value || ''} {...field}>
        {items.map((i) => (
          <FormControlLabel key={i.key} control={<Radio />} label={i.label} value={i.value} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default FormSelectField;
