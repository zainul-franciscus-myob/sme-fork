import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import LoadingState from '../../../../../../components/PageView/LoadingState';
import PageView from '../../../../../../components/PageView/PageView';
import PayRunView from '../PayRunView';
import PreviousStepModal from '../PreviousStepModal';
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

  describe('previous step modal', () => {
    it('should display the modal when previousStepModalIsOpen is true', () => {
      store.setState({
        ...store.getState(),
        loadingState: LoadingState.LOADING_SUCCESS,
        previousStepModalIsOpen: true,
      });

      const wrapper = mountWithProvider(<PayRunView {...props} />);
      expect(wrapper.exists(PreviousStepModal)).toEqual(true);
    });

    it('should not display the modal when previousStepModalIsOpen is false', () => {
      store.setState({
        ...store.getState(),
        loadingState: LoadingState.LOADING_SUCCESS,
        previousStepModalIsOpen: false,
      });

      const wrapper = mountWithProvider(<PayRunView {...props} />);
      expect(wrapper.exists(PreviousStepModal)).toEqual(false);
    });
  });
});
