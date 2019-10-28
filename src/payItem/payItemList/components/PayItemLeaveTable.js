import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsLeaveTableEmpty, getIsTableLoading, getLeaveOrder } from '../PayItemListSelectors';
import EmptyView from './EmptyView';
import LeaveTableBody from './PayItemLeaveTableBody';
import TableView from '../../../components/TableView/TableView';

const PayItemLeaveList = ({
  order,
  listeners: { onSortLeaveList },
  isTableLoading,
  isLeaveTableEmpty,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem>
        <HeaderSort title="Pay item name" sortName="Name" activeSort={order} onSort={onSortLeaveList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="Calculation basis" sortName="DisplayType" activeSort={order} onSort={onSortLeaveList} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isLeaveTableEmpty}
      emptyView={<EmptyView payItem="leave" />}
    >
      <LeaveTableBody />
    </TableView>
  );
};

const mapStateToProps = state => ({
  order: getLeaveOrder(state),
  isTableLoading: getIsTableLoading(state),
  isLeaveTableEmpty: getIsLeaveTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemLeaveList);
