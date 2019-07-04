import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSuperannuationEntries } from '../PayItemListSelectors';

const SuperannuationTableBody = ({ entries }) => {
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem>
        {entry.name}
      </Table.RowItem>
      <Table.RowItem>
        {entry.type}
      </Table.RowItem>
      <Table.RowItem>
        {entry.atoReportingCategory}
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      { rows }
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getSuperannuationEntries(state),
});

export default connect(mapStateToProps)(SuperannuationTableBody);
