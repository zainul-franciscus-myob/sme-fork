import { PageHead, Stepper } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { NEXT_STEP } from '../../../PayRunIntents';
import { PREPARE_PAYSLIPS } from '../../../payRunSteps';
import EmployeePayHeader from '../../../components/EmployeePayHeader';
import PaySlipEmployeesView from '../PaySlipEmployeesView';
import PreparePaySlipsView from '../PreparePaySlipsView';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('PreparePaySlipsView', () => {
  let store;
  let wrapper;

  const state = {
    step: PREPARE_PAYSLIPS,
  };

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () => {
    store.dispatch({ intent: NEXT_STEP, state });
    return mountWithProvider(<PreparePaySlipsView />);
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
    wrapper = setup();
  });

  it('should have Page Header', () => {
    const pageHeader = wrapper
      .find({ title: 'Pay run summary' })
      .find(PageHead);
    expect(pageHeader.exists()).toBe(true);
  });

  it('should have Stepper', () => {
    const stepper = wrapper.find({ activeStepNumber: '2' }).find(Stepper);
    expect(stepper.exists()).toBe(true);
  });

  it('should have EmployeePayHeader', () => {
    const employeePayHeader = wrapper.find(EmployeePayHeader);
    expect(employeePayHeader.exists()).toBe(true);
  });

  it('should have PaySlipEmployeesView', () => {
    const paySlipEmployeesView = wrapper.find(PaySlipEmployeesView);
    expect(paySlipEmployeesView.exists()).toBe(true);
  });
});
