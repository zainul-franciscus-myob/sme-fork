import { FieldGroup, ReadOnly } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankAccountElectronicPayments,
  getBankAccountUndepositedFunds,
  getEquityAccountCurrentEarnings,
  getEquityAccountRetainedEarnings,
  getEquityHistoricalBalancing,
} from '../LinkedAccountsSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';

const AccountsAndBankingTabContent = ({
  equityAccountCurrentEarnings,
  equityAccountRetainedEarnings,
  equityHistoricalBalancing,
  bankAccountElectronicPayments,
  bankAccountUndepositedFunds,
  onAccountChange,
}) => (
  <FieldGroup>
    <ReadOnly label="Equity account for current earnings">
      {equityAccountCurrentEarnings.accountName}
    </ReadOnly>
    <ReadOnly label="Equity account for retained earnings">
      {equityAccountRetainedEarnings.accountName}
    </ReadOnly>
    <AccountCombobox
      label="Equity account for historical balancing"
      hideLabel={false}
      items={equityHistoricalBalancing.accounts}
      selectedId={equityHistoricalBalancing.accountId}
      onChange={handleComboboxChange(
        'equityHistoricalBalancing',
        onAccountChange
      )}
    />
    <AccountCombobox
      label="Bank account for electronic payments"
      hideLabel={false}
      items={bankAccountElectronicPayments.accounts}
      selectedId={bankAccountElectronicPayments.accountId}
      onChange={handleComboboxChange(
        'bankAccountElectronicPayments',
        onAccountChange
      )}
    />
    <AccountCombobox
      label="Bank account for undeposited funds"
      hideLabel={false}
      items={bankAccountUndepositedFunds.accounts}
      selectedId={bankAccountUndepositedFunds.accountId}
      onChange={handleComboboxChange(
        'bankAccountUndepositedFunds',
        onAccountChange
      )}
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  equityAccountCurrentEarnings: getEquityAccountCurrentEarnings(state),
  equityAccountRetainedEarnings: getEquityAccountRetainedEarnings(state),
  equityHistoricalBalancing: getEquityHistoricalBalancing(state),
  bankAccountElectronicPayments: getBankAccountElectronicPayments(state),
  bankAccountUndepositedFunds: getBankAccountUndepositedFunds(state),
});

export default connect(mapStateToProps)(AccountsAndBankingTabContent);
