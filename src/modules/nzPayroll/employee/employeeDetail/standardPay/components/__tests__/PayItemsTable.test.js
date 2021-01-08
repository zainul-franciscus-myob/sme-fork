import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../../EmployeeNzIntents';
import EarningsRowGroup from '../EarningsRowGroup';
import KiwiSaverRowGroup from '../KiwiSaverRowGroup';
import PayItemsTable from '../PayItemsTable';
import TaxesRowGroup from '../TaxesRowGroup';
import TestStore from '../../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../../employeeDetailNzReducer';
import employeeDetails from '../../../../mappings/data/employeeDetailEntry';

describe('PayItemsTable', () => {
  let store;
  const onWageDetailsChange = jest.fn();

  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () => {
    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: employeeDetails });
    const wrapper = mountWithProvider(
      <PayItemsTable onWageDetailsChange={onWageDetailsChange} />
    );
    wrapper.update();
    return { wrapper, onWageDetailsChange };
  };

  it('should render PayItemsTable', () => {
    const { wrapper } = setup();
    const view = wrapper.find(PayItemsTable);
    expect(view.exists()).toBeTruthy();
  });

  it('should render EarningsRowGroup', () => {
    const { wrapper } = setup();
    const view = wrapper.find(PayItemsTable).find(EarningsRowGroup);
    expect(view.exists()).toBeTruthy();
  });

  it('should render TaxesRowGroup', () => {
    const { wrapper } = setup();
    const view = wrapper.find(PayItemsTable).find(TaxesRowGroup);
    expect(view.exists()).toBeTruthy();
  });

  it('should render KiwiSaverRowGroup', () => {
    const { wrapper } = setup();
    const view = wrapper.find(PayItemsTable).find(KiwiSaverRowGroup);
    expect(view.exists()).toBeTruthy();
  });
});
