import { FormHorizontal, ReadOnly } from '@myob/myob-widgets';
import React from 'react';

import styles from './BaseInformation.module.css';

const BaseInformation = ({
  declaredBy,
  declarationDate,
  eventType,
  payPeriod,
  paymentDate,
  recordedDate,
  employeeCount,
  gross,
  tax,
}) => (
  <div className={styles.baseInformation}>
    <h3>Declaration information</h3>
    <FormHorizontal>
      <ReadOnly label="Declared by" name="declaredBy">{declaredBy}</ReadOnly>
      <ReadOnly label="Date declared" name="declarationDate">{declarationDate}</ReadOnly>
      <ReadOnly label="Event type" name="eventType">{eventType}</ReadOnly>
    </FormHorizontal>
    <hr />
    <h3>Pay run</h3>
    <FormHorizontal>
      <ReadOnly label="Pay period" name="payPeriod">{payPeriod}</ReadOnly>
      <ReadOnly label="Paid on date" name="paymentDate">{paymentDate}</ReadOnly>
      <ReadOnly label="Date recorded" name="recordedDate">{recordedDate}</ReadOnly>
      <ReadOnly label="Employees" name="employeesCount">{employeeCount}</ReadOnly>
      <ReadOnly label="Gross payments ($)" name="gross">{gross}</ReadOnly>
      <ReadOnly label="PAYG withholding ($)" name="tax">{tax}</ReadOnly>
    </FormHorizontal>
  </div>
);

export default BaseInformation;
