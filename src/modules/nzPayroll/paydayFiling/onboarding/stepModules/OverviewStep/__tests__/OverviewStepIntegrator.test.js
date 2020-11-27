import { GET_IRD_NUMBER } from '../../../OnboardingIntents';
import OverviewStepIntegrator from '../OverviewStepIntegrator';

describe('Overview step integrator', () => {
  describe('get ird number', () => {
    it('calls integrator with expected parameters', () => {
      // arrange
      const integration = { read: jest.fn() };
      const businessId = 42;

      const store = {
        getState: () => ({
          businessId,
        }),
      };
      const integrator = OverviewStepIntegrator(store, integration);

      // act
      integrator.getIrdNumber({
        onSuccess: () => {},
        onFailure: () => {},
      });

      // assert
      const parameterObject = integration.read.mock.calls[0][0];
      expect(parameterObject.intent).toEqual(GET_IRD_NUMBER);
      expect(parameterObject.urlParams).toEqual({ businessId });
    });
  });
});
