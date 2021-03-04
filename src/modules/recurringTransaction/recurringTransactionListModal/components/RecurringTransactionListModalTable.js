import { HeaderSort, RadioButton, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEntries,
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
  getRecurringTransactionId,
  getShowTransactionType,
} from '../RecurringTransactionListModalSelectors';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';

const RecurringTransactionListModalTable = ({
  tableConfig,
  recurringTransactionId,
  entries,
  order,
  isTableLoading,
  isTableEmpty,
  showTransactionType,
  onSelect,
  onSort,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.radio} />
      <Table.HeaderItem {...tableConfig.transactionName}>
        <HeaderSort
          title="Schedule name"
          sortName="TransactionName"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      {showTransactionType && (
        <Table.HeaderItem {...tableConfig.transactionType}>
          <HeaderSort
            title="Transaction type"
            sortName="TransactionTypeDescription"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
      )}
      <Table.HeaderItem {...tableConfig.amount}>
        <HeaderSort
          title="Amount ($)"
          sortName="Amount"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
    </Table.Header>
  );

  const emptyView = (
    <NoResultPageState title="No recurring transactions found" />
  );

  const body = (
    <StickyTableBody
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
    >
      {entries.map((entry) => (
        <Table.Row key={`${entry.transactionType}-${entry.id}`}>
          <Table.RowItem {...tableConfig.radio}>
            <RadioButton
              checked={entry.id === recurringTransactionId}
              value={entry.id}
              onChange={(e) => onSelect(e.target.value)}
            />
          </Table.RowItem>
          <Table.RowItem {...tableConfig.transactionName}>
            {entry.transactionName}
          </Table.RowItem>
          {showTransactionType && (
            <Table.RowItem {...tableConfig.transactionType}>
              {entry.displayTransactionType}
            </Table.RowItem>
          )}
          <Table.RowItem {...tableConfig.amount}>{entry.amount}</Table.RowItem>
        </Table.Row>
      ))}
    </StickyTableBody>
  );

  return (
    <Table>
      {header}
      {body}
    </Table>
  );
};

const mapStateToProps = (state) => ({
  recurringTransactionId: getRecurringTransactionId(state),
  entries: getEntries(state),
  order: getOrder(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  showTransactionType: getShowTransactionType(state),
});

export default connect(mapStateToProps)(RecurringTransactionListModalTable);
