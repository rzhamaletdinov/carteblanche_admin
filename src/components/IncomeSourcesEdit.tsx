import React from 'react';
import { Box, CheckBox, Label } from '@adminjs/design-system';

const fieldName = 'incomeSources';

const IncomeSourcesEdit = ({ record, onChange }) => {
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

  const toggle = (v: string) => {
    const updated = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];

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
