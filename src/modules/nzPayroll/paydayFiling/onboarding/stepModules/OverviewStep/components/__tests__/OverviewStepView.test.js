import { ButtonRow, Card, PageHead } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import OverviewStepView from '../OverviewStepView';
import TestStore from '../../../../../../../../store/TestStore';
import onboardingReducer from '../../../../OnboardingReducer';

describe('OverviewStepView', () => {
  let store;
  const props = {};

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
      const wrapper = mountWithProvider(<OverviewStepView {...props} />);
      expect(wrapper.exists(PageHead)).toEqual(true);
      expect(wrapper.exists(ButtonRow)).toEqual(true);
      expect(wrapper.exists(Card)).toEqual(true);
    });
  });
});
