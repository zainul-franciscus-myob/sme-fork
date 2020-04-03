import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_LIST } from '../../../EmployeeNzIntents';
import EmployeeListNZTableBody from '../EmployeeListNzTableBody';
import EmployeeListNzTable from '../EmployeeListNzTable';
import TestStore from '../../../../../../store/TestStore';
import employeeListNzReducer from '../../employeeListNzReducer';


describe('<EmployeeListNzTable />', () => {
  const store = new TestStore(employeeListNzReducer);

  it('renders employee list page with "There are no employees." message', () => {
    const wrapper = mount(
      <Provider store={store}>
        <EmployeeListNzTable />
      </Provider>,
    );

    expect(wrapper.find(EmployeeListNzTable)).toHaveLength(1);
    expect(wrapper.find('h3').text()).toEqual('There are no employees.');
  });

  it('should render employee list page with EmployeeListNzTable and EmployeeListNZTableBody element', () => {
    const response = {
      entries: [{
        name: 'janak',
        email: 'j@gmail.com',
        phone: '0424345464',
      }],
    };

    store.dispatch({ intent: LOAD_EMPLOYEE_LIST, ...response });

    const wrapper = mount(
    <Provider store={store}>
      <EmployeeListNzTable />
    </Provider>,
    );
    expect(wrapper.find(EmployeeListNzTable)).toHaveLength(1);
    expect(wrapper.find(EmployeeListNZTableBody)).toHaveLength(1);
  });
});
