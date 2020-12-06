import { getLoadAddedAccountUrlParams } from '../IntegratorSelectors';

describe('integratorSelectors', () => {
  describe('getLoadAddedAccountUrlParams', () => {
    const state = {
      businessId: 'batman',
    };

    it('gets businessId and returns it with accountId', () => {
      const actual = getLoadAddedAccountUrlParams(state, 'accountId');

      expect(actual).toEqual({
        accountId: 'accountId',
        businessId: 'batman',
      });
    });
  });
});
