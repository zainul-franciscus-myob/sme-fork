import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../supplierReturnListSelectors';

const SupplierReturnListTableBody = ({
  entries,
  tableConfig,
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
        {entry.receiveRefund}
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
