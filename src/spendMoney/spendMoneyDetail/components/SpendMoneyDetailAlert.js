import { Alert } from '@myob/myob-widgets';
import React from 'react';

import styles from './SpendMoneyDetailAlert.css';

const SpendMoneyDetailAlert = props => (
  <div className={`${styles.myobAlert} flx-container`}>
    <Alert {...props} />
  </div>
);

export default SpendMoneyDetailAlert;
