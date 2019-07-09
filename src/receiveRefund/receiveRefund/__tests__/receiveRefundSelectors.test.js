import { getRefundForCreate } from '../receiveRefundSelectors';

describe('receiveRefundSelectors', () => {
  describe('getRefundForCreate', () => {
    [
      ['should return custom reference id', 'ABC001', 'ABC001'],
      ['should return undefined if reference id is the same as auto-generated value', 'CR0001', undefined],
      ['should return empty string if reference id empty string', '', ''],
    ].forEach((args) => {
      const [scenario, referenceId, expectedReferenceId] = args;

      it(scenario, () => {
        const state = {
          refund: {
            referenceId,
          },
          originalReferenceId: 'CR0001',
        };

        const actual = getRefundForCreate(state);

        expect(actual.referenceId).toEqual(expectedReferenceId);
      });
    });
  });
});
