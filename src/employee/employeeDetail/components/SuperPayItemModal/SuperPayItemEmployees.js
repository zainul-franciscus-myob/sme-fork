import {
  Button, FieldGroup, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmployees, getFilteredEmployeeOptions } from '../../selectors/SuperPayItemModalSelectors';
import Combobox from '../../../../components/Feelix/ComboBox/Combobox';
import styles from './SuperPayItemEmployees.module.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  actions: { width: '5rem', valign: 'middle', align: 'right' },
};

const metaData = [
  { columnName: 'name', showData: true },
];

const label = (
  <div>
    <span>Allocate employees&nbsp;</span>
    <Tooltip triggerContent={<Icons.Info />} placement="right">
      Add all the employees you want to allocate to this pay item
    </Tooltip>
  </div>
);

const onButtonClick = (handler, key, itemId) => () => {
  handler({ key, itemId });
};

const handleComboboxChange = (handler, key) => (item) => {
  handler({ key, item });
};

const SuperPayItemEmployees = (props) => {
  const {
    employees = [],
    employeeOptions = [],
    onAddItem,
    onRemoveItem,
  } = props;

  return (
    <FieldGroup label={label} className={styles.editableTable}>
      <Table hasActions>
        <Table.Header>
          <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.actions} />
        </Table.Header>
        <Table.Body>
          {employees.map(({ id, name }) => (
            <Table.Row key={id}>
              <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
              <Table.RowItem cellRole="actions" {...tableConfig.actions}>
                <Tooltip triggerContent={(
                  <Button type="secondary" size="xs" onClick={onButtonClick(onRemoveItem, 'employees', id)}>
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
      <div className={styles.addCombobox}>
        <Combobox
          label="Employees"
          hideLabel
          hintText="Add employees to pay item"
          metaData={metaData}
          items={employeeOptions}
          selected={{}}
          onChange={handleComboboxChange(onAddItem, 'employees')}
        />
      </div>
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  employees: getEmployees(state),
  employeeOptions: getFilteredEmployeeOptions(state),
});

export default connect(mapStateToProps)(SuperPayItemEmployees);
