import { PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsDefaultFilters } from '../selectors/transactionListSelectors';
import { getIsTableEmpty, getIsTableLoading } from '../selectors/journalTransactionSelectors';
import Icon from '../../../components/Icon/Icon';
import JournalTransactionListTableBody from './JournalTransactionListTableBody';
import TableView from '../../../components/TableView/TableView';
import TransactionEmptyStateIcon from './TransactionEmptyStateIcon';
import style from './JournalTransactionListTable.module.css';

const JournalTransactionListTable = ({
  isTableEmpty,
  isTableLoading,
  businessId,
  tableConfig,
  isDefaultFilter,
}) => {
  const emptyTableView = isDefaultFilter ? (
    <PageState
      title="Record your first transaction"
      description="Create transactions to record sales, invoices, or general journal entries."
      image={<TransactionEmptyStateIcon className={style['empty-state-icon']} alt="Record your first transaction." />}
    />
  ) : (
    <PageState
      title="No transactions found"
      description="Perhaps check the dates or remove the filters and try again."
      image={<Icon.NoResultState className={style['no-results-icon']} alt="No transactions found." />}
    />
  );

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyTableView}
    >
      <JournalTransactionListTableBody
        businessId={businessId}
        tableConfig={tableConfig}
      />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isDefaultFilter: getIsDefaultFilters(state),
});

export default connect(mapStateToProps)(JournalTransactionListTable);
