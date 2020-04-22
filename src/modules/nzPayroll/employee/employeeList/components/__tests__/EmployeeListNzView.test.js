import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_LIST } from '../../../EmployeeNzIntents';
import EmployeeListNzView from '../EmployeeListNzView';
import Store from '../../../../../../store/Store';
import employeeListNzReducer from '../../employeeListNzReducer';


describe('<EmployeeListNzView />', () => {
  let store;
  beforeEach(() => {
    store = new Store(employeeListNzReducer);
  });

  const mountWithProvider = (component) => mount(component,
    { wrappingComponent: Provider, wrappingComponentProps: { store } });

  it('should render LoadingPageState component', () => {
    const wrapper = mountWithProvider(<EmployeeListNzView />);
    expect(wrapper.find('LoadingPageState')).toHaveLength(1);
    expect(wrapper.text()).toContain('Loading');
  });

  it('should render Employee table with headers and empty table message', () => {
    const wrapper = mountWithProvider(<EmployeeListNzView />);
    const response = {
      entries: [],
    };
    store.dispatch({ intent: LOAD_EMPLOYEE_LIST, ...response });
    wrapper.update();

    expect(wrapper.find('LoadingPageState')).toHaveLength(0);
    expect(wrapper.text()).toContain('There are no employees.');

    const button = wrapper.find('Button');
    expect(button).toHaveLength(1);
    expect(button.text()).toContain('Create employee');

    expect(wrapper.text()).toContain('Name');
    expect(wrapper.text()).toContain('Email');
    expect(wrapper.text()).toContain('Phone');
  });

  it('should render passed in employee list data', () => {
    const wrapper = mountWithProvider(<EmployeeListNzView />);

    const response = {
      entries: [{
        name: 'uncle bob',
        email: 'j@gmail.com',
        phone: '0424345464',
        id: '1',
      }],
    };
    store.dispatch({ intent: LOAD_EMPLOYEE_LIST, ...response });
    wrapper.update();

    expect(wrapper.text()).toContain('Name');
    expect(wrapper.text()).toContain('Email');
    expect(wrapper.text()).toContain('Phone');

    expect(wrapper.text()).toContain('uncle bob');
    expect(wrapper.text()).toContain('j@gmail.com');
    expect(wrapper.text()).toContain('0424345464');
  });
});