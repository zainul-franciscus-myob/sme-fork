import { addMonths } from 'date-fns';
import React from 'react';

import { PreviewType } from '../../../templateOptions';
import NZBankDepositPayment from './NZBankDepositPayment';
import NZChequePayment from './NZChequePayment';
import formatSlashDate from '../../../../../common/valueFormatters/formatDate/formatSlashDate';
import styles from './PaymentMethod.module.css';

const NZPaymentMethod = ({
  previewType,
  isAllowPaymentByDirectDeposit,
  isAllowPaymentByCheque,
}) => (
  <div>
    <div className={styles.paymentmethodHeader}>
      <h3>How to pay</h3>
      {previewType === PreviewType.Invoice && (
        <span>
          Due date:
          {' '}
          {formatSlashDate(addMonths(Date.now(), 1))}
        </span>
      )}
    </div>
    <div className={styles.paymentmethodGrid}>
      {isAllowPaymentByDirectDeposit && <NZBankDepositPayment />}
      {isAllowPaymentByCheque && <NZChequePayment />}
    </div>
  </div>
);

export default NZPaymentMethod;
