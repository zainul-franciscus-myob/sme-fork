import React from 'react';
import classnames from 'classnames';

import styles from './PaymentMethod.module.css';

const PaymentType = ({ name, children, className, isLoading }) => (
  <>
    {isLoading ? (
      <div className={styles.onlinePaymentLoadingHeader} />
    ) : (
      <h5>{name}</h5>
    )}
    <div className={classnames(styles.paymenttypeContent, className)}>
      {children}
    </div>
  </>
);

export default PaymentType;
