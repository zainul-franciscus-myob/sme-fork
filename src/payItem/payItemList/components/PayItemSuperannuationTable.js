import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSuperannuationTableEmpty, getIsTableLoading, getSuperannuationOrder } from '../PayItemListSelectors';
import EmptyView from './EmptyView';
import SuperannuationTableBody from './PayItemSuperannuationTableBody';
import TableView from '../../../components/TableView/TableView';

const PayItemSuperannuationTable = ({
  order,
  listeners: { onSortSuperannuationList },
  isTableLoading,
  isSuperannuationTableEmpty,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem>
        <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSortSuperannuationList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="Type" sortName="DisplayType" activeSort={order} onSort={onSortSuperannuationList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="ATO reporting category" sortName="StpCategory" activeSort={order} onSort={onSortSuperannuationList} />
      </Table.HeaderItem>
    </Table.Header>
  );

  const additionalMessage = 'You also need to sign up for Pay Super so you can pay super directly from MYOB';
  const emptyView = <EmptyView payItem="superannuation funds" additionalMessage={additionalMessage} />;

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
