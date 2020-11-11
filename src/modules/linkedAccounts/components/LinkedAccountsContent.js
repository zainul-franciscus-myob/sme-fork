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
  onAccountChange,
  onAccountBlur,
  onCreateAccountButtonClick,
  onHasAccountOptionChange,
  selectedTab,
}) => (
  <Card>
    {
      {
        [TabItem.ACCOUNTS_AND_BANKING]: (
          <AccountsAndBankingTabContent
            onAccountChange={onAccountChange}
            onAccountBlur={onAccountBlur}
            onCreateAccountButtonClick={onCreateAccountButtonClick}
          />
        ),
        [TabItem.SALES]: (
          <SalesTabContent
            onAccountChange={onAccountChange}
            onAccountBlur={onAccountBlur}
            onCreateAccountButtonClick={onCreateAccountButtonClick}
            onHasAccountOptionChange={onHasAccountOptionChange}
          />
        ),
        [TabItem.PURCHASES]: (
          <PurchasesTabContent
            onAccountChange={onAccountChange}
            onAccountBlur={onAccountBlur}
            onCreateAccountButtonClick={onCreateAccountButtonClick}
            onHasAccountOptionChange={onHasAccountOptionChange}
          />
        ),
        [TabItem.PAYROLL]: (
          <PayrollTabContent
            onAccountChange={onAccountChange}
            onAccountBlur={onAccountBlur}
            onCreateAccountButtonClick={onCreateAccountButtonClick}
          />
        ),
      }[selectedTab]
    }
  </Card>
);

const mapStateToProps = (state) => ({
  selectedTab: getSelectedTab(state),
});

export default connect(mapStateToProps)(LinkedAccountsContent);
