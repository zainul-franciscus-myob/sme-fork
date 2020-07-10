import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getAlertType,
} from '../selectors/InventoryModalSelectors';

const InventoryModalAlert = ({ message, type, onDismissAlert }) => (
  <Alert type={type} onDismiss={onDismissAlert}>
    {message}
  </Alert>
);

const mapStateToProps = (state) => ({
  message: getAlertMessage(state),
  type: getAlertType(state),
});

export default connect(mapStateToProps)(InventoryModalAlert);
