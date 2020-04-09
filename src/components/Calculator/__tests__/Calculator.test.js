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

  const triggerOnChangeForInput = ({ wrapper, name, value }) => {
    const event = {
      target: {
        name,
        value,
      },
    };

    const element = wrapper.find(`.${testClassname}`).at(1);
    element.prop('onChange')(event);
    wrapper.update();
  };

  const triggerOnBlurForInput = ({ wrapper, name, value }) => {
    const event = {
      target: {
        name,
        value,
      },
    };

    const element = wrapper.find(`.${testClassname}`).at(1);
    element.prop('onBlur')(event);
    wrapper.update();
  };

  describe('onChange', () => {
    it('should not trigger if a value is given', () => {
      // Set up
      let actualValue = '';
      const onChange = (e) => { actualValue = e.target.value; };
      const wrapper = setUp({ onChange });

      // Execute
      const value = '1';
      triggerOnChangeForInput({ wrapper, name: 'amount', value });

      // Asert
      expect(actualValue).toEqual('');
    });
  });

  describe('onBlur', () => {
    it('should trigger an onChange and onBlur with the correcly evaluated value', () => {
      // Set up
      let onChangeValue = '';
      let onBlurValue = '';

      const onChange = (e) => { onChangeValue = e.target.value; };
      const onBlur = (e) => { onBlurValue = e.target.value; };
      const wrapper = setUp({ onChange, onBlur });

      // Execute
      const value = '1';
      triggerOnBlurForInput({ wrapper, name: 'amount', value });

      // Asert
      expect(onChangeValue).toEqual(value);
      expect(onBlurValue).toEqual(value);
    });

    it('should not trigger an onChange if the value is empty', () => {
      // Set up
      let onChangeValue = '1';
      let onBlurValue = '1';

      const onChange = (e) => { onChangeValue = e.target.value; };
      const onBlur = (e) => { onBlurValue = e.target.value; };
      const wrapper = setUp({ onChange, onBlur });

      // Execute
      const value = '';
      triggerOnBlurForInput({ wrapper, name: 'amount', value });

      // Asert
      expect(onChangeValue).toEqual('1');
      expect(onBlurValue).toEqual(value);
    });
  });

  describe('CalculatorTooltip', () => {
    describe('when onChange is triggered', () => {
      it('should not be render when input is empty', () => {
        const wrapper = setUp({ onChange: () => { } });

        triggerOnChangeForInput({ wrapper, name: 'amount', value: '' });

        expect(wrapper.find('CalculatorTooltip').exists()).toBe(false);
      });

      it('should not render when input is a number', () => {
        const wrapper = setUp({ onChange: () => { } });

        triggerOnChangeForInput({ wrapper, name: 'amount', value: '123' });

        expect(wrapper.find('CalculatorTooltip').exists()).toBe(false);
      });

      it('should render when input is a calculable expression', () => {
        const wrapper = setUp({ onChange: () => {} });

        triggerOnChangeForInput({ wrapper, name: 'amount', value: '2 + 2' });

        expect(wrapper.find('CalculatorTooltip').exists()).toBe(true);
      });
    });

    describe('when onBlur is triggered', () => {
      it('should disappear if it\'s currently rendered', () => {
        const wrapper = setUp({
          onChange: () => { },
          onBlur: () => { },
        });

        triggerOnChangeForInput({ wrapper, name: 'amount', value: '2 + 2' });

        expect(wrapper.find('CalculatorTooltip').exists()).toBe(true);

        triggerOnBlurForInput({ wrapper, name: 'amount', value: '4' });

        expect(wrapper.find('CalculatorTooltip').exists()).toBe(false);
      });
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
    wrapper.update();

    const updatedValue = wrapper.find(`.${testClassname}`).at(1).prop('value');

    // Asert
    expect(updatedValue).toEqual('5');
  });
});
