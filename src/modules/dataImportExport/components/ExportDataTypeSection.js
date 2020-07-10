import { Select } from '@myob/myob-widgets';
import React from 'react';

import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ExportDataTypeSection = ({
  type,
  dataTypes,
  selectedDataType,
  onChange,
}) => (
  <Select
    key={type}
    name={type}
    label="Data type"
    value={selectedDataType}
    requiredLabel="This is required"
    onChange={handleSelectChange(onChange)}
  >
    <Select.Option hidden value="" label="" key="blank" />
    {dataTypes.map((dataType) => (
      <Select.Option
        key={dataType.value}
        value={dataType.value}
        label={dataType.name}
      />
    ))}
  </Select>
);

export default ExportDataTypeSection;
