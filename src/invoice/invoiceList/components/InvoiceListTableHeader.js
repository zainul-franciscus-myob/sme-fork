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
      <Table.HeaderItem {...tableConfig.number}>
        <HeaderSort title="Number" sortName="DisplayId" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.purchaseOrder}>
        <HeaderSort title="Purchase order" sortName="CustomerPurchaseOrderIdentifier" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.customer}>
        <HeaderSort title="Customer" sortName="CustomerName" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.dateIssued}>
        <HeaderSort title="Date issued" sortName="DateOccurred" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.invoiceAmount}>
        <HeaderSort title="Invoice amount ($)" sortName="Amount" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.invoiceDue}>
        <HeaderSort title="Balance Due ($)" sortName="BalanceDue" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        <HeaderSort title="Status" sortName="Status" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.dateClosed}>
        <HeaderSort title="Date Closed" sortName="DateClosed" activeSort={order} onSort={onSort} />
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
