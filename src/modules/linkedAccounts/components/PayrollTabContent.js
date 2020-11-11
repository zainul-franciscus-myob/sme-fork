import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankAccountCashPayments,
  getBankAccountChequePayments,
  getBankAccountElectronicPayments,
  getEmploymentExpenseAccount,
  getIsActionDisabled,
  getTaxDeductionsPayableAccount,
  getWagesExpenseAccount,
} from '../LinkedAccountsSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';

const PayrollTabContent = ({
  bankAccountCashPayments,
  bankAccountChequePayments,
  bankAccountElectronicPayments,
  employmentExpenseAccount,
  isDisabled,
  onAccountChange,
  onAccountBlur,
  onCreateAccountButtonClick,
  taxDeductionsPayableAccount,
  wagesExpenseAccount,
}) => (
  <FieldGroup label={'Payroll'} hideLabel>
    <AccountCombobox
      disabled={isDisabled}
      label="Bank account for cash payments"
      items={bankAccountCashPayments.accounts}
      selectedId={bankAccountCashPayments.accountId}
      onChange={handleComboboxChange(
        'bankAccountCashPayments',
        onAccountChange
      )}
      onBlur={() => onAccountBlur('bankAccountCashPayments')}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('bankAccountCashPayments', onAccountChange)
        )
      }
      allowClear
    />
    <AccountCombobox
      disabled={isDisabled}
      label="Bank account for cheque payments"
      items={bankAccountChequePayments.accounts}
      selectedId={bankAccountChequePayments.accountId}
      onChange={handleComboboxChange(
        'bankAccountChequePayments',
        onAccountChange
      )}
      onBlur={() => onAccountBlur('bankAccountChequePayments')}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('bankAccountChequePayments', onAccountChange)
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
      label="Default employer expense account"
      items={employmentExpenseAccount.accounts}
      selectedId={employmentExpenseAccount.accountId}
      onChange={handleComboboxChange(
        'employmentExpenseAccount',
        onAccountChange
      )}
      onBlur={() => onAccountBlur('employmentExpenseAccount')}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('employmentExpenseAccount', onAccountChange)
        )
      }
      allowClear
    />
    <AccountCombobox
      disabled={isDisabled}
      label="Default wages expense account"
      items={wagesExpenseAccount.accounts}
      selectedId={wagesExpenseAccount.accountId}
      onChange={handleComboboxChange('wagesExpenseAccount', onAccountChange)}
      onBlur={() => onAccountBlur('wagesExpenseAccount')}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('wagesExpenseAccount', onAccountChange)
        )
      }
      allowClear
    />
    <AccountCombobox
      disabled={isDisabled}
      label="Default tax/deductions payable account"
      items={taxDeductionsPayableAccount.accounts}
      selectedId={taxDeductionsPayableAccount.accountId}
      onChange={handleComboboxChange(
        'taxDeductionsPayableAccount',
        onAccountChange
      )}
      onBlur={() => onAccountBlur('taxDeductionsPayableAccount')}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('taxDeductionsPayableAccount', onAccountChange)
        )
      }
      allowClear
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  bankAccountCashPayments: getBankAccountCashPayments(state),
  bankAccountChequePayments: getBankAccountChequePayments(state),
  bankAccountElectronicPayments: getBankAccountElectronicPayments(state),
  employmentExpenseAccount: getEmploymentExpenseAccount(state),
  isDisabled: getIsActionDisabled(state),
  taxDeductionsPayableAccount: getTaxDeductionsPayableAccount(state),
  wagesExpenseAccount: getWagesExpenseAccount(state),
});

export default connect(mapStateToProps)(PayrollTabContent);
