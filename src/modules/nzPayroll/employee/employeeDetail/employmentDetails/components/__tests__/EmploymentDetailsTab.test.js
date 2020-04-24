import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../../EmployeeNzIntents';
import EmployeeDetailsTab from '../EmploymentDetailsTab';
import EmploymentFieldGroup from '../EmploymentFieldGroup';
import PersonalEmploymentFieldGroup from '../PersonalEmploymentFieldGroup';
import TestStore from '../../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../../employeeDetailNzReducer';

describe('<EmployeeDetailsTab />', () => {
  let store;
  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  const mountWithProvider = component => mount(component,
    { wrappingComponent: Provider, wrappingComponentProps: { store } });

  const employmentDetails = {
    dateOfBirth: '1945-08-29T00:00:00',
    gender: 'Male',

    startDate: '2010-01-01T00:00:00',
    terminationDate: '2015-01-01T00:00:00',
    employmentStatus: 'Casual',
  };

  const employeeDetails = {
    payrollDetails: {
      employmentDetails,
    },
    genderOptions: [{ name: 'option 1', value: '1' }],
  };

  const setup = () => {
    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: employeeDetails });
    const wrapper = mountWithProvider(<EmployeeDetailsTab />);
    return wrapper;
  };

  it('should contain a PersonalEmploymentFieldGroup', () => {
    const wrapper = setup();
    const personalEmploymentFieldGroup = wrapper.find(PersonalEmploymentFieldGroup);

    expect(personalEmploymentFieldGroup.props()).toEqual(expect.objectContaining({
      dateOfBirth: employmentDetails.dateOfBirth,
      gender: employmentDetails.gender,
      calculatedAge: expect.any(String),
      genderOptions: employeeDetails.genderOptions,
    }));
  });

  it('should contain a EmploymentFieldGroup', () => {
    const wrapper = setup();
    const personalEmploymentFieldGroup = wrapper.find(EmploymentFieldGroup);

    expect(personalEmploymentFieldGroup.props()).toEqual(expect.objectContaining({
      startDate: employmentDetails.startDate,
      terminationDate: employmentDetails.terminationDate,
      employmentStatus: employmentDetails.employmentStatus,
    }));
  });
});
