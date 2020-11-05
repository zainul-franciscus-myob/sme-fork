import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import RecordPayRunActions from '../RecordPayRunActions';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('RecordPayRunActions', () => {
  let store;
  const props = {
    onPreviousButtonClick: jest.fn(),
    onRecordButtonClick: jest.fn(),
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

  describe('Record Pay Actions buttons', () => {
    [
      { buttonName: 'save', expectedHandler: props.onRecordButtonClick },
      { buttonName: 'previous', expectedHandler: props.onPreviousButtonClick },
    ].forEach(({ buttonName, expectedHandler }) => {
      it(`Clicking ${buttonName} button should call expected handler`, () => {
        // Arrange
        const wrapper = mountWithProvider(<RecordPayRunActions {...props} />);
        const button = wrapper.find({ name: buttonName }).find('button');
        // Act
        button.simulate('click');
        // Assert
        expect(expectedHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
