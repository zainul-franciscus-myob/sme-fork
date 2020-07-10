import { BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsPayrollSetup,
  getLoadingState,
  getPayrollSettingsLink,
  getPreviousStepModalIsOpen,
  getStep,
} from '../PayRunSelectors';
import AlertContainer from './AlertContainer';
import PageView from '../../../../components/PageView/PageView';
import PayrollNotSetup from '../../../../components/Payroll/PayrollNotSetup';
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
  isPayrollSetup,
  payrollSettingsLink,
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

  const view = isPayrollSetup ? (
    <BaseTemplate>
      {alertComponent}
      {previousStepModal}
      {stepViews[step]}
    </BaseTemplate>
  ) : (
    <PayrollNotSetup
      description="Before you can create a pay run, you’ll need to setup your general payroll information."
      payrollSettingsLink={payrollSettingsLink}
    />
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  step: getStep(state),
  previousStepModalIsOpen: getPreviousStepModalIsOpen(state),
  isPayrollSetup: getIsPayrollSetup(state),
  payrollSettingsLink: getPayrollSettingsLink(state),
});

export default connect(mapStateToProps)(PayRunView);
