import {
  Button, Combobox, FieldGroup, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmployeeAllocations } from '../wagePayItemSelector';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './WagePayItemView.module.css';

const filteredListEmployeesMetadata = [{ columnName: 'name', showData: true }];

const title = (
  <React.Fragment>
    Employees using this pay item
  </React.Fragment>
);

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  actions: { width: '5rem', valign: 'middle', align: 'right' },
};

const EmployeeAllocationView = ({
  selectedEmployees, filteredListOfEmployees, onEmployeeSelected, onRemoveEmployee,
}) => (
  <FieldGroup className={styles.editableTable} label={title}>
    <Table hasActions>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.actions} />
      </Table.Header>
      <Table.Body>
        {selectedEmployees.map(({ name, id }) => (
          <Table.Row key={id}>
            <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
            <Table.RowItem {...tableConfig.actions} cellRole="actions">
              <Tooltip
                placement="left"
                triggerContent={(
                <Button type="secondary" size="xs" onClick={() => onRemoveEmployee(id)}>
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
      hintText="Add employee to pay item"
      onChange={handleComboboxChange('employeeAllocation', onEmployeeSelected)}
      width="lg"
    />
  </FieldGroup>);


const mapToStateProps = getEmployeeAllocations;

export default connect(mapToStateProps)(EmployeeAllocationView);
