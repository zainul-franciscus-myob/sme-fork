import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSuperannuationTableEmpty, getIsTableLoading, getSuperannuationOrder } from '../PayItemListSelectors';
import EmptyView from './EmptyView';
import SuperannuationTableBody from './PayItemSuperannuationTableBody';
import TableSpinner from './TableSpinner';

const PayItemSuperannuationTable = ({
  order,
  listeners: { onSortSuperannuationList },
  isTableLoading,
  isSuperannuationTableEmpty,
}) => {
  let view;
  if (isTableLoading) {
    view = <TableSpinner />;
  } else if (isSuperannuationTableEmpty) {
    const additionalMessage = 'You also need to sign up for Pay Super so you can pay super directly from MYOB';
    view = <EmptyView payItem="superannuation funds" additionalMessage={additionalMessage} />;
  } else {
    view = <SuperannuationTableBody />;
  }

  return (
    <Table>
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
      { view }
    </Table>
  );
};

const mapStateToProps = state => ({
  order: getSuperannuationOrder(state),
  isTableLoading: getIsTableLoading(state),
  isSuperannuationTableEmpty: getIsSuperannuationTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemSuperannuationTable);
