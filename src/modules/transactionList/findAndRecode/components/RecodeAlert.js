import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsRecodeFailure,
  getRecodeFailureMessage,
} from '../findAndRecodeSelectors';

const RecodeAlert = ({ isRecodeFailure, recodeFailureMessage }) => {
  return isRecodeFailure && <Alert type="danger">{recodeFailureMessage}</Alert>;
};

const mapStateToProps = (state) => ({
  isRecodeFailure: getIsRecodeFailure(state),
  recodeFailureMessage: getRecodeFailureMessage(state),
});

export default connect(mapStateToProps)(RecodeAlert);
