import { Alert } from '@myob/myob-widgets';
import React from 'react';

import styles from './SpendMoneyAlert.css';

const SpendMoneyAlert = props => (
  <div className={`${styles.myobAlert} flx-container`}>
    <Alert {...props} />
  </div>
);

export default SpendMoneyAlert;
