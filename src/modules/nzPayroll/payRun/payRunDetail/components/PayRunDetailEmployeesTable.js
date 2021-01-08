import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading } from '../payRunDetailNzSelector';
import PayRunDetailEmployeesTableBody from './PayRunDetailEmployeesTableBody';
import TableView from '../../../../../components/TableView/TableView';

const tableConfig = {
  employee: { columnName: 'Employee', width: 'flex-1', valign: 'top' },
  takeHomePay: {
    columnName: 'TakeHomePay',
    width: 'flex-1',
    valign: 'top',
    align: 'right',
  },
};

const PayRunDetailEmployeesTable = ({ isTableEmpty, isTableLoading }) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.employee}>Employee</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.takeHomePay}>
        Take home pay ($)
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isEmpty={isTableEmpty}
      isLoading={isTableLoading}
      emptyMessage="There are no employees."
    >
      <PayRunDetailEmployeesTableBody tableConfig={tableConfig} />
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(PayRunDetailEmployeesTable);
