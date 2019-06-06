import {
  HeaderSort, Spinner, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading, getOrder } from '../CustomerReturnListSelectors';
import CustomerReturnListTableBody from './CustomerReturnListTableBody';
import style from './CustomerReturnListTable.css';

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

const emptyView = (
  <div className={style.empty}>
    There are no customer returns.
  </div>
);

const spinnerView = (
  <div className={style.spinner}>
    <Spinner size="medium" />
  </div>
);

const CustomerReturnListTable = ({
  isTableLoading,
  isTableEmpty,
  order,
  onSort,
}) => {
  let tableBodyView;

  if (isTableLoading) {
    tableBodyView = spinnerView;
  } else if (isTableEmpty) {
    tableBodyView = emptyView;
  } else {
    tableBodyView = <CustomerReturnListTableBody tableConfig={tableConfig} />;
  }

  return (
    <Table>
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

      {tableBodyView}

    </Table>
  );
};

const orderShape = {
  column: PropTypes.string,
  descending: PropTypes.bool,
};

CustomerReturnListTable.propTypes = {
  isTableLoading: PropTypes.bool.isRequired,
  isTableEmpty: PropTypes.bool.isRequired,
  order: PropTypes.shape(orderShape).isRequired,
  onSort: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(CustomerReturnListTable);
