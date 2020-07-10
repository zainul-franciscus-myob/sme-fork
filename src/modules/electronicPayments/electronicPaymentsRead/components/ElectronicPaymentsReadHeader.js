import {
  DetailHeader,
  FormHorizontal,
  Input,
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import styles from './ElectronicPaymentsReadHeader.module.css';

const ElectronicPaymentsReadHeader = ({
  account,
  balance,
  transactionDescription,
  referenceNumber,
  dateOfPayment,
  bankStatementDescription,
}) => {
  const primary = (
    <>
      <Input name="account" label="Account" value={account} disabled />
      <FormHorizontal>
        <h4>
          <span>Balance</span>
          <span className={styles.balanceAmount}>{balance}</span>
        </h4>
      </FormHorizontal>
      <Input
        name="transactionDescription"
        label="Description of transaction"
        value={transactionDescription}
        disabled
      />
    </>
  );

  const secondary = (
    <>
      <Input
        name="referenceNumber"
        label="Reference number"
        value={referenceNumber}
        disabled
      />
      <Input
        name="dateOfPayment"
        label="Date of payment"
        value={dateOfPayment}
        disabled
      />
      <Input
        name="bankStatementDescription"
        label="Description"
        value={bankStatementDescription}
        labelAccessory={<Tooltip>Description on your bank statement</Tooltip>}
        disabled
      />
    </>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

export default ElectronicPaymentsReadHeader;
