import { connect } from 'react-redux';
import React from 'react';

import {
  getIsLoading, getLoadMoreButtonStatus,
} from '../creditsAndDebitsListSelectors';
import JournalTransactionListFilterOptions from './CreditsAndDebitsListFilterOptions';
import JournalTransactionListTable from './CreditsAndDebitsListTable';
import JournalTransactionListTableHeader from './CreditsAndDebitsListTableHeader';
import PageView from '../../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../../components/PaginatedListTemplate/PaginatedListTemplate';

export const tableConfig = {
  date: { columnName: 'Date', valign: 'top' },
  referenceId: { columnName: 'Reference no', valign: 'top' },
  description: { columnName: 'Description', valign: 'top' },
  displayAccountName: { columnName: 'Account', valign: 'top' },
  sourceJournal: { columnName: 'Source journal', valign: 'top' },
  displayDebit: { columnName: 'Debit ($)', valign: 'top', align: 'right' },
  displayCredit: { columnName: 'Credit ($)', valign: 'top', align: 'right' },
};

const CreditsAndDebitsListView = ({
  isLoading,
  onUpdateFilters,
  onApplyFilter,
  onPeriodChange,
  onLoadMoreButtonClick,
  onSort,
  pageHead,
  subHead,
  alert,
  loadMoreButtonStatus,
}) => {
  const filterBar = (
    <JournalTransactionListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
      onPeriodChange={onPeriodChange}
    />
  );

  const transactionListView = (
    <PaginatedListTemplate
      alert={alert}
      pageHead={pageHead}
      filterBar={filterBar}
      subHeadChildren={subHead}
      tableHeader={(
        <JournalTransactionListTableHeader
          onSort={onSort}
          tableConfig={tableConfig}
        />
      )}
      listTable={(
        <JournalTransactionListTable tableConfig={tableConfig} />
      )}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      loadMoreButtonStatus={loadMoreButtonStatus}
    />
  );

  return <PageView isLoading={isLoading} view={transactionListView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
});

export default connect(mapStateToProps)(CreditsAndDebitsListView);
