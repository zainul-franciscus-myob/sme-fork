import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAssetAccountSupplierDeposits,
  getBankAccountPayingBills,
  getExpenseAccountDiscounts,
  getExpenseAccountLaterCharges,
  getExpenseSalesAccountFreight,
  getIsActionDisabled,
  getLiabilityAccountItemReceipts,
  getLiabilityAccountTrackingPayables,
} from '../LinkedAccountsSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import ToggleableAccountCombobox from './ToggleableAccountCombobox';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';

const PurchasesTabContent = ({
  assetAccountSupplierDeposits,
  bankAccountPayingBills,
  expenseAccountDiscounts,
  expenseAccountLaterCharges,
  expenseSalesAccountFreight,
  isDisabled,
  liabilityAccountItemReceipts,
  liabilityAccountTrackingPayables,
  onAccountChange,
  onAccountBlur,
  onCreateAccountButtonClick,
  onHasAccountOptionChange,
}) => (
  <>
    <FieldGroup label="Liability and bank accounts" hideLabel>
      <AccountCombobox
        disabled={isDisabled}
        label="Liability account for tracking payables"
        items={liabilityAccountTrackingPayables.accounts}
        selectedId={liabilityAccountTrackingPayables.accountId}
        onChange={handleComboboxChange(
          'liabilityAccountTrackingPayables',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('liabilityAccountTrackingPayables')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange(
              'liabilityAccountTrackingPayables',
              onAccountChange
            )
          )
        }
        allowClear
      />
      <AccountCombobox
        disabled={isDisabled}
        label="Bank account for paying bills"
        items={bankAccountPayingBills.accounts}
        selectedId={bankAccountPayingBills.accountId}
        onChange={handleComboboxChange(
          'bankAccountPayingBills',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('bankAccountPayingBills')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange('bankAccountPayingBills', onAccountChange)
          )
        }
        allowClear
      />
    </FieldGroup>
    <FieldGroup label="Liability account for item receipt" hideLabel>
      <ToggleableAccountCombobox
        disabled={isDisabled}
        isChecked={liabilityAccountItemReceipts.hasAccount}
        toggleName="liabilityAccountItemReceipts"
        toggleLabel="I can receive items without a supplier bill"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Liability account for item receipt"
        comboboxSelectedId={liabilityAccountItemReceipts.accountId}
        comboboxItems={liabilityAccountItemReceipts.accounts}
        comboboxHandler={handleComboboxChange(
          'liabilityAccountItemReceipts',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('liabilityAccountItemReceipts')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange(
              'liabilityAccountItemReceipts',
              onAccountChange
            )
          )
        }
      />
    </FieldGroup>
    <FieldGroup label="Expense or cost of sales account for freight" hideLabel>
      <ToggleableAccountCombobox
        disabled={isDisabled}
        isChecked={expenseSalesAccountFreight.hasAccount}
        toggleName="expenseSalesAccountFreight"
        toggleLabel="I pay freight on purchases"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Expense or cost of sales account for freight"
        comboboxSelectedId={expenseSalesAccountFreight.accountId}
        comboboxItems={expenseSalesAccountFreight.accounts}
        comboboxHandler={handleComboboxChange(
          'expenseSalesAccountFreight',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('expenseSalesAccountFreight')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange('expenseSalesAccountFreight', onAccountChange)
          )
        }
      />
    </FieldGroup>
    <FieldGroup label="Asset account for supplier deposits" hideLabel>
      <ToggleableAccountCombobox
        disabled={isDisabled}
        isChecked={assetAccountSupplierDeposits.hasAccount}
        toggleName="assetAccountSupplierDeposits"
        toggleLabel="I track deposits paid to suppliers"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Asset account for supplier deposits"
        comboboxSelectedId={assetAccountSupplierDeposits.accountId}
        comboboxItems={assetAccountSupplierDeposits.accounts}
        comboboxHandler={handleComboboxChange(
          'assetAccountSupplierDeposits',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('assetAccountSupplierDeposits')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange(
              'assetAccountSupplierDeposits',
              onAccountChange
            )
          )
        }
      />
    </FieldGroup>
    <FieldGroup label="Expense (or Contra) account for discounts" hideLabel>
      <ToggleableAccountCombobox
        disabled={isDisabled}
        isChecked={expenseAccountDiscounts.hasAccount}
        toggleName="expenseAccountDiscounts"
        toggleLabel="I take discounts for early payment"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Expense (or Contra) account for discounts"
        comboboxSelectedId={expenseAccountDiscounts.accountId}
        comboboxItems={expenseAccountDiscounts.accounts}
        comboboxHandler={handleComboboxChange(
          'expenseAccountDiscounts',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('expenseAccountDiscounts')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange('expenseAccountDiscounts', onAccountChange)
          )
        }
      />
    </FieldGroup>
    <FieldGroup label="Expense account for late charges" hideLabel>
      <ToggleableAccountCombobox
        disabled={isDisabled}
        isChecked={expenseAccountLaterCharges.hasAccount}
        toggleName="expenseAccountLaterCharges"
        toggleLabel="I pay charges for late payment"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Expense account for late charges"
        comboboxSelectedId={expenseAccountLaterCharges.accountId}
        comboboxItems={expenseAccountLaterCharges.accounts}
        comboboxHandler={handleComboboxChange(
          'expenseAccountLaterCharges',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('expenseAccountLaterCharges')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange('expenseAccountLaterCharges', onAccountChange)
          )
        }
      />
    </FieldGroup>
  </>
);

const mapStateToProps = (state) => ({
  assetAccountSupplierDeposits: getAssetAccountSupplierDeposits(state),
  bankAccountPayingBills: getBankAccountPayingBills(state),
  expenseAccountDiscounts: getExpenseAccountDiscounts(state),
  expenseAccountLaterCharges: getExpenseAccountLaterCharges(state),
  expenseSalesAccountFreight: getExpenseSalesAccountFreight(state),
  isDisabled: getIsActionDisabled(state),
  liabilityAccountItemReceipts: getLiabilityAccountItemReceipts(state),
  liabilityAccountTrackingPayables: getLiabilityAccountTrackingPayables(state),
});

export default connect(mapStateToProps)(PurchasesTabContent);
