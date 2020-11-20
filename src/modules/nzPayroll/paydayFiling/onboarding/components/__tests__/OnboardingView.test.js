import { PageHead, Stepper } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import OnboardingView from '../OnboardingView';
import OverviewStepModule from '../../stepModules/OverviewStep/OverviewStepModule';
import OverviewStepView from '../../stepModules/OverviewStep/components/OverviewStepView';
import Steps from '../../OnboardingSteps';
import TestStore from '../../../../../../store/TestStore';
import onboardingReducer from '../../OnboardingReducer';

describe('OnboardingView', () => {
  let store;

  beforeEach(() => {
    store = new TestStore(onboardingReducer);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('On load', () => {
    it('should have all expected components', () => {
      const props = {
        stepModules: {
          [Steps.OVERVIEW]: new OverviewStepModule(store),
        },
      };
      const wrapper = mountWithProvider(<OnboardingView {...props} />);
      expect(wrapper.exists(PageHead)).toEqual(true);
      expect(wrapper.exists(Stepper)).toEqual(true);
      expect(wrapper.exists(OverviewStepView)).toEqual(true);
    });
  });
});
