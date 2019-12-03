/* eslint-disable react/no-array-index-key */
import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { FieldArray } from 'formik';

import {
  FormData,
  FormDisplays,
  FormField,
  ValueConditionTypes,
  CalculationDisplay,
  CountDisplay,
  BooleanConditionTypes,
  ValueCondition,
  BooleanCondition
} from '@form/interfaces/types/FormData';

import FormTextField from '../../form/FormTextField';
import FormSelectField from '../../form/FormSelectField';
import { Item, createItem } from '../../form/Item';

interface ConditionProps {
  type: ValueConditionTypes | BooleanConditionTypes;
  location: string;
  fields: Item[];
  fieldData?: string[] | false;
  switchCondition: (path: string) => (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const conditionTypeItems = [createItem('='), createItem('|'), createItem('&')];

const Condition: React.FC<ConditionProps> = ({
  location,
  type,
  fields,
  fieldData,
  switchCondition
}) => {
  const fieldDataItems =
    fieldData && fieldData.map((f, i): Item => ({ key: i.toString(), label: f, value: f }));
  return (
    <>
      <FormSelectField
        key={`${location}.type`}
        additionalChangeHandler={switchCondition(location)}
        items={conditionTypeItems}
        label="Condition Type"
        name={`${location}.type`}
      />
      {type === '=' && (
        <>
          <FormSelectField
            key={`${location}.fieldName`}
            items={fields!}
            label="Field Name"
            name={`${location}.fieldName`}
          />
          {fieldDataItems ? (
            <FormSelectField
              key={`${location}.data`}
              items={fieldDataItems}
              label="Data"
              name={`${location}.data`}
            />
          ) : (
            <FormTextField key={`${location}.data`} label="Data" name={`${location}.data`} />
          )}
        </>
      )}
    </>
  );
};

export const defaultCondition = (): ValueCondition => ({
  type: '=',
  fieldName: '',
  data: ''
});

export const booleanCondition = (): BooleanCondition => ({
  type: '&'
});

interface DisplayProps {
  location: string;
  formDisplay: FormDisplays;
  fields: FormField[];
  switchDisplay: (path: string) => (e: React.ChangeEvent<HTMLSelectElement>) => void;
  switchCondition: (path: string) => (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const displayTypeItems = [createItem('calculation'), createItem('count')];
const operationItems = [
  createItem('+'),
  createItem('-'),
  createItem('*'),
  createItem('/'),
  createItem('%')
];

const Display: React.FC<DisplayProps> = ({
  location,
  formDisplay,
  fields,
  switchCondition,
  switchDisplay
}) => {
  return (
    <>
      <FormSelectField
        key={`${location}.type`}
        additionalChangeHandler={switchDisplay(location)}
        items={displayTypeItems}
        label="Display Type"
        name={`${location}.type`}
      />
      {formDisplay.type === 'calculation' && (
        <>
          <FormSelectField
            key={`${location}.operation`}
            items={operationItems}
            label="Calculation Operator"
            name={`${location}.operation`}
          />
          <Display
            fields={fields}
            formDisplay={formDisplay.left}
            location={`${location}.left`}
            switchCondition={switchCondition}
            switchDisplay={switchDisplay}
          />
          <Display
            fields={fields}
            formDisplay={formDisplay.right}
            location={`${location}.right`}
            switchCondition={switchCondition}
            switchDisplay={switchDisplay}
          />
        </>
      )}
      {formDisplay.type === 'count' && (
        <>
          <FieldArray name={`${location}.conditions`}>
            {(arrayHelpers) => {
              const fieldItems = fields.map(
                (v, i): Item => ({ key: i.toString(), label: v.displayName, value: v.name })
              );
              return (
                <>
                  {formDisplay.conditions.map((v, i) => {
                    let fieldData: string[] | undefined | false;
                    if ('fieldName' in v && v.fieldName !== '') {
                      const field = fields.filter((f) => f.name === v.fieldName)[0];
                      fieldData =
                        (field.inputType === 'select' || field.inputType === 'radio') &&
                        field.options;
                    }
                    return (
                      <div key={`${location}.conditions[${i}]`}>
                        <Condition
                          fieldData={fieldData}
                          fields={fieldItems}
                          location={`${location}.conditions[${i}]`}
                          switchCondition={switchCondition}
                          type={v.type}
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
                          Delete Condition
                        </Button>
                      </div>
                    );
                  })}
                  <Button
                    fullWidth
                    color="secondary"
                    endIcon={<AddIcon />}
                    variant="contained"
                    onClick={() => {
                      const condition =
                        formDisplay.conditions.length % 2 === 0
                          ? defaultCondition()
                          : booleanCondition();
                      arrayHelpers.push(condition);
                    }}
                  >
                    Add Condition
                  </Button>
                </>
              );
            }}
          </FieldArray>
        </>
      )}
    </>
  );
};

export const defaultDisplay = (): CalculationDisplay<FormDisplays, FormDisplays> => ({
  type: 'calculation',
  operation: '+',
  left: {
    type: 'count',
    conditions: []
  },
  right: {
    type: 'count',
    conditions: []
  }
});

export const countDisplay = (): CountDisplay => ({
  type: 'count',
  conditions: []
});

interface DataDisplayProps {
  index: number;
  formData: FormData;
  deleteDisplay: () => void;
  displayNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  switchDisplay: (path: string) => (e: React.ChangeEvent<HTMLSelectElement>) => void;
  switchCondition: (path: string) => (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  index,
  formData,
  deleteDisplay,
  displayNameChange,
  switchCondition,
  switchDisplay
}) => {
  const location = `formData.dataDisplay[${index}]`;
  return (
    <div key={location}>
      <FormTextField
        key={`${location}.displayName`}
        additionalChangeHandler={displayNameChange}
        label="Data Name"
        name={`${location}.displayName`}
      />
      <Display
        key={`${location}.display`}
        fields={formData.fields}
        formDisplay={formData.dataDisplay[index].display}
        location={`${location}.display`}
        switchCondition={switchCondition}
        switchDisplay={switchDisplay}
      />
      <Button
        key={Math.random()}
        fullWidth
        color="secondary"
        endIcon={<DeleteIcon />}
        variant="contained"
        onClick={deleteDisplay}
      >
        Delete Display
      </Button>
    </div>
  );
};

export default DataDisplay;
