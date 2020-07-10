import { LOAD_TAX_TABLE_RESULT } from '../taxTableCalculationModalIntents';
import createTaxTableCalculationModalIntegrator from '../createTaxTableCalculationModalIntegrator';

describe('createTaxTableCalculationModalIntegrator', () => {
  describe('fetchTaxTableResult', () => {
    it('calls the right intent', () => {
      const integration = { read: jest.fn() };
      const store = { getState: () => ({}) };
      const integrator = createTaxTableCalculationModalIntegrator(
        store,
        integration
      );

      integrator.fetchTaxTableResult({
        onSuccess: () => {},
        onFailure: () => {},
      });

      expect(integration.read).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: LOAD_TAX_TABLE_RESULT,
        })
      );
    });
  });
});
