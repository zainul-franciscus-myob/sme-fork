import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const EmployeeCombobox = ({
  employees,
  onChange,
  name,
  label,
  width,
  selectedId,
}) => {
  const selectedEmployee = employees.filter(employee => employee.id === selectedId)[0];

  const metaData = [
    {
      columnName: 'name',
      showData: true,
      columnWidth: '200px',
    },
    {
      columnName: 'employeeDisplayId',
      columnWidth: '100px',
    },
    {
      columnName: 'phoneNumber',
      columnWidth: '100px',
    },
  ];

  return (
    <Combobox
      items={employees}
      name={name}
      label={label}
      width={width}
      selected={selectedEmployee}
      onChange={onChange}
      metaData={metaData}
    />
  );
};

export default EmployeeCombobox;
