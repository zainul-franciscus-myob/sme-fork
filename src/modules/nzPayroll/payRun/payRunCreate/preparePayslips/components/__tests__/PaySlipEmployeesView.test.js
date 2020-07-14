import { FieldGroup } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_EMPLOYEE_PAYMENTS } from '../../../PayRunIntents';
import PaySlipEmployeesView from '../PaySlipEmployeesView';
import PrintPaySlipsView from '../PrintPaySlipsView';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';
import response from '../../../../mappings/data/payRun/recordPayments';

describe('PaySlipEmployeesView', () => {
  let store;
  let wrapper;

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () => {
    store.dispatch({ intent: SET_EMPLOYEE_PAYMENTS, response });
    return mountWithProvider(<PaySlipEmployeesView />);
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
    wrapper = setup();
  });

  it('should contain a PrintPaySlipsView', () => {
    const printPaySlipView = wrapper
      .find({ label: 'Employees' })
      .find(FieldGroup)
      .find(PrintPaySlipsView);

    expect(printPaySlipView.exists()).toBe(true);
  });
});
