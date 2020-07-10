import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../invoiceListSelectors';
import styles from './InvoiceListTableBody.module.css';

const InvoiceListTableBody = (props) => {
  const { entries, tableConfig } = props;

  const rows = entries.map((entry) => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.dateIssued}>
        {entry.dateIssued}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.number}>
        <a href={entry.link}>{entry.referenceId}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.customer}>{entry.customer}</Table.RowItem>
      <Table.RowItem {...tableConfig.purchaseOrder}>
        {entry.purchaseOrder}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.invoiceAmount}>
        {entry.invoiceAmount}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.invoiceDue}>
        {entry.invoiceDueDisplay}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.dateDue}>
        <Label color={entry.dueDateColor}>{entry.dateDueDisplay}</Label>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.status}>
        <Label color={entry.statusColor} type="boxed">
          {entry.status}
        </Label>
      </Table.RowItem>
    </Table.Row>
  ));

  return <Table.Body className={styles.tableBody}>{rows}</Table.Body>;
};

const mapStateToProps = (state, props) => ({
  entries: getTableEntries(state, props),
});

export default connect(mapStateToProps)(InvoiceListTableBody);
