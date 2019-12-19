import {
  HeaderSort, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading, getOrder } from '../EmployeeListSelectors';
import EmployeeListTableBody from './EmployeeListTableBody';
import TableView from '../../../../components/TableView/TableView';

const tableConfig = {
  name: { width: 'flex-1', valign: 'top' },
  phoneNumber: { width: 'flex-1', valign: 'top' },
  email: { width: 'flex-1', valign: 'top' },
};

const EmployeeListTable = ({
  isTableLoading, order, onSort, isTableEmpty,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>
        <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.phoneNumber}>
        <HeaderSort title="Phone" sortName="Phone" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.email}>
        <HeaderSort title="Email" sortName="Email" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyMessage="There are no employees."
    >
      <EmployeeListTableBody tableConfig={tableConfig} />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  order: getOrder(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(EmployeeListTable);
