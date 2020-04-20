
import {
  Checkbox,
  FieldGroup,
  Input,
  TextArea,
} from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../../EmployeeNzIntents';
import ContactDetailsNzTabView from '../contactDetailsNzTab';
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
    phoneNumbers: [
      '03 93883848',
      '03 94839483',
      '03 94839482',
    ],
    notes: 'notes goes here',
  },
};

const { contactDetail: cd } = employeeDetails;

describe('<ContactDetailsNzTabView />', () => {
  let store;

  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  const mountWithProvider = component => mount(component,
    { wrappingComponent: Provider, wrappingComponentProps: { store } });

  describe('should render Input fields', () => {
    const setup = () => {
      const wrapper = mountWithProvider(<ContactDetailsNzTabView />);
      store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, ...employeeDetails });
      wrapper.update();
      return wrapper;
    };

    const fieldWithName = (inputType, name) => (wrapper) => (
      wrapper.type() === inputType && wrapper.props().name === name
    );

    it.each([
      { label: 'First name', name: 'firstName', data: cd.firstName },
      { label: 'Surname or family name', name: 'lastName', data: cd.lastName },
      { label: 'Employee number', name: 'employeeNumber', data: cd.employeeNumber },
      { label: 'City/town', name: 'city', data: cd.suburb },
      { label: 'Postcode', name: 'postcode', data: cd.postcode },
      { label: 'Region', name: 'region', data: cd.state },
      { label: 'Email', name: 'email', data: cd.email },
      { label: 'Phone', name: 'phone1', data: cd.phoneNumbers[0] },
      { label: 'Phone', name: 'phone2', data: cd.phoneNumbers[1] },
      { label: 'Phone', name: 'phone3', data: cd.phoneNumbers[2] },
    ])('Input Field: %p', ({
      label, name, data,
    }) => {
      const wrapper = setup();
      const field = wrapper.findWhere(fieldWithName(Input, name));
      expect(field.props()).toEqual(expect.objectContaining({
        label,
        name,
        value: data,
        disabled: true,
      }));
    });
  });

  it('should render employee contact details fields', () => {
    const wrapper = mountWithProvider(<ContactDetailsNzTabView />);
    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, ...employeeDetails });
    wrapper.update();

    expect(wrapper.find({ label: 'Address' }).first().type()).toBe(FieldGroup);

    const inactiveEmpCheckbox = wrapper.find(
      {
        name: 'isInactive',
        label: 'Inactive employee',
      },
    );
    expect(inactiveEmpCheckbox.type()).toBe(Checkbox);
    expect(inactiveEmpCheckbox.prop('disabled')).toBe(true);

    const addressField = wrapper.find(
      {
        label: 'Address',
        name: 'address',
        value: cd.address,
      },
    );
    expect(addressField.type()).toBe(TextArea);
    expect(addressField.prop('disabled')).toBe(true);

    const countryField = wrapper.find(
      {
        label: 'Country',
        name: 'country',
        selectedId: cd.country,
      },
    ).first();
    expect(countryField.type()).toBe(CountryCombobox);
    expect(countryField.prop('disabled')).toBe(true);

    const notesField = wrapper.find(
      {
        label: 'Notes',
        name: 'notes',
        value: cd.notes,
      },
    );
    expect(notesField.exists()).toBe(true);
  });

  describe('when employee is active', () => {
    it('should have the Inactive employee Checkbox unchecked', () => {
      const response = {
        contactDetail: {
          isInactive: false,
        },
      };
      const wrapper = mountWithProvider(<ContactDetailsNzTabView />);
      store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, ...response });
      wrapper.update();

      const inactiveEmpCheckbox = wrapper.find(
        {
          name: 'isInactive',
          label: 'Inactive employee',
          checked: response.contactDetail.isInactive,
        },
      );

      expect(inactiveEmpCheckbox.exists()).toBe(true);
    });
  });

  describe('when employee is inactive', () => {
    it('should have the Inactive employee Checkbox checked', () => {
      const response = {
        contactDetail: {
          isInactive: true,
        },
      };
      const wrapper = mountWithProvider(<ContactDetailsNzTabView />);
      store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, ...response });
      wrapper.update();

      const inactiveEmpCheckbox = wrapper.find(
        {
          name: 'isInactive',
          label: 'Inactive employee',
          checked: response.contactDetail.isInactive,
        },
      );

      expect(inactiveEmpCheckbox.exists()).toBe(true);
    });
  });
});
