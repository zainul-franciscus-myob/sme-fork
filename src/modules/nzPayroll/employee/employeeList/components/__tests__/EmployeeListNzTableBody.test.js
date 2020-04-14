
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_LIST } from '../../../EmployeeNzIntents';
import { SET_INITIAL_STATE } from '../../../../../../SystemIntents';
import EmployeeListNZTableBody from '../EmployeeListNzTableBody';
import Store from '../../../../../../store/Store';
import employeeListNzReducer from '../../employeeListNzReducer';

let store;
beforeEach(() => {
  store = new Store(employeeListNzReducer);
});

const mountWithProvider = component => mount(component,
  { wrappingComponent: Provider, wrappingComponentProps: { store } });

describe('when there are employees', () => {
  it('renders a table rows', () => {
    const entry = {
      name: 'uncle bob',
      email: 'j@gmail.com',
      phone: '0424345464',
      id: '1',
    };

    const response = {
      entries: [
        entry,
      ],
    };

    const context = { region: 'nz', businessId: '12' };
    store.dispatch({ intent: SET_INITIAL_STATE, context });
    const tableConfig = {
      name: { columnName: 'Name', width: 'flex-1', valign: 'top' },
      phoneNumber: { columnName: 'Phone', width: 'flex-1', valign: 'top' },
      email: { columnName: 'Email', width: 'flex-1', valign: 'top' },
    };
    const wrapper = mountWithProvider(<EmployeeListNZTableBody
      tableConfig={tableConfig}
    />);

    store.dispatch({ intent: LOAD_EMPLOYEE_LIST, ...response });
    wrapper.update();

    const nameRowItem = wrapper.find({ ...tableConfig.name });
    expect(nameRowItem.find(
      { href: `/#/${context.region}/${context.businessId}/employee/1` },
    ).exists()).toBe(true);
    expect(nameRowItem.text()).toContain(entry.name);

    const phoneNumberRowItem = wrapper.find({ ...tableConfig.phoneNumber });
    expect(phoneNumberRowItem.text()).toContain(entry.phone);

    const emailRowItem = wrapper.find({ ...tableConfig.email });
    expect(emailRowItem.text()).toContain(entry.email);
  });
});
