import { Alert, PageHead, Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveTab,
  getAlert,
  getIsFindAndRecodeEnabled,
} from '../selectors/transactionListSelectors';
import { tabItemIds } from '../tabItems';
import CreditsAndDebitsListView from './CreditsAndDebitsListView';
import JournalTransactionListView from './JournalTransactionListView';

const TransactionListView = ({
  selectedTab,
  onTabSelected,
  alert,
  onDismissAlert,
  pageHeadTitle,
  onUpdateFilters,
  onResetFilters,
  onPeriodChange,
  onSort,
  onLoadMoreButtonClick,
  onRenderFindAndRecode,
  isFindAndRecodeEnabled,
}) => {
  const tabs = (
    <Tabs
      items={[
        { id: tabItemIds.debitsAndCredits, label: 'Debits and credits' },
        { id: tabItemIds.journal, label: 'Transactions' },
        // destructuring empty array does not add extra element
        // undefined elements cause Tabs to crash
        ...(isFindAndRecodeEnabled
          ? [
              {
                id: tabItemIds.findAndRecode,
                label: 'Find and replace',
              },
            ]
          : []),
      ]}
      selected={selectedTab}
      onSelected={onTabSelected}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const pageHead = <PageHead title={pageHeadTitle} />;

  const journalTransactionListView = (
    <JournalTransactionListView
      onSort={onSort}
      onUpdateFilters={onUpdateFilters}
      onResetFilters={onResetFilters}
      onPeriodChange={onPeriodChange}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      pageHead={pageHead}
      subHead={tabs}
      alert={alertComponent}
    />
  );

  const creditsAndDebitsListView = (
    <CreditsAndDebitsListView
      onSort={onSort}
      onUpdateFilters={onUpdateFilters}
      onResetFilters={onResetFilters}
      onPeriodChange={onPeriodChange}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      pageHead={pageHead}
      subHead={tabs}
      alert={alertComponent}
    />
  );

  return {
    [tabItemIds.debitsAndCredits]: creditsAndDebitsListView,
    [tabItemIds.journal]: journalTransactionListView,
    [tabItemIds.findAndRecode]: onRenderFindAndRecode({
      pageHead,
      subHead: tabs,
      alert: alertComponent,
    }),
  }[selectedTab];
};

const mapStateToProps = (state) => ({
  selectedTab: getActiveTab(state),
  alert: getAlert(state),
  isFindAndRecodeEnabled: getIsFindAndRecodeEnabled(state),
});

export default connect(mapStateToProps)(TransactionListView);
