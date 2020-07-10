import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import LoadingState from '../../../../../../components/PageView/LoadingState';
import PageView from '../../../../../../components/PageView/PageView';
import PayRunView from '../PayRunView';
import TestStore from '../../../../../../store/TestStore';
import payRunReducer from '../../payRunReducer';

describe('PayRunView', () => {
  let store;
  const props = {
    stepViews: {},
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('when loading', () => {
    it('should set PageView loading state to true', () => {
      const wrapper = mountWithProvider(<PayRunView {...props} />);

      expect(wrapper.find(PageView).props()).toHaveProperty(
        'loadingState',
        LoadingState.LOADING
      );
    });
  });
});
