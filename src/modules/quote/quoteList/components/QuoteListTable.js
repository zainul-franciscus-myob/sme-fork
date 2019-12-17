import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading, getOrder,
} from '../quoteListSelector';
import QuoteListTableBody from './QuoteListTableBody';
import TableView from '../../../../components/TableView/TableView';

const tableConfig = {
  referenceId: { width: '13.7rem', valign: 'top' },
  purchaseOrder: { width: '20rem', valign: 'top' },
  customer: { width: 'flex-1', valign: 'top' },
  displayDate: { width: '12.4rem', valign: 'top' },
  displayAmount: { width: '15.6rem', valign: 'top', align: 'right' },
  displayExpiryDate: { width: '12.4rem', valign: 'top' },
};

const QuoteListTable = ({
  isTableEmpty,
  isTableLoading,
  onSort,
  order,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.displayDate}>
        <HeaderSort title="Issue date" sortName="DateOccurred" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.referenceId}>
        <HeaderSort title="Quote number" sortName="DisplayId" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.customer}>
        <HeaderSort title="Customer" sortName="CustomerName" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.purchaseOrder}>
        <HeaderSort title="Customer PO no." sortName="CustomerPurchaseOrderIdentifier" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.displayAmount}>
        <HeaderSort title="Total amount ($)" sortName="Amount" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.displayExpiryDate}>
        <HeaderSort title="Expiry date" sortName="ExpiryDate" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyMessage="There are no quotes for the selected filter options."
    >
      <QuoteListTableBody tableConfig={tableConfig} />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(QuoteListTable);
