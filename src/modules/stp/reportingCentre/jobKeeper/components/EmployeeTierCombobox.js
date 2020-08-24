import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const EmployeeTierCombobox = ({
  employeeTierOptions,
  onChange,
  name,
  label,
  width,
  selectedFn,
  allowClear,
  ...props
}) => {
  const selected =
    employeeTierOptions.find((option) => option.id === selectedFn) || null;

  const metaData = [
    {
      columnName: 'description',
      showData: true,
      columnWidth: '150px',
    },
  ];

  return (
    <Combobox
      items={employeeTierOptions}
      name={name}
      label={label}
      width={width}
      selected={selected}
      onChange={onChange}
      metaData={metaData}
      allowClear={allowClear}
      {...props}
    />
  );
};

export default EmployeeTierCombobox;
