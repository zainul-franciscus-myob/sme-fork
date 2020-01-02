import { BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getPreviousStepModalIsOpen, getStep,
} from '../PayRunSelectors';
import AlertContainer from './AlertContainer';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import PreviousStepModal from './PreviousStepModal';

const PayRunView = ({
  stepViews,
  step,
  isLoading,
  alert,
  previousStepModalIsOpen,
  onDismissAlert,
  onDismissModal,
  onPreviousStepModalGoBack,
}) => {
  const previousStepModal = previousStepModalIsOpen && (
    <PreviousStepModal
      onGoBack={onPreviousStepModalGoBack}
      onCancel={onDismissModal}
    />
  );

  const alertComponent = alert && (
    <AlertContainer onDismissAlert={onDismissAlert} />
  );

  const view = (
    <BaseTemplate>
      {alertComponent}
      {previousStepModal}
      {stepViews[step]}
    </BaseTemplate>
  );

  return isLoading ? <LoadingPageState /> : view;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  step: getStep(state),
  previousStepModalIsOpen: getPreviousStepModalIsOpen(state),
});

export default connect(mapStateToProps)(PayRunView);
