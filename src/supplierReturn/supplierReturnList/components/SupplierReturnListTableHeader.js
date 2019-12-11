import {
  HeaderSort, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getOrder } from '../selectors/SupplierReturnListSelectors';

const SupplierReturnListTableHeader = ({
  tableConfig,
  order,
  onSort,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem columnName={tableConfig.date.columnName} {...tableConfig.date.styles}>
        <HeaderSort title={tableConfig.date.columnName} sortName="DateOccurred" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem
        columnName={tableConfig.purchaseOrderNumber.columnName}
        {...tableConfig.purchaseOrderNumber.styles}
      >
        <HeaderSort title={tableConfig.purchaseOrderNumber.columnName} sortName="DisplayId" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem
        columnName={tableConfig.supplier.columnName}
        {...tableConfig.supplier.styles}
      >
        <HeaderSort title={tableConfig.supplier.columnName} sortName="SupplierName" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem
        columnName={tableConfig.supplierInvoiceNumber.columnName}
        {...tableConfig.supplierInvoiceNumber.styles}
      >
        <HeaderSort title={tableConfig.supplierInvoiceNumber.columnName} sortName="CustomerPurchaseOrderNumber" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem columnName={tableConfig.amount.columnName} {...tableConfig.amount.styles}>
        <HeaderSort title={tableConfig.amount.columnName} sortName="Amount" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem
        columnName={tableConfig.balanceDue.columnName}
        {...tableConfig.balanceDue.styles}
      >
        <HeaderSort title={tableConfig.balanceDue.columnName} sortName="BalanceDue" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem
        columnName={tableConfig.receiveRefund.columnName}
        {...tableConfig.receiveRefund.styles}
      >
        {tableConfig.receiveRefund.columnName}
      </Table.HeaderItem>

      <Table.HeaderItem
        columnName={tableConfig.applyToPurchase.columnName}
        {...tableConfig.applyToPurchase.styles}
      >
        {tableConfig.applyToPurchase.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  return header;
};

const mapStateToProps = state => ({
  order: getOrder(state),
});

export default connect(mapStateToProps)(SupplierReturnListTableHeader);
