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

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () => {
    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: employeeDetail });
    const onTaxChange = jest.fn();
    const wrapper = mountWithProvider(
      <TaxAndKiwiSaverTab onTaxChange={onTaxChange} />
    );
    return { wrapper, onTaxChange };
  };

  it('should render TaxAndKiwiSaverTab', () => {
    const { wrapper } = setup();

    const view = wrapper.find('TaxAndKiwiSaverTab');

    expect(view).toHaveLength(1);
  });

  it('should have tax props', () => {
    const { wrapper } = setup();
    const { tax } = employeeDetail.payrollDetails;
    const { taxCodeOptions } = employeeDetail;

    const view = wrapper.find('TaxAndKiwiSaverTab');

    expect(view.props()).toMatchObject({ taxCodeOptions, tax });
  });

  it('should render child views', () => {
    const { wrapper } = setup();

    const view = wrapper.find('TaxAndKiwiSaverTab');

    expect(view.find('TaxDeclaration').exists()).toBeTruthy();
    expect(view.find('KiwiSaver').exists()).toBeTruthy();
    expect(view.find('EsctRate').exists()).toBeTruthy();
  });
});
