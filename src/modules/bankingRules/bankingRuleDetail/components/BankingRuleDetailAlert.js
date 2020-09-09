import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert } from '../bankingRuleDetailSelectors';

const BankingRuleDetailAlert = ({ alert, onDismissAlert }) => (
  <Alert type={alert.type} onDismiss={onDismissAlert}>
    {alert.message}
  </Alert>
);

const mapStateToProps = (state) => ({
  alert: getAlert(state),
});

export default connect(mapStateToProps)(BankingRuleDetailAlert);
