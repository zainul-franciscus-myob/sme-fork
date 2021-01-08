import { mount } from 'enzyme';
import React from 'react';

import Personal from '../Personal';
import employeeDetails from '../../../../mappings/data/employeeDetailEntry';

describe('Personal', () => {
  const { personalDetail: pd } = employeeDetails;
  const props = {
    personalDetail: pd,
    showAddPhoneButton: true,
    onPersonalDetailsChange: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  describe('Personal - Should render all the input fields', () => {
    const wrapper = mount(<Personal {...props} />);

    it('Personal view should render ReadOnly Calculated age field', () => {
      expect(
        wrapper.find('ReadOnly').find({ name: 'calculatedAge' }).exists()
      ).toBeTruthy();
    });

    it.each([
      ['DatePicker', 'Date of birth', 'dateOfBirth', pd.dateOfBirth],
      ['Input', 'First name', 'firstName', pd.firstName],
      ['Input', 'Surname or family name', 'lastName', pd.lastName],
      ['Input', 'Employee number', 'employeeNumber', pd.employeeNumber],
      ['Select', 'Gender', 'gender', pd.gender],
    ])(
      'Personal view should render %p with label %p',
      (fieldType, label, name, value) => {
        const fields = wrapper.find({ name }).find(fieldType);

        expect(fields.props()).toMatchObject({
          label,
          name,
          value,
        });
      }
    );
  });
});
