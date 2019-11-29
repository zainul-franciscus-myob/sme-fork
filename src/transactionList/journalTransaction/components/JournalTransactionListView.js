import { connect } from 'react-redux';
import React from 'react';

import {
  getIsLoading,
  getLoadMoreButtonStatus,
} from '../journalTransactionListSelectors';
import JournalTransactionListFilterOptions from './JournalTransactionListFilterOptions';
import JournalTransactionListTable from './JournalTransactionListTable';
import JournalTransactionListTableHeader from './JournalTransactionListTableHeader';
import PageView from '../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../components/PaginatedListTemplate/PaginatedListTemplate';

export const tableConfig = {
  date: { width: '11rem', valign: 'top', columnName: 'Date' },
  referenceId: { width: '13rem', valign: 'top', columnName: 'Reference no' },
  description: { width: 'flex-1', valign: 'top', columnName: 'Description' },
  sourceJournal: { width: '15.5rem', valign: 'top', columnName: 'Source journal' },
  displayAmount: {
    width: '12.4rem', valign: 'top', align: 'right', columnName: 'Amount ($)',
  },
};

const JournalTransactionListView = (props) => {
  const {
    isLoading,
    loadMoreButtonStatus,
    onUpdateFilters,
    onUpdateMultiFilters,
    onApplyFilter,
    onSort,
    onLoadMoreButtonClick,
    pageHead,
    subHead,
    alert,
  } = props;

  const filterBar = (
    <JournalTransactionListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onUpdateMultiFilters={onUpdateMultiFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const transactionListTable = (
    <JournalTransactionListTable tableConfig={tableConfig} />
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
      listTable={transactionListTable}
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

export default connect(mapStateToProps)(JournalTransactionListView);
