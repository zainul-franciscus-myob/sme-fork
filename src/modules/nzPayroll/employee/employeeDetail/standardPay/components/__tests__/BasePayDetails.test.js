import { Select } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import BasePayDetails from '../BasePayDetails';
import employeeDetails from '../../../../mappings/data/employeeDetailEntry';

describe('BasePayDetails', () => {
  const props = {
    basePayDetails: employeeDetails.payrollDetails.wage,
    payCycleOptions: employeeDetails.payCycleOptions,
    onWageDetailsChange: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  describe('BasePayDetails - Should render all fields', () => {
    const wrapper = mount(<BasePayDetails {...props} />);

    it(' should render ReadOnly selected PayBasis field', () => {
      const field = wrapper.find('ReadOnly').find({ name: 'selectedPayBasis' });

      expect(field.exists()).toBeTruthy();
    });

    it(' should render Select with pay cycle options', () => {
      const field = wrapper.find({ name: 'selectedPayCycle' }).find(Select);

      expect(field.exists()).toBeTruthy();
      expect(field.prop('label')).toEqual('Pay cycle');
      expect(field.prop('value')).toEqual(
        props.basePayDetails.selectedPayCycle
      );
    });

    it('should execute the onWageDetailsChange callback', () => {
      const name = 'selectedPayCycle';
      const field = wrapper.find({ name }).find(Select);

      field.props().onChange({ target: { name, value: '1' } });

      expect(props.onWageDetailsChange).toHaveBeenCalledWith({
        key: name,
        value: '1',
      });
    });
  });
});
