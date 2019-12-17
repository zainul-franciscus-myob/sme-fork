import {
  Button, HeaderSort, Icons, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSuperannuationTableEmpty, getIsTableLoading, getSuperannuationOrder } from '../PayItemListSelectors';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import SuperannuationTableBody from './PayItemSuperannuationTableBody';
import TableView from '../../../../components/TableView/TableView';

const PayItemSuperannuationTable = ({
  order,
  listeners: { onSortSuperannuationList, onCreatePayItemButtonClick },
  isTableLoading,
  isSuperannuationTableEmpty,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem>
        <HeaderSort title="Pay item name" sortName="Name" activeSort={order} onSort={onSortSuperannuationList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="Contribution type" sortName="DisplayType" activeSort={order} onSort={onSortSuperannuationList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="ATO reporting category" sortName="StpCategory" activeSort={order} onSort={onSortSuperannuationList} />
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
      title="You have no superannuation pay items"
      description="This makes it super-easy to calculate and track your employees' super payments."
      actions={emptyViewActions}
    />
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isSuperannuationTableEmpty}
      emptyView={emptyView}
    >
      <SuperannuationTableBody />
    </TableView>
  );
};

const mapStateToProps = state => ({
  order: getSuperannuationOrder(state),
  isTableLoading: getIsTableLoading(state),
  isSuperannuationTableEmpty: getIsSuperannuationTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemSuperannuationTable);
