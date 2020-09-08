import { Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getSelectedTab,
  getShouldDisplayAccountsBankingTab,
  getShouldDisplayPayrollTab,
  getShouldDisplayPurchasesTab,
  getShouldDisplaySalesTab,
} from '../LinkedAccountsSelectors';
import TabItem from '../TabItem';

const buildTabItems = (
  shouldDisplayAccountsBankingTab,
  shouldDisplaySalesTab,
  shouldDisplayPurchasesTab,
  shouldDisplayPayrollTab
) => {
  const tabItems = [];

  if (shouldDisplayAccountsBankingTab) {
    tabItems.push({
      id: TabItem.ACCOUNTS_AND_BANKING,
      label: 'Accounts & Banking',
    });
  }
  if (shouldDisplaySalesTab) {
    tabItems.push({
      id: TabItem.SALES,
      label: 'Sales',
    });
  }

  if (shouldDisplayPurchasesTab) {
    tabItems.push({
      id: TabItem.PURCHASES,
      label: 'Purchases',
    });
  }

  if (shouldDisplayPayrollTab) {
    tabItems.push({
      id: TabItem.PAYROLL,
      label: 'Payroll',
    });
  }
  return tabItems;
};

const LinkedAccountsTabs = ({
  selectedTab,
  onSelectTab,
  shouldDisplayAccountsBankingTab,
  shouldDisplaySalesTab,
  shouldDisplayPurchasesTab,
  shouldDisplayPayrollTab,
}) => (
  <Tabs
    items={buildTabItems(
      shouldDisplayAccountsBankingTab,
      shouldDisplaySalesTab,
      shouldDisplayPurchasesTab,
      shouldDisplayPayrollTab
    )}
    selected={selectedTab}
    onSelected={onSelectTab}
  />
);

const mapStateToProps = (state) => ({
  selectedTab: getSelectedTab(state),
  shouldDisplayAccountsBankingTab: getShouldDisplayAccountsBankingTab(state),
  shouldDisplaySalesTab: getShouldDisplaySalesTab(state),
  shouldDisplayPurchasesTab: getShouldDisplayPurchasesTab(state),
  shouldDisplayPayrollTab: getShouldDisplayPayrollTab(state),
});

export default connect(mapStateToProps)(LinkedAccountsTabs);
