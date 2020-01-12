import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert } from '../../selectors/employmentClassificationDetailSelectors';

const EmploymentClassificationDetailAlert = ({
  alert,
  onDismissEmploymentClassificationDetailAlert,
}) => (
  <Alert
    type={alert.type}
    onDismiss={onDismissEmploymentClassificationDetailAlert}
  >
    {alert.message}
  </Alert>
);

const mapStateToProps = state => ({
  alert: getAlert(state),
});

export default connect(mapStateToProps)(EmploymentClassificationDetailAlert);
