import { DatePicker, ReadOnly } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import EmploymentFieldGroup from '../EmploymentFieldGroup';

describe('<EmploymentFieldGroup />', () => {
  afterEach(jest.clearAllMocks);

  const props = {
    startDate: '2000-01-01T00:00:00',
    terminationDate: '2010-01-01T00:00:00',
    employmentStatus: 'Casual',
    onDateChange: jest.fn(),
  };

  describe('startDate field', () => {
    const name = 'startDate';

    it('should display the start date', () => {
      const wrapper = mount(<EmploymentFieldGroup {...props} />);
      const field = wrapper.find({ name }).find(DatePicker);

      expect(field.exists()).toBe(true);
      expect(field.prop('label')).toEqual('Start date');
      expect(field.prop('value')).toEqual(props.startDate);
    });

    it('should execute the onDateChange', () => {
      mount(<EmploymentFieldGroup {...props} />);
      expect(props.onDateChange).toHaveBeenCalledWith(name);
    });
  });

  describe('terminationDate field', () => {
    const name = 'terminationDate';

    it('should display the termination date', () => {
      const wrapper = mount(<EmploymentFieldGroup {...props} />);
      const field = wrapper.find({ name }).find(DatePicker);

      expect(field.exists()).toBe(true);
      expect(field.prop('label')).toEqual('Termination date');
      expect(field.prop('value')).toEqual(props.terminationDate);
    });

    it('should execute the onDateChange', () => {
      mount(<EmploymentFieldGroup {...props} />);
      expect(props.onDateChange).toHaveBeenCalledWith(name);
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
