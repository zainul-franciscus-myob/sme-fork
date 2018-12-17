import React from 'react';

import Alert from '../../../components/Alert/Alert';
import styles from './SpendMoneyDetailAlert.css';

const SpendMoneyDetailAlert = props => (
  <div className={`${styles.myobAlert} flx-container`}>
    <Alert {...props} />
  </div>
);

export default SpendMoneyDetailAlert;
