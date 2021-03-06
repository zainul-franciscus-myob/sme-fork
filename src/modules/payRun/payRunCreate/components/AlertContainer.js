import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert } from '../PayRunSelectors';
import AlertType from '../types/AlertType';
import EtpRequiredAlert from '../employeePayList/components/EtpRequiredAlert';

const AlertContainer = ({ alert, onDismissAlert }) =>
  ({
    [AlertType.ETP_REQUIRED]: (
      <EtpRequiredAlert onDismissAlert={onDismissAlert} />
    ),
    [AlertType.ERROR]: (
      <Alert type="danger" onDismiss={onDismissAlert}>
        {alert.message}
      </Alert>
    ),
  }[alert.type]);

const mapStateToProps = (state) => ({
  alert: getAlert(state),
});

export default connect(mapStateToProps)(AlertContainer);
