import { mount } from 'enzyme';
import React from 'react';

import Calculator from '../Calculator';

const mockConsoleMethod = (realConsoleMethod) => {
  const ignoredMessages = [
    'test was not wrapped in act(...)',
  ];

  return (message, ...args) => {
    const containsIgnoredMessage = ignoredMessages.some(
      ignoredMessage => message.includes(ignoredMessage),
    );

    if (!containsIgnoredMessage) {
      realConsoleMethod(message, ...args);
    }
  };
};

describe('Calculator', () => {
  /* We're hiding a specific set of console errors so as to not pollute the console. */
  console.error = jest.fn(mockConsoleMethod(console.error));

  const testClassname = 'test-classname';

  const setUp = ({ onChange, onBlur, value = '' }) => {
    const wrapper = mount(
      <Calculator
        name="garbage"
        label="garbage"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={testClassname}
      />,
    );

    return wrapper;
  };

  describe('onChange', () => {
    it('should trigger if a valid value is given', async () => {
      // Set up
      let actualValue = '';
      const onChange = (e) => { actualValue = e.target.value; };
      const wrapper = setUp({ onChange });

      const event = {
        target: {
          name: 'amount',
          value: '1',
        },
      };

      // Execute
      const element = wrapper.find(`.${testClassname}`).at(1);
      element.prop('onChange')(event);
      wrapper.update();

      // Asert
      expect(actualValue).toEqual('1');
    });

    it('should not trigger if an invalid value is given', async () => {
      // Set up
      let actualValue = '';
      const onChange = (e) => { actualValue = e.target.value; };
      const wrapper = setUp({ onChange });

      const event = {
        target: {
          name: 'amount',
          value: '@',
        },
      };

      // Execute
      const element = wrapper.find(`.${testClassname}`).at(1);
      element.prop('onChange')(event);
      wrapper.update();

      // Asert
      expect(actualValue).toEqual('');
    });
  });

  describe('onBlur', () => {
    it('should trigger an onChange and onBlur with the correcly evaluated value', async () => {
      // Set up
      let onChangeValue = '';
      let onBlurValue = '';

      const onChange = (e) => { onChangeValue = e.target.value; };
      const onBlur = (e) => { onBlurValue = e.target.value; };

      const wrapper = setUp({ onChange, onBlur });

      const event = {
        target: {
          name: 'amount',
          value: '1',
        },
      };

      // Execute
      const element = wrapper.find(`.${testClassname}`).at(1);
      element.prop('onBlur')(event);
      wrapper.update();

      // Asert
      expect(onChangeValue).toEqual('1');
      expect(onBlurValue).toEqual('1');
    });
  });

  describe('CalculatorTooltip', () => {
    it('should not initially be rendered', async () => {
      const wrapper = setUp({});
      expect(wrapper.find('CalculatorTooltip').exists()).toBe(false);
    });

    it('should render when calculator is placed in focus', async () => {
      const wrapper = setUp({});

      const element = wrapper.find(`.${testClassname}`).at(1);
      element.prop('onFocus')();
      wrapper.update();

      expect(wrapper.find('CalculatorTooltip').exists()).toBe(true);
    });

    it('should disappear when calculator is blurred', async () => {
      const wrapper = setUp({
        onChange: () => { },
        onBlur: () => { },
      });

      const element = wrapper.find(`.${testClassname}`).at(1);
      element.prop('onFocus')();
      wrapper.update();

      const focusedElement = wrapper.find(`.${testClassname}`).at(1);
      focusedElement.prop('onBlur')({
        target: {
          name: 'amount',
          value: '1',
        },
      });
      wrapper.update();

      expect(wrapper.find('CalculatorTooltip').exists()).toBe(false);
    });
  });

  it('should update the value of the calculator if the value given by the parent is different to whats in state', () => {
    // Set up
    const wrapper = setUp({ value: '10' });

    // Execute
    wrapper.setProps({
      name: 'garbage',
      label: 'garbage',
      value: '5',
      className: testClassname,
    });

    const updatedValue = wrapper.find(`.${testClassname}`).at(1).prop('value');

    // Asert
    expect(updatedValue).toEqual('5');
  });
});
