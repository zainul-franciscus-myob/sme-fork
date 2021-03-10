import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import {
  LOAD_FILTERED_EI_SUBMISSIONS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  LOAD_PAYRUN_PDF_REPORT,
  SET_DETAILS_ALERT,
  SET_SELECTED_PAYROLL_YEAR,
  SET_SELECTED_PAYRUN,
  UPDATE_PAY_EVENT,
} from '../../PaydayFilingIntents';
import { findButtonWithTestId } from '../../../../../../common/tests/selectors';
import EiSubmissionErrorMessage from '../components/EiSubmissionsDetail/EiSubmissionErrorMessage';
import EiSubmissionsDetailView from '../components/EiSubmissionsDetail/EiSubmissionsDetailView';
import EiSubmissionsEmptyTable from '../components/EiSubmissionsEmptyTable';
import EiSubmissionsFilter from '../components/EiSubmissionsFilter';
import EiSubmissionsModule from '../EiSubmissionsModule';
import EiSubmissionsStatusLabel from '../components/EiSubmissionsDetail/EiSubmissionsStatusLabel';
import EiSubmissionsTable from '../components/EiSubmissionsTable';
import EiSubmissionsTruncatedTable from '../components/EiSubmissionsTruncatedTable';
import PageView from '../../../../../../components/PageView/PageView';
import PaydayFilingReducer from '../../PaydayFilingReducer';
import TestIntegration from '../../../../../../integration/TestIntegration';
import TestStore from '../../../../../../store/TestStore';
import createEiSubmissionsDispatcher from '../createEiSubmissionsDispatcher';
import createEiSubmissionsIntegrator from '../createEiSubmissionsIntegrator';
import openBlob from '../../../../../../common/blobOpener/openBlob';

jest.mock('../../../../../../common/blobOpener/openBlob');

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

    it('should truncate ei submission table on row select', () => {
      const { wrapper } = constructEiSubmissionsModule();

      wrapper.find(Table.Row).first().simulate('click');
      expect(wrapper.find(EiSubmissionsTruncatedTable).exists()).toBe(true);
      expect(wrapper.find(EiSubmissionsTable).exists()).toBe(false);
    });

    it('clicking esc on submission details will display non-truncated ei submissions table', () => {
      const { wrapper } = constructEiSubmissionsModule();

      wrapper.find(Table.Row).first().simulate('click');
      wrapper.find({ testid: 'onCloseTestId' }).first().simulate('click');
      expect(wrapper.find(EiSubmissionsTruncatedTable).exists()).toBe(false);
      expect(wrapper.find(EiSubmissionsTable).exists()).toBe(true);
    });
  });

  describe('Loading initial ei submission', () => {
    it('should load initial ei submissions and payroll options when selected payroll year is missing', () => {
      store.setState({
        ...store.getState(),
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

    it(' should clear any selected payrun', () => {
      const payRun = {
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
      };

      store.setState({
        ...store.getState(),
        eiSubmissions: {
          payRuns: [payRun],
          selectedPayRun: payRun,
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

      expect(store.getActions()).toContainEqual({
        intent: SET_SELECTED_PAYRUN,
        selectedPayRunId: '',
      });
    });
  });

  describe('Selecting payroll options', () => {
    it('should update selected payroll year and load filtered ei submissions when a different payroll year is selected', () => {
      store.setState({
        ...store.getState(),
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

  describe('View payrun pdf report', () => {
    it('should open pdf report in new tab', () => {
      // Arrange
      const { wrapper } = constructEiSubmissionsModule();

      wrapper.find(Table.Row).first().simulate('click');
      const button = findButtonWithTestId(wrapper, 'viewPayRunReportPdf');

      // Act
      button.simulate('click');

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({ intent: LOAD_PAYRUN_PDF_REPORT })
      );

      expect(openBlob).toHaveBeenCalled();
    });
  });

  describe('Refresh button', () => {
    it('should load filtered ei submissions when refresh button is clicked', () => {
      store.setState({
        ...store.getState(),
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

  describe('Submit to Inland Revenue button', () => {
    const payRun = {
      id: '1234d3e7-4c5b-4a50-a114-3e652c123456',
      payPeriod: '01/10/2020 - 15/10/2020',
      payOnDate: '01/10/2020',
      dateRecorded: '2020-10-01T07:18:14.174Z',
      totalPaye: '3,400.00',
      totalGross: '13,340.00',
      employeeCount: 2,
      status: 'Rejected',
      username: 'payday@mailinator.com',
      responseCode: '0',
      submissionKey: '',
      detail: 'Unauthorised delegation',
    };
    const eiSubmissions = {
      payRuns: [payRun],
      selectedPayRun: payRun,
      payrollYears: [
        {
          label: '2020/21',
          year: '2021',
          startDate: '2020-04-01',
          endDate: '2021-03-31',
        },
      ],
      selectedPayrollYear: '2021',
    };

    it('should update the selected pay run status to submitting', () => {
      const { wrapper } = constructEiSubmissionsModule();

      store.setState({
        ...store.getState(),
        eiSubmissions,
      });

      wrapper.update();
      wrapper.find(Table.Row).first().simulate('click');
      findButtonWithTestId(wrapper, 'submitToIrTestId').simulate('click');

      const detailStatus = wrapper
        .find(EiSubmissionsDetailView)
        .find(EiSubmissionsStatusLabel);
      const listStatus = wrapper.find(Table.Row).first().find('Label');

      expect(detailStatus.text()).toEqual('Submitting');
      expect(listStatus.text()).toEqual('Submitting');
    });

    it('should send selected pay run to ir', () => {
      const { wrapper } = constructEiSubmissionsModule();

      store.setState({
        ...store.getState(),
        eiSubmissions,
      });

      wrapper.find(Table.Row).first().simulate('click');
      findButtonWithTestId(wrapper, 'submitToIrTestId').simulate('click');

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({ intent: UPDATE_PAY_EVENT })
      );
    });

    it('should render an error message when integration is unsuccessful', () => {
      const { wrapper } = constructEiSubmissionsModule();

      store.setState({
        ...store.getState(),
        eiSubmissions,
      });

      const message = 'this failed!';
      integration.mapFailure(UPDATE_PAY_EVENT, { message });

      wrapper.find(Table.Row).first().simulate('click');
      findButtonWithTestId(wrapper, 'submitToIrTestId').simulate('click');

      const detailError = wrapper
        .find(EiSubmissionsDetailView)
        .find(EiSubmissionErrorMessage);

      expect(detailError.text()).toContain(message);

      expect(store.getActions()).toContainEqual({
        intent: SET_DETAILS_ALERT,
        detailsAlertMessage: message,
      });

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({ intent: UPDATE_PAY_EVENT })
      );
    });
  });
});
