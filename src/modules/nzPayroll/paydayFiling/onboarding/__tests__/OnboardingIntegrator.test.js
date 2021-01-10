import { GET_IRD_NUMBER, UPDATE_ONBOARD_USER } from '../OnboardingIntents';
import OnboardingIntegrator from '../OnboardingIntegrator';

describe('Onboarding integrator', () => {
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
      const integrator = OnboardingIntegrator(store, integration);

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

  describe('update onboard user', () => {
    it('should call integrator with expected parameters and intent', () => {
      // arrange
      const integration = { write: jest.fn() };
      const businessId = 42;

      const store = {
        getState: () => ({
          businessId,
        }),
      };

      const integrator = OnboardingIntegrator(store, integration);

      // act
      integrator.updateOnboardUser({
        onSuccess: () => {},
        onFailure: () => {},
      });

      // assert
      const parameterObject = integration.write.mock.calls[0][0];
      expect(parameterObject.intent).toEqual(UPDATE_ONBOARD_USER);
      expect(parameterObject.urlParams).toEqual({ businessId });
    });
  });
});
