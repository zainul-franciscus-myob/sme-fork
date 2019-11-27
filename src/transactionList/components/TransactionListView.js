import {
  Alert,
  PageHead,
  Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveTab, getAlert } from '../transactionListSelectors';
import { tabItems } from '../tabItems';

const TransactionListView = ({
  tabViews,
  selectedTab,
  onTabSelected,
  alert,
  onDismissAlert,
  pageHeadTitle,
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

  return tabViews[selectedTab].getView({ pageHead, alert: alertComponent, subHead: tabs });
};

const mapStateToProps = state => ({
  selectedTab: getActiveTab(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(TransactionListView);
