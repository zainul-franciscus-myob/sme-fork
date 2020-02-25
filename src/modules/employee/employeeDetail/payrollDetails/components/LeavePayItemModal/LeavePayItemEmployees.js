import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilteredEmployees } from '../../selectors/LeavePayItemModalSelectors';
import EmployeeCombobox from './EmployeeCombobox';
import LeavePayItemEmployeesTable from './LeavePayItemEmployeesTable';
import styles from './LeavePayItemEmployees.module.css';

const LeavePayItemEmployees = ({
  employees,
  onAddEmployee,
  onRemoveEmployee,
}) => {
  const fieldGroupLabel = (
    <div>
      Employees using this pay item
    </div>
  );

  return (
    <FieldGroup label={fieldGroupLabel} className={styles.editableTable}>
      <LeavePayItemEmployeesTable onRemoveEmployee={onRemoveEmployee} />
      <EmployeeCombobox
        label="Employees"
        hideLabel
        hintText="Add employee to pay item"
        items={employees}
        onChange={onAddEmployee}
        width="lg"
      />
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  employees: getFilteredEmployees(state),
});

export default connect(mapStateToProps)(LeavePayItemEmployees);
