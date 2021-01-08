import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import {
  LOAD_PAY_RUN_DETAILS,
  SET_LOADING_STATE,
} from '../../payRunDetailNzIntents';
import LoadingState from '../../../../../../components/PageView/LoadingState';
import PayRunDetailEmployeesTableBody from '../PayRunDetailEmployeesTableBody';
import TestStore from '../../../../../../store/TestStore';
import loadPayRunDetail from '../../../mappings/data/payRunDetail/loadPayRunDetail';
import payRunDetailNzReducer from '../../payRunDetailNzReducer';

describe('<PayRunDetailEmployeesTableBody />', () => {
  let store;

  const tableConfig = {
    employee: { columnName: 'Employee', width: 'flex-1', valign: 'top' },
    takeHomePay: {
      columnName: 'TakeHomePay',
      width: 'flex-1',
      valign: 'top',
      align: 'right',
    },
  };

  beforeEach(() => {
    store = new TestStore(payRunDetailNzReducer);
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () => {
    const response = loadPayRunDetail;
    store.dispatch({ intent: LOAD_PAY_RUN_DETAILS, response });
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_SUCCESS,
    });
    return mountWithProvider(
      <PayRunDetailEmployeesTableBody tableConfig={tableConfig} />
    );
  };

  it('should render payrun employee data correctly', () => {
    const wrapper = setup();
    expect(wrapper.find(Table.RowItem).at(0).text()).toContain('Lionel Messi');
    expect(wrapper.find(Table.RowItem).at(1).text()).toContain('750.26');
    expect(wrapper.find(Table.RowItem).at(2).text()).toContain(
      'Diego Maradona'
    );
    expect(wrapper.find(Table.RowItem).at(3).text()).toContain('2,008.26');
  });
});
