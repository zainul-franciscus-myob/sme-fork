import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilteredEmployees } from '../superPayItemSelectors';
import EmployeeCombobox from './EmployeeCombobox';
import SuperPayItemEmployeesTable from './SuperPayItemEmployeesTable';
import styles from './SuperPayItemView.css';

const handleEmployeeComboboxChange = handler => (item) => {
  handler(item);
};

const SuperPayItemEmployees = (props) => {
  const {
    employees = [],
    onAddSuperPayItemEmployee,
    onRemoveSuperPayItemEmployee,
  } = props;

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
      <SuperPayItemEmployeesTable onRemoveSuperPayItemEmployee={onRemoveSuperPayItemEmployee} />
      <EmployeeCombobox
        label="Employees"
        hideLabel={false}
        hintText="Add employees to pay item"
        items={employees}
        onChange={handleEmployeeComboboxChange(onAddSuperPayItemEmployee)}
      />
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  employees: getFilteredEmployees(state),
});

export default connect(mapStateToProps)(SuperPayItemEmployees);
