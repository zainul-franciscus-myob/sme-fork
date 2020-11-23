import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_CURRENT_STEP } from '../../../OnboardingIntents';
import { findButtonWithTestId } from '../../../../../../../common/tests/selectors';
import AuthorisationStepModule from '../AuthorisationStepModule';
import TestStore from '../../../../../../../store/TestStore';
import onboardingReducer from '../../../OnboardingReducer';
import steps from '../../../OnboardingSteps';

describe('AuthorisationStepModule', () => {
  const constructAuthorisationStepModule = () => {
    const store = new TestStore(onboardingReducer);
    const authorisationStepModule = new AuthorisationStepModule({
      store,
    });

    const view = authorisationStepModule.getView();
    const wrappedView = <Provider store={store}>{view}</Provider>;
    const wrapper = mount(wrappedView);

    return {
      store,
      wrapper,
    };
  };

  describe('Previous button', () => {
    it('should take user to previous step on click', () => {
      const { store, wrapper } = constructAuthorisationStepModule();

      const previousButton = findButtonWithTestId(wrapper, 'previous');
      previousButton.simulate('click');

      expect(store.getActions()).toContainEqual({
        intent: SET_CURRENT_STEP,
        currentStep: steps.OVERVIEW,
      });
    });
  });
});
