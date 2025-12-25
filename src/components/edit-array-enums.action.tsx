import React from 'react';
import { Box, CheckBox, Label } from '@adminjs/design-system';

const IncomeSourcesEdit = ({ record, onChange }) => {
  const fieldName = 'incomeSources';
  console.log(`fieldName`, fieldName);

  const value = record.params[fieldName] || [];

  const enumValues = [
    'BUSINESS_PROFITS',
    'SALARY_WAGE',
    'INVESTMENTS',
    'SELF_EMPLOYMENT',
    'ROYALTIES',
    'PENSION_RETIREMENT',
    'INHERITANCE',
    'FAMILY_SUPPORT',
  ];

  const toggle = (enumValue: string) => {
    const updated = value.includes(enumValue)
      ? value.filter((v) => v !== enumValue)
      : [...value, enumValue];

    onChange(fieldName, updated);
  };

  return (
    <Box>
      {enumValues.map((v) => (
        <Box key={v} mb="sm">
          <CheckBox checked={value.includes(v)} onChange={() => toggle(v)} />
          <Label inline ml="sm">
            {v}
          </Label>
        </Box>
      ))}
    </Box>
  );
};

export default IncomeSourcesEdit;
