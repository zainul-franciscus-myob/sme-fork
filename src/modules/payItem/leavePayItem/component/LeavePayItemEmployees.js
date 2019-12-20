import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilteredEmployees } from '../leavePayItemSelectors';
import EmployeeCombobox from './EmployeeCombobox';
import LeavePayItemEmployeesTable from './LeavePayItemEmployeesTable';
import styles from './LeavePayItemView.module.css';

const handleEmployeeComboboxChange = handler => (item) => {
  handler(item);
};

const LeavePayItemEmployees = ({
  employees,
  onAddEmployee,
  onRemoveEmployee,
}) => {
  const fieldGroupLabel = (
    <div>
      <span>Allocate employees&nbsp;</span>
      <Tooltip triggerContent={<Icons.Info />} placement="right">
        Add all the employees you want to allocate to this pay item
      </Tooltip>
    </div>
  );

  return (
    <FieldGroup label={fieldGroupLabel} className={styles.editableTable}>
      <LeavePayItemEmployeesTable onRemoveEmployee={onRemoveEmployee} />
      <EmployeeCombobox
        label="Employees"
        hideLabel
        hintText="Add employees to pay item"
        items={employees}
        onChange={handleEmployeeComboboxChange(onAddEmployee)}
        width="lg"
      />
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  employees: getFilteredEmployees(state),
});

export default connect(mapStateToProps)(LeavePayItemEmployees);
