import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_LIST } from '../../../EmployeeNzIntents';
import EmployeeListNZTableBody from '../EmployeeListNzTableBody';
import EmployeeListNzTable from '../EmployeeListNzTable';
import Store from '../../../../../../store/Store';
import employeeListNzReducer from '../../employeeListNzReducer';

describe('<EmployeeListNzTable />', () => {
  let store;
  beforeEach(() => {
    store = new Store(employeeListNzReducer);
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  it('renders employee list page with "There are no employees." message', () => {
    const wrapper = mountWithProvider(<EmployeeListNzTable />);
    expect(wrapper.text()).toContain('There are no employees.');
  });

  it('should render employee list page with table header and data', () => {
    const response = {
      entries: [
        {
          name: 'uncle bob',
          email: 'j@gmail.com',
          phone: '0424345464',
          id: '1',
        },
      ],
    };
    store.dispatch({ intent: LOAD_EMPLOYEE_LIST, ...response });
    const wrapper = mountWithProvider(<EmployeeListNzTable />);

    expect(wrapper.find(EmployeeListNZTableBody)).toHaveLength(1);
    expect(wrapper.text()).toContain('Name');
    expect(wrapper.text()).toContain('Email');
    expect(wrapper.text()).toContain('Phone');
  });
});
