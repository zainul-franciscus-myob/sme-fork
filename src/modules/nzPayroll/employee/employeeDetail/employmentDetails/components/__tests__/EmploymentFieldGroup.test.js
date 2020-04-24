import { DatePicker, ReadOnly } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import EmploymentFieldGroup from '../EmploymentFieldGroup';

describe('<EmploymentFieldGroup />', () => {
  const props = {
    startDate: '2000-01-01T00:00:00',
    terminationDate: '2010-01-01T00:00:00',
    employmentStatus: 'Casual',
  };

  describe('startDate field', () => {
    it('should display the start date', () => {
      const wrapper = mount(<EmploymentFieldGroup {...props} />);
      const field = wrapper.find({ name: 'startDate' }).find(DatePicker);

      expect(field.exists()).toBe(true);
      expect(field.prop('label')).toEqual('Start date');
      expect(field.prop('value')).toEqual(props.startDate);
    });
  });

  describe('terminationDate field', () => {
    it('should display the termination date', () => {
      const wrapper = mount(<EmploymentFieldGroup {...props} />);
      const field = wrapper.find({ name: 'terminationDate' }).find(DatePicker);

      expect(field.exists()).toBe(true);
      expect(field.prop('label')).toEqual('Termination date');
      expect(field.prop('value')).toEqual(props.terminationDate);
    });
  });

  describe('age field', () => {
    it('should display the age', () => {
      const wrapper = mount(<EmploymentFieldGroup {...props} />);
      const field = wrapper.find({ name: 'employmentStatus' }).find(ReadOnly);

      expect(field.exists()).toBe(true);
      expect(field.prop('label')).toEqual('Employment status');
      expect(field.text()).toContain(props.employmentStatus);
    });
  });
});
