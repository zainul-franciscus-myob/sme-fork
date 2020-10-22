import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../recurringTransactionListSelectors';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';

const RecurringTransactionListTableBody = ({ tableConfig, entries }) => {
  return (
    <StickyTableBody>
      {entries.map((entry) => (
        <Table.Row key={entry.id}>
          <Table.RowItem {...tableConfig.transactionName}>
            {entry.transactionName}
          </Table.RowItem>
          <Table.RowItem {...tableConfig.transactionType}>
            {entry.transactionType}
          </Table.RowItem>
          <Table.RowItem {...tableConfig.amount}>{entry.amount}</Table.RowItem>
        </Table.Row>
      ))}
    </StickyTableBody>
  );
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(RecurringTransactionListTableBody);
