import { BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getPreviousStepModalIsOpen,
  getStepKey,
} from '../PayRunSelectors';
import AlertContainer from './AlertContainer';
import PageView from '../../../../../components/PageView/PageView';
import PreviousStepModal from './PreviousStepModal';

const PayRunView = ({
  stepViews,
  step,
  alert,
  loadingState,
  previousStepModalIsOpen,
  onClosePreviousStepModal,
  onDiscardDraft,
  onDismissAlert,
}) => {
  const previousStepModal = previousStepModalIsOpen && (
    <PreviousStepModal
      onGoBack={onClosePreviousStepModal}
      onDiscard={onDiscardDraft}
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

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  step: getStepKey(state),
  alert: getAlert(state),
  previousStepModalIsOpen: getPreviousStepModalIsOpen(state),
});

export default connect(mapStateToProps)(PayRunView);
