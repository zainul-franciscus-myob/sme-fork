import {
  HeaderSort, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading, getOrder } from '../supplierReturnListSelectors';
import SupplierReturnListTableBody from './SupplierReturnListTableBody';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  date: { width: '11rem', valign: 'middle' },
  purchaseOrderNumber: { width: 'flex-1', valign: 'middle' },
  supplierInvoiceNumber: { width: '15rem', valign: 'middle' },
  supplier: { width: 'flex-2', valign: 'middle' },
  amount: { width: '13rem', valign: 'middle', align: 'right' },
  debitAmount: { width: '16rem', valign: 'middle', align: 'right' },
  receiveRefund: { width: '13rem', valign: 'middle' },
  applyToPurchase: { width: '10rem', valign: 'middle' },
};

const SupplierReturnListTable = ({
  isTableLoading,
  isTableEmpty,
  order,
  onSort,
  onCreateRefundClick,
  onCreatePurchaseClick,
}) => {
  const header = (
    <Table.Header>

      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort title="Date" sortName="DateOccurred" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.purchaseOrderNumber}>
        <HeaderSort title="PO No." sortName="DisplayId" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.supplierInvoiceNumber}>
        <HeaderSort title="Supplier Inv. No." sortName="CustomerPurchaseOrderNumber" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.supplier}>
        <HeaderSort title="Supplier" sortName="SupplierName" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.amount}>
        <HeaderSort title="Amount ($)" sortName="Amount" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.debitAmount}>
        <HeaderSort title="Debit amount ($)" sortName="BalanceDue" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.receiveRefund}>
        Receive refund
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.applyToPurchase}>
        Apply to purchase
      </Table.HeaderItem>

    </Table.Header>
  );

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      header={header}
      emptyMessage="There are no supplier returns for the selected filter options."
    >
      <SupplierReturnListTableBody
        tableConfig={tableConfig}
        onCreateRefundClick={onCreateRefundClick}
        onCreatePurchaseClick={onCreatePurchaseClick}
      />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(SupplierReturnListTable);
