import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import {
  GET_IRD_NUMBER,
  SET_CURRENT_STEP,
  SET_IRD_NUMBER,
  SET_LOADING_STATE,
} from '../../../OnboardingIntents';
import { findButtonWithTestId } from '../../../../../../../common/tests/selectors';
import { irdNumber } from '../../../mappings/data/getIrdNumber';
import LoadingState from '../../../../../../../components/PageView/LoadingState';
import OverviewStepModule from '../OverviewStepModule';
import TestIntegration from '../../../../../../../integration/TestIntegration';
import TestStore from '../../../../../../../store/TestStore';
import onboardingReducer from '../../../OnboardingReducer';
import steps from '../../../OnboardingSteps';

describe('OverviewStepModule', () => {
  const constructOverviewStepModule = () => {
    const store = new TestStore(onboardingReducer);
    const integration = new TestIntegration();
    const overviewStepModule = new OverviewStepModule({
      store,
      integration,
    });

    const view = overviewStepModule.getView();
    const wrappedView = <Provider store={store}>{view}</Provider>;
    const wrapper = mount(wrappedView);
    wrapper.update();

    store.resetActions();
    integration.resetRequests();

    return {
      store,
      wrapper,
      integration,
    };
  };

  describe('Get started button', () => {
    it('should get ird number and go to next step', () => {
      // arrange
      const { store, wrapper, integration } = constructOverviewStepModule();

      integration.mapSuccess(GET_IRD_NUMBER, { irdNumber });

      // act
      const getStartedButton = findButtonWithTestId(wrapper, 'getStarted');
      getStartedButton.simulate('click');

      // assert
      expect(store.getActions()).toEqual([
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        { intent: SET_IRD_NUMBER, irdNumber },
        { intent: SET_CURRENT_STEP, currentStep: steps.AUTHORISE_MYOB },
      ]);
    });

    it('should display loading failure when integration call fails', () => {
      // arrange
      const { store, wrapper, integration } = constructOverviewStepModule();

      integration.mapFailure(GET_IRD_NUMBER);

      // act
      const getStartedButton = findButtonWithTestId(wrapper, 'getStarted');
      getStartedButton.simulate('click');

      // assert
      expect(store.getActions()).toEqual([
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING_FAIL },
      ]);
    });
  });
});
