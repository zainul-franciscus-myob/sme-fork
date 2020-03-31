import {
  Alert,
  PageHead,
  Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveTab, getAlert } from '../selectors/transactionListSelectors';
import { tabItemIds, tabItems } from '../tabItems';
import CreditsAndDebitsListView from './CreditsAndDebitsListView';
import JournalTransactionListView from './JournalTransactionListView';

const TransactionListView = ({
  selectedTab,
  onTabSelected,
  alert,
  onDismissAlert,
  pageHeadTitle,
  onUpdateFilters,
  onPeriodChange,
  onSort,
  onLoadMoreButtonClick,
}) => {
  const tabs = (
    <Tabs
      items={tabItems}
      selected={selectedTab}
      onSelected={onTabSelected}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const pageHead = (
    <PageHead title={pageHeadTitle} />
  );

  const journalTransactionListView = (
    <JournalTransactionListView
      onSort={onSort}
      onUpdateFilters={onUpdateFilters}
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
  }[selectedTab];
};

const mapStateToProps = state => ({
  selectedTab: getActiveTab(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(TransactionListView);
