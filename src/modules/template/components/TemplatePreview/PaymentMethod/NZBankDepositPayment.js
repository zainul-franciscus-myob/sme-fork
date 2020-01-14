import React from 'react';

import PaymentType from './PaymentType';
import styles from './PaymentMethod.module.css';

const NZBankDepositPayment = () => (
  <PaymentType
    name="Bank deposit via EFT"
    className={styles.paymenttypeDeposit}
  >
    <p>
      <strong>Bank</strong>
      <p>ANZ</p>
    </p>
    <p>
      <strong>Name</strong>
      <p>Coffee House</p>
    </p>
    <p>
      <strong>BSB</strong>
      <p>123-456</p>
    </p>
    <p>
      <strong>AC#</strong>
      <p>12-1234-0012345-01</p>
    </p>
    <p>
      <strong>Ref#</strong>
      <p>00000001</p>
    </p>
  </PaymentType>
);

export default NZBankDepositPayment;
