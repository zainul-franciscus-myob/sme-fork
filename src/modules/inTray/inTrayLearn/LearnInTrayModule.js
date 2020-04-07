import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import LearnComponent from '../../../components/LearnTemplate/LearnComponent';
import WistiaVideoPlayer from '../../../components/WistiaVideoPlayer/WistiaVideoPlayer';
import styles from '../../../components/LearnTemplate/LearnComponent.module.css';

class LearnInTrayModule {
  constructor({ setRootView, globalCallbacks }) {
    this.setRootView = setRootView;
    this.globalCallbacks = globalCallbacks;
  }

  onTryItOut = (region, businessId) => {
    this.globalCallbacks.learnInTrayCompleted();
    window.location.href = `/#/${region}/${businessId}/inTray?appcue=-LzEZZWU-_3DVxhwDx-I`;
  };

  render = (region, businessId) => this.setRootView(
    <LearnComponent
      title="Save time and paper with your In Tray"
      media={<WistiaVideoPlayer hashedId="jlxo7xiunr" />}
    >
      <h3>Make the most of your In Tray</h3>

      <p>
        Ditch the paper and upload your bills and receipts straight into your In Tray.
        You’ll be able to access these documents any time, and we’ll even help out with
        pre-filling your transactions with our Optical Character Recognition (OCR) technology.
      </p>

      <h3>How does your In Tray work?</h3>

      <ol>
        <li>
          Upload your bills and receipts from your computer, mobile app or forward them
          straight from your email
        </li>
        <li>
          Get our smart Optical Character Recognition (OCR) technology to pre-fill most of the data
        </li>
        <li>
          Review the details and record straight away
        </li>
      </ol>

      <div className={styles.buttonContainer}>
        <ButtonRow
          secondary={[
            <Button type="primary" key="tryItOut" onClick={() => this.onTryItOut(region, businessId)}>
              Upload to In Tray
            </Button>,
          ]}
        />
      </div>
    </LearnComponent>,
  );

  run = (context) => {
    const { region, businessId } = context;
    this.render(region, businessId);
  };

  resetState = () => {};

  unsubscribeFromStore = () => {};
}

export default LearnInTrayModule;
