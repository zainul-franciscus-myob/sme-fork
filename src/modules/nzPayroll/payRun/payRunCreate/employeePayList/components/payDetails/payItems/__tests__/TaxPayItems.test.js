import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_PAYS } from '../../../../../PayRunIntents';
import PayDetailsTableRow from '../../PayDetailsTableRow';
import TaxPayItems from '../TaxPayItems';
import TestStore from '../../../../../../../../../store/TestStore';
import employeePayList from '../../../../__tests__/fixtures/loadEmployeePayList.json';
import payRunReducer from '../../../../../payRunReducer';
import tableConfig from '../../PayDetailsTableConfig';

describe('TaxPayItems', () => {
  let store;
  const props = {
    employeeId: 22,
    employeeName: 'John Smith',
    tableConfig,
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
    const action = {
      intent: LOAD_EMPLOYEE_PAYS,
      employeePays: employeePayList,
      shouldShowTableRows: true,
    };
    store.dispatch(action);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  it('Should have the expected values in row header', () => {
    const wrapper = mountWithProvider(<TaxPayItems {...props} />);

    const expected = 'Taxes';

    const actual = wrapper.find(Table.RowItem).find({ title: 'Taxes' }).text();

    expect(actual).toEqual(expected);
  });

  it('Should have three child rows', () => {
    const wrapper = mountWithProvider(<TaxPayItems {...props} />);
    expect(wrapper.find(PayDetailsTableRow).length).toEqual(1);
  });
});
