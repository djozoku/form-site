/* eslint-disable react/no-array-index-key */
import React from 'react';
import { FieldArray } from 'formik';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { FormFieldInputType } from '@form/interfaces/types/FormData';

import FormSelectField, { createItem } from '../../form/FormSelectField';
import FormTextField from '../../form/FormTextField';

interface FormFieldProps {
  index: number;
  inputType: FormFieldInputType;
  fieldOptions: string[];
  deleteField: () => void;
  fieldNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldTypeChange: (e: React.ChangeEvent<any>) => void;
}

const inputTypeItems = [
  createItem('checkbox'),
  createItem('radio'),
  createItem('select'),
  createItem('text'),
  createItem('number')
];

const databaseTypeItems = [
  createItem('text'),
  createItem('int'),
  createItem('real'),
  createItem('bool')
];

const dataTypeItems = [createItem('boolean'), createItem('number'), createItem('string')];

const FormField: React.FC<FormFieldProps> = ({
  index,
  inputType,
  fieldOptions,
  deleteField,
  fieldNameChange,
  fieldTypeChange
}) => {
  return (
    <>
      <FormTextField
        key={`formData.fields.${index}.displayName`}
        additionalChangeHandler={fieldNameChange}
        label="Field Name"
        name={`formData.fields.${index}.displayName`}
      />
      <FormSelectField
        key={`formData.fields.${index}.inputType`}
        items={inputTypeItems}
        label="Input Type"
        name={`formData.fields.${index}.inputType`}
        onChange={fieldTypeChange}
      />
      <FormSelectField
        key={`formData.fields.${index}.databaseType`}
        disabled={inputType !== 'number'}
        items={
          inputType === 'number'
            ? databaseTypeItems.filter((v) => v.value === 'int' || v.value === 'real')
            : databaseTypeItems
        }
        label="Database Type"
        name={`formData.fields.${index}.databaseType`}
      />
      <FormSelectField
        key={`formData.fields.${index}.dataType`}
        disabled
        items={dataTypeItems}
        label="Data Type"
        name={`formData.fields.${index}.dataType`}
      />
      <FieldArray name={`formData.fields.${index}.options`}>
        {(arrayHelpers) => (
          <>
            {fieldOptions.map((_v, i) => (
              <div key={`field-${index}-option-${i}`}>
                <FormTextField
                  label={`Option ${i + 1}`}
                  name={`formData.fields.${index}.options.${i}`}
                />
                <Button
                  fullWidth
                  color="secondary"
                  endIcon={<DeleteIcon />}
                  variant="contained"
                  onClick={() => {
                    arrayHelpers.remove(i);
                  }}
                >
                  Delete Field Option
                </Button>
              </div>
            ))}

            {(inputType === 'select' || inputType === 'radio') && (
              <Button
                key={`field-${index}-add-option`}
                fullWidth
                color="secondary"
                endIcon={<AddIcon />}
                variant="contained"
                onClick={() => {
                  arrayHelpers.push('');
                }}
              >
                Add Field Option
              </Button>
            )}
          </>
        )}
      </FieldArray>
      <Button
        key={Math.random()}
        fullWidth
        color="secondary"
        endIcon={<DeleteIcon />}
        variant="contained"
        onClick={deleteField}
      >
        Delete Field
      </Button>
    </>
  );
};

export default FormField;
