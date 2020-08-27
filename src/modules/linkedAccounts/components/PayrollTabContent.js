import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankAccountCashPayments,
  getBankAccountChequePayments,
  getBankAccountElectronicPayments,
  getEmploymentExpenseAccount,
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
  onAccountChange,
  onCreateAccountButtonClick,
  taxDeductionsPayableAccount,
  wagesExpenseAccount,
}) => (
  <FieldGroup label={'Payroll'} hideLabel>
    <AccountCombobox
      label="Bank account for cash payments"
      items={bankAccountCashPayments.accounts}
      selectedId={bankAccountCashPayments.accountId}
      onChange={handleComboboxChange(
        'bankAccountCashPayments',
        onAccountChange
      )}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('bankAccountCashPayments', onAccountChange)
        )
      }
    />
    <AccountCombobox
      label="Bank account for cheque payments"
      items={bankAccountChequePayments.accounts}
      selectedId={bankAccountChequePayments.accountId}
      onChange={handleComboboxChange(
        'bankAccountChequePayments',
        onAccountChange
      )}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('bankAccountChequePayments', onAccountChange)
        )
      }
    />
    <AccountCombobox
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
      label="Default employer expense account"
      items={employmentExpenseAccount.accounts}
      selectedId={employmentExpenseAccount.accountId}
      onChange={handleComboboxChange(
        'employmentExpenseAccount',
        onAccountChange
      )}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('employmentExpenseAccount', onAccountChange)
        )
      }
    />
    <AccountCombobox
      label="Default wages expense account"
      items={wagesExpenseAccount.accounts}
      selectedId={wagesExpenseAccount.accountId}
      onChange={handleComboboxChange('wagesExpenseAccount', onAccountChange)}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('wagesExpenseAccount', onAccountChange)
        )
      }
    />
    <AccountCombobox
      label="Default tax/deductions payable account"
      items={taxDeductionsPayableAccount.accounts}
      selectedId={taxDeductionsPayableAccount.accountId}
      onChange={handleComboboxChange(
        'taxDeductionsPayableAccount',
        onAccountChange
      )}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('taxDeductionsPayableAccount', onAccountChange)
        )
      }
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  bankAccountCashPayments: getBankAccountCashPayments(state),
  bankAccountChequePayments: getBankAccountChequePayments(state),
  bankAccountElectronicPayments: getBankAccountElectronicPayments(state),
  employmentExpenseAccount: getEmploymentExpenseAccount(state),
  wagesExpenseAccount: getWagesExpenseAccount(state),
  taxDeductionsPayableAccount: getTaxDeductionsPayableAccount(state),
});

export default connect(mapStateToProps)(PayrollTabContent);
