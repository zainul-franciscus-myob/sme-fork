import {
  FieldGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAssetAccountSupplierDeposits,
  getBankAccountPayingBills,
  getExpenseAccountDiscounts,
  getExpenseAccountLaterCharges,
  getExpenseSalesAccountFreight,
  getLiabilityAccountItemReceipts,
  getLiabilityAccountTrackingPayables,
} from '../LinkedAccountsSelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import ToggleableAccountCombobox from './ToggleableAccountCombobox';
import handleCheckboxChange from '../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../components/handlers/handleComboboxChange';

const PurchasesTabContent = ({
  liabilityAccountTrackingPayables,
  bankAccountPayingBills,
  liabilityAccountItemReceipts,
  expenseSalesAccountFreight,
  assetAccountSupplierDeposits,
  expenseAccountDiscounts,
  expenseAccountLaterCharges,
  onAccountChange,
  onHasAccountOptionChange,
}) => (
  <React.Fragment>
    <FieldGroup>
      <AccountCombobox
        label="Liability account for tracking payables"
        hideLabel={false}
        items={liabilityAccountTrackingPayables.accounts}
        selectedId={liabilityAccountTrackingPayables.accountId}
        onChange={handleComboboxChange('liabilityAccountTrackingPayables', onAccountChange)}
      />
      <AccountCombobox
        label="Bank account for paying bills"
        hideLabel={false}
        items={bankAccountPayingBills.accounts}
        selectedId={bankAccountPayingBills.accountId}
        onChange={handleComboboxChange('bankAccountPayingBills', onAccountChange)}
      />
    </FieldGroup>
    <FieldGroup>
      <ToggleableAccountCombobox
        isChecked={liabilityAccountItemReceipts.hasAccount}
        toggleName="liabilityAccountItemReceipts"
        toggleLabel="I can receive items without a supplier bill"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Liability account for item receipt"
        comboboxSelectedId={liabilityAccountItemReceipts.accountId}
        comboboxItems={liabilityAccountItemReceipts.accounts}
        comboboxHandler={handleComboboxChange('liabilityAccountItemReceipts', onAccountChange)}
      />
    </FieldGroup>
    <FieldGroup>
      <ToggleableAccountCombobox
        isChecked={expenseSalesAccountFreight.hasAccount}
        toggleName="expenseSalesAccountFreight"
        toggleLabel="I pay freight on purchases"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Expense or cost of sales account for freight"
        comboboxSelectedId={expenseSalesAccountFreight.accountId}
        comboboxItems={expenseSalesAccountFreight.accounts}
        comboboxHandler={handleComboboxChange('expenseSalesAccountFreight', onAccountChange)}
      />
    </FieldGroup>
    <FieldGroup>
      <ToggleableAccountCombobox
        isChecked={assetAccountSupplierDeposits.hasAccount}
        toggleName="assetAccountSupplierDeposits"
        toggleLabel="I track deposits paid to suppliers"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Asset account for supplier deposits"
        comboboxSelectedId={assetAccountSupplierDeposits.accountId}
        comboboxItems={assetAccountSupplierDeposits.accounts}
        comboboxHandler={handleComboboxChange('assetAccountSupplierDeposits', onAccountChange)}
      />
    </FieldGroup>
    <FieldGroup>
      <ToggleableAccountCombobox
        isChecked={expenseAccountDiscounts.hasAccount}
        toggleName="expenseAccountDiscounts"
        toggleLabel="I take discounts for early payment"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Expense (or Contra) account for discounts"
        comboboxSelectedId={expenseAccountDiscounts.accountId}
        comboboxItems={expenseAccountDiscounts.accounts}
        comboboxHandler={handleComboboxChange('expenseAccountDiscounts', onAccountChange)}
      />
    </FieldGroup>
    <FieldGroup>
      <ToggleableAccountCombobox
        isChecked={expenseAccountLaterCharges.hasAccount}
        toggleName="expenseAccountLaterCharges"
        toggleLabel="I pay charges for late payment"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Expense account for late charges"
        comboboxSelectedId={expenseAccountLaterCharges.accountId}
        comboboxItems={expenseAccountLaterCharges.accounts}
        comboboxHandler={handleComboboxChange('expenseAccountLaterCharges', onAccountChange)}
      />
    </FieldGroup>
  </React.Fragment>
);

const mapStateToProps = state => ({
  liabilityAccountTrackingPayables: getLiabilityAccountTrackingPayables(state),
  bankAccountPayingBills: getBankAccountPayingBills(state),
  liabilityAccountItemReceipts: getLiabilityAccountItemReceipts(state),
  expenseSalesAccountFreight: getExpenseSalesAccountFreight(state),
  assetAccountSupplierDeposits: getAssetAccountSupplierDeposits(state),
  expenseAccountDiscounts: getExpenseAccountDiscounts(state),
  expenseAccountLaterCharges: getExpenseAccountLaterCharges(state),
});

export default connect(mapStateToProps)(PurchasesTabContent);
