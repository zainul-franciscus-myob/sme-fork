import {
  Button, Combobox, FieldGroup, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmployeeAllocations } from '../../selectors/DeductionPayItemModalSelectors';
import styles from './DeductionPayItemEmployees.module.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  actions: { width: '5rem', valign: 'middle', align: 'right' },
};

const metaData = [{ columnName: 'name', showData: true }];

const title = (
  <React.Fragment>
    Allocated employees&nbsp;
    <Tooltip triggerContent={(<Icons.Info />)}>
      Add all the employees you want to allocate to this pay item.
    </Tooltip>
  </React.Fragment>
);

const onButtonClick = (handler, key, itemId) => () => {
  handler({ key, itemId });
};

const handleComboboxChange = (handler, key) => (item) => {
  handler({ key, item });
};

const DeductionPayItemEmployees = ({
  employees,
  employeeOptions,
  onAddItem,
  onRemoveItem,
}) => (
  <FieldGroup label={title}>
    <div className={styles.editableTable}>
      <Table hasActions>
        <Table.Header>
          <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.actions} />
        </Table.Header>
        <Table.Body>
          {employees.map(({ name, id }) => (
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
    </div>
    <div className={styles.addCombobox}>
      <Combobox
        label="Add employees to pay item"
        hideLabel
        items={employeeOptions}
        metaData={metaData}
        selected={{}}
        hintText="Add employees to pay item"
        onChange={handleComboboxChange(onAddItem, 'employees')}
      />
    </div>
  </FieldGroup>);


const mapToStateProps = getEmployeeAllocations;

export default connect(mapToStateProps)(DeductionPayItemEmployees);
