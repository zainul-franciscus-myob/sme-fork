import { PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsDefaultFilters } from '../selectors/transactionListSelectors';
import { getIsTableEmpty, getIsTableLoading } from '../selectors/creditsAndDebitsSelectors';
import Icon from '../../../components/Icon/Icon';
import JournalTransactionListTableBody from './CreditsAndDebitsListTableBody';
import StickyTableBody from '../../../components/StickyTable/StickyTableBody';
import TransactionEmptyStateIcon from './TransactionEmptyStateIcon';
import style from './JournalTransactionListTable.module.css';

const CreditsAndDebitsListTable = ({
  isTableEmpty,
  isTableLoading,
  isDefaultFilters,
  businessId,
  tableConfig,
}) => {
  const emptyTableView = isDefaultFilters ? (
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
    <StickyTableBody
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyTableView}
    >
      <JournalTransactionListTableBody
        businessId={businessId}
        tableConfig={tableConfig}
      />
    </StickyTableBody>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isDefaultFilters: getIsDefaultFilters(state),
});

export default connect(mapStateToProps)(CreditsAndDebitsListTable);
