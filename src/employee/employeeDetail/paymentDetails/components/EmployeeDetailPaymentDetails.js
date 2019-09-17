import {
  FieldGroup, FormTemplate, Input, ReadOnly, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getElectronicPaymentDetails,
  getPaymentDetails,
  getPaymentMethodOptions,
  getSplitNetPayBetweenOptions,
  getValueOptions,
} from '../PaymentDetailsTabSelectors';
import AccountNumberInput from '../../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import BSBInput from '../../../../components/autoFormatter/BankDetailsInput/BSBInput';
import styles from './EmployeeDetailPaymentDetails.module.css';

const onSelectChange = (handler, index) => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value, index });
};

const onInputChange = (handler, index) => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value, index });
};

const onAmountChange = (handler, index) => (e) => {
  const { name, rawValue } = e.target;
  handler({ key: name, value: rawValue, index });
};

const EmployeeDetailPaymentDetails = ({
  paymentDetails,
  paymentMethodOptions,
  splitNetPayBetweenOptions,
  valueOptions,
  onPaymentDetailsChange,
  onBankAccountDetailsChange,
  showElectronicPaymentDetails,
}) => {
  const {
    paymentMethod,
    splitPayBetween,
    bankStatementText,
    bankAccounts,
  } = paymentDetails;

  const valueOptionsSelect = valueOptions.map(
    option => <Select.Option key={option.name} value={option.value} label={option.name} />,
  );
  const paymentMethodOptionsSelect = paymentMethodOptions.map(
    option => <Select.Option key={option.name} value={option.value} label={option.name} />,
  );
  const splitNetPayBetweenOptionsSelect = splitNetPayBetweenOptions.map(
    option => <Select.Option key={option.name} value={option.value} label={option.name} />,
  );

  const bankAccount = bankAccounts.map((account, index) => {
    const nextIndex = index + 1;

    return (
      <FieldGroup label={`Bank Account ${nextIndex}`} key={nextIndex}>
        <BSBInput label="BSB number" name="bsbNumber" value={account.bsbNumber} onChange={onInputChange(onBankAccountDetailsChange, index)} />
        <AccountNumberInput label="Account number" name="accountNumber" value={account.accountNumber} onChange={onInputChange(onBankAccountDetailsChange, index)} />
        <Input label="Account name" name="accountName" value={account.accountName} onChange={onInputChange(onBankAccountDetailsChange, index)} />
        {
          (bankAccounts.length === nextIndex)
            ? <ReadOnly name="balanceRemaining" label="Amount: ">Balance remaining</ReadOnly>
            : (
              <div>
                <Select label="Value" name="value" value={account.value} onChange={onSelectChange(onBankAccountDetailsChange, index)}>
                  {valueOptionsSelect}
                </Select>
                <AmountInput
                  decimalScale={6}
                  label={`Amount ${account.amountLabel}`}
                  name="amount"
                  value={account.amount}
                  onChange={onAmountChange(onBankAccountDetailsChange, index)}
                />
              </div>
            )
        }
      </FieldGroup>
    );
  });

  const electronicPaymentOptions = showElectronicPaymentDetails && (
    <React.Fragment>
      <div className={styles.splitBank}>
        <Select label="Split net pay between" name="splitPayBetween" value={splitPayBetween} onChange={onSelectChange(onPaymentDetailsChange)}>
          {splitNetPayBetweenOptionsSelect}
        </Select>
        <p className={styles.paragraphPadding}>employee bank accounts</p>
      </div>
      <Input label="Bank statement text" name="bankStatementText" value={bankStatementText} onChange={onInputChange(onPaymentDetailsChange)} />
    </React.Fragment>
  );

  return (
    <FormTemplate pageHead="">
      <FieldGroup label="Payment details">
        <Select label="Payment method" name="paymentMethod" value={paymentMethod} onChange={onSelectChange(onPaymentDetailsChange)}>
          {paymentMethodOptionsSelect}
        </Select>
        {electronicPaymentOptions}
      </FieldGroup>
      {showElectronicPaymentDetails && bankAccount}
    </FormTemplate>
  );
};

const paymentDetailsShape = {
  paymentMethod: PropTypes.string.isRequired,
  splitPayBetween: PropTypes.string.isRequired,
  bankStatementText: PropTypes.string.isRequired,
  bankAccounts: PropTypes.arrayOf(PropTypes.shape({
    bsbNumber: PropTypes.string.isRequired,
    accountNumber: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
    value: PropTypes.string,
    amount: PropTypes.string,
  })),
};

EmployeeDetailPaymentDetails.propTypes = {
  paymentDetails: PropTypes.shape(paymentDetailsShape).isRequired,
  paymentMethodOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  splitNetPayBetweenOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  valueOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onPaymentDetailsChange: PropTypes.func.isRequired,
  onBankAccountDetailsChange: PropTypes.func.isRequired,
  showElectronicPaymentDetails: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  paymentDetails: getPaymentDetails(state),
  paymentMethodOptions: getPaymentMethodOptions(state),
  splitNetPayBetweenOptions: getSplitNetPayBetweenOptions(state),
  valueOptions: getValueOptions(state),
  showElectronicPaymentDetails: getElectronicPaymentDetails(state),
});

export default connect(mapStateToProps)(EmployeeDetailPaymentDetails);
