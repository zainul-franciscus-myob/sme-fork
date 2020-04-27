import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const JobKeeperFortnightCombobox = ({
  fortnightOptions,
  onChange,
  name,
  label,
  width,
  selectedFn,
  allowClear,
  ...props
}) => {
  const selected = fortnightOptions.find(
    option => option.id === selectedFn,
  ) || null;

  const metaData = [
    {
      columnName: 'dates',
      showData: true,
      columnWidth: '150px',
    },
    {
      columnName: 'allowanceDescription',
      showData: true,
      columnWidth: '200px',
    },
  ];

  return (
    <Combobox
      items={fortnightOptions}
      name={name}
      label={label}
      width={width}
      selected={selected}
      onChange={onChange}
      metaData={metaData}
      allowClear={allowClear}
      {...props}
    />);
};

export default JobKeeperFortnightCombobox;
