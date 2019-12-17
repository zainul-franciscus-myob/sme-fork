import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlertMessage } from '../bankingRuleReceiveMoneySelectors';

const BankingRuleReceiveMoneyAlert = ({ alertMessage, onDismissAlert }) => (
  <Alert
    type="danger"
    onDismiss={onDismissAlert}
  >
    {alertMessage}
  </Alert>
);

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(BankingRuleReceiveMoneyAlert);
