import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getWagesEntries } from '../PayItemListSelectors';

const WagesTableBody = ({ entries }) => {
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
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getWagesEntries(state),
});

export default connect(mapStateToProps)(WagesTableBody);
