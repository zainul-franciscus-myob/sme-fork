import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankAccountCashPayments,
  getBankAccountChequePayments,
  getBankAccountElectronicPayments,
  getEmployerDeductionsPayableAccount,
  getIsActionDisabled,
  getKiwiSaverExpenseAccount,
  getOtherDeductionsPayableAccount,
  getWagesExpenseAccount,
} from '../LinkedAccountsSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';

const PayrollTabContentNz = ({
  isDisabled,
  onAccountChange,
  onAccountBlur,
  onCreateAccountButtonClick,

  bankAccountCashPayments,
  bankAccountChequePayments,
  bankAccountElectronicPayments,
  wagesExpenseAccount,
  kiwiSaverExpenseAccount,
  employerDeductionsPayableAccount,
  otherDeductionsPayableAccount,
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
      label="Default KiwiSaver expense account"
      items={kiwiSaverExpenseAccount.accounts}
      selectedId={kiwiSaverExpenseAccount.accountId}
      onChange={handleComboboxChange(
        'kiwiSaverExpenseAccount',
        onAccountChange
      )}
      onBlur={() => onAccountBlur('kiwiSaverExpenseAccount')}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('kiwiSaverExpenseAccount', onAccountChange)
        )
      }
      allowClear
    />

    <AccountCombobox
      disabled={isDisabled}
      label="Default Employer Deductions Payable account"
      items={employerDeductionsPayableAccount.accounts}
      selectedId={employerDeductionsPayableAccount.accountId}
      onChange={handleComboboxChange(
        'employerDeductionsPayableAccount',
        onAccountChange
      )}
      onBlur={() => onAccountBlur('employerDeductionsPayableAccount')}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange(
            'employerDeductionsPayableAccount',
            onAccountChange
          )
        )
      }
      allowClear
    />

    <AccountCombobox
      disabled={isDisabled}
      label="Default Other Deductions Payable account"
      items={otherDeductionsPayableAccount.accounts}
      selectedId={otherDeductionsPayableAccount.accountId}
      onChange={handleComboboxChange(
        'otherDeductionsPayableAccount',
        onAccountChange
      )}
      onBlur={() => onAccountBlur('otherDeductionsPayableAccount')}
      addNewAccount={() =>
        onCreateAccountButtonClick(
          handleComboboxChange('otherDeductionsPayableAccount', onAccountChange)
        )
      }
      allowClear
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  isDisabled: getIsActionDisabled(state),
  bankAccountCashPayments: getBankAccountCashPayments(state),
  bankAccountChequePayments: getBankAccountChequePayments(state),
  bankAccountElectronicPayments: getBankAccountElectronicPayments(state),
  wagesExpenseAccount: getWagesExpenseAccount(state),
  kiwiSaverExpenseAccount: getKiwiSaverExpenseAccount(state),
  employerDeductionsPayableAccount: getEmployerDeductionsPayableAccount(state),
  otherDeductionsPayableAccount: getOtherDeductionsPayableAccount(state),
});

export default connect(mapStateToProps)(PayrollTabContentNz);
