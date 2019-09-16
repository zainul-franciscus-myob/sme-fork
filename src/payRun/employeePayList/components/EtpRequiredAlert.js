import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvalidEtpNames } from '../EmployeePayListSelectors';

const EtpRequiredAlert = ({ invalidEtpNames, onDismiss }) => (
  <Alert type="danger" onDismiss={onDismiss}>
    {'Looks like your processing a an Employment Termination Payment (ETP). Add an ETP benefit code for'}
    <ul>
      {
      invalidEtpNames.map(name => (
        <li>{name}</li>
      ))
    }
    </ul>
  </Alert>
);

const mapStateToProps = state => ({
  invalidEtpNames: getInvalidEtpNames(state),
});

export default connect(mapStateToProps)(EtpRequiredAlert);
