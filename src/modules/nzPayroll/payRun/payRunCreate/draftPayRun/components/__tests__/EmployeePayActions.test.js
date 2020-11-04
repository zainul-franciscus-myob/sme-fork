import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_SUBMITTING_STATE } from '../../../PayRunIntents';
import EmployeePayActions from '../EmployeePayActions';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('EmployeePayActions', () => {
  let store;
  const props = {
    onPreviousButtonClick: jest.fn(),
    onNextButtonClick: jest.fn(),
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

  describe('Submitting state', () => {
    [
      { buttonName: 'save', isSubmitting: false },
      { buttonName: 'save', isSubmitting: true },
      { buttonName: 'previous', isSubmitting: false },
      { buttonName: 'previous', isSubmitting: true },
    ].forEach(({ buttonName, isSubmitting }) => {
      it(`When submitting state is ${isSubmitting}, ${buttonName} button should be ${
        isSubmitting ? 'disabled' : 'enabled'
      } `, () => {
        // Arrange
        const wrapper = mountWithProvider(<EmployeePayActions {...props} />);
        const isDisabled = isSubmitting;

        // Act
        store.dispatch({
          intent: SET_SUBMITTING_STATE,
          isSubmitting,
        });
        wrapper.update();

        // Assert
        const actionsIsSubmitting = wrapper
          .find(EmployeePayActions)
          .childAt(0)
          .prop('isSubmitting');
        const buttonDisabledState = wrapper
          .find({ name: buttonName })
          .find('button')
          .prop('disabled');

        expect(actionsIsSubmitting).toEqual(isSubmitting);
        expect(buttonDisabledState).toEqual(isDisabled);
      });
    });
  });

  describe('Employee Pay Actions buttons', () => {
    [
      { buttonName: 'save', expectedHandler: props.onNextButtonClick },
      { buttonName: 'previous', expectedHandler: props.onPreviousButtonClick },
    ].forEach(({ buttonName, expectedHandler }) => {
      it(`Clicking ${buttonName} button should call expected handler`, () => {
        // Arrange
        const wrapper = mountWithProvider(<EmployeePayActions {...props} />);
        const button = wrapper.find({ name: buttonName }).find('button');

        // Act
        button.simulate('click');

        // Assert
        expect(expectedHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
