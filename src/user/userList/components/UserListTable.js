import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading } from '../userListSelectors';
import { getOrder } from '../../../quote/quoteList/quoteListSelector';
import TableView from '../../../components/TableView/TableView';
import UserListTableBody from './UserListTableBody';

const tableConfig = {
  name: { width: 'flex-1', valign: 'top' },
  email: { width: 'flex-1', valign: 'top' },
  advisor: { width: '15rem', valign: 'top' },
  status: { width: '15rem', valign: 'top' },
};

const UserListTable = ({
  isTableEmpty,
  isTableLoading,
  onSort,
  order,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>
        <HeaderSort title="Name" sortName="UserName" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.email}>
        <HeaderSort title="Email" sortName="Email" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.advisor}>
        <HeaderSort title="Advisor" sortName="IsAdvisor" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        <HeaderSort title="Status" sortName="IsActive" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyMessage="There are no users."
    >
      <UserListTableBody tableConfig={tableConfig} />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(UserListTable);
