import { BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getLoadingState, getPreviousStepModalIsOpen, getStep,
} from '../PayRunSelectors';
import AlertContainer from './AlertContainer';
import PageView from '../../../components/PageView/PageView';
import PreviousStepModal from './PreviousStepModal';

const PayRunView = ({
  stepViews,
  step,
  loadingState,
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

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  step: getStep(state),
  previousStepModalIsOpen: getPreviousStepModalIsOpen(state),
});

export default connect(mapStateToProps)(PayRunView);
