import { DetailHeader, FormHorizontal, Input } from '@myob/myob-widgets';
import React from 'react';

import styles from './EmployeePayModalHeader.module.css';

const EmployeePayModalHeader = ({
  paymentMethod,
  accountName,
  balance,
  employeeBankStatementDesc,
  transactionDesc,
  payPeriodStart,
  payPeriodEnd,
  dateOfPayment,
  referenceNumber,
}) => {
  const primary = (
    <>
      <Input label="Payment Method" name="paymentMethod" value={paymentMethod} disabled />
      <Input label="Account" name="account" value={accountName} disabled />
      <FormHorizontal>
        <h4>
          <span>
            Balance
          </span>
          <span className={styles.balanceAmount}>
            {balance}
          </span>
        </h4>
      </FormHorizontal>
      <Input label="Description on employee's bank statement" name="employeeBankStatementDesc" value={employeeBankStatementDesc} disabled />
      <Input label="Pay slip message" name="transactionDesc" value={transactionDesc} disabled />
    </>
  );

  const secondary = (
    <>
      <Input label="Pay period start" name="payPeriodStart" value={payPeriodStart} disabled />
      <Input label="Pay period end" name="payPeriodEnd" value={payPeriodEnd} disabled />
      <Input label="Date of payment" name="dateOfPayment" value={dateOfPayment} disabled />
      <Input label="Reference number" name="referenceNumber" value={referenceNumber} disabled />
    </>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

export default EmployeePayModalHeader;
