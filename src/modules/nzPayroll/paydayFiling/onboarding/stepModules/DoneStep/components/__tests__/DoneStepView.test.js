import { ButtonRow, Card, PageState } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import { findButtonWithTestId } from '../../../../../../../../common/tests/selectors';
import DoneStepView from '../DoneStepView';

describe('DoneStepView', () => {
  const props = {
    onCreateEmployeeClick: jest.fn(),
    onCreatePayrunClick: jest.fn(),
    onGoToPaydayFilingClick: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  const mountComponent = (component) => mount(component);

  describe('when DoneStepView is rendered', () => {
    it('should render all components', () => {
      const wrapper = mountComponent(<DoneStepView {...props} />);
      expect(wrapper.exists(PageState)).toEqual(true);
      expect(wrapper.exists(ButtonRow)).toEqual(true);
      expect(wrapper.exists(Card)).toEqual(true);
    });
  });

  describe('On Success buttons', () => {
    [
      {
        buttonName: 'createEmployeeButton',
        expectedHandler: props.onCreateEmployeeClick,
      },
      {
        buttonName: 'createPayrunButton',
        expectedHandler: props.onCreatePayrunClick,
      },
      {
        buttonName: 'goToPaydayFilingButton',
        expectedHandler: props.onGoToPaydayFilingClick,
      },
    ].forEach(({ buttonName, expectedHandler }) => {
      it(`Clicking ${buttonName} button should call expected handler`, () => {
        // Arrange
        const wrapper = mountComponent(<DoneStepView {...props} />);
        const button = findButtonWithTestId(wrapper, buttonName);

        // Act
        button.simulate('click');

        // Assert
        expect(expectedHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
