import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty } from '../EmployeeListNzSelector';
import EmployeeListTableBody from './EmployeeListNzTableBody';
import TableView from '../../../../../components/TableView/TableView';

const tableConfig = {
  name: { columnName: 'Name', width: 'flex-1', valign: 'top' },
  phoneNumber: { columnName: 'Phone', width: 'flex-1', valign: 'top' },
  email: { columnName: 'Email', width: 'flex-1', valign: 'top' },
};

const EmployeeListNzTable = ({ isTableEmpty }) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>
        {tableConfig.name.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.phoneNumber}>
        {tableConfig.phoneNumber.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.email}>
        {tableConfig.email.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isEmpty={isTableEmpty}
      emptyMessage="There are no employees."
    >
      <EmployeeListTableBody tableConfig={tableConfig} />
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(EmployeeListNzTable);
