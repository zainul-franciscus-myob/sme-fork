import { Alert as FeelixAlert } from '@myob/myob-widgets';
import React from 'react';

import styles from './Alert.css';

const Alert = props => (
  <div className={`${styles.myobAlert} flx-container`}>
    <FeelixAlert {...props} />
  </div>
);

export default Alert;
