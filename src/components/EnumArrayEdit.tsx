import React from 'react';
import { EnumArrayField } from './EnumArrayField.js';

const EnumArrayEdit = ({ record, onChange, property }) => {
  return (
    <EnumArrayField
      mode="edit"
      value={record.params[property.name] || []}
      enumValues={property.custom?.enumValues || []}
      onChange={(value) => onChange(property.name, value)}
    />
  );
};

export default EnumArrayEdit;
