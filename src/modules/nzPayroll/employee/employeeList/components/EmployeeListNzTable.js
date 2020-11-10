import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getOrder } from '../EmployeeListNzSelector';
import { getIsTableLoading } from '../../../../employee/employeeList/EmployeeListSelectors';
import EmployeeListTableBody from './EmployeeListNzTableBody';
import TableView from '../../../../../components/TableView/TableView';

const tableConfig = {
  name: { columnName: 'Name', width: 'flex-1', valign: 'top' },
  phoneNumber: { columnName: 'Phone', width: 'flex-1', valign: 'top' },
  email: { columnName: 'Email', width: 'flex-1', valign: 'top' },
};

const EmployeeListNzTable = ({
  isTableEmpty,
  isTableLoading,
  order,
  onSort,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>
        <HeaderSort
          title="Name"
          sortName="Name"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.phoneNumber}>
        <HeaderSort
          title="Phone"
          sortName="Phone"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.email}>
        <HeaderSort
          title="Email"
          sortName="Email"
          activeSort={order}
          onSort={onSort}
        />
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
      <EmployeeListTableBody tableConfig={tableConfig} />
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(EmployeeListNzTable);
