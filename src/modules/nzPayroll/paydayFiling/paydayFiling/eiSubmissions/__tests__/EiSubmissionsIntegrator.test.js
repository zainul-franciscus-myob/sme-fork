import { LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS } from '../../PaydayFilingIntents';
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
});
