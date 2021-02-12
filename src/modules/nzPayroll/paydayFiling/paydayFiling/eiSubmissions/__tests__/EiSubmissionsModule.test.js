import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import {
  LOAD_FILTERED_EI_SUBMISSIONS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  SET_SELECTED_PAYROLL_YEAR,
} from '../../PaydayFilingIntents';
import { findButtonWithTestId } from '../../../../../../common/tests/selectors';
import EiSubmissionsEmptyTable from '../components/EiSubmissionsEmptyTable';
import EiSubmissionsFilter from '../components/EiSubmissionsFilter';
import EiSubmissionsModule from '../EiSubmissionsModule';
import EiSubmissionsTable from '../components/EiSubmissionsTable';
import PageView from '../../../../../../components/PageView/PageView';
import PaydayFilingReducer from '../../PaydayFilingReducer';
import TestIntegration from '../../../../../../integration/TestIntegration';
import TestStore from '../../../../../../store/TestStore';
import createEiSubmissionsDispatcher from '../createEiSubmissionsDispatcher';
import createEiSubmissionsIntegrator from '../createEiSubmissionsIntegrator';

describe('EiSubmissionsModule', () => {
  let integration;
  let store;

  const constructEiSubmissionsModule = () => {
    const module = new EiSubmissionsModule({
      integration,
    });

    module.store = store;
    store.setState({
      ...store.getState(),
      region: 'nz',
      businessId: '123',
    });

    module.dispatcher = createEiSubmissionsDispatcher(store);
    module.integrator = createEiSubmissionsIntegrator(store, integration);

    module.run();
    const view = module.getView();
    const wrappedView = <Provider store={module.store}>{view}</Provider>;
    const wrapper = mount(wrappedView);
    wrapper.update();

    return {
      wrapper,
      module,
    };
  };

  beforeEach(() => {
    integration = new TestIntegration();
    store = new TestStore(PaydayFilingReducer);
  });

  afterEach(jest.clearAllMocks);

  describe('UI components', () => {
    it('should render ei submission table with payruns on initial load', () => {
      const { wrapper } = constructEiSubmissionsModule();

      expect(wrapper.find(PageView).exists()).toBe(true);
      expect(wrapper.find(EiSubmissionsFilter).exists()).toBe(true);
      expect(wrapper.find(EiSubmissionsTable).exists()).toBe(true);
      expect(wrapper.find(EiSubmissionsEmptyTable).exists()).toBe(false);
    });

    it('should render empty table when no payruns available on initial load', () => {
      integration.mapSuccess(LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS, {
        payRuns: [],
        payrollYears: [
          {
            label: '2020/21',
            year: '2021',
            startDate: '2020-04-01',
            endDate: '2021-03-31',
          },
          {
            label: '2019/20',
            year: '2020',
            startDate: '2019-04-01',
            endDate: '2020-03-31',
          },
          {
            label: '2018/19',
            year: '2019',
            startDate: '2018-04-01',
            endDate: '2019-03-31',
          },
        ],
        selectedPayrollYear: '2021',
      });

      const { wrapper } = constructEiSubmissionsModule();

      expect(wrapper.find(PageView).exists()).toBe(true);
      expect(wrapper.find(EiSubmissionsFilter).exists()).toBe(true);
      expect(wrapper.find(EiSubmissionsTable).exists()).toBe(true);
      expect(wrapper.find(EiSubmissionsEmptyTable).exists()).toBe(true);
    });
  });

  describe('Loading initial ei submission', () => {
    it('should load initial ei submissions and payroll options when selected payroll year is missing', () => {
      store.setState({
        ...store.getState(),
        region: 'nz',
        businessId: '123',
        eiSubmissions: {
          selectedPayrollYear: '',
        },
      });
      constructEiSubmissionsModule();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
        }),
      ]);
    });
  });

  describe('Filtered ei submission', () => {
    it(' should load filtered ei submissions when module runs and selected payroll year is present', () => {
      store.setState({
        ...store.getState(),
        region: 'nz',
        businessId: '123',
        eiSubmissions: {
          payRuns: [
            {
              id: '1234d3e7-4c5b-4a50-a114-3e652c123456',
              payPeriod: '01/10/2020 - 15/10/2020',
              payOnDate: '01/10/2020',
              dateRecorded: '2020-10-01T07:18:14.174Z',
              totalPaye: '3,400.00',
              totalGross: '13,340.00',
              employeeCount: 2,
              status: 'Submitted',
              username: 'payday@mailinator.com',
              responseCode: '0',
              submissionKey: '123456789',
              detail: 'Submitted successfully',
            },
          ],
          payrollYears: [
            {
              label: '2020/21',
              year: '2021',
              startDate: '2020-04-01',
              endDate: '2021-03-31',
            },
            {
              label: '2019/20',
              year: '2020',
              startDate: '2019-04-01',
              endDate: '2020-03-31',
            },
            {
              label: '2018/19',
              year: '2019',
              startDate: '2018-04-01',
              endDate: '2019-03-31',
            },
          ],
          selectedPayrollYear: '2021',
        },
      });
      constructEiSubmissionsModule();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_FILTERED_EI_SUBMISSIONS,
        }),
      ]);
    });
  });

  describe('Selecting payroll options', () => {
    it('should update selected payroll year and load filtered ei submissions when a different payroll year is selected', () => {
      store.setState({
        ...store.getState(),
        region: 'nz',
        businessId: '123',
        eiSubmissions: {
          selectedPayrollYear: '',
        },
      });

      const { wrapper } = constructEiSubmissionsModule();
      wrapper.find('select').simulate('change', { target: { value: '2020' } });

      expect(store.getActions()).toContainEqual({
        intent: SET_SELECTED_PAYROLL_YEAR,
        selectedPayrollYear: '2020',
      });

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({ intent: LOAD_FILTERED_EI_SUBMISSIONS })
      );

      expect(store.getState().eiSubmissions.selectedPayrollYear).toBe('2020');
    });
  });

  describe('Refresh button', () => {
    it('should load filtered ei submissions when refresh button is clicked', () => {
      store.setState({
        ...store.getState(),
        region: 'nz',
        businessId: '123',
        eiSubmissions: {
          selectedPayrollYear: '',
        },
      });

      const { wrapper } = constructEiSubmissionsModule();
      findButtonWithTestId(wrapper, 'refreshButton').simulate('click');

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({ intent: LOAD_FILTERED_EI_SUBMISSIONS })
      );
    });
  });
});
