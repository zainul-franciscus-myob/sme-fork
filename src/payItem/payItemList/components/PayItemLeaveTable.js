import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsLeaveTableEmpty, getIsTableLoading, getLeaveOrder } from '../PayItemListSelectors';
import EmptyView from './EmptyView';
import LeaveTableBody from './PayItemLeaveTableBody';
import TableSpinner from './TableSpinner';

const PayItemLeaveList = ({
  order,
  listeners: { onSortLeaveList },
  isTableLoading,
  isLeaveTableEmpty,
}) => {
  let view;
  if (isTableLoading) {
    view = <TableSpinner />;
  } else if (isLeaveTableEmpty) {
    view = <EmptyView payItem="leave" />;
  } else {
    view = <LeaveTableBody />;
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem>
          <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSortLeaveList} />
        </Table.HeaderItem>
        <Table.HeaderItem>
          <HeaderSort title="Type" sortName="Type" activeSort={order} onSort={onSortLeaveList} />
        </Table.HeaderItem>
      </Table.Header>
      { view }
    </Table>
  );
};

const mapStateToProps = state => ({
  order: getLeaveOrder(state),
  isTableLoading: getIsTableLoading(state),
  isLeaveTableEmpty: getIsLeaveTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemLeaveList);
