import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../selectors/creditsAndDebitsSelectors';
import ReferenceNumber from './ReferenceNumber';

/* eslint-disable react/no-array-index-key */

const CreditsAndDebitsListTableBody = (props) => {
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
      <Table.RowItem {...tableConfig.displayAccountName}>{entry.displayAccountName}</Table.RowItem>
      <Table.RowItem {...tableConfig.sourceJournal}>{entry.sourceJournal}</Table.RowItem>
      <Table.RowItem {...tableConfig.displayDebit}>{entry.displayDebit}</Table.RowItem>
      <Table.RowItem {...tableConfig.displayCredit}>{entry.displayCredit}</Table.RowItem>
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

export default connect(mapStateToProps)(CreditsAndDebitsListTableBody);
