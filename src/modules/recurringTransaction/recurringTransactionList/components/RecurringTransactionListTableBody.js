import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableLoading,
  getTableEntries,
} from '../recurringTransactionListSelectors';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';

const RecurringTransactionListTableBody = ({
  tableConfig,
  entries,
  isTableLoading,
}) => {
  return (
    <StickyTableBody isLoading={isTableLoading}>
      {entries.map((entry) => (
        <Table.Row key={`${entry.transactionType}-${entry.id}`}>
          <Table.RowItem {...tableConfig.transactionName}>
            {entry.link ? (
              <a href={entry.link}>{entry.transactionName}</a>
            ) : (
              entry.transactionName
            )}
          </Table.RowItem>
          <Table.RowItem {...tableConfig.transactionType}>
            {entry.displayTransactionType}
          </Table.RowItem>
          <Table.RowItem {...tableConfig.amount}>{entry.amount}</Table.RowItem>
        </Table.Row>
      ))}
    </StickyTableBody>
  );
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(RecurringTransactionListTableBody);
