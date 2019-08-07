import {
  HeaderSort, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading, getOrder } from '../CustomerReturnListSelectors';
import CustomerReturnListTableBody from './CustomerReturnListTableBody';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  date: { width: '11rem', valign: 'top' },
  invoiceNumber: { width: 'flex-1', valign: 'top' },
  customerPurchaseOrderNo: { width: 'flex-1', valign: 'top' },
  customer: { width: 'flex-1', valign: 'top' },
  amount: { width: 'flex-1', valign: 'top', align: 'right' },
  creditAmount: { width: '17rem', valign: 'top', align: 'right' },
  payRefund: { width: 'flex-1', valign: 'top' },
  applyToSale: { width: 'flex-1', valign: 'top' },
};

const CustomerReturnListTable = ({
  isTableLoading,
  isTableEmpty,
  order,
  onSort,
  onCreateRefundClick,
  onCreateApplyToSaleClick,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort title="Date" sortName="DateOccurred" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.invoiceNumber}>
        <HeaderSort title="Invoice no." sortName="DisplayId" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.customerPurchaseOrderNo}>
        <HeaderSort title="Cust PO No" sortName="PurchaseOrderReference" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.customer}>
        <HeaderSort title="Customer" sortName="CustomerName" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.amount}>
        <HeaderSort title="Amount ($)" sortName="Amount" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.creditAmount}>
        <HeaderSort title="Credit amount ($)" sortName="BalanceDue" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.payRefund}>
        Pay refund
      </Table.HeaderItem>

      <Table.HeaderItem {...tableConfig.applyToSale}>
        Apply to sale
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyMessage="There are no customer returns."
    >
      <CustomerReturnListTableBody
        tableConfig={tableConfig}
        onCreateRefundClick={onCreateRefundClick}
        onCreateApplyToSaleClick={onCreateApplyToSaleClick}
      />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(CustomerReturnListTable);
