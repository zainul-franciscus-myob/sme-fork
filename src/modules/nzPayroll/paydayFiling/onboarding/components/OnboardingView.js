import { Alert, BaseTemplate, PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveStepNumber,
  getAlert,
  getCurrentStep,
  getLoadingState,
  getStepperSteps,
} from '../OnboardingSelectors';
import PageView from '../../../../../components/PageView/PageView';
import onboardingViewStyles from './OnboardingView.module.css';

const OnboardingView = ({
  alert,
  stepModules,
  currentStep,
  stepperSteps,
  activeStepNumber,
  loadingState,
  onDismissAlert,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <BaseTemplate>
      {alertComponent}
      <PageHead title="Connect to payday filing" />

      <div className={onboardingViewStyles.wrapper}>
        <Stepper
          direction="vertical"
          activeStepNumber={activeStepNumber}
          steps={stepperSteps}
        />
        {stepModules[currentStep].getView()}
      </div>
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  currentStep: getCurrentStep(state),
  stepperSteps: getStepperSteps(state),
  activeStepNumber: getActiveStepNumber(state),
  loadingState: getLoadingState(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(OnboardingView);
