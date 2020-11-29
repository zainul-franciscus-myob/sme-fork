import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAllowRemoveLateCharge,
  getAssetAccountTrackingReceivables,
  getBankAccountCustomerReceipts,
  getExpenseSalesAccountDiscounts,
  getIncomeAccountFreight,
  getIncomeAccountLateCharges,
  getIsActionDisabled,
  getLiabilityAccountCustomerDeposits,
} from '../LinkedAccountsSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import ToggleableAccountCombobox from './ToggleableAccountCombobox';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';

const SalesTabContent = ({
  assetAccountTrackingReceivables,
  bankAccountCustomerReceipts,
  expenseSalesAccountDiscounts,
  incomeAccountFreight,
  incomeAccountLateCharges,
  isDisabled,
  allowRemoveLateCharge,
  liabilityAccountCustomerDeposits,
  onAccountChange,
  onAccountBlur,
  onCreateAccountButtonClick,
  onHasAccountOptionChange,
}) => (
  <>
    <FieldGroup label="Asset and bank accounts" hideLabel>
      <AccountCombobox
        disabled={isDisabled}
        label="Asset account for tracking receivables"
        items={assetAccountTrackingReceivables.accounts}
        selectedId={assetAccountTrackingReceivables.accountId}
        onChange={handleComboboxChange(
          'assetAccountTrackingReceivables',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('assetAccountTrackingReceivables')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange(
              'assetAccountTrackingReceivables',
              onAccountChange
            )
          )
        }
        allowClear
      />
      <AccountCombobox
        disabled={isDisabled}
        label="Bank account for customer receipts"
        items={bankAccountCustomerReceipts.accounts}
        selectedId={bankAccountCustomerReceipts.accountId}
        onChange={handleComboboxChange(
          'bankAccountCustomerReceipts',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('bankAccountCustomerReceipts')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange('bankAccountCustomerReceipts', onAccountChange)
          )
        }
        allowClear
      />
    </FieldGroup>
    <FieldGroup label="Income account for freight" hideLabel>
      <ToggleableAccountCombobox
        disabled={isDisabled}
        isChecked={incomeAccountFreight.hasAccount}
        toggleName="incomeAccountFreight"
        toggleLabel="I charge freight on sales"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Income account for freight"
        comboboxSelectedId={incomeAccountFreight.accountId}
        comboboxItems={incomeAccountFreight.accounts}
        comboboxHandler={handleComboboxChange(
          'incomeAccountFreight',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('incomeAccountFreight')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange('incomeAccountFreight', onAccountChange)
          )
        }
      />
    </FieldGroup>
    <FieldGroup label="Liability account for customer deposits" hideLabel>
      <ToggleableAccountCombobox
        disabled={isDisabled}
        isChecked={liabilityAccountCustomerDeposits.hasAccount}
        toggleName="liabilityAccountCustomerDeposits"
        toggleLabel="I track deposits collected from customers"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Liability account for customer deposits"
        comboboxSelectedId={liabilityAccountCustomerDeposits.accountId}
        comboboxItems={liabilityAccountCustomerDeposits.accounts}
        comboboxHandler={handleComboboxChange(
          'liabilityAccountCustomerDeposits',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('liabilityAccountCustomerDeposits')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange(
              'liabilityAccountCustomerDeposits',
              onAccountChange
            )
          )
        }
      />
    </FieldGroup>
    <FieldGroup
      label="Expense or cost of sales account for discounts"
      hideLabel
    >
      <ToggleableAccountCombobox
        disabled={isDisabled}
        isChecked={expenseSalesAccountDiscounts.hasAccount}
        toggleName="expenseSalesAccountDiscounts"
        toggleLabel="I give discounts for early payment"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Expense or cost of sales account for discounts"
        comboboxSelectedId={expenseSalesAccountDiscounts.accountId}
        comboboxItems={expenseSalesAccountDiscounts.accounts}
        comboboxHandler={handleComboboxChange(
          'expenseSalesAccountDiscounts',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('expenseSalesAccountDiscounts')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange(
              'expenseSalesAccountDiscounts',
              onAccountChange
            )
          )
        }
      />
    </FieldGroup>
    <FieldGroup label="Income account for late charges" hideLabel>
      <ToggleableAccountCombobox
        disabled={isDisabled}
        allowRemoval={allowRemoveLateCharge}
        isChecked={incomeAccountLateCharges.hasAccount}
        checkboxLabelAccessory={
          !allowRemoveLateCharge && (
            <Tooltip triggerContent={<Icons.Info />}>
              You must specify an account for late charges when online payment
              surcharge is enabled
            </Tooltip>
          )
        }
        toggleName="incomeAccountLateCharges"
        toggleLabel="I assess charges for late payment and surcharges"
        toggleHandler={handleCheckboxChange(onHasAccountOptionChange)}
        comboboxLabel="Income account for late charges"
        comboboxSelectedId={incomeAccountLateCharges.accountId}
        comboboxItems={incomeAccountLateCharges.accounts}
        comboboxHandler={handleComboboxChange(
          'incomeAccountLateCharges',
          onAccountChange
        )}
        onBlur={() => onAccountBlur('incomeAccountLateCharges')}
        addNewAccount={() =>
          onCreateAccountButtonClick(
            handleComboboxChange('incomeAccountLateCharges', onAccountChange)
          )
        }
      />
    </FieldGroup>
  </>
);

const mapStateToProps = (state) => ({
  assetAccountTrackingReceivables: getAssetAccountTrackingReceivables(state),
  bankAccountCustomerReceipts: getBankAccountCustomerReceipts(state),
  expenseSalesAccountDiscounts: getExpenseSalesAccountDiscounts(state),
  incomeAccountFreight: getIncomeAccountFreight(state),
  incomeAccountLateCharges: getIncomeAccountLateCharges(state),
  isDisabled: getIsActionDisabled(state),
  allowRemoveLateCharge: getAllowRemoveLateCharge(state),
  liabilityAccountCustomerDeposits: getLiabilityAccountCustomerDeposits(state),
});

export default connect(mapStateToProps)(SalesTabContent);
