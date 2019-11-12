import { BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getModal, getStep,
} from '../PayRunSelectors';
import AlertContainer from './AlertContainer';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import ModalContainer from './ModalContainer';

const PayRunView = ({
  stepViews,
  step,
  isLoading,
  alert,
  modal,
  onDismissAlert,
  onDismissModal,
  onGoBack,
}) => {
  const modalcontainer = modal && (
    <ModalContainer
      modal={modal}
      onDismissModal={onDismissModal}
      onGoBack={onGoBack}
    />
  );

  const alertComponent = alert && (
    <AlertContainer onDismissAlert={onDismissAlert} />
  );

  const view = (
    <BaseTemplate>
      { alertComponent }
      { modalcontainer }
      { stepViews[step] }
    </BaseTemplate>
  );

  return isLoading ? <LoadingPageState /> : view;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  step: getStep(state),
  modal: getModal(state),
});

export default connect(mapStateToProps)(PayRunView);