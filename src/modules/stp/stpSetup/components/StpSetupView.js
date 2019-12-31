import {
  BaseTemplate, PageHead, Stepper,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCurrentStepIndex } from '../stpSetupSelectors';
import stpSetupStyles from './stpSetup.module.css';

const getType = (step, index, currentStepIndex) => {
  if (step.getType === undefined) {
    return index < (currentStepIndex) ? 'complete' : 'incomplete';
  }
  return step.getType(index, currentStepIndex);
};

const StpSetupView = ({ steps, currentStepIndex }) => {
  const stepsWithType = steps.map((step, index) => ({
    ...step,
    type: getType(step, index, currentStepIndex),
    number: String(index + 1),
  }));
  const currentStep = steps[currentStepIndex];
  return (
    <BaseTemplate>
      <PageHead title="Set up Single Touch Payroll reporting" />

      <div className={stpSetupStyles.wrapper}>
        <Stepper
          direction="vertical"
          activeStepNumber={String(currentStepIndex + 1)}
          steps={stepsWithType}
        />
        {currentStep.module.getView()}
      </div>

    </BaseTemplate>
  );
};

const mapStateToProps = state => ({
  currentStepIndex: getCurrentStepIndex(state),
});

export default connect(mapStateToProps)(StpSetupView);
