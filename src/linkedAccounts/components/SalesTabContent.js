import {
  FieldGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAssetAccountTrackingReceivables,
  getBankAccountCustomerReceipts,
  getExpenseSalesAccountDiscounts,
  getIncomeAccountFreight,
  getIncomeAccountLateCharges,
  getLiabilityAccountCustomerDeposits,
} from '../LinkedAccountsSelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import ToggleableAccountCombobox from './ToggleableAccountCombobox';
import handleCheckboxChange from '../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../components/handlers/handleComboboxChange';

const SalesTabContent = ({
  assetAccountTrackingReceivables,
  bankAccountCustomerReceipts,
  incomeAccountFreight,
  liabilityAccountCustomerDeposits,
  expenseSalesAccountDiscounts,
  incomeAccountLateCharges,
  onAccountChange,
  onHasAccountOptionChange,
}) => (
  <React.Fragment>
    <FieldGroup>
      <AccountCombobox
        label="Asset account for tracking receivables"
        hideLabel={false}
        items={assetAccountTrackingReceivables.accounts}
        selectedId={assetAccountTrackingReceivables.accountId}
        onChange={handleComboboxChange('assetAccountTrackingReceivables', onAccountChange)}
      />
      <AccountCombobox
        label="Bank account for customer receipts"
        hideLabel={false}
        items={bankAccountCustomerReceipts.accounts}
        selectedId={bankAccountCustomerReceipts.accountId}
        onChange={handleComboboxChange('bankAccountCustomerReceipts', onAccountChange)}
      />
    </FieldGroup>
    <FieldGroup>
      <ToggleableAccountCombobox
        isChecked={incomeAccountFreight.hasAccount}
        toggleName="incomeAccountFreight"
        toggleLabel="I charge freight on sales"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Income account for freight"
        comboboxSelectedId={incomeAccountFreight.accountId}
        comboboxItems={incomeAccountFreight.accounts}
        comboboxHandler={handleComboboxChange('incomeAccountFreight', onAccountChange)}
      />
    </FieldGroup>
    <FieldGroup>
      <ToggleableAccountCombobox
        isChecked={liabilityAccountCustomerDeposits.hasAccount}
        toggleName="liabilityAccountCustomerDeposits"
        toggleLabel="I track deposits collected from customers"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Liability account for customer deposits"
        comboboxSelectedId={liabilityAccountCustomerDeposits.accountId}
        comboboxItems={liabilityAccountCustomerDeposits.accounts}
        comboboxHandler={handleComboboxChange('liabilityAccountCustomerDeposits', onAccountChange)}
      />
    </FieldGroup>
    <FieldGroup>
      <ToggleableAccountCombobox
        isChecked={expenseSalesAccountDiscounts.hasAccount}
        toggleName="expenseSalesAccountDiscounts"
        toggleLabel="I give discounts for early payment"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Expense or cost of sales account for discounts"
        comboboxSelectedId={expenseSalesAccountDiscounts.accountId}
        comboboxItems={expenseSalesAccountDiscounts.accounts}
        comboboxHandler={handleComboboxChange('expenseSalesAccountDiscounts', onAccountChange)}
      />
    </FieldGroup>
    <FieldGroup>
      <ToggleableAccountCombobox
        isChecked={incomeAccountLateCharges.hasAccount}
        toggleName="incomeAccountLateCharges"
        toggleLabel="I assess charges for late payment"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Income account for late charges"
        comboboxSelectedId={incomeAccountLateCharges.accountId}
        comboboxItems={incomeAccountLateCharges.accounts}
        comboboxHandler={handleComboboxChange('incomeAccountLateCharges', onAccountChange)}
      />
    </FieldGroup>
  </React.Fragment>
);

const mapStateToProps = state => ({
  assetAccountTrackingReceivables: getAssetAccountTrackingReceivables(state),
  bankAccountCustomerReceipts: getBankAccountCustomerReceipts(state),
  incomeAccountFreight: getIncomeAccountFreight(state),
  liabilityAccountCustomerDeposits: getLiabilityAccountCustomerDeposits(state),
  expenseSalesAccountDiscounts: getExpenseSalesAccountDiscounts(state),
  incomeAccountLateCharges: getIncomeAccountLateCharges(state),
});

export default connect(mapStateToProps)(SalesTabContent);
