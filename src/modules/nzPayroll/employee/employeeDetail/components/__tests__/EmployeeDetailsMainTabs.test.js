import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_MAIN_TAB } from '../../../EmployeeNzIntents';
import { tabIds } from '../../tabItems';
import EmployeeDetailsMainTabs from '../EmployeeDetailsMainTabs';
import TestStore from '../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../employeeDetailNzReducer';

describe('<EmployeeDetailsMainTabs />', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
    wrapper = mount(<EmployeeDetailsMainTabs />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });
  });

  it('should render Employee Tab Items', () => {
    const tabs = wrapper.find('Tabs');
    const tabItems = wrapper.find('TabItem');

    expect(tabs.length).toEqual(1);
    expect(tabItems.length).toEqual(2);

    expect(tabs.prop('selected')).toEqual('contactDetails');
    expect(tabItems.at(0).text()).toEqual('Contact details');
    expect(tabItems.at(1).text()).toEqual('Payroll details');
  });

  it('should render selected main tab', () => {
    store.dispatch({
      intent: SET_MAIN_TAB,
      mainTab: tabIds.payrollDetails,
    });

    wrapper.update();
    const tabs = wrapper.find('Tabs');
    expect(tabs.prop('selected')).toEqual('payrollDetails');
  });
});
