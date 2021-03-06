import {
  CLEAR_EI_SUBMISSIONS_LIST,
  LOAD_FILTERED_EI_SUBMISSIONS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  SET_DETAILS_ALERT,
  SET_DETAILS_LOADING_STATE,
  SET_PAYRUN_SUBMITTING_STATUS,
  SET_SELECTED_PAYROLL_YEAR,
  SET_SELECTED_PAYRUN,
  SET_TABLE_LOADING_STATE,
} from '../../PaydayFilingIntents';
import LoadingState from '../../../../../../components/PageView/LoadingState';
import paydayFilingReducer from '../../PaydayFilingReducer';

describe('eiSubmissionsReducer', () => {
  describe('setSelectedPayrollYear', () => {
    it('setSelectedPayrollYear should update selected payroll year', () => {
      const state = {};

      const expected = {
        eiSubmissions: {
          selectedPayrollYear: '2021',
        },
      };

      const action = {
        intent: SET_SELECTED_PAYROLL_YEAR,
        selectedPayrollYear: '2021',
      };

      expect(paydayFilingReducer(state, action)).toMatchObject(expected);
    });
  });

  describe('setIsTableLoading', () => {
    it('setIsTableLoading should update table loading state', () => {
      const state = {};

      const expected = {
        eiSubmissions: {
          isTableLoading: true,
        },
      };

      const action = {
        intent: SET_TABLE_LOADING_STATE,
        isTableLoading: true,
      };

      expect(paydayFilingReducer(state, action)).toMatchObject(expected);
    });
  });

  describe('setEiSubmissions', () => {
    it('setEiSubmissions should set ei submissions list with initial status same as status', () => {
      const state = {};
      const payRuns = [
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
      ];

      const expected = {
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
              initialStatus: 'Submitted',
              username: 'payday@mailinator.com',
              responseCode: '0',
              submissionKey: '123456789',
              detail: 'Submitted successfully',
            },
          ],
        },
      };

      const action = {
        intent: LOAD_FILTERED_EI_SUBMISSIONS,
        response: { payRuns },
      };

      expect(paydayFilingReducer(state, action)).toMatchObject(expected);
    });
  });

  describe('clearEiSubmissions', () => {
    it('clearEiSubmissions should clear ei submissions list', () => {
      const state = {
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
        },
      };

      const expected = {
        eiSubmissions: { payRuns: [] },
      };

      const action = {
        intent: CLEAR_EI_SUBMISSIONS_LIST,
      };

      expect(paydayFilingReducer(state, action)).toMatchObject(expected);
    });
  });

  describe('setSelectedPayRun', () => {
    it('selected payrun should be payrun that matches selected payrun id ', () => {
      const payRuns = [
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
      ];

      const state = {
        eiSubmissions: { payRuns },
      };

      const expected = {
        eiSubmissions: {
          payRuns,
          selectedPayRun: payRuns[0],
        },
      };

      const action = {
        intent: SET_SELECTED_PAYRUN,
        selectedPayRunId: '1234d3e7-4c5b-4a50-a114-3e652c123456',
      };

      expect(paydayFilingReducer(state, action)).toMatchObject(expected);
    });

    it('selected payrun should be undefined when selected payrun id has no matches', () => {
      const payRuns = [
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
      ];

      const state = {
        eiSubmissions: { payRuns },
      };

      const expected = {
        eiSubmissions: {
          payRuns,
          selectedPayRun: undefined,
        },
      };

      const action = {
        intent: SET_SELECTED_PAYRUN,
        selectedPayRunId: '12345677-1111-1111-1111-3e652c123456',
      };

      expect(paydayFilingReducer(state, action)).toMatchObject(expected);
    });

    it('selecting new payrun should clear any existing payrun alerts', () => {
      const payRuns = [{ id: '1234d3e7-4c5b-4a50-a114-3e652c123456' }];

      const state = {
        eiSubmissions: {
          payRuns,
          detailsAlertMessage: 'Payrun 1234 is in error',
        },
      };

      const expected = {
        eiSubmissions: {
          payRuns,
          selectedPayRun: payRuns[0],
          detailsAlertMessage: undefined,
        },
      };

      const action = {
        intent: SET_SELECTED_PAYRUN,
        selectedPayRunId: '1234d3e7-4c5b-4a50-a114-3e652c123456',
      };

      expect(paydayFilingReducer(state, action)).toMatchObject(expected);
    });
  });

  describe('setInitialEiSubmissionsAndPayrollOptions', () => {
    it('setInitialEiSubmissionsAndPayrollOptions should update ei submission and payroll options', () => {
      const state = {};

      const expected = {
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
          ],
          selectedPayrollYear: '2021',
        },
      };

      const action = {
        intent: LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
        response: {
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
          ],
          selectedPayrollYear: '2021',
        },
      };

      expect(paydayFilingReducer(state, action)).toMatchObject(expected);
    });

    describe('setDetailsLoadingState', () => {
      it('setDetailsLoadingState should set details loading state', () => {
        const state = {
          eiSubmissions: {
            detailsLoadingState: LoadingState.LOADING,
          },
        };

        const expected = {
          eiSubmissions: { detailsLoadingState: LoadingState.LOADING_SUCCESS },
        };

        const action = {
          intent: SET_DETAILS_LOADING_STATE,
          detailsLoadingState: LoadingState.LOADING_SUCCESS,
        };

        expect(paydayFilingReducer(state, action)).toMatchObject(expected);
      });
    });

    describe('setDetailsAlert', () => {
      it('setDetailsAlert should set details alert message', () => {
        const state = {
          eiSubmissions: {
            detailsAlertMessage: undefined,
          },
        };

        const detailsAlertMessage = 'An error occurred';

        const expected = {
          eiSubmissions: { detailsAlertMessage },
        };

        const action = {
          intent: SET_DETAILS_ALERT,
          detailsAlertMessage,
        };

        expect(paydayFilingReducer(state, action)).toMatchObject(expected);
      });
    });

    describe('setPayRunSubmittingStatus', () => {
      it('should set isSubmitting to true', () => {
        const payRuns = [
          {
            id: '123',
            status: 'Rejected',
            initialStatus: 'Rejected',
          },
          {
            id: '567',
            status: 'Rejected',
            initialStatus: 'Rejected',
          },
        ];

        const selectedPayRun = payRuns[0];

        const state = {
          eiSubmissions: {
            payRuns,
            selectedPayRun,
          },
        };

        const expected = {
          eiSubmissions: {
            payRuns: [
              {
                id: '123',
                status: 'Submitting',
                initialStatus: 'Rejected',
              },
              {
                id: '567',
                status: 'Rejected',
                initialStatus: 'Rejected',
              },
            ],
            selectedPayRun: {
              id: '123',
              status: 'Submitting',
              initialStatus: 'Rejected',
            },
          },
        };

        const action = {
          intent: SET_PAYRUN_SUBMITTING_STATUS,
          selectedPayRun,
        };

        expect(paydayFilingReducer(state, action)).toMatchObject(expected);
      });
    });
  });
});
