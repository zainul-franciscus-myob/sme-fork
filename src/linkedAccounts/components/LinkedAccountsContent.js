import { Card } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSelectedTab } from '../LinkedAccountsSelectors';
import AccountsAndBankingTabContent from './AccountsAndBankingTabContent';
import PayrollTabContent from './PayrollTabContent';
import PurchasesTabContent from './PurchasesTabContent';
import SalesTabContent from './SalesTabContent';
import TabItem from '../TabItem';

const LinkedAccountsContent = ({
  selectedTab,
  onAccountChange,
  onHasAccountOptionChange,
}) => (
  <Card>
    {{
      [TabItem.ACCOUNTS_AND_BANKING]: <AccountsAndBankingTabContent
        onAccountChange={onAccountChange}
      />,
      [TabItem.SALES]: <SalesTabContent
        onAccountChange={onAccountChange}
        onHasAccountOptionChange={onHasAccountOptionChange}
      />,
      [TabItem.PURCHASES]: <PurchasesTabContent
        onAccountChange={onAccountChange}
        onHasAccountOptionChange={onHasAccountOptionChange}
      />,
      [TabItem.PAYROLL]: <PayrollTabContent
        onAccountChange={onAccountChange}
      />,
    }[selectedTab]}
  </Card>
);

const mapStateToProps = state => ({
  selectedTab: getSelectedTab(state),
});

export default connect(mapStateToProps)(LinkedAccountsContent);
