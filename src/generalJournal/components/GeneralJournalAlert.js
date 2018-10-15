import { Alert } from '@myob/myob-widgets';
import React from 'react';

import styles from './GeneralJournalAlert.css';

const GeneralJournalAlert = props => (
  <div className={`${styles.myobAlert} flx-container`}>
    <Alert {...props} />
  </div>
);

export default GeneralJournalAlert;
