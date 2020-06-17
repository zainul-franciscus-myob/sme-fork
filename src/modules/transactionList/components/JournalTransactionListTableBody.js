import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../selectors/journalTransactionSelectors';
import ReferenceNumber from './ReferenceNumber';

/* eslint-disable react/no-array-index-key */

const JournalTransactionListTableBody = (props) => {
  const {
    tableConfig,
    entries,
  } = props;

  const rows = entries.map((entry, index) => (
    <Table.Row key={index}>
      <Table.RowItem {...tableConfig.date}>{entry.displayDate}</Table.RowItem>
      <Table.RowItem {...tableConfig.referenceId}>
        <ReferenceNumber
          isSystem={entry.isSystem}
          link={entry.link}
          referenceId={entry.referenceId}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.description}>{entry.description}</Table.RowItem>
      <Table.RowItem {...tableConfig.sourceJournal}>{entry.sourceJournal}</Table.RowItem>
      <Table.RowItem {...tableConfig.displayAmount}>{entry.displayAmount}</Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(JournalTransactionListTableBody);
