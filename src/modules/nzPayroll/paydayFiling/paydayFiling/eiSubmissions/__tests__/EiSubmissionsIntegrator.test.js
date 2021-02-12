import {
  LOAD_FILTERED_EI_SUBMISSIONS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
} from '../../PaydayFilingIntents';
import createEiSubmissionsIntegrator from '../createEiSubmissionsIntegrator';

describe('Submission list integrator', () => {
  describe('loadInitialEiSubmissionsAndPayrollOptions', () => {
    it('calls integrator with expected parameters', () => {
      // arrange
      const integration = { read: jest.fn() };
      const businessId = 42;

      const store = {
        getState: () => ({
          businessId,
        }),
      };

      const integrator = createEiSubmissionsIntegrator(store, integration);

      // act
      integrator.loadInitialEiSubmissionsAndPayrollOptions({
        onSuccess: () => {},
        onFailure: () => {},
      });

      // assert
      const parameterObject = integration.read.mock.calls[0][0];
      expect(parameterObject.intent).toEqual(
        LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS
      );
      expect(parameterObject.urlParams).toEqual({ businessId });
    });
  });

  describe('loadFilteredEiSubmissions', () => {
    it('calls integrator with expected parameters', () => {
      // arrange
      const integration = { read: jest.fn() };
      const businessId = 42;

      const store = {
        getState: () => ({
          businessId,
          eiSubmissions: {
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
        }),
      };

      const expectedParams = {
        startDate: '2020-04-01',
        endDate: '2021-03-31',
      };

      const integrator = createEiSubmissionsIntegrator(store, integration);

      // act
      integrator.loadFilteredEiSubmissions({
        onSuccess: () => {},
        onFailure: () => {},
      });

      // assert
      const parameterObject = integration.read.mock.calls[0][0];
      expect(parameterObject.intent).toEqual(LOAD_FILTERED_EI_SUBMISSIONS);
      expect(parameterObject.urlParams).toEqual({ businessId });
      expect(parameterObject.params).toEqual(expectedParams);
    });
  });
});
