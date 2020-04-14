import {
  Checkbox,
  FieldGroup,
  Input,
} from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../../EmployeeNzIntents';
import ContactDetailsNzTabView from '../contactDetailsNzTab';
import TestStore from '../../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../../employeeDetailNzReducer';

describe('<ContactDetailsNzTabView />', () => {
  let store;

  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  const mountWithProvider = component => mount(component,
    { wrappingComponent: Provider, wrappingComponentProps: { store } });

  it('should list the employee contact details', () => {
    const response = {
      contactDetail: {
        firstName: 'Bob',
        lastName: 'The builder',
        isInactive: false,
        employeeNumber: '0012',
      },
    };
    const wrapper = mountWithProvider(<ContactDetailsNzTabView />);

    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, ...response });

    wrapper.update();

    expect(wrapper.find(FieldGroup).props()).toEqual(expect.objectContaining({
      label: 'Details',
    }));

    const firstNameField = wrapper.find(
      {
        label: 'First name',
        name: 'firstName',
        value: response.contactDetail.firstName,
      },
    );
    expect(firstNameField.exists()).toBe(true);
    expect(firstNameField.prop('disabled')).toBe(true);
    expect(firstNameField.type()).toBe(Input);

    const lastNameField = wrapper.find(
      {
        label: 'Surname or family name',
        name: 'lastName',
        value: response.contactDetail.lastName,
      },
    );
    expect(lastNameField.exists()).toBe(true);
    expect(lastNameField.prop('disabled')).toBe(true);
    expect(lastNameField.type()).toBe(Input);

    const employeeNumberField = wrapper.find(
      {
        label: 'Employee number',
        name: 'employeeNumber',
        value: response.contactDetail.employeeNumber,
      },
    );
    expect(employeeNumberField.exists()).toBe(true);
    expect(employeeNumberField.prop('disabled')).toBe(true);
    expect(employeeNumberField.type()).toBe(Input);

    const inactiveEmpCheckbox = wrapper.find(
      {
        name: 'isInactive',
        label: 'Inactive employee',
      },
    );
    expect(inactiveEmpCheckbox.exists()).toBe(true);
    expect(inactiveEmpCheckbox.prop('disabled')).toBe(true);
    expect(inactiveEmpCheckbox.type()).toBe(Checkbox);
  });

  describe('when employee is active', () => {
    it('should have the Inactive employee Checkbox unchecked', () => {
      const response = {
        contactDetail: {
          firstName: 'Bob',
          lastName: 'The builder',
          isInactive: false,
          employeeNumber: '0012',
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
          firstName: 'Bob',
          lastName: 'The builder',
          isInactive: true,
          employeeNumber: '0012',
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
