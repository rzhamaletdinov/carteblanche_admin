import React from 'react';
import { Box, Badge } from '@adminjs/design-system';

const EnumArrayShow = ({ record, property }) => {
  const value = record.params[property.name] || [];

  if (!value.length) {
    return <Box color="grey60">—</Box>;
  }

  return (
    <Box>
      {value.map((v) => (
        <Badge key={v} mr="sm">
          {v}
        </Badge>
      ))}
    </Box>
  );
};

export default EnumArrayShow;
