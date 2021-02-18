import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsReadOnly,
  getReadOnlyMessage,
} from '../selectors/RecurringBillSelectors';

const RecurringBillAlert = ({
  alert,
  readOnlyMessage,
  isReadOnly,
  onDismissAlert,
}) => (
  <>
    {alert && (
      <Alert type={alert.type} onDismiss={onDismissAlert}>
        {alert.message}
      </Alert>
    )}
    {isReadOnly && <Alert type="info">{readOnlyMessage}</Alert>}
  </>
);

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  readOnlyMessage: getReadOnlyMessage(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(RecurringBillAlert);
