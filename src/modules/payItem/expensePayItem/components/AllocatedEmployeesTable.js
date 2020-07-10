import { Button, Icons, Table, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAllocatedEmployees } from '../ExpensePayItemSelectors';

const tableConfig = {
  name: {
    width: 'flex-1',
    valign: 'middle',
  },
  actions: {
    width: '5rem',
    valign: 'middle',
    align: 'right',
  },
};

const onButtonClick = (handler, id) => () => {
  handler(id);
};

const AllocatedEmployeesTable = ({
  allocatedEmployees,
  onRemoveAllocatedEmployee,
}) => {
  const rows = allocatedEmployees.map(({ id, name }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
      <Table.RowItem {...tableConfig.actions} cellRole="actions">
        <Tooltip
          placement="left"
          triggerContent={
            <Button
              type="secondary"
              size="xs"
              onClick={onButtonClick(onRemoveAllocatedEmployee, id)}
            >
              <Icons.Remove />
            </Button>
          }
        >
          Remove employee
        </Tooltip>
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table hasActions>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.actions} />
      </Table.Header>
      <Table.Body>{rows}</Table.Body>
    </Table>
  );
};

const mapStateToProps = (state) => ({
  allocatedEmployees: getAllocatedEmployees(state),
});

export default connect(mapStateToProps)(AllocatedEmployeesTable);
