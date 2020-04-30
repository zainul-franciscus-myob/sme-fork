import { DatePicker, ReadOnly, Select } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import PersonalEmploymentFieldGroup from '../PersonalEmploymentFieldGroup';

describe('<PersonalEmploymentFieldGroup />', () => {
  const props = {
    dateOfBirth: '1980-12-09T00:00:00',
    calculatedAge: 50,
    gender: 'gender1',
    genderOptions: [{ name: 'gender1', value: 'Gender 1' }, { name: 'gender2', value: 'Gender 2' }],
    onDateChange: jest.fn(),
    onSelectChange: jest.fn(),
  };

  describe('dateOfBirth field', () => {
    const name = 'dateOfBirth';
    it('should display the date of birth', () => {
      const wrapper = mount(<PersonalEmploymentFieldGroup {...props} />);
      const field = wrapper.find({ name }).find(DatePicker);

      expect(field.exists()).toBe(true);
      expect(field.prop('label')).toEqual('Date of birth');
      expect(field.prop('value')).toEqual(props.dateOfBirth);
    });
    it('should execute the onDateChange', () => {
      mount(<PersonalEmploymentFieldGroup {...props} />);
      expect(props.onDateChange).toHaveBeenCalledWith(name);
    });
  });


  describe('age field', () => {
    it('should display the age', () => {
      const wrapper = mount(<PersonalEmploymentFieldGroup {...props} />);
      const field = wrapper.find({ name: 'calculatedAge' }).find(ReadOnly);

      expect(field.exists()).toBe(true);
      expect(field.prop('label')).toEqual('Calculated age');
      expect(field.text()).toContain(props.calculatedAge);
    });
  });


  describe('gender field', () => {
    const name = 'gender';
    it('should display the gender', () => {
      const wrapper = mount(<PersonalEmploymentFieldGroup {...props} />);
      const field = wrapper.find({ name }).find(Select);

      expect(field.exists()).toBe(true);
      expect(field.prop('label')).toEqual('Gender');
      expect(field.prop('value')).toEqual(props.gender);
    });
    it('should contain the options provided', () => {
      const wrapper = mount(<PersonalEmploymentFieldGroup {...props} />);
      const field = wrapper.find({ name }).find(Select);

      const optionComponents = field.find(Select.Option);
      const optionProps = optionComponents.map(c => ({ name: c.prop('label'), value: c.prop('value') }));

      expect(optionProps).toEqual(props.genderOptions);
    });
  });
});
