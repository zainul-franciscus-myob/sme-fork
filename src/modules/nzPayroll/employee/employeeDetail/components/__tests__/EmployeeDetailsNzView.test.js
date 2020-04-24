import {
  Card,
  PageHead,
  Tabs,
} from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL, SET_MAIN_TAB } from '../../../EmployeeNzIntents';
import { tabIds } from '../../tabItems';
import EmployeeDetailNzView from '../EmployeeDetailsNzView';
import LoadingState from '../../../../../../components/PageView/LoadingState';
import PageView from '../../../../../../components/PageView/PageView';
import TestStore from '../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../employeeDetailNzReducer';

const subModules = {
  [tabIds.contactDetails]: {
    getView: jest.fn().mockReturnValue('contactDetails'),
  },
  [tabIds.employmentDetails]: {
    getView: jest.fn().mockReturnValue('employmentDetails'),
  },
};

describe('<EmployeeDetailNzView />', () => {
  let store;
  const props = { subModules };

  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = component => mount(component,
    { wrappingComponent: Provider, wrappingComponentProps: { store } });

  describe('when loading', () => {
    it('should set PageView loading state to true', () => {
      const wrapper = mountWithProvider(<EmployeeDetailNzView {...props} />);

      expect(wrapper.find(PageView).props())
        .toHaveProperty('loadingState', LoadingState.LOADING);
    });
  });

  describe('after details have been fetched', () => {
    const response = {
      contactDetail: {
        firstName: 'Bob',
        lastName: 'The builder',
        isInactive: false,
        employeeNumber: '0012',
      },
    };

    beforeEach(() => {
      store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: response });
    });

    describe('tabs', () => {
      it('should render the contact Details card', () => {
        const wrapper = mountWithProvider(<EmployeeDetailNzView {...props} />);

        expect(subModules[tabIds.contactDetails].getView).toHaveBeenCalled();

        expect(wrapper.find(Card).text()).toEqual('contactDetails');
        expect(wrapper.find(Tabs).prop('selected')).toEqual(tabIds.contactDetails);
      });

      describe('sub tabs', () => {
        it('should change the view when selecting a tab', () => {
          const wrapper = mountWithProvider(
          <EmployeeDetailNzView
            {...props}
            onMainTabSelected={(mainTab) => store.dispatch({ intent: SET_MAIN_TAB, mainTab })}
          />,
          );

          wrapper.find(Tabs).prop('onSelected')(tabIds.payrollDetails);
          wrapper.update();

          expect(subModules[tabIds.employmentDetails].getView).toHaveBeenCalled();

          expect(wrapper.find(Card).text()).toContain('employmentDetails');

          expect(wrapper.find(Tabs).at(0).prop('selected')).toEqual(tabIds.payrollDetails);
          expect(wrapper.find(Tabs).at(1).prop('selected')).toEqual(tabIds.employmentDetails);
        });
      });
    });

    it('should update the title', () => {
      const wrapper = mountWithProvider(<EmployeeDetailNzView {...props} />);

      const title = `${response.contactDetail.firstName} ${response.contactDetail.lastName}`;
      expect(wrapper.find(PageHead).prop('title')).toEqual(title);
    });
  });
});
