import {
  Button, HeaderSort, Icons, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsLeaveTableEmpty, getIsTableLoading, getLeaveOrder } from '../PayItemListSelectors';
import LeaveTableBody from './PayItemLeaveTableBody';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import TableView from '../../../components/TableView/TableView';

const PayItemLeaveList = ({
  order,
  listeners: { onSortLeaveList, onCreatePayItemButtonClick },
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

  const emptyViewActions = [
    <Button
      key={1}
      type="link"
      icon={<Icons.Add />}
      onClick={onCreatePayItemButtonClick}
    >
      Create a pay item
    </Button>,
  ];

  const emptyView = (
    <NoResultPageState
      title="You have no leave pay items"
      description="Make sure to check what leave items each employee is entitled to."
      actions={emptyViewActions}
    />
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isLeaveTableEmpty}
      emptyView={emptyView}
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
