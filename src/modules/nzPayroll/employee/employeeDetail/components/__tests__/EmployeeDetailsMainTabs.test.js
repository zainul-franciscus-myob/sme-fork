import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_MAIN_TAB } from '../../../EmployeeNzIntents';
import { tabIds } from '../../tabItems';
import EmployeeDetailsTab from '../EmployeeDetailsTab';
import TestStore from '../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../employeeDetailNzReducer';

describe('<EmployeeDetailsMainTabs />', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
    wrapper = mount(<EmployeeDetailsTab />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });
  });

  it('should render Employee Tab Items', () => {
    const tabs = wrapper.find('Tabs');
    const tabItems = wrapper.find('TabItem');

    expect(tabs.length).toEqual(1);
    expect(tabItems.length).toEqual(4);

    expect(tabs.prop('selected')).toEqual('personalDetails');
    expect(tabItems.at(0).text()).toEqual('Personal details');
    expect(tabItems.at(1).text()).toEqual('Employment details');
    expect(tabItems.at(2).text()).toEqual('Standard pay');
    expect(tabItems.at(3).text()).toEqual('Leave');
  });

  it('should render selected main tab', () => {
    store.dispatch({
      intent: SET_MAIN_TAB,
      mainTab: tabIds.employmentDetails,
    });

    wrapper.update();
    const tabs = wrapper.find('Tabs');
    expect(tabs.prop('selected')).toEqual('employmentDetails');
  });
});
