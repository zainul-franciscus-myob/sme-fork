
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../../EmployeeNzIntents';
import TaxAndKiwiSaverTab from '../TaxAndKiwiSaverTab';
import TestStore from '../../../../../../../store/TestStore';
import employeeDetail from '../../../../mappings/data/employeeDetailEntry';
import employeeDetailNzReducer from '../../../employeeDetailNzReducer';


describe('TaxAndKiwiSaverTab', () => {
  let store;
  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mountWithProvider = component => mount(component,
    { wrappingComponent: Provider, wrappingComponentProps: { store } });

  const setup = () => {
    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: employeeDetail });
    const onTaxAndKiwiSaverChange = jest.fn();
    const wrapper = mountWithProvider(
    <TaxAndKiwiSaverTab onTaxAndKiwiSaverChange={onTaxAndKiwiSaverChange} />,
    );
    return { wrapper, onTaxAndKiwiSaverChange };
  };

  it('should render TaxAndKiwiSaverTab', () => {
    const { wrapper } = setup();

    const view = wrapper.find('TaxAndKiwiSaverTab');

    expect(view).toHaveLength(1);
  });

  it('should have taxAndKiwiSaver props', () => {
    const { wrapper } = setup();
    const { taxAndKiwiSaver } = employeeDetail.payrollDetails;
    const { taxCodeOptions } = employeeDetail;

    const view = wrapper.find('TaxAndKiwiSaverTab');

    expect(view.props()).toMatchObject({ taxAndKiwiSaver, taxCodeOptions });
  });

  it('should render child views', () => {
    const { wrapper } = setup();

    const view = wrapper.find('TaxAndKiwiSaverTab');

    expect(view.find('TaxDeclaration').exists()).toBeTruthy();
    expect(view.find('KiwiSaver').exists()).toBeTruthy();
    expect(view.find('EmployerSCTR').exists()).toBeTruthy();
  });
});
