import { Table, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../selectors/journalTransactionSelectors';

/* eslint-disable react/no-array-index-key */

const JournalTransactionListTableBody = (props) => {
  const { tableConfig, entries } = props;

  const getRefEntryLink = (entry) =>
    entry.link ? (
      <a href={entry.link}>{entry.referenceId}</a>
    ) : (
      <Tooltip placement="bottom" triggerContent={entry.referenceId}>
        This transaction type can only be viewed and edited from your desktop
        AccountRight software
      </Tooltip>
    );

  const rows = entries.map((entry, index) => (
    <Table.Row key={index}>
      <Table.RowItem {...tableConfig.date}>{entry.displayDate}</Table.RowItem>
      <Table.RowItem {...tableConfig.referenceId}>
        {getRefEntryLink(entry)}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.description}>
        {entry.description}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.sourceJournal}>
        {entry.sourceJournal}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.displayAmount}>
        {entry.displayAmount}
      </Table.RowItem>
    </Table.Row>
  ));

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(JournalTransactionListTableBody);
