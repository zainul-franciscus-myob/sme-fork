import { PropTypes } from 'prop-types';
import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEntries } from '../billListSelectors';

const BillListTableBody = (props) => {
  const {
    tableConfig,
    entries,
  } = props;
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.number}>{entry.number}</Table.RowItem>
      <Table.RowItem {...tableConfig.invoiceNumber}>{entry.invoiceNumber}</Table.RowItem>
      <Table.RowItem {...tableConfig.supplier}>{entry.supplier}</Table.RowItem>
      <Table.RowItem {...tableConfig.dateIssued}>{entry.dateIssued}</Table.RowItem>
      <Table.RowItem {...tableConfig.billAmount}>{entry.billAmount}</Table.RowItem>
      <Table.RowItem {...tableConfig.balanceDue}>{entry.balanceDue}</Table.RowItem>
      <Table.RowItem {...tableConfig.status}>{entry.status}</Table.RowItem>
      <Table.RowItem {...tableConfig.dateClosed}>{entry.dateClosed}</Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const entriesShape = {
  balanceDue: PropTypes.string.isRequired,
  billAmount: PropTypes.string.isRequired,
  dateClosed: PropTypes.string.isRequired,
  dateIssued: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  invoiceNumber: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  supplier: PropTypes.string.isRequired,
};

BillListTableBody.propTypes = {
  tableConfig: PropTypes.shape({}).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape(entriesShape)).isRequired,
};

const mapStateToProps = state => ({
  entries: getEntries(state),
});

export default connect(mapStateToProps)(BillListTableBody);
