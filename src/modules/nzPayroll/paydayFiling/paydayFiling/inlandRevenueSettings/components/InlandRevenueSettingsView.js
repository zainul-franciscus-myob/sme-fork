import { Card } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getUserStatusMessage,
  isUserAuthorised,
} from '../../PaydayFilingSelectors';
import InlandRevenueSettingsActions from './InlandRevenueSettingsActions';

const InlandRevenueSettingsView = ({
  userStatusMessage,
  onRemoveAuthorisationClick,
  onAuthoriseClick,
  userAuthorised,
}) => (
  <React.Fragment>
    <Card layout="primary">
      <h1>Authorise MYOB to submit employment information to Inland Revenue</h1>
      <p>
        Use your myIR account user ID and password to authorise MYOB Essentials
        to submit employment information for your business.
      </p>
      <p>
        The account owner must have delegated access to you in myIR for you to
        be able to payday file through the business&apos;s Payroll returns
        account.
      </p>
      <h2>Your current status: {userStatusMessage}</h2>
    </Card>
    <InlandRevenueSettingsActions
      onRemoveAuthorisationClick={onRemoveAuthorisationClick}
      onAuthoriseClick={onAuthoriseClick}
      isUserAuthorised={userAuthorised}
    />
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  userStatusMessage: getUserStatusMessage(state),
  userAuthorised: isUserAuthorised(state),
});

export default connect(mapStateToProps)(InlandRevenueSettingsView);
