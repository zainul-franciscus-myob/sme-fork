import { Provider } from 'react-redux';
import {
  Table,
} from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_PAYS } from '../../../../../PayRunIntents';
import PayDetailsTableRow from '../../PayDetailsTableRow';
import TestStore from '../../../../../../../../../store/TestStore';
import WagePayItems from '../WagePayItems';
import employeePayList from '../../../../__tests__/fixtures/loadEmployeePayList.json';
import payRunReducer from '../../../../../payRunReducer';
import tableConfig from '../../PayDetailsTableConfig';

describe('WagePayItems', () => {
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

  const mountWithProvider = component => mount(component,
    { wrappingComponent: Provider, wrappingComponentProps: { store } });

  it('Should have the expected values in row header', () => {
    const wrapper = mountWithProvider(<WagePayItems {...props} />);

    const expected = 'Wages';

    const actual = wrapper.find(Table.RowItem).find({ title: 'Wages' }).text();

    expect(actual).toEqual(expected);
  });

  it('Should have three child rows', () => {
    const wrapper = mountWithProvider(<WagePayItems {...props} />);
    expect(wrapper.find(PayDetailsTableRow).length).toEqual(2);
  });
});
