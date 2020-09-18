import { Alert, Button, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadMoreButtonStatus,
  getLoadingState,
} from '../quoteListSelectors';
import PageView from '../../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../../components/PaginatedListTemplate/PaginatedListTemplate';
import QuoteListFilterOptions from './QuoteListFilterOptions';
import QuoteListTable from './QuoteListTable';
import QuoteListTableHeader from './QuoteListTableHeader';
import styles from './QuoteListView.module.css';

const tableConfig = {
  displayDate: { columnName: 'Date', valign: 'top' },
  referenceId: { columnName: 'Quote number', valign: 'top' },
  customer: { columnName: 'Customer', valign: 'top' },
  purchaseOrder: {
    columnName: 'Customer PO number',
    valign: 'top',
    className: styles.columnPurchaseOrder,
  },
  displayAmount: {
    columnName: 'Amount ($)',
    valign: 'top',
    align: 'right',
    width: '12.5rem',
  },
  emailStatus: {
    columnName: 'Sent',
    valign: 'top',
    align: 'center',
    width: '7.5rem',
    className: styles.columnSent,
  },
  displayExpiryDate: { columnName: 'Expiry Date', valign: 'top' },
  status: { columnName: 'Status', valign: 'top', width: '11rem' },
};

const QuoteListView = ({
  loadingState,
  alert,
  loadMoreButtonStatus,
  onDismissAlert,
  onUpdateFilters,
  onResetFilters,
  onSort,
  onAddQuote,
  onLoadQuoteListNextPage,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <QuoteListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onResetFilters={onResetFilters}
    />
  );

  const pageHead = (
    <PageHead title="Quotes">
      <Button onClick={onAddQuote}>Create quote</Button>
    </PageHead>
  );

  const tableHeader = (
    <QuoteListTableHeader tableConfig={tableConfig} onSort={onSort} />
  );

  const listTable = (
    <QuoteListTable tableConfig={tableConfig} onAddQuote={onAddQuote} />
  );

  const quoteListView = (
    <PaginatedListTemplate
      pageHead={pageHead}
      filterBar={filterBar}
      alert={alertComponent}
      tableHeader={tableHeader}
      listTable={listTable}
      loadMoreButtonStatus={loadMoreButtonStatus}
      onLoadMoreButtonClick={onLoadQuoteListNextPage}
    />
  );

  return <PageView loadingState={loadingState} view={quoteListView} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
});

export default connect(mapStateToProps)(QuoteListView);
