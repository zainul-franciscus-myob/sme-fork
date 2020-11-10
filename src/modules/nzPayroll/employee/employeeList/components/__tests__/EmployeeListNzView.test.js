import { Alert } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_LIST, SET_ALERT } from '../../../EmployeeNzIntents';
import EmployeeListNzView from '../EmployeeListNzView';
import Store from '../../../../../../store/Store';
import employeeListNzReducer from '../../employeeListNzReducer';

describe('<EmployeeListNzView />', () => {
  let store;
  beforeEach(() => {
    store = new Store(employeeListNzReducer);
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  it('should render LoadingPageState component', () => {
    const wrapper = mountWithProvider(<EmployeeListNzView />);
    expect(wrapper.find('LoadingPageState')).toHaveLength(1);
    expect(wrapper.text()).toContain('Loading');
  });

  it('should render Employee table with headers and empty table message', () => {
    const wrapper = mountWithProvider(<EmployeeListNzView />);
    const response = {
      entries: [],
      pagination: {
        hasNextPage: false,
        offset: 0,
      },
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

    const filterBar = wrapper.find('FilterBar');
    expect(filterBar).toHaveLength(1);
    expect(filterBar.find('ShowInactiveCheckbox')).toHaveLength(0);
  });

  it('should render passed in employee list data', () => {
    const wrapper = mountWithProvider(<EmployeeListNzView />);

    const response = {
      entries: [
        {
          name: 'uncle bob',
          email: 'j@gmail.com',
          phone: '0424345464',
          id: '1',
        },
      ],
      pagination: {
        hasNextPage: false,
        offset: 50,
      },
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

  it('should render `load more` button', () => {
    const wrapper = mountWithProvider(<EmployeeListNzView />);

    const response = {
      entries: [
        {
          name: 'uncle bob',
          email: 'j@gmail.com',
          phone: '0424345464',
          id: '1',
        },
      ],
      pagination: {
        hasNextPage: true,
        offset: 50,
      },
    };
    store.dispatch({ intent: LOAD_EMPLOYEE_LIST, ...response });
    wrapper.update();

    expect(wrapper.find({ name: 'loadMore' }).find('Button')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(2);
  });

  it('should display alert Component ', () => {
    const wrapper = mountWithProvider(<EmployeeListNzView />);
    const response = {
      entries: [],
      pagination: {
        hasNextPage: false,
        offset: 50,
      },
    };
    store.dispatch({ intent: LOAD_EMPLOYEE_LIST, ...response });
    const alert = { type: 'success', message: 'alert message' };

    store.dispatch({ intent: SET_ALERT, alert });
    wrapper.update();

    expect(wrapper.text()).toContain('alert message');
    expect(wrapper.find(Alert).props()).toEqual(
      expect.objectContaining({
        type: 'success',
      })
    );
  });
});
