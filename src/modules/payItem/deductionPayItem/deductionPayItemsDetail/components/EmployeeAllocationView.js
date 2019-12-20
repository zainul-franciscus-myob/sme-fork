import {
  Button, Combobox, FieldGroup, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmployeeAllocations } from '../DeductionPayItemSelectors';
import handleComboboxChange from '../../../../../components/handlers/handleComboboxChange';
import styles from './DeductionPayItemView.module.css';

const filteredListEmployeesMetadata = [{ columnName: 'name', showData: true }];

const title = (
  <React.Fragment>
    Allocated employees&nbsp;
    <Tooltip triggerContent={(<Icons.Info />)}>
      Add all the employees you want to allocate to this pay item.
    </Tooltip>
  </React.Fragment>
);

const EmployeeAllocationView = ({
  selectedEmployees, filteredListOfEmployees, onEmployeeSelected, onRemoveEmployee,
}) => (
  <FieldGroup label={title} className={styles.editableTable}>
    <Table>
      <Table.Header>
        <Table.HeaderItem key="name">Name</Table.HeaderItem>
        <Table.HeaderItem key="7rem" />
      </Table.Header>
      <Table.Body>
        {selectedEmployees.map(({ name, id }) => (
          <Table.Row key={id}>
            <Table.RowItem>{name}</Table.RowItem>
            <Table.RowItem align="right" width="auto">
              <Tooltip triggerContent={(
                <Button className={styles.removeRow} type="secondary" size="xs" onClick={() => onRemoveEmployee(id)}>
                  <Icons.Remove />
                </Button>
              )}
              >
              Remove employee
              </Tooltip>
            </Table.RowItem>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <Combobox
      label="Employees"
      hideLabel
      items={filteredListOfEmployees}
      metaData={filteredListEmployeesMetadata}
      selected={{}}
      hintText="Add employees to pay item"
      onChange={handleComboboxChange('employeeAllocation', onEmployeeSelected)}
      width="lg"
    />
  </FieldGroup>);


const mapToStateProps = getEmployeeAllocations;

export default connect(mapToStateProps)(EmployeeAllocationView);
