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
  onAccountBlur,
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
      onBlur={() => onAccountBlur('equityHistoricalBalancing')}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('equityHistoricalBalancing', onAccountChange)
        )
      }
      allowClear
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
      onBlur={() => onAccountBlur('bankAccountElectronicPayments')}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('bankAccountElectronicPayments', onAccountChange)
        )
      }
      allowClear
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
      onBlur={() => onAccountBlur('bankAccountUndepositedFunds')}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('bankAccountUndepositedFunds', onAccountChange)
        )
      }
      allowClear
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
