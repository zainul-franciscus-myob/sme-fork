import {
  getCalculationBasis,
  getFilteredAtoReportingCategories,
  getFilteredEmployees,
  getFilteredExemptions,
  getFormattedAmount,
  getFormattedPercentage,
  getIsExemptionDisabled,
  getLimit,
  getUpdatedSuperPayItemForSave,
} from '../superPayItemSelectors';

describe('superPayItemSelectors', () => {
  describe('getFilteredAtoReportingCategories', () => {
    const atoReportingCategories = [
      {
        name: 'To be assigned',
        value: 'NotSet',
      },
      {
        name: 'Not reportable',
        value: 'NotReportable',
      },
      {
        name: 'Superannuation guarantee',
        value: 'SuperGuarantee',
      },
      {
        name: 'Reportable employer super contributions',
        value: 'ReportableEmployerSuperContributions',
      },
    ];

    [
      ['EmployeeAdditional', true, true, false, false],
      ['EmployerAdditional', true, true, true, true],
      ['Productivity', true, true, true, false],
      ['Redundancy', true, true, false, false],
      ['SalarySacrifice', true, true, false, true],
      ['Spouse', true, true, false, false],
      ['SuperannuationGuarantee', true, false, true, false],
    ].forEach((args) => {
      const [contributionType, ...rest] = args;

      describe(`when contribution type is ${contributionType}`, () => {
        atoReportingCategories.forEach(({ name, value }, index) => {
          const expected = rest[index];

          it(`should ${expected ? '' : ' not'} contain "${name}"`, () => {
            const actual = getFilteredAtoReportingCategories.resultFunc(
              contributionType,
              atoReportingCategories
            );

            expect(!!actual.find((item) => item.value === value)).toEqual(
              expected
            );
          });
        });
      });
    });
  });

  describe('getCalculationBasis', () => {
    const state = {
      superPayItem: {
        contributionType: 'EmployeeAdditional',
        calculationBasisType: 'PercentOfPayrollCategory',
      },
      calculationBasisDeductionPayItems: [{ id: 'deduction' }],
      calculationBasisExpensePayItems: [{ id: 'expense' }],
    };

    describe('calculationBasisPayItems', () => {
      [
        ['EmployeeAdditional', 'deduction'],
        ['EmployerAdditional', 'expense'],
        ['Productivity', 'expense'],
        ['Redundancy', 'expense'],
        ['SalarySacrifice', 'deduction'],
        ['Spouse', 'deduction'],
        ['SuperannuationGuarantee', 'expense'],
      ].forEach((args) => {
        const [contributionType, expectedType] = args;

        it(`should return ${expectedType} when contribution type is ${contributionType}`, () => {
          const customState = {
            ...state,
            superPayItem: {
              ...state.superPayItem,
              contributionType,
            },
          };

          const actual = getCalculationBasis(customState);
          expect(actual.calculationBasisPayItems[0].id).toEqual(expectedType);
        });
      });
    });

    describe('showPercent', () => {
      [
        ['UserEntered', false],
        ['PercentOfPayrollCategory', true],
        ['FixedDollar', false],
      ].forEach((args) => {
        const [calculationBasisType, expectedShowPercent] = args;

        it(`should be ${expectedShowPercent} when calculation basis is ${calculationBasisType}`, () => {
          const customState = {
            ...state,
            superPayItem: {
              ...state.superPayItem,
              calculationBasisType,
            },
          };

          const actual = getCalculationBasis(customState);
          expect(actual.showPercent).toEqual(expectedShowPercent);
        });
      });
    });

    describe('showAmount', () => {
      [
        ['UserEntered', false],
        ['Percent', false],
        ['FixedDollar', true],
      ].forEach((args) => {
        const [calculationBasisType, expectedShowAmount] = args;

        it(`should be ${expectedShowAmount} when calculation basis is ${calculationBasisType}`, () => {
          const customState = {
            ...state,
            superPayItem: {
              ...state.superPayItem,
              calculationBasisType,
            },
          };

          const actual = getCalculationBasis(customState);

          expect(actual.showAmount).toEqual(expectedShowAmount);
        });
      });
    });
  });

  describe('getLimit', () => {
    const state = {
      superPayItem: {
        contributionType: 'EmployeeAdditional',
        limitType: 'Percent',
      },
      limitDeductionPayItems: [{ id: 'deduction' }],
      limitExpensePayItems: [{ id: 'expense' }],
    };

    describe('limitPayItems', () => {
      [
        ['EmployeeAdditional', 'deduction'],
        ['EmployerAdditional', 'expense'],
        ['Productivity', 'expense'],
        ['Redundancy', 'expense'],
        ['SalarySacrifice', 'deduction'],
        ['Spouse', 'deduction'],
        ['SuperannuationGuarantee', 'expense'],
      ].forEach((args) => {
        const [contributionType, expectedType] = args;

        it(`should return ${expectedType} when contribution type is ${contributionType}`, () => {
          const customState = {
            ...state,
            superPayItem: {
              ...state.superPayItem,
              contributionType,
            },
          };

          const actual = getLimit(customState);
          expect(actual.limitPayItems[0].id).toEqual(expectedType);
        });
      });
    });

    describe('showPercent', () => {
      [
        ['UserEntered', false],
        ['Percent', true],
        ['FixedDollar', false],
      ].forEach((args) => {
        const [limitType, expectedShowPercent] = args;

        it(`should be ${expectedShowPercent} when calculation basis is ${limitType}`, () => {
          const customState = {
            ...state,
            superPayItem: {
              ...state.superPayItem,
              limitType,
            },
          };

          const actual = getLimit(customState);
          expect(actual.showPercent).toEqual(expectedShowPercent);
        });
      });
    });

    describe('showAmount', () => {
      [
        ['UserEntered', false],
        ['Percent', false],
        ['FixedDollar', true],
      ].forEach((args) => {
        const [limitType, expectedShowAmount] = args;

        it(`should be ${expectedShowAmount} when calculation basis is ${limitType}`, () => {
          const customState = {
            ...state,
            superPayItem: {
              ...state.superPayItem,
              limitType,
            },
          };

          const actual = getLimit(customState);

          expect(actual.showAmount).toEqual(expectedShowAmount);
        });
      });
    });
  });

  describe('getFilteredEmployees', () => {
    it('should not contain employees who has already been allocated to super pay item', () => {
      const employees = [{ value: '1' }, { value: '2' }];
      const superPayItemEmployees = [{ id: '1' }];

      const actual = getFilteredEmployees.resultFunc(
        employees,
        superPayItemEmployees
      );

      expect(actual.find((item) => item.id === '1')).toBeFalsy();
      expect(actual.find((item) => item.id === '2')).toBeUndefined();
    });
  });

  describe('getFilteredExemptions', () => {
    it('should not contain exemption that has already been added to super pay item', () => {
      const exemptions = [{ value: '1' }, { value: '2' }];
      const superPayItemExemptions = [{ id: '1' }];

      const actual = getFilteredExemptions.resultFunc(
        exemptions,
        superPayItemExemptions
      );

      expect(actual.find((item) => item.id === '1')).toBeFalsy();
      expect(actual.find((item) => item.id === '2')).toBeUndefined();
    });
  });

  describe('getIsExemptionDisabled', () => {
    it('returns true when type is disabled for all', () => {
      const configuration = [
        {
          calculationBasisType: 'DisabledForAll',
          enabledPayItemIds: [],
        },
      ];

      const actual = getIsExemptionDisabled.resultFunc(
        'DisabledForAll',
        1,
        configuration
      );

      expect(actual).toEqual(true);
    });

    it('returns false when type is enabled for payItemId', () => {
      const configuration = [
        {
          calculationBasisType: 'EnabledForSome',
          enabledPayItemIds: [10, 11, 12],
        },
      ];

      const actual = getIsExemptionDisabled.resultFunc(
        'EnabledForSome',
        11,
        configuration
      );

      expect(actual).toEqual(false);
    });
  });

  describe('getUpdatedSuperPayItemForSave', () => {
    const state = {
      superPayItem: {
        contributionType: 'EmployeeAdditional',
        calculationBasisType: 'UserEntered',
        calculationBasisPercentage: '10.00',
        calculationBasisPayItemId: 'calculationDeductionId',
        calculationBasisPayItemType: '',
        calculationBasisAmount: '20.00',
        calculationBasisPeriod: 'Month',
        limitType: 'Percent',
        limitPercentage: '30.00',
        limitPayItemId: 'limitDeductionId',
        limitPayItemType: '',
        limitAmount: '40.00',
        limitPeriod: 'Quarter',
      },
      settings: {
        grossWagesId: 'grossWagesId',
      },
      calculationBasisDeductionPayItems: [
        { id: 'grossWagesId', mappedType: 'grossWagesType' },
        {
          id: 'calculationDeductionId',
          mappedType: 'calculationDeductionType',
        },
      ],
      calculationBasisExpensePayItems: [
        { id: 'grossWagesId', mappedType: 'grossWagesType' },
        { id: 'calculationExpenseId', mappedType: 'calculationExpenseType' },
      ],
      limitDeductionPayItems: [
        { id: 'grossWagesId', mappedType: 'grossWagesType' },
        { id: 'limitDeductionId', mappedType: 'limitDeductionType' },
      ],
      limitExpensePayItems: [
        { id: 'grossWagesId', mappedType: 'grossWagesType' },
        { id: 'limitExpenseId', mappedType: 'limitExpenseType' },
      ],
    };

    describe('calculationBasis', () => {
      [
        [
          'UserEntered',
          '0.00',
          'grossWagesId',
          'grossWagesType',
          '0.00',
          'PayPeriod',
        ],
        [
          'PercentOfPayrollCategory',
          '10.00',
          'calculationDeductionId',
          'calculationDeductionType',
          '0.00',
          'PayPeriod',
        ],
        [
          'FixedDollar',
          '0.00',
          'grossWagesId',
          'grossWagesType',
          '20.00',
          'Month',
        ],
      ].forEach((args) => {
        const [
          basisType,
          percentage,
          payItemId,
          payItemType,
          amount,
          period,
        ] = args;

        it('should clear amount when calculation basis is UserEntered', () => {
          const customState = {
            ...state,
            superPayItem: {
              ...state.superPayItem,
              calculationBasisType: basisType,
            },
          };

          const actual = getUpdatedSuperPayItemForSave(customState);

          expect(actual.calculationBasisPercentage).toEqual(percentage);
          expect(actual.calculationBasisPayItemId).toEqual(payItemId);
          expect(actual.calculationBasisPayItemType).toEqual(payItemType);
          expect(actual.calculationBasisAmount).toEqual(amount);
          expect(actual.calculationBasisPeriod).toEqual(period);
        });
      });
    });

    describe('limit', () => {
      [
        [
          'NoLimit',
          '0.00',
          'grossWagesId',
          'grossWagesType',
          '0.00',
          'PayPeriod',
        ],
        [
          'Percent',
          '30.00',
          'limitDeductionId',
          'limitDeductionType',
          '0.00',
          'PayPeriod',
        ],
        [
          'FixedDollar',
          '0.00',
          'grossWagesId',
          'grossWagesType',
          '40.00',
          'Quarter',
        ],
      ].forEach((args) => {
        const [
          basisType,
          percentage,
          payItemId,
          payItemType,
          amount,
          period,
        ] = args;

        it('should clear amount when calculation basis is UserEntered', () => {
          const customState = {
            ...state,
            superPayItem: {
              ...state.superPayItem,
              limitType: basisType,
            },
          };

          const actual = getUpdatedSuperPayItemForSave(customState);

          expect(actual.limitPercentage).toEqual(percentage);
          expect(actual.limitPayItemId).toEqual(payItemId);
          expect(actual.limitPayItemType).toEqual(payItemType);
          expect(actual.limitAmount).toEqual(amount);
          expect(actual.limitPeriod).toEqual(period);
        });
      });
    });
  });

  describe('getFormattedAmount', () => {
    [
      ['', '0.00'],
      ['.', '0.00'],
      ['.1', '0.10'],
      ['.12', '0.12'],
      ['.123', '0.12'],
      ['1.', '1.00'],
      ['-1', '-1.00'],
    ].forEach((args) => {
      const [value, expected] = args;

      it(`should format ${value} to ${expected}`, () => {
        const actual = getFormattedAmount(value);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getFormattedPercentage', () => {
    [
      ['', '0.00'],
      ['.', '0.00'],
      ['.1', '0.10'],
      ['.12', '0.12'],
      ['.123', '0.123'],
      ['1.', '1.00'],
      ['-1', '-1.00'],
    ].forEach((args) => {
      const [value, expected] = args;

      it(`should format ${value} to ${expected}`, () => {
        const actual = getFormattedPercentage(value);

        expect(actual).toEqual(expected);
      });
    });
  });
});
