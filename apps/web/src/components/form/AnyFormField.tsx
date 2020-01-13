import React from 'react';
import FormTextField from './FormTextField';
import FormSelectField from './FormSelectField';
import FormCheckboxField from './FormCheckboxField';
import FormRadioField from './FormRadioField';
import { createItem } from './Item';

interface AnyFormFieldProps {
  label: string;
  options?: string[] | null;
  name: string;
  type: string;
}

const AnyFormField: React.FC<AnyFormFieldProps> = ({ label, options, name, type }) => {
  switch (type) {
    case 'text':
      return <FormTextField label={label} name={name} />;
    case 'number':
      return <FormTextField label={label} name={name} type="number" />;
    case 'select':
      if (!options) throw new Error('Must give options when using the select component');
      return (
        <FormSelectField items={options.map((o) => createItem(o))} label={label} name={name} />
      );
    case 'radio':
      if (!options) throw new Error('Must give options when using the radio component');
      return <FormRadioField items={options.map((o) => createItem(o))} label={label} name={name} />;
    case 'checkbox':
      return <FormCheckboxField label={label} name={name} />;
    default:
      return <div />;
  }
};

export default AnyFormField;
