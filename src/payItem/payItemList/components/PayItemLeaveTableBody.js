import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLeaveEntries } from '../PayItemListSelectors';

const LeaveTableBody = ({ entries }) => {
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem>
        {entry.name}
      </Table.RowItem>
      <Table.RowItem>
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
  entries: getLeaveEntries(state),
});

export default connect(mapStateToProps)(LeaveTableBody);
