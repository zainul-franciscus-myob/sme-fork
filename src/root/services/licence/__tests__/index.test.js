import { CONFIRM_LICENCE } from '../LicenceIntents';
import LicenceService from '../index';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import rootReducer from '../../../rootReducer';

describe('licenceService', () => {
  const setup = () => {
    const store = new TestStore(rootReducer);
    const integration = new TestIntegration();

    return { store, integration };
  };

  describe('confirm', () => {
    it('makes request to confirm licence', async () => {
      const { store, integration } = setup();
      const sut = LicenceService(integration, store);

      await sut.confirm();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CONFIRM_LICENCE }),
      ]);
    });

    it('does not throw error when request fails', async () => {
      const { store, integration } = setup();
      integration.mapFailure(CONFIRM_LICENCE);
      const sut = LicenceService(integration, store);

      // Expect promise to resolve with no return value
      await expect(sut.confirm()).resolves.toBeUndefined();
    });
  });
});
