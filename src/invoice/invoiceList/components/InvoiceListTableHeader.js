import { HeaderSort, Table } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getOrder } from '../invoiceListSelectors';

const InvoiceListTableHeader = (props) => {
  const {
    onSort,
    order,
    tableConfig,
  } = props;

  return (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.dateIssued}>
        <HeaderSort title="Issue date" sortName="DateOccurred" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.number}>
        <HeaderSort title="Invoice number" sortName="DisplayId" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.customer}>
        <HeaderSort title="Customer" sortName="CustomerName" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.purchaseOrder}>
        <HeaderSort title="Customer PO no." sortName="CustomerPurchaseOrderIdentifier" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.invoiceAmount}>
        <HeaderSort title="Total amount ($)" sortName="Amount" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.invoiceDue}>
        <HeaderSort title="Balance due ($)" sortName="BalanceDue" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.dateDue}>
        <HeaderSort title="Due date" sortName="DateDue" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        <HeaderSort title="Status" sortName="Status" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );
};

InvoiceListTableHeader.propTypes = {
  tableConfig: PropTypes.shape({}).isRequired,
  onSort: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  order: getOrder(state),
});

export default connect(mapStateToProps)(InvoiceListTableHeader);
