import {
  CREATE_ONBOARD_USER,
  UPDATE_ONBOARD_USER,
} from '../PaydayFilingIntents';
import createPaydayFilingIntegrator from '../createPaydayFilingIntegrator';

describe('Payday filing integrator', () => {
  describe('onboard user', () => {
    it('should call integrator with expected parameters and content', () => {
      // arrange
      const successUrl = btoa(
        window.location.origin.concat(
          '/#/nz/42/paydayFiling?authorisation=complete'
        )
      );
      const integration = { write: jest.fn() };
      const businessId = 42;

      const store = {
        getState: () => ({
          businessId,
        }),
      };
      const integrator = createPaydayFilingIntegrator(store, integration);

      // act
      integrator.createOnboardUser({
        onSuccess: () => {},
        onFailure: () => {},
      });

      // assert
      const parameterObject = integration.write.mock.calls[0][0];
      expect(parameterObject.intent).toEqual(CREATE_ONBOARD_USER);
      expect(parameterObject.urlParams).toEqual({ businessId });
      expect(parameterObject.params).toEqual({ successUrl });
    });
  });
  describe('update onboard user', () => {
    it('should call integrator with expected parameters and content', () => {
      // arrange
      const integration = { write: jest.fn() };
      const businessId = 42;

      const store = {
        getState: () => ({
          businessId,
        }),
      };
      const integrator = createPaydayFilingIntegrator(store, integration);

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
