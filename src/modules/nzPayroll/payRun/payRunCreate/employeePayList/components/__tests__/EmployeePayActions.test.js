import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_SUBMITTING_STATE } from '../../../PayRunIntents';
import EmployeePayActions from '../EmployeePayActions';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('EmployeePayActions', () => {
  let store;
  const props = {};

  beforeEach(() => {
    store = new TestStore(payRunReducer);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = component => mount(component,
    { wrappingComponent: Provider, wrappingComponentProps: { store } });

  describe('When Submitting state is false', () => {
    it('next button should be false', () => {
      const wrapper = mountWithProvider(<EmployeePayActions {...props} />);
      const actionsIsSubmitting = wrapper.find(EmployeePayActions).childAt(0).prop('isSubmitting');
      const buttonDisabledState = wrapper.find('button').prop('disabled');

      expect(actionsIsSubmitting).toEqual(false);
      expect(buttonDisabledState).toEqual(false);
    });
  });

  describe('When Submitting state is true', () => {
    it('next button should be true', () => {
      const wrapper = mountWithProvider(<EmployeePayActions {...props} />);

      store.dispatch({ intent: SET_SUBMITTING_STATE, isSubmitting: true });
      wrapper.update();

      const actionsIsSubmitting = wrapper.find(EmployeePayActions).childAt(0).prop('isSubmitting');
      const buttonDisabledState = wrapper.find('button').prop('disabled');

      expect(actionsIsSubmitting).toEqual(true);
      expect(buttonDisabledState).toEqual(true);
    });
  });
});
