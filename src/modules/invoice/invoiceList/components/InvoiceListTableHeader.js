import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getOrder } from '../invoiceListSelectors';
import { getResponsiveConfig } from './getResponsiveConfig';

const InvoiceListTableHeader = (props) => {
  const {
    onSort,
    order,
    tableConfig,
  } = props;

  return (
    <Table responsiveWidths={getResponsiveConfig(tableConfig)}>
      <Table.Header>
        <Table.HeaderItem
          columnName={tableConfig.dateIssued.columnName}
          {...tableConfig.dateIssued}
        >
          <HeaderSort title="Issue date" sortName="DateOccurred" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem columnName={tableConfig.number.columnName} {...tableConfig.number}>
          <HeaderSort title="Invoice no" sortName="DisplayId" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem columnName={tableConfig.customer.columnName} {...tableConfig.customer}>
          <HeaderSort title="Customer" sortName="CustomerName" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.purchaseOrder.columnName}
          {...tableConfig.purchaseOrder}
        >
          <HeaderSort title="Customer PO no" sortName="CustomerPurchaseOrderIdentifier" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.invoiceAmount.columnName}
          {...tableConfig.invoiceAmount}
        >
          <HeaderSort title="Amount ($)" sortName="Amount" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.invoiceDue.columnName}
          {...tableConfig.invoiceDue}
        >
          <HeaderSort title="Balance due ($)" sortName="BalanceDue" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem columnName={tableConfig.dateDue.columnName} {...tableConfig.dateDue}>
          <HeaderSort title="Due date" sortName="DateDue" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem columnName={tableConfig.status.columnName} {...tableConfig.status}>
          <HeaderSort title="Status" sortName="Status" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
      </Table.Header>
    </Table>
  );
};

const mapStateToProps = state => ({
  order: getOrder(state),
});

export default connect(mapStateToProps)(InvoiceListTableHeader);
