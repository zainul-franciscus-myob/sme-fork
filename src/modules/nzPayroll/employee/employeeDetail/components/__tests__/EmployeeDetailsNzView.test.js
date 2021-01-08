import { Card, PageHead, Tabs } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import {
  LOAD_EMPLOYEE_DETAIL,
  SET_MAIN_TAB,
  SET_SUB_TAB,
} from '../../../EmployeeNzIntents';
import { tabIds } from '../../tabItems';
import EmployeeDetailNzView from '../EmployeeDetailsNzView';
import LoadingState from '../../../../../../components/PageView/LoadingState';
import PageView from '../../../../../../components/PageView/PageView';
import TestStore from '../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../employeeDetailNzReducer';

const subModules = {
  [tabIds.personalDetails]: {
    getView: jest.fn().mockReturnValue('personalDetails'),
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

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('when loading', () => {
    it('should set PageView loading state to true', () => {
      const wrapper = mountWithProvider(<EmployeeDetailNzView {...props} />);

      expect(wrapper.find(PageView).props()).toHaveProperty(
        'loadingState',
        LoadingState.LOADING
      );
    });
  });

  describe('after details have been fetched', () => {
    const response = {
      personalDetail: {
        firstName: 'Bob',
        lastName: 'The builder',
        isInactive: false,
        employeeNumber: '0012',
      },
      payrollDetails: {
        employmentDetails: {
          dateOfBirth: '06/02/1987',
          gender: 'Male',
          startDate: '10/10/2018',
          terminationDate: '10/10/2020',
        },
      },
    };

    beforeEach(() => {
      store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: response });
    });

    describe('tabs', () => {
      it('should render the personal Details card by default', () => {
        const wrapper = mountWithProvider(<EmployeeDetailNzView {...props} />);

        expect(subModules[tabIds.personalDetails].getView).toHaveBeenCalled();

        expect(wrapper.find(Card).text()).toEqual('personalDetails');
        expect(wrapper.find(Tabs).prop('selected')).toEqual(
          tabIds.personalDetails
        );
      });

      describe('sub tabs', () => {
        describe.each([
          [
            { mainTab: tabIds.personalDetails },
            subModules[tabIds.personalDetails],
          ],
          [
            { mainTab: tabIds.employmentDetails },
            subModules[tabIds.employmentDetails],
          ],
        ])('When tab %p is selected', ({ mainTab, subTab }, subModule) => {
          const onMainTabSelected = (tab) =>
            store.dispatch({ intent: SET_MAIN_TAB, mainTab: tab });
          const onSubTabSelected = (tab1, tab2) =>
            store.dispatch({
              intent: SET_SUB_TAB,
              mainTab: tab1,
              subTab: tab2,
            });

          it('should display the correct view', () => {
            const wrapper = mountWithProvider(
              <EmployeeDetailNzView
                {...props}
                onMainTabSelected={onMainTabSelected}
                onSubTabSelected={onSubTabSelected}
              />
            );
            wrapper.find(Tabs).prop('onSelected')(mainTab);
            wrapper.update();
            if (subTab) {
              wrapper.find(Tabs).at(1).prop('onSelected')(subTab);
              wrapper.update();
            }
            expect(subModule.getView).toHaveBeenCalled();

            expect(wrapper.find(Card).text()).toContain(subModule.getView());

            expect(wrapper.find(Tabs).at(0).prop('selected')).toEqual(mainTab);
            if (subTab) {
              expect(wrapper.find(Tabs).at(1).prop('selected')).toEqual(subTab);
            }
          });
        });

        it('should change the view when selecting a tab', () => {
          const wrapper = mountWithProvider(
            <EmployeeDetailNzView
              {...props}
              onMainTabSelected={(mainTab) =>
                store.dispatch({ intent: SET_MAIN_TAB, mainTab })
              }
            />
          );

          wrapper.find(Tabs).prop('onSelected')(tabIds.employmentDetails);
          wrapper.update();

          expect(
            subModules[tabIds.employmentDetails].getView
          ).toHaveBeenCalled();

          expect(wrapper.find(Card).text()).toContain('employmentDetails');

          expect(wrapper.find(Tabs).at(0).prop('selected')).toEqual(
            tabIds.employmentDetails
          );
        });
      });
    });

    it('should update the title', () => {
      const wrapper = mountWithProvider(<EmployeeDetailNzView {...props} />);

      const title = `${response.personalDetail.firstName} ${response.personalDetail.lastName}`;
      expect(wrapper.find(PageHead).prop('title')).toEqual(title);
    });
  });
});
