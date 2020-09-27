import { Card } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_MAIN_TAB, SET_SUB_TAB } from '../../../EmployeeNzIntents';
import { tabIds } from '../../tabItems';
import EmployeeDetailsSubTabBody from '../EmployeeDetailsSubTabBody';
import TestStore from '../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../employeeDetailNzReducer';

const subModules = {
  [tabIds.contactDetails]: {
    getView: jest.fn().mockReturnValue('contactDetails'),
  },
  [tabIds.employmentDetails]: {
    getView: jest.fn().mockReturnValue('employmentDetails'),
  },
  [tabIds.salaryAndWages]: {
    getView: jest.fn().mockReturnValue('salaryAndWages'),
  },
};

describe('<EmployeeDetailsSubTabBody />', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
    wrapper = mount(<EmployeeDetailsSubTabBody subModules={subModules} />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });
  });

  describe('Contact details tab', () => {
    it('should render Contact details tab', () => {
      expect(wrapper.find(Card).text()).toContain('contactDetails');
    });
  });

  describe('Payroll details tab', () => {
    it('should render Payroll details tab', () => {
      store.dispatch({
        intent: SET_MAIN_TAB,
        mainTab: tabIds.payrollDetails,
      });

      wrapper.update();
      const tabs = wrapper.find('Tabs');
      const tabItems = wrapper.find('TabItem');

      expect(tabItems.length).toEqual(4);

      expect(tabs.prop('selected')).toEqual('employmentDetails');
      expect(tabItems.at(0).text()).toEqual('Employment details');
      expect(tabItems.at(1).text()).toEqual('Salary and wages');
      expect(tabItems.at(2).text()).toEqual('Leave');
      expect(tabItems.at(3).text()).toEqual('Tax and KiwiSaver');
    });

    it('should handle sub tab change', () => {
      store.dispatch({
        intent: SET_MAIN_TAB,
        mainTab: tabIds.payrollDetails,
      });

      store.dispatch({
        intent: SET_SUB_TAB,
        mainTab: tabIds.payrollDetails,
        subTab: tabIds.salaryAndWages,
      });

      wrapper.update();
      const tabs = wrapper.find('Tabs');
      expect(tabs.prop('selected')).toEqual('salaryAndWages');
    });
  });
});
