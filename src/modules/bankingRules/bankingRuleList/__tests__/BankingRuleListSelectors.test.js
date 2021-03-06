import { getNewSortOrder } from '../BankingRuleListSelectors';

describe('BankingRuleListSelectors', () => {
  describe('getNewSortOrder', () => {
    it('defaults to `asc` when different orderBy', () => {
      const orderBy = 'ð­';
      const state = {
        orderBy: 'ðĪŠ',
      };

      const actual = getNewSortOrder(state, orderBy);

      expect(actual).toEqual('asc');
    });

    describe('when same orderBy', () => {
      const orderBy = 'ð­';
      const state = {
        orderBy: 'ð­',
      };

      [
        {
          in: 'asc',
          out: 'desc',
        },
        {
          in: 'desc',
          out: 'asc',
        },
      ].forEach((test) => {
        it(`turns ${test.in} to ${test.out}`, () => {
          const modifiedState = {
            ...state,
            sortOrder: test.in,
          };

          const actual = getNewSortOrder(modifiedState, orderBy);

          expect(actual).toEqual(test.out);
        });
      });
    });
  });
});
