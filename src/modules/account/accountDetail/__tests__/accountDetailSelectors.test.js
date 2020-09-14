import {
  getAccountClassificationforDisplay,
  getAccountClassificationsForDetail,
  getAccountTypeforDisplay,
  getIsAccountCategoryDisabled,
  getIsAccountNumberDisabled,
  getIsClassificationHeaderAccount,
  getIsParentHeaderDisabled,
  getIsReadOnlyHeaderAccountType,
  getParentAccountsForType,
  getParentHeaderAccountId,
  getShowBankDetails,
  getShowReadOnlyAccountType,
} from '../accountDetailSelectors';

describe('accountDetailSelectors', () => {
  describe('getIsClassificationHeaderAccount', () => {
    it('returns true when account is Header and account level is 1', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 1,
        },
      };

      const actual = getIsClassificationHeaderAccount(state);

      expect(actual).toEqual(true);
    });

    it('returns false when account is Header and account level is more than 1', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 2,
        },
      };

      const actual = getIsClassificationHeaderAccount(state);

      expect(actual).toEqual(false);
    });

    it('returns false when account is not Header', () => {
      const state = {
        isHeader: false,
        detail: {},
      };

      const actual = getIsClassificationHeaderAccount(state);

      expect(actual).toEqual(false);
    });
  });
  describe('getIsReadOnlyHeaderAccountType', () => {
    it('returns false when account id is new', () => {
      const state = {
        accountId: 'new',
      };

      const actual = getIsReadOnlyHeaderAccountType(state);

      expect(actual).toEqual(false);
    });

    it('returns true when account id is not new', () => {
      const state = {
        accountId: '123',
      };

      const actual = getIsReadOnlyHeaderAccountType(state);

      expect(actual).toEqual(true);
    });
  });

  describe('getIsParentHeaderDisabled', () => {
    it('returns true when there is no accountClassification', () => {
      const state = {
        detail: {
          accountClassification: '',
        },
        isFlexAccount: true,
      };
      const actual = getIsParentHeaderDisabled(state);

      expect(actual).toEqual(true);
    });
    it('returns true when account is Level 1 Header ', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 1,
          accountClassification: 'some classification',
        },
        isFlexAccount: true,
      };
      const actual = getIsParentHeaderDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns true when account is not flex account', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 2,
          accountClassification: 'some classification',
        },
        isFlexAccount: false,
      };
      const actual = getIsParentHeaderDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns false when account is not Level 1 Header ', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 2,
          accountClassification: 'some classification',
        },
        isFlexAccount: true,
      };
      const actual = getIsParentHeaderDisabled(state);

      expect(actual).toEqual(false);
    });
  });

  describe('getIsAccountCategoryDisabled', () => {
    it('returns true when there is a linkedAccount', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 2,
        },
        readonly: {
          linkedAccount: 'some account',
        },
      };
      const actual = getIsAccountCategoryDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns true when there is a no linked account but account header is level 1', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 1,
        },
        readonly: {
          linkedAccount: '',
        },
      };
      const actual = getIsAccountCategoryDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns false when there is no linked account and header is not level 1', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 2,
        },
        readonly: {
          linkedAccount: '',
        },
      };
      const actual = getIsAccountCategoryDisabled(state);

      expect(actual).toEqual(false);
    });
  });

  describe('getIsAccountNumberDisabled', () => {
    it('returns true when level 1 Header account', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 1,
        },
      };

      const actual = getIsAccountNumberDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns true when there is no account classification', () => {
      const state = {
        detail: {
          accountClassification: '',
        },
      };

      const actual = getIsAccountNumberDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns true there account is no flex account', () => {
      const state = {
        detail: {
          accountClassification: '',
        },
        isFlexAccount: false,
      };

      const actual = getIsAccountNumberDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns true when account header is level 1 and flex account', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 1,
          accountClassification: '',
        },
        isFlexAccount: true,
      };

      const actual = getIsAccountNumberDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns true when account header is level 1 and account classification', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 1,
          accountClassification: 'some',
        },
      };

      const actual = getIsAccountNumberDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns true when header is not level 1 and there is no account classification', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 2,
          accountClassification: '',
        },
      };

      const actual = getIsAccountNumberDisabled(state);

      expect(actual).toEqual(true);
    });

    it('returns false when header is not level 1 and flex account', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 3,
          accountClassification: '',
        },
        isFlexAccount: true,
      };

      const actual = getIsAccountNumberDisabled(state);

      expect(actual).toEqual(false);
    });

    it('returns false when header is not level 1 and there is an account classification ', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 2,
          accountClassification: 'some account',
        },
      };

      const actual = getIsAccountNumberDisabled(state);

      expect(actual).toEqual(false);
    });

    it('returns false when header is not level 1 and flex account but no account classification', () => {
      const state = {
        isHeader: true,
        header: {
          isHeader: true,
          level: 2,
        },
        isFlexAccount: true,
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

  describe('getShowReadOnlyAccountType', () => {
    it('returns true when is not creating, and is not Asset or liability classification ', () => {
      const state = {
        detail: {
          accountClassification: 'Expense',
        },
        accountId: '1',
      };

      const actual = getShowReadOnlyAccountType(state);

      expect(actual).toEqual(true);
    });
    it('returns false when is creating, and is Asset or liability classification ', () => {
      const state = {
        detail: {
          accountClassification: 'Expense',
        },
        accountId: 'new',
      };

      const actual = getShowReadOnlyAccountType(state);

      expect(actual).toEqual(false);
    });
    it('returns false when is not creating, and is Asset or liability classification ', () => {
      const state = {
        detail: {
          accountClassification: 'Asset',
        },
        accountId: '1',
      };

      const actual = getShowReadOnlyAccountType(state);

      expect(actual).toEqual(false);
    });
    it('returns false when is creating, and is Asset or liability classification', () => {
      const state = {
        detail: {
          accountClassification: 'Asset',
        },
        accountId: 'new',
      };

      const actual = getShowReadOnlyAccountType(state);

      expect(actual).toEqual(false);
    });
  });
  describe('getAccountTypeforDisplay', () => {
    it('returns account type displayName when account classification is selected', () => {
      const state = {
        detail: {
          accountType: 'y',
        },
        accountClassifications: [
          { value: 'y', displayName: 'y' },
          {
            value: 'x',
            type: [{ value: 'f', displayName: 'f' }],
            displayName: 'x',
          },
          { value: 'z', displayName: 'z' },
        ],
      };
      const actual = getAccountTypeforDisplay(state);

      expect(actual).toEqual('y');
    });
    it('returns account type displayName when accound subtype is selected', () => {
      const state = {
        detail: {
          accountType: 'f',
        },
        accountClassifications: [
          { value: 'y', displayName: 'y' },
          {
            value: 'x',
            type: [{ value: 'f', displayName: 'f' }],
            displayName: 'x',
          },
          { value: 'z', displayName: 'z' },
        ],
      };
      const actual = getAccountTypeforDisplay(state);

      expect(actual).toEqual('f');
    });
    it('returns a - when account cannot be found', () => {
      const state = {
        detail: {
          accountType: 'G',
        },
        accountClassifications: [
          { value: 'y', displayName: 'y' },
          {
            value: 'x',
            type: [{ value: 'f', displayName: 'f' }],
            displayName: 'x',
          },
          { value: 'z', displayName: 'z' },
        ],
      };
      const actual = getAccountTypeforDisplay(state);

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
    describe('when header', () => {
      it('should only return lvl1 and 2 headers', () => {
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
          isHeader: true,
          header: {
            accountClassification: 'y',
          },
          headerAccounts: [...yHeaders, ...zHeaders],
        };
        const actual = getParentAccountsForType(state);

        expect(actual).toEqual([yHeaders[0], yHeaders[1]]);
      });
      it('should not return headers with current accounts ID', () => {
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
          accountId: 'y',
          isHeader: true,
          header: {
            accountClassification: 'y',
          },
          headerAccounts: [...yHeaders, ...zHeaders],
        };
        const actual = getParentAccountsForType(state);

        expect(actual).toEqual([yHeaders[1]]);
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
  describe('getAccountClassificationsForDetail', () => {
    it('returns all classifications when isCreating ', () => {
      const classifications = [
        { value: 'y', displayName: 'y' },
        {
          value: 'x',
          type: [{ value: 'f', displayName: 'f' }],
          displayName: 'x',
        },
        { value: 'z', displayName: 'z' },
      ];
      const state = {
        accountId: 'new',
        detail: {
          accountClassification: 'y',
        },
        accountClassifications: classifications,
      };

      const actual = getAccountClassificationsForDetail(state);

      expect(actual).toEqual(classifications);
    });
    it('when not creating, returns classifications matching account classification', () => {
      const classifications = [
        { value: 'y', displayName: 'y' },
        {
          value: 'x',
          type: [{ value: 'f', displayName: 'f' }],
          displayName: 'x',
        },
        { value: 'z', displayName: 'z' },
      ];
      const state = {
        accountId: '123',
        detail: {
          accountClassification: 'x',
        },
        accountClassifications: classifications,
      };

      const actual = getAccountClassificationsForDetail(state);

      expect(actual).toEqual([classifications[1]]);
    });
  });

  describe('getParentHeaderAccountId', () => {
    const headerAccounts = [
      {
        accountClassification: 'Asset',
        id: '2',
        level: 1,
        accountNumber: '1-0000',
      },
      {
        accountClassification: 'Asset',
        id: '24',
        level: 2,
        accountNumber: '1-1000',
      },
      {
        accountClassification: 'Asset',
        id: '25',
        level: 3,
        accountNumber: '1-1100',
      },
      {
        accountClassification: 'Asset',
        id: '29',
        level: 3,
        accountNumber: '1-1950',
      },
      {
        accountClassification: 'Asset',
        id: '32',
        level: 2,
        accountNumber: '1-2000',
      },
      {
        accountClassification: 'Asset',
        id: '33',
        level: 3,
        accountNumber: '1-3000',
      },
      {
        accountClassification: 'Asset',
        id: '36',
        level: 3,
        accountNumber: '1-4000',
      },
      {
        accountClassification: 'Asset',
        id: '41',
        level: 3,
        accountNumber: '1-5000',
      },
      {
        accountClassification: 'Asset',
        id: '42',
        level: 2,
        accountNumber: '1-0500',
      },
      {
        accountClassification: 'Asset',
        id: '43',
        level: 3,
        accountNumber: '1-0510',
      },
    ];

    [
      { accountNumber: '1-0001', expectedParentAccountId: '2' },
      { accountNumber: '1-2000', expectedParentAccountId: '2' },
      { accountNumber: '1-1111', expectedParentAccountId: '25' },
      { accountNumber: '1-1955', expectedParentAccountId: '29' },
      { accountNumber: '1-1655', expectedParentAccountId: '24' },
      { accountNumber: '1-0520', expectedParentAccountId: '43' },
      { accountNumber: '1-1101', expectedParentAccountId: '25' },
    ].forEach(({ accountNumber, expectedParentAccountId }) => {
      it(`returns ${expectedParentAccountId} as parent header account for ${accountNumber}`, () => {
        const state = {
          detail: {
            accountNumber,
            accountClassification: 'Asset',
          },
          headerAccounts,
        };
        const actual = getParentHeaderAccountId(state);

        expect(actual).toEqual(expectedParentAccountId);
      });
    });

    it(`returns empty parent header id when account is a level 1 header account`, () => {
      const state = {
        isHeader: true,
        header: {
          accountNumber: '1-0000',
          accountClassification: 'Asset',
        },
        headerAccounts,
      };
      const actual = getParentHeaderAccountId(state);

      expect(actual).toEqual('');
    });

    it(`returns level 2 parent header when account is a header and matches level 3 parent`, () => {
      const state = {
        isHeader: true,
        header: {
          accountNumber: '1-1951',
          accountClassification: 'Asset',
        },
        headerAccounts,
      };
      const actual = getParentHeaderAccountId(state);

      expect(actual).toEqual('24');
    });
  });
});
