import React from 'react';
import { Box, CheckBox, Label, Badge } from '@adminjs/design-system';

type Props = {
  value: string[];
  enumValues: string[];
  onChange?: (value: string[]) => void;
  mode: 'edit' | 'show';
};

export const EnumArrayField: React.FC<Props> = ({ value, enumValues, onChange, mode }) => {
  if (mode === 'show') {
    return (
      <Box>
        {value.length ? (
          value.map((v) => (
            <Badge key={v} mr="sm">
              {v}
            </Badge>
          ))
        ) : (
          <Box color="grey60">—</Box>
        )}
      </Box>
    );
  }

  const toggle = (enumValue: string) => {
    if (!onChange) return;

    const updated = value.includes(enumValue)
      ? value.filter((v) => v !== enumValue)
      : [...value, enumValue];

    onChange(updated);
  };

  return (
    <Box>
      {enumValues.map((enumValue) => (
        <Box key={enumValue} mb="sm">
          <CheckBox checked={value.includes(enumValue)} onChange={() => toggle(enumValue)} />
          <Label inline ml="sm">
            {enumValue}
          </Label>
        </Box>
      ))}
    </Box>
  );
};
