import { Button, MobileIcon, Popover } from '@myob/myob-widgets';
import React from 'react';

import AppStore from '../assets/AppStore.svg';
import GooglePlay from '../assets/GooglePlay.svg';
import styles from '../InTrayView.module.css';

const ScanWithPhone = ({ navigateToAppStore, navigateToGooglePlay }) => (
  <Popover
    body={
      <Popover.Body
        child={
          <>
            <h3>Scan with your phone</h3>

            <p>
              Use the MYOB Capture app to scan and send documents to your In
              tray. The app is included in your subscription.
            </p>

            <img
              alt="Download on the App Store"
              className={styles.popoverImage}
              height="40"
              onClick={navigateToAppStore}
              role="presentation"
              src={AppStore}
              width="120"
            />

            <img
              alt="Get it on Google Play"
              className={styles.popoverImage}
              height="40"
              onClick={navigateToGooglePlay}
              role="presentation"
              src={GooglePlay}
              width="126"
            />
          </>
        }
        classes={[styles.popoverBody]}
      />
    }
    className={styles.popover}
    closeOnOuterAction
    preferPlace="above"
  >
    <Button type="link" icon={<MobileIcon />}>
      Scan with your phone
    </Button>
  </Popover>
);

export default ScanWithPhone;
