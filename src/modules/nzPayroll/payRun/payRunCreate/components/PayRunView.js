import { BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getDiscardModalIsOpen,
  getLoadingState,
  getPreviousStepModalIsOpen,
  getStepKey,
} from '../PayRunSelectors';
import AlertContainer from './AlertContainer';
import DiscardDraftModal from './DiscardDraftModal';
import PageView from '../../../../../components/PageView/PageView';

const PayRunView = ({
  stepViews,
  step,
  alert,
  loadingState,
  previousStepModalIsOpen,
  discardModalIsOpen,
  onClosePreviousStepModal,
  onDiscardDraft,
  onDismissAlert,
  onDiscardAndRedirect,
  onCloseDiscardAndRedirect,
}) => {
  const previousStepModal = previousStepModalIsOpen && (
    <DiscardDraftModal
      onGoBack={onClosePreviousStepModal}
      onDiscard={onDiscardDraft}
    />
  );

  const discardModal = discardModalIsOpen && (
    <DiscardDraftModal
      onGoBack={onCloseDiscardAndRedirect}
      onDiscard={onDiscardAndRedirect}
    />
  );

  const alertComponent = alert && (
    <AlertContainer onDismissAlert={onDismissAlert} />
  );

  const view = (
    <BaseTemplate>
      {alertComponent}
      {previousStepModal}
      {discardModal}
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
  discardModalIsOpen: getDiscardModalIsOpen(state),
});

export default connect(mapStateToProps)(PayRunView);
