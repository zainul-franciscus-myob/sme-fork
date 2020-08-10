import { ReadOnly, Select } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import AmountInput from '../../../../../../../components/autoFormatter/AmountInput/AmountInput';
import PayDetailsFieldGroup from '../PayDetailsFieldGroup';

describe('<PayDetailsFieldGroup />', () => {
  afterEach(jest.clearAllMocks);

  const props = {
    hourlyRate: '123.45',
    selectedPayBasis: 'Hourly',
    selectedPayCycle: 'Weekly',

    payCycleOptions: [
      { id: 'weekly', displayName: 'Weekly' },
      { id: 'monthly', displayName: 'Monthly' },
    ],

    onWageDetailsChange: jest.fn(),
  };

  describe('hourlyRateField field', () => {
    const name = 'hourlyRate';
    it('should display the hourlyRate provided', () => {
      const wrapper = mount(<PayDetailsFieldGroup {...props} />);
      const field = wrapper.find({ name }).find(AmountInput);

      expect(field.props()).toMatchObject({
        value: props.hourlyRate,
        label: 'Hourly rate ($)',
      });
    });

    it('should execute the onWageDetailsChange callback', () => {
      const wrapper = mount(<PayDetailsFieldGroup {...props} />);
      wrapper
        .find({ name })
        .find(AmountInput)
        .find('input')
        .simulate('change', { target: { name, value: '3.14' } });

      expect(props.onWageDetailsChange).toHaveBeenCalledWith({
        key: name,
        value: '3.14',
      });
    });
  });

  describe('payBasis field', () => {
    it('should display the payBasis provided', () => {
      const wrapper = mount(<PayDetailsFieldGroup {...props} />);
      const field = wrapper.find({ name: 'selectedPayBasis' }).find(ReadOnly);

      expect(field.props()).toMatchObject({
        label: 'Pay basis',
      });

      expect(field.text()).toContain(props.selectedPayBasis);
    });
  });

  describe('payPeriodHours field', () => {
    const name = 'payPeriodHours';
    const wrapper = mount(<PayDetailsFieldGroup {...props} />);

    it('should display the payPeriodHours provided', () => {
      const field = wrapper.find({ name }).find(AmountInput);

      expect(field.props()).toMatchObject({
        value: props.payPeriodHours,
        label: 'Estimated hours in a pay cycle',
      });
    });

    it('should execute the onWageDetailsChange callback', () => {
      wrapper
        .find({ name })
        .find(AmountInput)
        .find('input')
        .simulate('change', { target: { name, value: '3.14' } });

      expect(props.onWageDetailsChange).toHaveBeenCalledWith({
        key: name,
        value: '3.14',
      });
    });
  });

  describe('pay cycle option select box', () => {
    const name = 'selectedPayCycle';
    it('should display the payCycle provided', () => {
      const wrapper = mount(<PayDetailsFieldGroup {...props} />);
      const field = wrapper.find({ name }).find(Select);

      expect(field.props()).toMatchObject({
        label: 'Pay cycle',
        value: props.selectedPayCycle,
      });
    });

    it('should contain the options provided', () => {
      const wrapper = mount(<PayDetailsFieldGroup {...props} />);
      const field = wrapper.find({ name }).find(Select);

      const optionComponents = field.find(Select.Option);
      const optionProps = optionComponents.map((c) => ({
        displayName: c.prop('label'),
        id: c.prop('value'),
      }));

      expect(optionProps).toEqual(props.payCycleOptions);
    });

    it('should execute the onWageDetailsChange callback', () => {
      const wrapper = mount(<PayDetailsFieldGroup {...props} />);
      wrapper
        .find({ name })
        .find(Select)
        .find('select')
        .simulate('change', { target: { name, value: 'monthly' } });

      expect(props.onWageDetailsChange).toHaveBeenCalledWith({
        key: name,
        value: 'monthly',
      });
    });
  });
});
