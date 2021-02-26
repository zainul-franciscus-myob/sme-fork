import { Card } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsNzBusiness, getSelectedTab } from '../LinkedAccountsSelectors';
import AccountsAndBankingTabContent from './AccountsAndBankingTabContent';
import PayrollTabContent from './PayrollTabContent';
import PayrollTabContentNz from './PayrollTabContentNz';
import PurchasesTabContent from './PurchasesTabContent';
import SalesTabContent from './SalesTabContent';
import TabItem from '../TabItem';

const LinkedAccountsContent = ({
  onAccountChange,
  onAccountBlur,
  onCreateAccountButtonClick,
  onHasAccountOptionChange,
  selectedTab,
  isNzBusiness,
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
          <>
            {isNzBusiness ? (
              <PayrollTabContentNz
                onAccountChange={onAccountChange}
                onAccountBlur={onAccountBlur}
                onCreateAccountButtonClick={onCreateAccountButtonClick}
              />
            ) : (
              <PayrollTabContent
                onAccountChange={onAccountChange}
                onAccountBlur={onAccountBlur}
                onCreateAccountButtonClick={onCreateAccountButtonClick}
              />
            )}
          </>
        ),
      }[selectedTab]
    }
  </Card>
);

const mapStateToProps = (state) => ({
  selectedTab: getSelectedTab(state),
  isNzBusiness: getIsNzBusiness(state),
});

export default connect(mapStateToProps)(LinkedAccountsContent);
