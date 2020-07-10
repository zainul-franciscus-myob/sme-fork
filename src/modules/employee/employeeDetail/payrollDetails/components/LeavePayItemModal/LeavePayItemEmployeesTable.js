import { Button, Icons, Table, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLeavePayItemEmployees } from '../../selectors/LeavePayItemModalSelectors';

const onButtonClick = (handler, id) => () => {
  handler(id);
};

const LeavePayItemEmployeesTable = ({
  selectedEmployees,
  onRemoveEmployee,
}) => {
  const tableConfig = {
    name: { width: 'flex-1', valign: 'middle' },
    actions: { width: '5rem', valign: 'middle', align: 'right' },
  };

  const rows = selectedEmployees.map(({ id, name }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
      <Table.RowItem cellRole="actions" {...tableConfig.actions}>
        <Tooltip
          triggerContent={
            <Button
              type="secondary"
              size="xs"
              onClick={onButtonClick(onRemoveEmployee, id)}
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
  selectedEmployees: getLeavePayItemEmployees(state),
});

export default connect(mapStateToProps)(LeavePayItemEmployeesTable);
