import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import LearnComponent from '../../../../components/LearnTemplate/LearnComponent';
import WistiaVideoPlayer from '../../../../components/WistiaVideoPlayer/WistiaVideoPlayer';

const BankingLearnView = ({
  onClick,
  businessId,
  serialNumber,
  isLoading,
}) => (
  <LearnComponent
    title="Automatically import your transactions"
    media={<WistiaVideoPlayer hashedId="jm3vreox9s" />}
  >
    <h3>Why connect your bank?</h3>
    <p>
  Automatically import transactions into Essentials daily.
  It&apos;s the fastest, most accurate way to track your cash
  flow and make tax time a breeze.
    </p>
    <h3>How does it work?</h3>
    <ol>
      <li>Connect your bank or credit card</li>
      <li>Transactions automtically imported daily</li>
      <li>See how your business is doing</li>
    </ol>

    <ButtonRow
      secondary={[
        <Button type="primary" key="connectYourBank" disabled={isLoading} onClick={() => onClick(serialNumber, businessId)}>Connect your bank</Button>,
      ]}
    />
  </LearnComponent>);

const mapStateToProps = ({ isLoading, businessId, serialNumber }) => ({
  businessId,
  serialNumber,
  isLoading,
});

export default connect(mapStateToProps)(BankingLearnView);
