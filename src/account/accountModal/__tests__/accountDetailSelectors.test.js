import {
  getAccountClassificationforDisplay,
  getIsAccountNumberDisabled,
  getIsParentHeaderDisabled,
  getParentAccountsForType,
  getShowBankDetails,
} from '../accountModalSelectors';

describe('accountDetailSelectors', () => {
  describe('getIsParentHeaderDisabled', () => {
    it('returns true when there is no accountClassification', () => {
      const state = {
        detail: {
          accountClassification: '',
        },
      };
      const actual = getIsParentHeaderDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns false when account is classification set', () => {
      const state = {
        detail: {
          accountClassification: 'some classification',
        },
      };
      const actual = getIsParentHeaderDisabled(state);

      expect(actual).toEqual(false);
    });
  });

  describe('getIsAccountNumberDisabled', () => {
    it('returns true when there is no account classification and is not flex account', () => {
      const state = {
        isFlexAccount: false,
        detail: {
          accountClassification: '',
        },
      };

      const actual = getIsAccountNumberDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns false there account is flex account', () => {
      const state = {
        detail: {
          accountClassification: '',
        },
        isFlexAccount: true,
      };

      const actual = getIsAccountNumberDisabled(state);

      expect(actual).toEqual(false);
    });

    it('returns false there account is a classification ', () => {
      const state = {
        detail: {
          accountClassification: 'Stuff',
        },
      };

      const actual = getIsAccountNumberDisabled(state);

      expect(actual).toEqual(false);
    });
  });

  describe('getAccountClassificationforDisplay', () => {
    it('gets displayName of matching account classification from state', () => {
      const state = {
        detail: {
          accountClassification: 'x',
        },
        accountClassifications: [
          { value: 'y', displayName: 'y' },
          { value: 'x', displayName: 'x' },
          { value: 'z', displayName: 'z' },
        ],
      };

      const actual = getAccountClassificationforDisplay(state);

      expect(actual).toEqual('x');
    });
    it('gets - string when not found', () => {
      const state = {
        detail: {
          accountClassification: 'f',
        },
        accountClassifications: [
          { value: 'y', displayName: 'y' },
          { value: 'x', displayName: 'x' },
          { value: 'z', displayName: 'z' },
        ],
      };

      const actual = getAccountClassificationforDisplay(state);

      expect(actual).toEqual('-');
    });
    it('gets - string when no classification', () => {
      const state = {
        detail: {
          accountClassification: '',
        },
        accountClassifications: [
          { value: 'y', displayName: 'y' },
          { value: 'x', displayName: 'x' },
          { value: 'z', displayName: 'z' },
        ],
      };

      const actual = getAccountClassificationforDisplay(state);

      expect(actual).toEqual('-');
    });
  });

  describe('getParentAccountsForType', () => {
    describe('when detail account', () => {
      it('should only return headers with matching classifications', () => {
        const yHeaders = [
          {
            accountClassification: 'y',
            level: 2,
            id: 'y',
            displayName: 'y',
          },
          {
            accountClassification: 'y',
            level: 1,
            id: 'q',
            displayName: 'q',
          },
          {
            accountClassification: 'y',
            level: 3,
            id: 'x',
            displayName: 'x',
          },
        ];
        const zHeaders = [
          {
            accountClassification: 'z',
            level: 2,
            id: 'z',
            displayName: 'z',
          },
        ];
        const state = {
          accountId: 'ID',
          detail: {
            accountClassification: 'y',
          },
          headerAccounts: [...yHeaders, ...zHeaders],
        };
        const actual = getParentAccountsForType(state);

        expect(actual).toEqual(yHeaders);
      });
    });
  });
  describe('getShowBankDetails', () => {
    it('returns false when type is not bank or credit card', () => {
      const state = {
        detail: {
          accountType: 'test',
        },
      };

      const actual = getShowBankDetails(state);

      expect(actual).toEqual(false);
    });
    it('returns true when type is bank', () => {
      const state = {
        detail: {
          accountType: 'Bank',
        },
      };

      const actual = getShowBankDetails(state);

      expect(actual).toEqual(true);
    });
  });
});
