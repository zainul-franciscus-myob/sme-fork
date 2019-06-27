import {
  HeaderSort, Spinner, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading, getOrder } from '../supplierReturnListSelectors';
import SupplierReturnListTableBody from './SupplierReturnListTableBody';
import style from './SupplierReturnListTable.css';

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

const emptyView = (
  <div className={style.empty}>
    There are no supplier returns for the selected filter options.
  </div>
);

const spinnerView = (
  <div className={style.spinner}>
    <Spinner size="medium" />
  </div>
);

const SupplierReturnListTable = ({
  isTableLoading,
  isTableEmpty,
  order,
  onSort,
  onCreateRefundClick,
  onCreatePurchaseClick,
}) => {
  let tableBodyView;

  if (isTableLoading) {
    tableBodyView = spinnerView;
  } else if (isTableEmpty) {
    tableBodyView = emptyView;
  } else {
    tableBodyView = (
      <SupplierReturnListTableBody
        tableConfig={tableConfig}
        onCreateRefundClick={onCreateRefundClick}
        onCreatePurchaseClick={onCreatePurchaseClick}
      />
    );
  }

  return (
    <Table>
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

      {tableBodyView}

    </Table>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(SupplierReturnListTable);
