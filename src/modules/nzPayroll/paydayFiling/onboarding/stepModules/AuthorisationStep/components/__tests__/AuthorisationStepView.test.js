import { ButtonRow, Card, PageHead } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { findButtonWithTestId } from '../../../../../../../../common/tests/selectors';
import AuthorisationStepView from '../AuthorisationStepView';
import TestStore from '../../../../../../../../store/TestStore';
import TfnInput from '../../../../../../../../components/autoFormatter/TfnInput/TfnInput';
import onboardingReducer from '../../../../OnboardingReducer';

describe('AuthorisationStepView', () => {
  let store;
  const props = {
    onPreviousClick: jest.fn(),
    onAuthorisationClick: jest.fn(),
  };

  const initialState = {
    irdNumber: '',
  };

  beforeEach(() => {
    store = new TestStore(onboardingReducer, initialState);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('On render', () => {
    it('should have all expected components', () => {
      const wrapper = mountWithProvider(<AuthorisationStepView {...props} />);
      expect(wrapper.exists(PageHead)).toEqual(true);
      expect(wrapper.exists(ButtonRow)).toEqual(true);
      expect(wrapper.exists(Card)).toEqual(true);
    });
  });

  describe('ird number', () => {
    it('should be disabled', () => {
      const wrapper = mountWithProvider(<AuthorisationStepView {...props} />);
      expect(wrapper.exists(TfnInput)).toEqual(true);
      expect(wrapper.find(TfnInput).prop('disabled')).toBe(true);
    });

    it('value should be read from store', () => {
      store.setState({
        ...store.getState(),
        irdNumber: '12312313',
      });

      const wrapper = mountWithProvider(<AuthorisationStepView {...props} />);
      expect(wrapper.find(TfnInput).prop('value')).toEqual('12312313');
    });
  });

  describe('buttons', () => {
    [
      { buttonTestId: 'previous', expectedHandler: props.onPreviousClick },
      {
        buttonTestId: 'confirmAndAuthorise',
        expectedHandler: props.onAuthorisationClick,
      },
    ].forEach(({ buttonTestId, expectedHandler }) => {
      it(`Clicking ${buttonTestId} button should call expected handler`, () => {
        // Arrange
        const wrapper = mountWithProvider(<AuthorisationStepView {...props} />);
        const button = findButtonWithTestId(wrapper, buttonTestId);

        // Act
        button.simulate('click');

        // Assert
        expect(expectedHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
