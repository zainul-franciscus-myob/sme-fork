import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../../EmployeeNzIntents';
import PayDetailsFieldGroup from '../PayDetailsFieldGroup';
import SalaryAndWagesTabView from '../SalaryAndWagesTabView';
import TestStore from '../../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../../employeeDetailNzReducer';

describe('<SalaryAndWagesTabView />', () => {
  let store;
  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const wage = {
    hourlyRate: '100.00',
    selectedPayBasis: 'Hourly',
    selectedPayCycle: 'Weekly',
    payPeriodHours: '40.00',
  };

  const employeeDetails = {
    payrollDetails: {
      wage,
    },
    payCycleOptions: [{ id: 'weekly', displayName: 'Weekly' }],
  };

  const setup = () => {
    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: employeeDetails });
    const wrapper = mountWithProvider(<SalaryAndWagesTabView />);
    return wrapper;
  };

  it('should contain a PayDetailsFieldGroup', () => {
    const wrapper = setup();
    const payDetailsFieldGroup = wrapper.find(PayDetailsFieldGroup);

    expect(payDetailsFieldGroup.props()).toMatchObject({
      hourlyRate: wage.hourlyRate,
      selectedPayBasis: wage.selectedPayBasis,
      selectedPayCycle: wage.selectedPayCycle,
      payPeriodHours: wage.payPeriodHours,
      payCycleOptions: employeeDetails.payCycleOptions,
    });
  });
});
