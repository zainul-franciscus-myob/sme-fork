import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../purchaseOrderListSelectors';
import styles from './PurchaseOrderListTableBody.module.css';

const PurchaseOrderListTableBody = (props) => {
  const { tableConfig, entries } = props;
  const rows = entries.map((entry) => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.dateIssued}>
        {entry.dateIssued}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.number}>
        <a href={entry.link}>{entry.number}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.supplier}>{entry.supplier}</Table.RowItem>
      <Table.RowItem {...tableConfig.invoiceNumber}>
        {entry.invoiceNumber}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.purchaseOrderAmount}>
        {entry.purchaseOrderAmount}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.dateDue}>
        {entry.promisedDate}
      </Table.RowItem>
    </Table.Row>
  ));

  return <Table.Body className={styles.tableBody}>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(PurchaseOrderListTableBody);
