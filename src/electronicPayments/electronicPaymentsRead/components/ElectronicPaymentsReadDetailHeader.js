import {
  DetailHeader,
  ReadOnly,
} from '@myob/myob-widgets';
import React from 'react';


const ElectronicPaymentsReadDetailHeader = ({
  account,
  balance,
  transactionDescription,
  referenceNumber,
  dateOfPayment,
  bankStatementDescription,
}) => {
  const primary = (
    <div>
      <ReadOnly
        name="Bank account"
        label="Account"
      >
        {account}
      </ReadOnly>
      <ReadOnly
        label="Balance"
        name="balance"
      >
        {balance}
      </ReadOnly>
      <ReadOnly
        name="transactionDescription"
        label="Description of transaction"
      >
        {transactionDescription}
      </ReadOnly>
    </div>
  );

  const secondary = (
    <div>
      <ReadOnly
        name="referenceNumber"
        label="Reference number"
        requiredLabel="This field is required"
      >
        {referenceNumber}
      </ReadOnly>
      <ReadOnly
        name="dateOfPayment"
        label="Date of payment"
      >
        {dateOfPayment}
      </ReadOnly>
      <ReadOnly
        name="bankStatementDescription"
        label="Description of your bank statement"
      >
        {bankStatementDescription}
      </ReadOnly>
    </div>
  );

  return (<DetailHeader primary={primary} secondary={secondary} />);
};

export default ElectronicPaymentsReadDetailHeader;
