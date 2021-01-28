import { Icons, Input, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import AccountNumberInput from '../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import BSBInput from '../../../components/autoFormatter/BankDetailsInput/BSBInput';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const PaymentDetails = ({
  accountNumber,
  accountName,
  bankNumber,
  statementText,
  email,
  onPaymentDetailsChange,
}) => (
  <>
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
    />
    <Input
      name="statementText"
      label="Statement text"
      labelAccessory={
        <Tooltip triggerContent={<Icons.Info />}>
          This will appear on your supplier’s bank statement to help identify
          the payment
        </Tooltip>
      }
      value={statementText}
      onChange={onInputChange(onPaymentDetailsChange)}
      width="lg"
    />
    <Input
      name="email"
      label="Remittance advice email"
      value={email}
      onChange={onInputChange(onPaymentDetailsChange)}
      width="lg"
      maxlength={256}
      labelAccessory={
        <Tooltip triggerContent={<Icons.Info />}>
          If this field is blank, we’ll send the remittance advice to the email
          recorded in the billing details
        </Tooltip>
      }
    />
  </>
);

export default PaymentDetails;
