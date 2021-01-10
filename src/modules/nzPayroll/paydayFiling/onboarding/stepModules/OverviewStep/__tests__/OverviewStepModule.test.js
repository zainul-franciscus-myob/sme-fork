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

    store.resetActions();

    return {
      store,
      wrapper,
    };
  };

  describe('Get started button', () => {
    it('on click should go to authorisation step', () => {
      // arrange
      const { store, wrapper } = constructOverviewStepModule();

      // act
      const getStartedButton = findButtonWithTestId(wrapper, 'getStarted');
      getStartedButton.simulate('click');

      // assert
      expect(store.getActions()).toEqual([
        { intent: SET_CURRENT_STEP, currentStep: steps.AUTHORISE_MYOB },
      ]);
    });
  });
});
