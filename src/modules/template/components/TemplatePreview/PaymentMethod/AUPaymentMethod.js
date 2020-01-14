import { addMonths } from 'date-fns';
import React from 'react';

import { PreviewType } from '../../../templateOptions';
import AUBankDepositPayment from './AUBankDepositPayment';
import AUChequePayment from './AUChequePayment';
import BpayPayment from './BpayPayment';
import CreditCardPayment from './CreditCardPayment';
import formatSlashDate from '../../../../../common/valueFormatters/formatDate/formatSlashDate';
import styles from './PaymentMethod.module.css';

const AUPaymentMethod = ({
  previewType,
  isAllowOnlinePayment,
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
      {isAllowOnlinePayment && <BpayPayment />}
      {isAllowOnlinePayment && <CreditCardPayment />}
      {isAllowPaymentByDirectDeposit && <AUBankDepositPayment />}
      {isAllowPaymentByCheque && <AUChequePayment />}
    </div>
  </div>
);

export default AUPaymentMethod;
