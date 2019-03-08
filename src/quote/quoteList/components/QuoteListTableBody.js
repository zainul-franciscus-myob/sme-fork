import { PropTypes } from 'prop-types';
import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../quoteListSelector';

/* eslint-disable react/no-array-index-key */

const QuoteListTableBody = (props) => {
  const {
    tableConfig,
    entries,
  } = props;
  const rows = entries.map((entry, index) => (
    <Table.Row key={index}>
      <Table.RowItem {...tableConfig.referenceId}>{entry.referenceId}</Table.RowItem>
      <Table.RowItem {...tableConfig.purchaseOrder}>{entry.purchaseOrder}</Table.RowItem>
      <Table.RowItem {...tableConfig.customer}>{entry.customer}</Table.RowItem>
      <Table.RowItem {...tableConfig.displayDate}>{entry.displayDate}</Table.RowItem>
      <Table.RowItem {...tableConfig.displayAmount}>{entry.displayAmount}</Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

QuoteListTableBody.propTypes = {
  tableConfig: PropTypes.shape({}).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state, props) => ({
  entries: getTableEntries(state, props),
});

export default connect(mapStateToProps)(QuoteListTableBody);
