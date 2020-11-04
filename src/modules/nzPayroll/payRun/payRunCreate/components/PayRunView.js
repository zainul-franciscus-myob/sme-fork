import { BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLoadingState,
  getPreviousStepModalIsOpen,
  getStepKey,
} from '../PayRunSelectors';
import PageView from '../../../../../components/PageView/PageView';
import PreviousStepModal from './PreviousStepModal';

const PayRunView = ({
  stepViews,
  step,
  loadingState,
  previousStepModalIsOpen,
  onClosePreviousStepModal,
  onDiscardDraft,
}) => {
  const previousStepModal = previousStepModalIsOpen && (
    <PreviousStepModal
      onGoBack={onClosePreviousStepModal}
      onDiscard={onDiscardDraft}
    />
  );

  const view = (
    <BaseTemplate>
      {previousStepModal}
      {stepViews[step]}
    </BaseTemplate>
  );
  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  step: getStepKey(state),
  previousStepModalIsOpen: getPreviousStepModalIsOpen(state),
});

export default connect(mapStateToProps)(PayRunView);
