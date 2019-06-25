import { Button, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../supplierReturnListSelectors';

const onLinkButtonClick = (handler, id) => () => {
  handler(id);
};

const SupplierReturnListTableBody = ({
  entries,
  tableConfig,
  onCreateRefundClick,
}) => {
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>

      <Table.RowItem {...tableConfig.date}>
        {entry.date}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.purchaseOrderNumber}>
        {entry.purchaseOrderNumber}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.supplierInvoiceNumber}>
        {entry.supplierInvoiceNumber}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.supplier}>
        {entry.supplier}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.amount}>
        {entry.amount}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.debitAmount}>
        {entry.debitAmount}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.receiveRefund}>
        <Button type="link" icon={<Icons.Dollar />} iconRight onClick={onLinkButtonClick(onCreateRefundClick, entry.id)}>
          Refund
        </Button>
      </Table.RowItem>

      <Table.RowItem {...tableConfig.applyToPurchase}>
        {entry.applyToPurchase}
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
