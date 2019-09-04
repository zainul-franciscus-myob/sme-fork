import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getUnallocatedEmployeeOptions } from '../../selectors/ExpensePayItemModalSelectors';
import AllocatedEmployeesTable from './AllocatedEmployeesTable';
import EmployeeCombobox from './EmployeeCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './AllocatedEmployeesSection.module.css';

const AllocatedEmployeesSection = ({
  employeeOptions,
  onAddAllocatedEmployee,
  onRemoveAllocatedEmployee,
}) => (
  <FieldGroup
    label={(
      <React.Fragment>
        <span>Allocate employees</span>
        <Tooltip triggerContent={<Icons.Info />} placement="right">
          Add all the employees you want to allocate to this pay item
        </Tooltip>
      </React.Fragment>
    )}
    className={styles.editableTable}
  >
    <AllocatedEmployeesTable onRemoveAllocatedEmployee={onRemoveAllocatedEmployee} />
    <div className={styles.addCombobox}>
      <EmployeeCombobox
        label="Employees"
        hideLabel
        hintText="Add employees to pay item"
        items={employeeOptions}
        onChange={handleComboboxChange(undefined, onAddAllocatedEmployee)}
      />
    </div>
  </FieldGroup>
);

const mapStateToProps = state => ({
  employeeOptions: getUnallocatedEmployeeOptions(state),
});

export default connect(mapStateToProps)(AllocatedEmployeesSection);
