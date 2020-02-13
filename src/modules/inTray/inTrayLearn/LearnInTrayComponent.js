import {
  BaseTemplate, Button, ButtonRow, Card, Columns, PageHead,
} from '@myob/myob-widgets';
import React from 'react';

import PageView from '../../../components/PageView/PageView';
import WistiaVideoPlayer from '../../../components/WistiaVideoPlayer/WistiaVideoPlayer';

export default ({ onTryItOut }) => {
  const view = (
    <BaseTemplate>
      <PageHead title="Upload bills and receipts to your In Tray" />
      <Card>
        <Columns>
          <div>
            <h3>Why upload your bills?</h3>
            <p>
              Ditch the paper and upload your bills and receipts to the In tray.
              You’ll always have your source documents at the ready, and we’ll lend a helping hand
              in turning them into transactions.
            </p>
            <h3>How does it work?</h3>
            <p>
              <ol>
                <li>Upload your bills and receipts, from your computer, mobile app or email</li>
                <li>Our smart technology fills most of the data</li>
                <li>Review, record and celebrate doing things right</li>
              </ol>
            </p>
            <ButtonRow secondary={[<Button type="primary" onClick={onTryItOut}>Try it out</Button>]} />
          </div>
          <WistiaVideoPlayer hashedId="l7li66icu0" />
        </Columns>
      </Card>
    </BaseTemplate>
  );
  return <PageView view={view} />;
};
