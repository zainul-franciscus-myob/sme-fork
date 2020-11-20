import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_CURRENT_STEP } from '../../../OnboardingIntents';
import { findButtonWithTestId } from '../../../../../../../common/tests/selectors';
import OverviewStepModule from '../OverviewStepModule';
import TestStore from '../../../../../../../store/TestStore';
import onboardingReducer from '../../../OnboardingReducer';
import steps from '../../../OnboardingSteps';

describe('OverviewStepModule', () => {
  const constructOverviewStepModule = () => {
    const store = new TestStore(onboardingReducer);

    const overviewStepModule = new OverviewStepModule({
      store,
    });

    const view = overviewStepModule.getView();
    const wrappedView = <Provider store={store}>{view}</Provider>;
    const wrapper = mount(wrappedView);
    wrapper.update();

    return {
      store,
      wrapper,
    };
  };

  describe('Get started button', () => {
    it('should call the next step', () => {
      const { store, wrapper } = constructOverviewStepModule();

      const getStartedButton = findButtonWithTestId(wrapper, 'getStarted');
      getStartedButton.simulate('click');

      expect(store.getActions()).toContainEqual({
        intent: SET_CURRENT_STEP,
        currentStep: steps.AUTHORISE_MYOB,
      });
    });
  });
});
