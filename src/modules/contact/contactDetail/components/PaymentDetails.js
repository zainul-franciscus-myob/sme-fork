import { FieldGroup, Icons, Input, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsLoadingAccount,
  getPaymentDetails,
} from '../contactDetailSelectors';
import AccountNumberInput from '../../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import BSBInput from '../../../../components/autoFormatter/BankDetailsInput/BSBInput';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const PaymentDetails = ({
  accountNumber,
  accountName,
  bankNumber,
  statementText,
  onPaymentDetailsChange,
}) => (
  <FieldGroup label="Payment details">
    <BSBInput
      label="BSB number"
      labelAccessory={
        <Tooltip triggerContent={<Icons.Info />}>
          Make sure the BSB and account numbers are correct. Your bank may not
          be able to recover the funds from wrong account
        </Tooltip>
      }
      name="bankNumber"
      value={bankNumber}
      onChange={onInputChange(onPaymentDetailsChange)}
      width="lg"
    />
    <AccountNumberInput
      label="Bank account number"
      name="accountNumber"
      value={accountNumber}
      onChange={onInputChange(onPaymentDetailsChange)}
      width="lg"
    />
    <Input
      name="accountName"
      label="Bank account name"
      value={accountName}
      onChange={onInputChange(onPaymentDetailsChange)}
      width="lg"
      maxLength={32}
    />
    <Input
      name="statementText"
      label="Statement text"
      labelAccessory={
        <Tooltip triggerContent={<Icons.Info />}>
          Type a description that will help to identify the transaction on the
          bank statement
        </Tooltip>
      }
      value={statementText}
      onChange={onInputChange(onPaymentDetailsChange)}
      width="lg"
      maxLength={18}
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  ...getPaymentDetails(state),
  isLoadingAccount: getIsLoadingAccount(state),
});

export default connect(mapStateToProps)(PaymentDetails);
