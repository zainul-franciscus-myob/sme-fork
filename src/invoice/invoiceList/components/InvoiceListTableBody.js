import { Badge, Table } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../invoiceListSelectors';

/* eslint-disable react/no-array-index-key */

const InvoiceListTableBody = (props) => {
  const {
    entries,
    tableConfig,
  } = props;

  const rows = entries.map((entry, index) => (
    <Table.Row key={index}>
      <Table.RowItem {...tableConfig.dateIssued}>{entry.dateIssued}</Table.RowItem>
      <Table.RowItem {...tableConfig.number}>
        <a href={entry.link}>{entry.referenceId}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.customer}>{entry.customer}</Table.RowItem>
      <Table.RowItem {...tableConfig.purchaseOrder}>{entry.purchaseOrder}</Table.RowItem>
      <Table.RowItem {...tableConfig.invoiceAmount}>{entry.invoiceAmount}</Table.RowItem>
      <Table.RowItem {...tableConfig.invoiceDue}>{entry.invoiceDue}</Table.RowItem>
      <Table.RowItem {...tableConfig.dateDue}>{entry.dateDue}</Table.RowItem>
      <Table.RowItem {...tableConfig.status}>
        <Badge color={entry.badgeColour}>{entry.displayStatus}</Badge>
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

InvoiceListTableBody.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tableConfig: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state, props) => ({
  entries: getTableEntries(state, props),
});

export default connect(mapStateToProps)(InvoiceListTableBody);
