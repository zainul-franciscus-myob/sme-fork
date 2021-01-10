import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import {
  CREATE_ONBOARD_USER,
  SET_ALERT,
  SET_CURRENT_STEP,
  SET_LOADING_STATE,
} from '../../../OnboardingIntents';
import { findButtonWithTestId } from '../../../../../../../common/tests/selectors';
import { onboardUrl } from '../../../mappings/data/onboardUser.json';
import AuthorisationStepModule from '../AuthorisationStepModule';
import LoadingState from '../../../../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../../../../integration/TestIntegration';
import TestStore from '../../../../../../../store/TestStore';
import onboardingReducer from '../../../OnboardingReducer';
import steps from '../../../OnboardingSteps';

describe('AuthorisationStepModule', () => {
  const constructAuthorisationStepModule = () => {
    const store = new TestStore(onboardingReducer);
    const integration = new TestIntegration();
    const navigateTo = jest.fn();

    const authorisationStepModule = new AuthorisationStepModule({
      store,
      integration,
      navigateTo,
    });

    const view = authorisationStepModule.getView();
    const wrappedView = <Provider store={store}>{view}</Provider>;
    const wrapper = mount(wrappedView);

    return {
      store,
      wrapper,
      integration,
      navigateTo,
    };
  };

  describe('Previous button', () => {
    it('should take user to previous step on click and clear any alerts', () => {
      const { store, wrapper } = constructAuthorisationStepModule();

      const previousButton = findButtonWithTestId(wrapper, 'previous');
      previousButton.simulate('click');

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT,
          alert: undefined,
        },
        {
          intent: SET_CURRENT_STEP,
          currentStep: steps.OVERVIEW,
        },
      ]);
    });
  });
  describe('Authorise button', () => {
    it('should navigate to ird onboard url on click', () => {
      const {
        wrapper,
        integration,
        navigateTo,
      } = constructAuthorisationStepModule();

      const authoriseButton = findButtonWithTestId(
        wrapper,
        'confirmAndAuthorise'
      );
      authoriseButton.simulate('click');

      const expected = onboardUrl;

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_ONBOARD_USER,
        }),
      ]);
      expect(navigateTo).toHaveBeenCalledWith(expected);
    });
  });

  it('should load failure screen if integrator call fails', () => {
    const { store, wrapper, integration } = constructAuthorisationStepModule();
    integration.mapFailure(CREATE_ONBOARD_USER);

    const authoriseButton = findButtonWithTestId(
      wrapper,
      'confirmAndAuthorise'
    );
    authoriseButton.simulate('click');

    expect(store.getActions()).toEqual([
      {
        intent: SET_LOADING_STATE,
        loadingState: LoadingState.LOADING,
      },
      {
        intent: SET_ALERT,
        alert: undefined,
      },
      {
        intent: SET_LOADING_STATE,
        loadingState: LoadingState.LOADING_FAIL,
      },
    ]);

    expect(integration.getRequests()).toEqual([
      expect.objectContaining({
        intent: CREATE_ONBOARD_USER,
      }),
    ]);
  });
});
