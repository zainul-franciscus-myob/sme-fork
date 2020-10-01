import { Checkbox, FieldGroup, Input, TextArea } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../../EmployeeNzIntents';
import ContactDetailsNzTabView from '../ContactDetailsNzTabView';
import CountryCombobox from '../../../../../../../components/combobox/CountryCombobox';
import TestStore from '../../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../../employeeDetailNzReducer';

const employeeDetails = {
  contactDetail: {
    firstName: 'Bob',
    lastName: 'The builder',
    isInactive: false,
    employeeNumber: '0012',
    country: 'New Zealand',
    address: '2/34 Park Avenue',
    suburb: 'Auckland',
    state: 'Auckland',
    postcode: '7400',
    email: 'bob@thebuilder.com',
    phoneNumbers: ['03 93883848', '03 94839483', '03 94839482'],
    notes: 'notes goes here',
  },
  payrollDetails: {
    employmentDetails: {
      dateOfBirth: '06/02/1987',
      gender: 'Male',
      startDate: '10/10/2018',
      terminationDate: '10/10/2020',
    },
  },
};

const { contactDetail: cd } = employeeDetails;

describe('<ContactDetailsNzTab />', () => {
  let store;

  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('should render Input fields', () => {
    const setup = () => {
      const wrapper = mountWithProvider(<ContactDetailsNzTabView />);
      store.dispatch({
        intent: LOAD_EMPLOYEE_DETAIL,
        payload: employeeDetails,
      });
      wrapper.update();
      return wrapper;
    };

    const fieldWithName = (inputType, name) => (wrapper) =>
      wrapper.type() === inputType && wrapper.props().name === name;

    it.each([
      { label: 'First name', name: 'firstName', data: cd.firstName },
      { label: 'Surname or family name', name: 'lastName', data: cd.lastName },
      {
        label: 'Employee number',
        name: 'employeeNumber',
        data: cd.employeeNumber,
      },
      { label: 'City/town', name: 'suburb', data: cd.suburb },
      { label: 'Postcode', name: 'postcode', data: cd.postcode },
      { label: 'Region', name: 'state', data: cd.state },
      { label: 'Email', name: 'email', data: cd.email },
    ])('Input Field: %p', ({ label, name, data }) => {
      const wrapper = setup();
      const field = wrapper.findWhere(fieldWithName(Input, name));
      expect(field.props()).toEqual(
        expect.objectContaining({
          label,
          name,
          value: data,
        })
      );
    });
  });

  it('should render employee contact details fields', () => {
    const wrapper = mountWithProvider(<ContactDetailsNzTabView />);
    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: employeeDetails });
    wrapper.update();

    expect(wrapper.find({ label: 'Address' }).first().type()).toBe(FieldGroup);

    const inactiveEmpCheckbox = wrapper.find({
      name: 'isInactive',
      label: 'Inactive employee',
    });
    expect(inactiveEmpCheckbox.type()).toBe(Checkbox);

    const addressField = wrapper.find({
      label: 'Address',
      name: 'address',
      value: cd.address,
    });
    expect(addressField.type()).toBe(TextArea);

    const countryField = wrapper
      .find({
        label: 'Country',
        name: 'country',
        selectedId: cd.country,
      })
      .first();
    expect(countryField.type()).toBe(CountryCombobox);

    const notesField = wrapper.find({
      label: 'Notes',
      name: 'notes',
      value: cd.notes,
    });
    expect(notesField.exists()).toBe(true);
  });

  describe('PhoneNumberList', () => {
    it('should render PhoneNumberList without add button ', () => {
      const wrapper = mountWithProvider(<ContactDetailsNzTabView />);
      const payload = employeeDetails;
      store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload });
      wrapper.update();
      expect(wrapper.find('PhoneNumberList').exists()).toBe(true);
      expect(
        wrapper.find('PhoneNumberList').prop('phoneNumbers').length
      ).toEqual(3);
      expect(wrapper.find('PhoneNumberList').prop('hasAddPhoneButton')).toEqual(
        false
      );
    });

    it('should render PhoneNumberList without add button ', () => {
      const wrapper = mountWithProvider(<ContactDetailsNzTabView />);
      const payload = {
        contactDetail: {
          phoneNumbers: [],
        },
        payrollDetails: {
          employmentDetails: {},
        },
      };
      store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload });
      wrapper.update();

      expect(wrapper.find('PhoneNumberList').exists()).toBe(true);
      expect(wrapper.find('PhoneNumberList').prop('hasAddPhoneButton')).toEqual(
        true
      );
    });
  });

  describe('when employee is active', () => {
    it('should have the Inactive employee Checkbox unchecked', () => {
      const response = {
        contactDetail: {
          isInactive: false,
        },
        payrollDetails: {
          employmentDetails: {},
        },
      };
      const wrapper = mountWithProvider(<ContactDetailsNzTabView />);
      store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: response });
      wrapper.update();

      const inactiveEmpCheckbox = wrapper.find({
        name: 'isInactive',
        label: 'Inactive employee',
        checked: response.contactDetail.isInactive,
      });

      expect(inactiveEmpCheckbox.exists()).toBe(true);
    });
  });

  describe('when employee is inactive', () => {
    it('should have the Inactive employee Checkbox checked', () => {
      const response = {
        contactDetail: {
          isInactive: true,
        },
        payrollDetails: {
          employmentDetails: {},
        },
      };
      const wrapper = mountWithProvider(<ContactDetailsNzTabView />);
      store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: response });
      wrapper.update();

      const inactiveEmpCheckbox = wrapper.find({
        name: 'isInactive',
        label: 'Inactive employee',
        checked: response.contactDetail.isInactive,
      });

      expect(inactiveEmpCheckbox.exists()).toBe(true);
    });
  });
});
