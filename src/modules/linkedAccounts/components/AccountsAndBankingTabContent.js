import { FieldGroup, ReadOnly } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankAccountElectronicPayments,
  getBankAccountUndepositedFunds,
  getEquityAccountCurrentEarnings,
  getEquityAccountRetainedEarnings,
  getEquityHistoricalBalancing,
  getIsActionDisabled,
} from '../LinkedAccountsSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';

const AccountsAndBankingTabContent = ({
  bankAccountElectronicPayments,
  bankAccountUndepositedFunds,
  equityAccountCurrentEarnings,
  equityAccountRetainedEarnings,
  equityHistoricalBalancing,
  isDisabled,
  onAccountChange,
  onCreateAccountButtonClick,
}) => (
  <FieldGroup label="Accounting and banking" hideLabel>
    <ReadOnly label="Equity account for current earnings">
      {equityAccountCurrentEarnings.accountName}
    </ReadOnly>
    <ReadOnly label="Equity account for retained earnings">
      {equityAccountRetainedEarnings.accountName}
    </ReadOnly>
    <AccountCombobox
      disabled={isDisabled}
      label="Equity account for historical balancing"
      items={equityHistoricalBalancing.accounts}
      selectedId={equityHistoricalBalancing.accountId}
      onChange={handleComboboxChange(
        'equityHistoricalBalancing',
        onAccountChange
      )}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('equityHistoricalBalancing', onAccountChange)
        )
      }
    />
    <AccountCombobox
      disabled={isDisabled}
      label="Bank account for electronic payments"
      items={bankAccountElectronicPayments.accounts}
      selectedId={bankAccountElectronicPayments.accountId}
      onChange={handleComboboxChange(
        'bankAccountElectronicPayments',
        onAccountChange
      )}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('bankAccountElectronicPayments', onAccountChange)
        )
      }
    />
    <AccountCombobox
      disabled={isDisabled}
      label="Bank account for undeposited funds"
      items={bankAccountUndepositedFunds.accounts}
      selectedId={bankAccountUndepositedFunds.accountId}
      onChange={handleComboboxChange(
        'bankAccountUndepositedFunds',
        onAccountChange
      )}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('bankAccountUndepositedFunds', onAccountChange)
        )
      }
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  bankAccountElectronicPayments: getBankAccountElectronicPayments(state),
  bankAccountUndepositedFunds: getBankAccountUndepositedFunds(state),
  equityAccountCurrentEarnings: getEquityAccountCurrentEarnings(state),
  equityAccountRetainedEarnings: getEquityAccountRetainedEarnings(state),
  equityHistoricalBalancing: getEquityHistoricalBalancing(state),
  isDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(AccountsAndBankingTabContent);
