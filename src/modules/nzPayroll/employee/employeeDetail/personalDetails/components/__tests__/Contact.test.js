import { mount } from 'enzyme';
import React from 'react';

import Contact from '../Contact';
import employeeDetails from '../../../../mappings/data/employeeDetailEntry';

describe('Contact', () => {
  const { personalDetail: pd } = employeeDetails;
  const props = {
    personalDetail: pd,
    showAddPhoneButton: true,
    onPersonalDetailsChange: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  describe('Contact - Should render all the input fields', () => {
    const wrapper = mount(<Contact {...props} />);

    it('Contact view should render PhoneNumberList', () => {
      expect(wrapper.find('PhoneNumberList').exists()).toBeTruthy();
    });

    it('Contact view should render CountryCombobox', () => {
      expect(wrapper.find('CountryCombobox').exists()).toBeTruthy();
    });

    it.each([
      ['TextArea', 'Address', 'address', pd.address],
      ['TextArea', 'Address', 'address', pd.address],
      ['Input', 'City/town', 'suburb', pd.suburb],
      ['Input', 'Region', 'state', pd.state],
      ['Input', 'Postcode', 'postcode', pd.postcode],
      ['Input', 'Email', 'email', pd.email],
    ])(
      'Contact view should render %p with label %p',
      (fieldType, label, name, value) => {
        const fields = wrapper.find({ name }).find(fieldType);

        expect(fields.props()).toMatchObject({
          label,
          name,
          value,
        });
      }
    );

    it.each([
      ['TextArea', 'Address', 'address', pd.address],
      ['TextArea', 'Address', 'address', pd.address],
      ['Input', 'City/town', 'suburb', pd.suburb],
      ['Input', 'Region', 'state', pd.state],
      ['Input', 'Postcode', 'postcode', pd.postcode],
      ['Input', 'Email', 'email', pd.email],
    ])(
      '%p - %p should execute the onEmploymentDetailsChange callback',
      (fieldType, label, name) => {
        const field = wrapper.find({ name }).find(fieldType);
        field.props().onChange({ target: { name, value: '5' } });

        expect(props.onPersonalDetailsChange).toHaveBeenCalledWith({
          key: name,
          value: '5',
        });
      }
    );
  });
});
