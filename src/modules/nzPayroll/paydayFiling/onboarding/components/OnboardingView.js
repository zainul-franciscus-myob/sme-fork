import { BaseTemplate, PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveStepNumber,
  getCurrentStep,
  getStepperSteps,
} from '../OnboardingSelectors';
import onboardingViewStyles from './OnboardingView.module.css';

const OnboardingView = ({
  stepModules,
  currentStep,
  stepperSteps,
  activeStepNumber,
}) => {
  return (
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
};

const mapStateToProps = (state) => ({
  currentStep: getCurrentStep(state),
  stepperSteps: getStepperSteps(state),
  activeStepNumber: getActiveStepNumber(state),
});

export default connect(mapStateToProps)(OnboardingView);
