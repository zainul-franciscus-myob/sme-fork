import {
  Alert, Button, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
  getLoadMoreButtonStatus,
} from '../quoteListSelector';
import PageView from '../../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../../components/PaginatedListTemplate/PaginatedListTemplate';
import QuoteListFilterOptions from './QuoteListFilterOptions';
import QuoteListTable from './QuoteListTable';
import style from './QuoteListView.module.css';

const QuoteListView = (props) => {
  const {
    isLoading,
    alert,
    loadMoreButtonStatus,
    onDismissAlert,
    onUpdateFilters,
    onApplyFilter,
    onSort,
    onAddQuote,
    onLoadQuoteListNextPage,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <QuoteListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const pageHead = (
    <PageHead title="Quotes">
      <Button onClick={onAddQuote}>Create quote</Button>
    </PageHead>
  );

  const quoteList = (
    <div className={style.list}>
      <QuoteListTable onSort={onSort} />
    </div>
  );

  const quoteListView = (
    <PaginatedListTemplate
      pageHead={pageHead}
      filterBar={filterBar}
      alert={alertComponent}
      listTable={quoteList}
      loadMoreButtonStatus={loadMoreButtonStatus}
      onLoadMoreButtonClick={onLoadQuoteListNextPage}
    />
  );

  return <PageView isLoading={isLoading} view={quoteListView} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
});

export default connect(mapStateToProps)(QuoteListView);
