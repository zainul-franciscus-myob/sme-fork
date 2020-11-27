import { BaseTemplate, PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveStepNumber,
  getCurrentStep,
  getLoadingState,
  getStepperSteps,
} from '../OnboardingSelectors';
import PageView from '../../../../../components/PageView/PageView';
import onboardingViewStyles from './OnboardingView.module.css';

const OnboardingView = ({
  stepModules,
  currentStep,
  stepperSteps,
  activeStepNumber,
  loadingState,
}) => {
  const view = (
    <BaseTemplate>
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
});

export default connect(mapStateToProps)(OnboardingView);
