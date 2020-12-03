import { ONBOARD_USER } from '../../../OnboardingIntents';
import AuthorisationStepIntegrator from '../AuthorisationStepIntegrator';

describe('Authorisation step integrator', () => {
  describe('onboard user', () => {
    it('should call integrator with expected parameters and content', () => {
      // arrange
      const integration = { write: jest.fn() };
      const businessId = 42;

      const store = {
        getState: () => ({
          businessId,
        }),
      };
      const expectedContent = {
        onSuccessCallbackUrl: btoa(
          `/#/nz/${businessId}/paydayFiling/onboarding?authorisation=complete`
        ),
      };
      const integrator = AuthorisationStepIntegrator(store, integration);

      // act
      integrator.onboardUser({
        onSuccess: () => {},
        onFailure: () => {},
      });

      // assert
      const parameterObject = integration.write.mock.calls[0][0];
      expect(parameterObject.intent).toEqual(ONBOARD_USER);
      expect(parameterObject.urlParams).toEqual({ businessId });
      expect(parameterObject.content).toEqual(expectedContent);
    });
  });
});
