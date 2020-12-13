import { FieldGroup } from '@myob/myob-widgets';
import React from 'react';

import RecurringScheduleOptions from './RecurringScheduleOptions';
import styles from './RecurringScheduleWrapper.module.css';

const RecurringScheduleWrapper = (props) => (
  <FieldGroup label="Schedule details" className={styles.container}>
    <RecurringScheduleOptions {...props} />
  </FieldGroup>
);

export default RecurringScheduleWrapper;
