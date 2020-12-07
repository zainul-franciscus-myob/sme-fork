import {
  getAccountAllowedToMoveDown,
  getAccountAllowedToMoveUp,
  getAccountMoveToTargets,
  getAccountNumberCounts,
  getAccountsForBulkDelete,
  getAccountsForBulkUpdate,
  getAccountsForCalcHistoricalBalance,
  getCannotMoveAccountDownMessage,
  getCannotMoveAccountUpMessage,
  getImportChartOfAccountsUrl,
  getSelectedAccountsWithAllChildren,
  getSelectedSingleAccount,
  getTableEntries,
} from '../AccountListSelectors';

describe('AccountListSelectors', () => {
  describe('getTableEntries', () => {
    it('should return accounts for calculating historical balance', () => {
      const state = {
        entries: [
          { id: 'id-1', isHeader: true },
          { id: 'id-2', isHeader: false },
          { id: 'id-3', isHeader: false },
          { id: 'id-4', isHeader: false },
        ],
        ignoredLinkedAccounts: {
          equityAccountCurrentEarnings: {
            accountId: 'id-3',
          },
          equityHistoricalBalancing: {
            accountId: 'id-4',
          },
        },
      };
      const expected = [{ id: 'id-2', isHeader: false }];

      const actual = getAccountsForCalcHistoricalBalance(state);

      expect(actual).toEqual(expected);
    });

    it('should return table entries for the view', () => {
      const entries = [
        { id: 'id-1', level: 1 },
        { id: 'id-2', level: 2 },
      ];

      const expected = [
        {
          id: 'id-1',
          level: 1,
          displayLevel: 'Level 1',
          link: '/#/undefined/undefined/account/id-1',
        },
        {
          id: 'id-2',
          level: 2,
          displayLevel: 'Level 2',
          indentLevel: 1,
          link: '/#/undefined/undefined/account/id-2',
          hideAccountNumber: false,
        },
      ];

      const actual = getTableEntries.resultFunc(entries);

      expect(actual).toEqual(expected);
    });

    it('should add hideAccountNumber to entry', () => {
      const state = {
        businessId: '123',
        region: 'au',
        hasFlexibleAccountNumbers: true,
        entries: [
          { id: 'id-1', level: 1, isSystem: true },
          { id: 'id-2', level: 1, isSystem: false },
          { id: 'id-3', level: 2 },
        ],
      };

      const expected = [
        {
          id: 'id-1',
          level: 1,
          displayLevel: 'Level 1',
          link: '/#/au/123/account/id-1',
          hideAccountNumber: true,
          isSystem: true,
        },
        {
          id: 'id-2',
          level: 1,
          displayLevel: 'Level 1',
          link: '/#/au/123/account/id-2',
          hideAccountNumber: false,
          isSystem: false,
        },
        {
          id: 'id-3',
          level: 2,
          displayLevel: 'Level 2',
          hideAccountNumber: false,
          indentLevel: 1,
          link: '/#/au/123/account/id-3',
        },
      ];

      const actual = getTableEntries(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getImportChartOfAccountsUrl', () => {
    it('should return the url to the Import/Export data page where chartOfAccounts is defaulted for both import and export', () => {
      const state = {
        businessId: 'abc',
        region: 'au',
      };
      const actual = getImportChartOfAccountsUrl(state);
      const expected =
        '/#/au/abc/dataImportExport?importType=chartOfAccounts&exportType=chartOfAccounts';

      expect(actual).toEqual(expected);
    });
  });

  describe('bulk delete accounts', () => {
    it('should return selected accounts', () => {
      const state = {
        entries: [
          { id: 1, selected: true },
          { id: 2, selected: false },
        ],
      };
      const actual = getAccountsForBulkDelete(state);
      const expected = { accountIds: [1] };

      expect(actual).toEqual(expected);
    });
  });

  describe('bulk update accounts', () => {
    it('should return dirty accounts', () => {
      const state = {
        entries: [
          { id: 1, dirty: false },
          { id: 2, openingBalance: 111, dirty: true },
        ],
      };
      const actual = getAccountsForBulkUpdate(state);
      const expected = [
        {
          id: 2,
          openingBalance: 111,
        },
      ];

      expect(actual).toEqual(expected);
    });
    it('should return how many times an account number occurs', () => {
      const entries = [
        { id: 1, accountNumber: 1 },
        { id: 2, accountNumber: 2 },
        { id: 3, accountNumber: 1 },
        { id: 4, accountNumber: 3 },
      ];
      const actual = getAccountNumberCounts(entries);
      const expected = {
        '1': 2,
        '2': 1,
        '3': 1,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getSelectedAccounts', () => {
    it('should return selected dirty accounts', () => {
      const state = {
        entries: [
          { id: 1, dirty: false },
          { id: 2, openingBalance: 111, selected: true },
        ],
      };
      const actual = getSelectedSingleAccount(state);
      const expected = {
        id: 2,
        openingBalance: 111,
        selected: true,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getAccountAllowedToMoveUp', () => {
    describe('return true when', () => {
      it('allowed to move up for selected account', () => {
        const state = {
          entries: [
            { id: 1 },
            {
              id: 2,
              selected: true,
              isAllowedToMoveUp: true,
            },
          ],
        };
        const actual = getAccountAllowedToMoveUp(state);

        expect(actual).toBeTruthy();
      });
    });

    describe('return false when', () => {
      it('does not allowed to move up for selected account', () => {
        const state = {
          entries: [
            { id: 1 },
            {
              id: 2,
              selected: true,
              isAllowedToMoveUp: false,
            },
          ],
        };
        const actual = getAccountAllowedToMoveUp(state);

        expect(actual).toBeFalsy();
      });

      it('selected more than one account', () => {
        const state = {
          entries: [
            { id: 1, selected: false },
            { id: 2, selected: true, isAllowedToMoveUp: true },
            { id: 3, selected: true, isAllowedToMoveUp: true },
          ],
        };
        const actual = getAccountAllowedToMoveUp(state);

        expect(actual).toBeFalsy();
      });
    });
  });

  describe('getAccountAllowedToMoveDown', () => {
    describe('return true when', () => {
      it('allowed to move down for selected account', () => {
        const state = {
          entries: [
            { id: 1 },
            {
              id: 2,
              selected: true,
              isAllowedToMoveDown: true,
            },
          ],
        };
        const actual = getAccountAllowedToMoveDown(state);

        expect(actual).toBeTruthy();
      });
    });

    describe('return false when', () => {
      it('does not allowed to move down for selected account', () => {
        const state = {
          entries: [
            { id: 1 },
            {
              id: 2,
              selected: true,
              isAllowedToMoveDown: false,
            },
          ],
        };
        const actual = getAccountAllowedToMoveDown(state);

        expect(actual).toBeFalsy();
      });

      it('selected more than one account', () => {
        const state = {
          entries: [
            { id: 1, selected: false },
            { id: 2, selected: true, isAllowedToMoveDown: true },
            { id: 3, selected: true, isAllowedToMoveDOwn: true },
          ],
        };
        const actual = getAccountAllowedToMoveDown(state);

        expect(actual).toBeFalsy();
      });
    });
  });

  describe('getCannotMoveAccountUpMessage', () => {
    it('when selected multiple account', () => {
      const state = {
        entries: [
          { id: 1 },
          {
            id: 2,
            selected: true,
            isAllowedToMoveUp: true,
          },
          {
            id: 3,
            selected: true,
            isAllowedToMoveUp: true,
          },
        ],
      };
      const actual = getCannotMoveAccountUpMessage(state);

      expect(actual).toBe('You can only move one account at a time.');
    });

    it('does not allowed to move up for selected account', () => {
      const state = {
        entries: [
          { id: 1 },
          {
            id: 2,
            selected: true,
            isAllowedToMoveUp: false,
          },
        ],
      };
      const actual = getCannotMoveAccountUpMessage(state);

      expect(actual).toBe('You cannot move the selected account up one level.');
    });
  });

  describe('getCannotMoveAccountDownMessage', () => {
    it('when selected multiple account', () => {
      const state = {
        entries: [
          { id: 1 },
          {
            id: 2,
            selected: true,
            isAllowedToMoveDown: true,
          },
          {
            id: 3,
            selected: true,
            isAllowedToMoveDown: true,
          },
        ],
      };
      const actual = getCannotMoveAccountDownMessage(state);

      expect(actual).toBe('You can only move one account at a time.');
    });

    it('does not allowed to move down for selected account', () => {
      const state = {
        entries: [
          { id: 1 },
          {
            id: 2,
            selected: true,
            isAllowedToMoveUp: false,
          },
        ],
      };
      const actual = getCannotMoveAccountDownMessage(state);

      expect(actual).toBe(
        'You cannot move the selected account down one level.'
      );
    });
  });

  describe('move to options', () => {
    it('only return unselected accounts', () => {
      const state = {
        entries: [
          { id: 1, level: 1, selected: false, isHeader: true },
          { id: 2, level: 1, selected: true, isHeader: true },
          { id: 3, level: 2, selected: true, isHeader: false },
        ],
      };

      const actual = getAccountMoveToTargets(state);
      const expected = [
        {
          id: 1,
          level: 1,
          selected: false,
          isHeader: true,
          isParentOfSelectedAccounts: false,
        },
      ];

      expect(actual).toEqual(expected);
    });

    it('only return accounts of same account type as selected accounts', () => {
      const state = {
        entries: [
          {
            id: 1,
            level: 1,
            selected: false,
            accountType: 'Liability',
            isHeader: true,
          },
          {
            id: 2,
            level: 1,
            selected: false,
            accountType: 'Asset',
            isHeader: true,
          },
          {
            id: 3,
            level: 1,
            selected: true,
            accountType: 'Asset',
            isHeader: true,
          },
          {
            id: 4,
            level: 2,
            selected: true,
            accountType: 'Asset',
            isHeader: false,
          },
        ],
      };

      const actual = getAccountMoveToTargets(state);
      const expected = [
        {
          id: 2,
          level: 1,
          selected: false,
          accountType: 'Asset',
          isHeader: true,
          isParentOfSelectedAccounts: false,
        },
      ];

      expect(actual).toEqual(expected);
    });

    it('only return accounts where the resulting move would have a max level of 4 or less ', () => {
      const state = {
        entries: [
          {
            id: 1,
            level: 1,
            selected: false,
            accountType: 'Asset',
            isHeader: true,
          },
          {
            id: 2,
            level: 2,
            selected: false,
            accountType: 'Asset',
            isHeader: false,
          },
          {
            id: 3,
            level: 1,
            selected: true,
            accountType: 'Asset',
            isHeader: true,
          },
          {
            id: 4,
            level: 2,
            selected: true,
            accountType: 'Asset',
            isHeader: true,
          },
          {
            id: 5,
            level: 3,
            selected: true,
            accountType: 'Asset',
            isHeader: false,
          },
          {
            id: 6,
            level: 1,
            selected: false,
            accountType: 'Asset',
            isHeader: true,
          },
        ],
      };

      const actual = getAccountMoveToTargets(state);
      const expected = [
        {
          id: 1,
          level: 1,
          selected: false,
          accountType: 'Asset',
          isHeader: true,
          isParentOfSelectedAccounts: false,
        },
        {
          id: 6,
          level: 1,
          selected: false,
          accountType: 'Asset',
          isHeader: true,
          isParentOfSelectedAccounts: false,
        },
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe('getSelectedAccountsWithAllChildren', () => {
    it('should selected details accounts', () => {
      const state = {
        entries: [
          { id: 1, dirty: false, isHeader: true, level: 1 },
          { id: 2, selected: false, isHeader: true, level: 1 },
          { id: 3, parentAccountId: 2, selected: true, level: 2 },
          { id: 4, parentAccountId: 2, selected: false, level: 2 },
          { id: 5, parentAccountId: 1, selected: true, level: 2 },
        ],
      };
      const actual = getSelectedAccountsWithAllChildren(state);
      const expected = [
        { id: 3, parentAccountId: 2, selected: true, level: 2 },
        { id: 5, parentAccountId: 1, selected: true, level: 2 },
      ];

      expect(actual).toEqual(expected);
    });

    it('should selected details accounts at different levels', () => {
      const state = {
        entries: [
          { id: 1, dirty: false, isHeader: true, level: 1 },
          { id: 2, selected: false, isHeader: true, level: 1 },
          { id: 3, parentAccountId: 2, selected: true, level: 2 },
          { id: 4, parentAccountId: 2, selected: false, level: 2 },
          {
            id: 5,
            parentAccountId: 1,
            isHeader: true,
            selected: false,
            level: 2,
          },
          { id: 6, parentAccountId: 5, selected: true, level: 3 },
        ],
      };
      const actual = getSelectedAccountsWithAllChildren(state);
      const expected = [
        { id: 3, parentAccountId: 2, selected: true, level: 2 },
        { id: 6, parentAccountId: 5, selected: true, level: 3 },
      ];

      expect(actual).toEqual(expected);
    });

    it('should return all children under a selected header', () => {
      const state = {
        entries: [
          { id: 1, isHeader: true, level: 1 },
          { id: 2, selected: true, isHeader: true, level: 1 },
          {
            id: 3,
            parentAccountId: 2,
            isHeader: true,
            selected: true,
            level: 2,
          },
          {
            id: 4,
            parentAccountId: 2,
            selected: false,
            isHeader: true,
            level: 2,
          },
          { id: 5, parentAccountId: 4, selected: false, level: 3 },
          {
            id: 6,
            parentAccountId: 2,
            selected: false,
            isHeader: true,
            level: 2,
          },
        ],
      };
      const actual = getSelectedAccountsWithAllChildren(state);
      const expected = [
        { id: 2, selected: true, isHeader: true, level: 1 },
        {
          id: 3,
          parentAccountId: 2,
          isHeader: true,
          selected: true,
          level: 2,
        },
        {
          id: 4,
          parentAccountId: 2,
          selected: false,
          isHeader: true,
          level: 2,
        },
        { id: 5, parentAccountId: 4, selected: false, level: 3 },
        {
          id: 6,
          parentAccountId: 2,
          selected: false,
          isHeader: true,
          level: 2,
        },
      ];

      expect(actual).toEqual(expected);
    });

    it('should selected header accounts and children at different levels', () => {
      const state = {
        entries: [
          { id: 1, dirty: false, isHeader: true, level: 1 },
          { id: 2, selected: false, isHeader: true, level: 1 },
          { id: 3, parentAccountId: 2, selected: true, level: 2 },
          { id: 4, parentAccountId: 2, selected: false, level: 2 },
          {
            id: 5,
            parentAccountId: 1,
            isHeader: true,
            selected: false,
            level: 2,
          },
          {
            id: 6,
            parentAccountId: 5,
            isHeader: true,
            selected: true,
            level: 3,
          },
          { id: 7, parentAccountId: 6, selected: false, level: 4 },
        ],
      };
      const actual = getSelectedAccountsWithAllChildren(state);
      const expected = [
        { id: 3, parentAccountId: 2, selected: true, level: 2 },
        { id: 6, parentAccountId: 5, isHeader: true, selected: true, level: 3 },
        { id: 7, parentAccountId: 6, selected: false, level: 4 },
      ];

      expect(actual).toEqual(expected);
    });
  });
});
