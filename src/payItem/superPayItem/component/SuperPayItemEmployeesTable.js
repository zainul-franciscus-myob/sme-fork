import {
  Button, Icons, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSuperPayItemEmployees } from '../superPayItemSelectors';

const onButtonClick = (handler, id) => () => {
  handler(id);
};

const SuperPayItemEmployeesTable = (props) => {
  const {
    employees,
    onRemoveSuperPayItemEmployee,
  } = props;

  const tableConfig = {
    name: { width: 'flex-1', valign: 'middle' },
    actions: { width: '5rem', valign: 'middle', align: 'right' },
  };

  const rows = employees.map(({ id, name }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
      <Table.RowItem cellRole="actions" {...tableConfig.actions}>
        <Button
          type="secondary"
          size="xs"
          onClick={onButtonClick(onRemoveSuperPayItemEmployee, id)}
        >
          <Icons.Remove />
        </Button>
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table hasActions>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.actions} />
      </Table.Header>
      <Table.Body>
        {rows}
      </Table.Body>
    </Table>
  );
};

const mapStateToProps = state => ({
  employees: getSuperPayItemEmployees(state),
});

export default connect(mapStateToProps)(SuperPayItemEmployeesTable);
