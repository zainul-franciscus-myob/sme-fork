import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getWageTableEntries } from '../PayItemListSelectors';

const WagesTableBody = ({ entries }) => {
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem>
        <a href={entry.link}>{entry.name}</a>
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
  entries: getWageTableEntries(state),
});

export default connect(mapStateToProps)(WagesTableBody);
