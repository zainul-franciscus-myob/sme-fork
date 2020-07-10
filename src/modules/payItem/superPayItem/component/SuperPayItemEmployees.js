import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilteredEmployees } from '../superPayItemSelectors';
import EmployeeCombobox from './EmployeeCombobox';
import SuperPayItemEmployeesTable from './SuperPayItemEmployeesTable';
import styles from './SuperPayItemView.module.css';

const handleEmployeeComboboxChange = (handler) => (item) => {
  handler(item);
};

const SuperPayItemEmployees = (props) => {
  const {
    employees = [],
    onAddSuperPayItemEmployee,
    onRemoveSuperPayItemEmployee,
  } = props;

  const fieldGroupLabel = <div>Employees using this pay item</div>;

  return (
    <FieldGroup label={fieldGroupLabel} className={styles.editableTable}>
      <SuperPayItemEmployeesTable
        onRemoveSuperPayItemEmployee={onRemoveSuperPayItemEmployee}
      />
      <EmployeeCombobox
        label="Employees"
        hideLabel
        hintText="Add employee to pay item"
        items={employees}
        onChange={handleEmployeeComboboxChange(onAddSuperPayItemEmployee)}
        width="lg"
      />
    </FieldGroup>
  );
};

const mapStateToProps = (state) => ({
  employees: getFilteredEmployees(state),
});

export default connect(mapStateToProps)(SuperPayItemEmployees);
