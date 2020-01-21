import { FormHorizontal, ReadOnly } from '@myob/myob-widgets';
import React from 'react';

import styles from './AbnMismatch.module.css';

const AbnMismatch = ({
  mismatchedAbns: {
    abnWithStp,
    abnWithPayEvent,
  },
}) => (
  <>
    <h3>Employer information errors</h3>
    <ul>
      <li className={styles.abnMismatch}>
        You can update your ABN by clicking the ATO settings tab above.
        <br />
        <br />
        <FormHorizontal layout="primary">
          <ReadOnly name="businessAbn" label="Business details ABN">
            {abnWithPayEvent}
          </ReadOnly>
          <ReadOnly name="stpAbn" label="ABN linked to ATO">
            {abnWithStp}
          </ReadOnly>
        </FormHorizontal>
      </li>
    </ul>
  </>
);

export default AbnMismatch;
