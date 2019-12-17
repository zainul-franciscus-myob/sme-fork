import { Button, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../selectors/SupplierReturnListSelectors';

const onLinkButtonClick = (handler, id) => () => {
  handler(id);
};

const SupplierReturnListTableBody = ({
  entries,
  tableConfig,
  onCreateRefundClick,
  onCreatePurchaseClick,
}) => {
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>

      <Table.RowItem columnName={tableConfig.date.columnName} {...tableConfig.date.styles}>
        {entry.date}
      </Table.RowItem>

      <Table.RowItem
        columnName={tableConfig.purchaseOrderNumber.columnName}
        {...tableConfig.purchaseOrderNumber.styles}
      >
        <a href={entry.link}>{entry.purchaseOrderNumber}</a>
      </Table.RowItem>

      <Table.RowItem columnName={tableConfig.supplier.columnName} {...tableConfig.supplier.styles}>
        {entry.supplier}
      </Table.RowItem>

      <Table.RowItem
        columnName={tableConfig.supplierInvoiceNumber.columnName}
        {...tableConfig.supplierInvoiceNumber.styles}
      >
        {entry.supplierInvoiceNumber}
      </Table.RowItem>

      <Table.RowItem columnName={tableConfig.amount.columnName} {...tableConfig.amount.styles}>
        {entry.amount}
      </Table.RowItem>

      <Table.RowItem
        columnName={tableConfig.balanceDue.columnName}
        {...tableConfig.balanceDue.styles}
      >
        {entry.debitAmount}
      </Table.RowItem>

      <Table.RowItem
        columnName={tableConfig.receiveRefund.columnName}
        {...tableConfig.receiveRefund.styles}
      >
        <Button type="link" icon={<Icons.Dollar />} iconLeft onClick={onLinkButtonClick(onCreateRefundClick, entry.id)}>
          Refund
        </Button>
      </Table.RowItem>

      <Table.RowItem
        columnName={tableConfig.applyToPurchase.columnName}
        {...tableConfig.applyToPurchase.styles}
      >
        <Button type="link" icon={<Icons.ReopenedDocument />} iconLeft onClick={onLinkButtonClick(onCreatePurchaseClick, entry.id)}>
          Apply
        </Button>
      </Table.RowItem>

    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(SupplierReturnListTableBody);
