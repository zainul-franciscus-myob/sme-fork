import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import LearnComponent from '../../../components/LearnTemplate/LearnComponent';
import WistiaVideoPlayer from '../../../components/WistiaVideoPlayer/WistiaVideoPlayer';

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
      title="Upload bills and receipts to your In Tray"
      media={<WistiaVideoPlayer hashedId="l7li66icu0" />}
    >
      <h3>Why upload your bills?</h3>

      <p>
        Ditch the paper and upload your bills and receipts to the In tray.
        You’ll always have your source documents at the ready, and we’ll lend a helping hand
        in turning them into transactions.
      </p>

      <h3>How does it work?</h3>

      <ol>
        <li>Upload your bills and receipts, from your computer, mobile app or email</li>
        <li>Our smart technology fills most of the data</li>
        <li>Review, record and celebrate doing things right</li>
      </ol>

      <ButtonRow
        secondary={[
          <Button type="primary" key="tryItOut" onClick={() => this.onTryItOut(region, businessId)}>Try it out</Button>,
        ]}
      />
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
