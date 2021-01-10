import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { findButtonWithTestId } from '../../../../../../../common/tests/selectors';
import DoneStepModule from '../DoneStepModule';
import TestStore from '../../../../../../../store/TestStore';
import onboardingReducer from '../../../OnboardingReducer';

describe('DoneStepModule', () => {
  const businessId = 42;

  const constructDoneStepModule = () => {
    const store = new TestStore(onboardingReducer);
    const navigateTo = jest.fn();

    store.setState({
      ...store.getState(),
      businessId,
    });

    const doneStepModule = new DoneStepModule({
      store,
      navigateTo,
    });

    const view = doneStepModule.getView();
    const wrappedView = <Provider store={store}>{view}</Provider>;
    const wrapper = mount(wrappedView);

    return {
      store,
      wrapper,
      navigateTo,
    };
  };

  describe('Onboard success buttons', () => {
    [
      {
        expectedUrl: `/#/nz/${businessId}/employee/new`,
        button: 'createEmployeeButton',
      },
      {
        expectedUrl: `/#/nz/${businessId}/payRun/new`,
        button: 'createPayrunButton',
      },
      {
        expectedUrl: `/#/nz/${businessId}/paydayFiling`,
        button: 'goToPaydayFilingButton',
      },
    ].forEach(({ expectedUrl, button }) => {
      it(`should redirect to ${expectedUrl} when ${button} is clicked`, () => {
        // arrange
        const { wrapper, navigateTo } = constructDoneStepModule();
        const testButton = findButtonWithTestId(wrapper, button);

        // act
        testButton.simulate('click');

        // assert
        expect(navigateTo).toHaveBeenCalledWith(expectedUrl);
      });
    });
  });
});
