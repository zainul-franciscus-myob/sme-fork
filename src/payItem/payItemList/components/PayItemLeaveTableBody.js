import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLeaveTableEntries } from '../PayItemListSelectors';

const LeaveTableBody = ({ entries }) => {
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem columnName="Pay item name">
        <a href={entry.link}>{entry.name}</a>
      </Table.RowItem>
      <Table.RowItem columnName="Calculation basis">
        {entry.type}
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
  entries: getLeaveTableEntries(state),
});

export default connect(mapStateToProps)(LeaveTableBody);
