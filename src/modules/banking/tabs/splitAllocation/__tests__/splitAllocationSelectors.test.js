import {
  getContactLabel,
  getIsSupplier,
  getLinesForTaxCalculation,
  getShowIsReportableCheckbox,
  getSplitAllocationPayload,
  getSplitAllocationUniqueSelectedJobIds,
  getTotalDollarAmount,
  getTotals,
} from '../splitAllocationSelectors';
import ContactType from '../../../../contact/contactCombobox/types/ContactType';
import DefaultLineTypeId from '../../../types/DefaultLineTypeId';
import Region from '../../../../../common/types/Region';

describe('splitAllocationSelectors', () => {
  describe('getTotals', () => {
    [
      [
        'fully allocated single allocation',
        [{ amount: 1000 }],
        1000,
        '$1,000.00 (100.00%)',
        '$0.00 (0.00%)',
      ],
      [
        'partly allocated single allocation',
        [{ amount: 500 }],
        1000,
        '$500.00 (50.00%)',
        '$500.00 (50.00%)',
      ],
      [
        'fully allocated split allocation',
        [{ amount: 500 }, { amount: 500 }],
        1000,
        '$1,000.00 (100.00%)',
        '$0.00 (0.00%)',
      ],
      [
        'partly allocated split allocation',
        [{ amount: 500 }, { amount: 100 }],
        1000,
        '$600.00 (60.00%)',
        '$400.00 (40.00%)',
      ],
      [
        'negative allocation',
        [{ amount: -500 }],
        1000,
        '-$500.00 (-50.00%)',
        '$1,500.00 (150.00%)',
      ],
      [
        'calculated decimal values',
        [{ amount: 33 }, { amount: 67.7 }],
        295,
        '$100.70 (34.14%)',
        '$194.30 (65.86%)',
      ],
      [
        'zero total amount and zero allocation',
        [{ amount: 0 }],
        0,
        '$0.00 (100.00%)',
        '$0.00 (0.00%)',
      ],
      [
        'zero total amount and non zero allocation',
        [{ amount: 33 }],
        0,
        '$33.00 (100.00%)',
        '-$33.00 (0.00%)',
      ],
    ].forEach((args) => {
      const [scenario, ...rest] = args;

      it(`should return ${scenario}`, () => {
        const [lines, total, totalAllocated, totalUnallocated] = rest;

        const totalAmount = getTotalDollarAmount.resultFunc(lines);
        const result = getTotals.resultFunc(totalAmount, total);

        expect(result.totalAllocated).toEqual(totalAllocated);
        expect(result.totalUnallocated).toEqual(totalUnallocated);
      });
    });
  });

  describe('getSplitAllocationPayload', () => {
    it('should return a valid payload when selected contact is reportable', () => {
      const state = {
        openPosition: 0,
        filterOptions: {
          transactionType: 'approved',
        },
        entries: [
          {
            transactionId: '1',
            note: 'foo',
            bankAccountId: '123',
          },
        ],
        openEntry: {
          allocate: {
            id: '1',
            isSpendMoney: true,
            date: '2019-10-20',
            contactId: '222',
            contactType: ContactType.SUPPLIER,
            isReportable: true,
            description: 'bar',
            lines: [
              {
                accountId: '123',
                amount: '1000.00',
                description: 'my description',
                jobId: '444',
                taxCodeId: '333',
                accounts: [{}, {}],
                taxCodes: [{}, {}],
              },
            ],
          },
        },
      };

      const expected = {
        bankAccountId: '123',
        transactionId: '1',
        isWithdrawal: true,
        contactId: '222',
        date: '2019-10-20',
        isReportable: true,
        description: 'bar',
        lines: [
          {
            accountId: '123',
            amount: '1000.00',
            description: 'my description',
            jobId: '444',
            taxCodeId: '333',
          },
        ],
      };

      const index = 0;
      const actual = getSplitAllocationPayload(state, index);
      expect(actual).toEqual(expected);
    });

    it('should return a valid payload when selected contact is not supplier', () => {
      const state = {
        openPosition: 0,
        filterOptions: {
          transactionType: 'approved',
        },
        entries: [
          {
            transactionId: '1',
            note: 'foo',
            bankAccountId: '123',
          },
        ],
        openEntry: {
          allocate: {
            id: '1',
            isSpendMoney: true,
            date: '2019-10-20',
            contactId: '222',
            isReportable: true,
            description: 'bar',
            lines: [
              {
                accountId: '123',
                amount: '1000.00',
                description: 'my description',
                jobId: '444',
                taxCodeId: '333',
                accounts: [{}, {}],
                taxCodes: [{}, {}],
              },
            ],
          },
        },
      };

      const expected = {
        bankAccountId: '123',
        transactionId: '1',
        isWithdrawal: true,
        contactId: '222',
        date: '2019-10-20',
        isReportable: undefined,
        description: 'bar',
        lines: [
          {
            accountId: '123',
            amount: '1000.00',
            description: 'my description',
            jobId: '444',
            taxCodeId: '333',
          },
        ],
      };

      const index = 0;
      const actual = getSplitAllocationPayload(state, index);
      expect(actual).toEqual(expected);
    });
  });

  describe('getIsSupplier', () => {
    const buildState = ({ isSpendMoney, contactId, contactType }) => ({
      openEntry: {
        allocate: {
          isSpendMoney,
          contactId,
          contactType,
        },
      },
    });

    it('should return true when the contactType is supplier', () => {
      const state = buildState({
        isSpendMoney: true,
        contactType: ContactType.SUPPLIER,
      });

      const actual = getIsSupplier(state);

      expect(actual).toBeTruthy();
    });

    it('should return false when the contactType is not supplier', () => {
      const state = buildState({
        isSpendMoney: true,
        contactType: ContactType.CUSTOMER,
      });

      const actual = getIsSupplier(state);

      expect(actual).toBeFalsy();
    });
  });

  describe('getShowIsReportableCheckbox', () => {
    const buildState = ({ region, isSpendMoney, contactType }) => ({
      region,
      openEntry: {
        allocate: {
          isSpendMoney,
          contactType,
        },
      },
    });
    it('should return true when it is spend money, it is supplier and region is au', () => {
      const state = buildState({
        region: Region.au,
        isSpendMoney: true,
        contactType: ContactType.SUPPLIER,
      });

      const actual = getShowIsReportableCheckbox(state);

      expect(actual).toBeTruthy();
    });

    it('should return false when it is not spend money, it is supplier and region is au', () => {
      const state = buildState({
        region: Region.au,
        isSpendMoney: false,
        contactType: ContactType.SUPPLIER,
      });

      const actual = getShowIsReportableCheckbox(state);

      expect(actual).toBeFalsy();
    });

    it('should return false when it is spend money, it is not supplier and region is au', () => {
      const state = buildState({
        region: Region.au,
        isSpendMoney: true,
        contactType: ContactType.CUSTOMER,
      });

      const actual = getShowIsReportableCheckbox(state);

      expect(actual).toBeFalsy();
    });

    it('should return false when it is spend money, it is supplier and region is nz', () => {
      const state = buildState({
        region: Region.nz,
        isSpendMoney: true,
        contactType: ContactType.CUSTOMER,
      });

      const actual = getShowIsReportableCheckbox(state);

      expect(actual).toBeFalsy();
    });
  });

  describe('getContactLabel', () => {
    it('should return payee if it is a spend money', () => {
      const state = {
        openEntry: {
          allocate: {
            isSpendMoney: true,
          },
        },
      };

      const actual = getContactLabel(state);

      expect(actual).toEqual('payee');
    });

    it('should return payer if it is a spend money', () => {
      const state = {
        openEntry: {
          allocate: {
            isSpendMoney: false,
          },
        },
      };

      const actual = getContactLabel(state);

      expect(actual).toEqual('payer');
    });
  });

  describe('getLinesForTaxCalculation', () => {
    const state = {
      entries: [
        {},
        {
          withdrawal: 100,
          deposit: undefined,
        },
      ],
      openPosition: 1,
      openEntry: {
        allocate: {
          lines: [
            {
              amount: 100,
              taxCodeId: '1',
              unnecessaryField: 'x',
            },
          ],
        },
      },
    };

    it('only gets relevant tax calculation fields from line', () => {
      const modifiedState = {
        ...state,
        openEntry: {
          ...state.openEntry,
          allocate: {
            ...state.openEntry.allocate,
            lines: [
              {
                ...state.openEntry.allocate.lines[0],
                lineTypeId: '9000',
              },
            ],
          },
        },
      };

      const actual = getLinesForTaxCalculation(modifiedState);

      expect(actual).toEqual([
        {
          amount: 100,
          taxCodeId: '1',
          lineTypeId: '9000',
        },
      ]);
    });

    it('uses default spend money line type id when withdrawal', () => {
      const actual = getLinesForTaxCalculation({
        ...state,
        entries: [
          {},
          {
            withdrawal: 100,
            deposit: undefined,
          },
        ],
      });

      expect(actual[0].lineTypeId).toEqual(DefaultLineTypeId.SPEND_MONEY);
    });

    it('uses default receive money line type id when deposit', () => {
      const actual = getLinesForTaxCalculation({
        ...state,
        entries: [
          {},
          {
            withdrawal: undefined,
            deposit: 100,
          },
        ],
      });

      expect(actual[0].lineTypeId).toEqual(DefaultLineTypeId.RECEIVE_MONEY);
    });
  });

  describe('getSplitAllocationUniqueSelectedJobIds', () => {
    it('returns a list of unique selected job ids excluding empty ids', () => {
      const state = {
        openPosition: 0,
        filterOptions: {
          bankAccount: '123',
          transactionType: 'approved',
        },
        entries: [
          {
            transactionId: '1',
            note: 'foo',
          },
        ],
        openEntry: {
          allocate: {
            lines: [
              { jobId: '1' },
              { jobId: '2' },
              { jobId: '' },
              { jobId: '1' },
            ],
          },
        },
      };

      const actual = getSplitAllocationUniqueSelectedJobIds(state);

      expect(actual).toEqual(['1', '2']);
    });
  });
});
