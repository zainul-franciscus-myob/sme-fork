import { Alert as FeelixAlert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert } from '../LinkedAccountsSelectors';

const Alert = ({ alert, onDismissAlert }) => (
  <FeelixAlert
    type={alert.type}
    onDismiss={onDismissAlert}
  >
    {alert.message}
  </FeelixAlert>
);

const mapStateToProps = state => ({
  alert: getAlert(state),
});

export default connect(mapStateToProps)(Alert);
