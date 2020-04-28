
import { ReadOnly, Select } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import AmountInput from '../../../../../../../components/autoFormatter/AmountInput/AmountInput';
import PayDetailsFieldGroup from '../PayDetailsFieldGroup';

describe('<PayDetailsFieldGroup />', () => {
  const props = {
    hourlyRate: '123.45',
    selectedPayBasis: 'Hourly',
    selectedPayCycle: 'Weekly',

    payCycleOptions: [
      { id: 'weekly', displayName: 'Weekly' },
    ],
  };

  describe('hourlyRateField field', () => {
    it('should display the hourlyRate provided', () => {
      const wrapper = mount(<PayDetailsFieldGroup {...props} />);
      const field = wrapper
        .find({ name: 'hourlyRate' })
        .find(AmountInput);

      expect(field.props()).toMatchObject({
        value: props.hourlyRate,
        label: 'Hourly rate ($)',
      });
    });
  });

  describe('payBasis field', () => {
    it('should display the hourlyRate provided', () => {
      const wrapper = mount(<PayDetailsFieldGroup {...props} />);
      const field = wrapper
        .find({ name: 'payBasis' })
        .find(ReadOnly);

      expect(field.props()).toMatchObject({
        label: 'Pay basis',
      });

      expect(field.text()).toContain(props.selectedPayBasis);
    });
  });

  describe('pay cycle option select box', () => {
    it('should display the payCycle provided', () => {
      const wrapper = mount(<PayDetailsFieldGroup {...props} />);
      const field = wrapper
        .find({ name: 'payCycle' })
        .find(Select);

      expect(field.props()).toMatchObject({
        label: 'Pay cycle',
        value: props.selectedPayCycle,
      });
    });

    it('should contain the options provided', () => {
      const wrapper = mount(<PayDetailsFieldGroup {...props} />);
      const field = wrapper
        .find({ name: 'payCycle' })
        .find(Select);

      const optionComponents = field.find(Select.Option);
      const optionProps = optionComponents.map(c => ({ displayName: c.prop('label'), id: c.prop('value') }));

      expect(optionProps).toEqual(props.payCycleOptions);
    });
  });
});
