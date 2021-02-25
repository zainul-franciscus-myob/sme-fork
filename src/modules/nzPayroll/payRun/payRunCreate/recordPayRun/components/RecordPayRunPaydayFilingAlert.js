import { Alert, Button } from '@myob/myob-widgets';
import React from 'react';

import styles from './RecordPayRunView.module.css';

const RecordPayRunPaydayFilingAlert = ({
  isBusinessOnboarded,
  isUserOnboarded,
  onOpenPaydayFilingClick,
}) => (
  <Alert type="info" inline>
    {!isBusinessOnboarded && (
      <div
        className={styles.alertWithLinkButton}
        name="businessNotOnboardedAlert"
      >
        This business is not connected to Payday filing. To submit employment
        information to Inland Revenue,
        <Button
          className={styles.withPaddingRight}
          type="link"
          testid="paydayFilingReportButton"
          onClick={onOpenPaydayFilingClick}
        >
          save pay run and connect to Payday filing
        </Button>
        <b className={styles.withPaddingRight}>before</b> recording this pay
        run.
      </div>
    )}
    {isBusinessOnboarded && !isUserOnboarded && (
      <div name="userNotOnboardedAlert">
        <p>
          This business is set up for payday filing, but you haven&apos;t
          authorised MYOB to send employment information to Inland Revenue on
          your behalf.
        </p>
        <p>You&apos;ll need to either:</p>
        <p>
          <ul>
            <li>
              get someone who&apos;s authorised MYOB for payday filing to submit
              this pay run once you&apos;ve finished, or
            </li>
            <li>
              save this pay run, then authorise MYOB for payday filing and then
              resume this pay run
            </li>
          </ul>
        </p>
      </div>
    )}
  </Alert>
);

export default RecordPayRunPaydayFilingAlert;
