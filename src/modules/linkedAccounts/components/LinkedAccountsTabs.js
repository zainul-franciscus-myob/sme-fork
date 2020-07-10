import { Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSelectedTab } from '../LinkedAccountsSelectors';
import TabItem from '../TabItem';

const LinkedAccountsTabs = ({ selectedTab, onSelectTab }) => (
  <Tabs
    items={[
      {
        id: TabItem.ACCOUNTS_AND_BANKING,
        label: 'Accounts & Banking',
      },
      {
        id: TabItem.SALES,
        label: 'Sales',
      },
      {
        id: TabItem.PURCHASES,
        label: 'Purchases',
      },
      {
        id: TabItem.PAYROLL,
        label: 'Payroll',
      },
    ]}
    selected={selectedTab}
    onSelected={onSelectTab}
  />
);

const mapStateToProps = (state) => ({
  selectedTab: getSelectedTab(state),
});

export default connect(mapStateToProps)(LinkedAccountsTabs);
