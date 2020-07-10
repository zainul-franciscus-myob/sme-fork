import {
  getCalculationBasis,
  getFilteredAtoReportingCategoryOptions,
  getFilteredEmployeeOptions,
  getFilteredExemptionOptions,
  getIsExemptionDisabled,
  getLimit,
  getSuperPayItemModalFormattedAmount,
  getSuperPayItemModalFormattedPercentage,
  getUpdatedSuperPayItemModalForSave,
} from '../SuperPayItemModalSelectors';

describe('SuperPayItemModalSelectors', () => {
  describe('getFilteredAtoReportingCategories', () => {
    const atoReportingCategoryOptions = [
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

    describe.each([
      ['EmployeeAdditional', true, true, false, false],
      ['EmployerAdditional', true, true, true, true],
      ['Productivity', true, true, true, false],
      ['Redundancy', true, true, false, false],
      ['SalarySacrifice', true, true, false, true],
      ['Spouse', true, true, false, false],
      ['SuperannuationGuarantee', true, false, true, false],
    ])('when contribution type is %s', (contributionType, ...rest) => {
      atoReportingCategoryOptions.forEach(({ name, value }, index) => {
        const expected = rest[index];

        it(`should ${expected ? '' : ' not'} contain "${name}"`, () => {
          const actual = getFilteredAtoReportingCategoryOptions.resultFunc(
            contributionType,
            atoReportingCategoryOptions
          );

          expect(!!actual.find((item) => item.value === value)).toEqual(
            expected
          );
        });
      });
    });
  });

  describe('getCalculationBasis', () => {
    const state = {
      superPayItemModal: {
        superPayItem: {
          contributionType: 'EmployeeAdditional',
          calculationBasisType: 'PercentOfPayrollCategory',
        },
        calculationBasisDeductionPayItemOptions: [{ id: 'deduction' }],
        calculationBasisExpensePayItemOptions: [{ id: 'expense' }],
      },
    };

    describe('calculationBasisPayItemOptions', () => {
      it.each([
        ['EmployeeAdditional', 'deduction'],
        ['EmployerAdditional', 'expense'],
        ['Productivity', 'expense'],
        ['Redundancy', 'expense'],
        ['SalarySacrifice', 'deduction'],
        ['Spouse', 'deduction'],
        ['SuperannuationGuarantee', 'expense'],
      ])(
        'when contribution type is %s, should return %s',
        (contributionType, expectedType) => {
          const customState = {
            ...state,
            superPayItemModal: {
              ...state.superPayItemModal,
              superPayItem: {
                ...state.superPayItemModal.superPayItem,
                contributionType,
              },
            },
          };

          const actual = getCalculationBasis(customState);
          expect(actual.calculationBasisPayItemOptions[0].id).toEqual(
            expectedType
          );
        }
      );
    });

    describe('showPercent', () => {
      it.each([
        ['UserEntered', false],
        ['PercentOfPayrollCategory', true],
        ['FixedDollar', false],
      ])(
        'when calculation basis is %s, should return %s',
        (calculationBasisType, expectedShowPercent) => {
          const customState = {
            ...state,
            superPayItemModal: {
              superPayItem: {
                ...state.superPayItem,
                calculationBasisType,
              },
            },
          };

          const actual = getCalculationBasis(customState);

          expect(actual.showPercent).toEqual(expectedShowPercent);
        }
      );
    });

    describe('showAmount', () => {
      it.each([
        ['UserEntered', false],
        ['Percent', false],
        ['FixedDollar', true],
      ])(
        'when calculation basis is %s, should return %s',
        (calculationBasisType, expectedShowAmount) => {
          const customState = {
            ...state,
            superPayItemModal: {
              superPayItem: {
                ...state.superPayItem,
                calculationBasisType,
              },
            },
          };

          const actual = getCalculationBasis(customState);

          expect(actual.showAmount).toEqual(expectedShowAmount);
        }
      );
    });
  });

  describe('getLimit', () => {
    const state = {
      superPayItemModal: {
        superPayItem: {
          contributionType: 'EmployeeAdditional',
          limitType: 'Percent',
        },
        limitDeductionPayItemOptions: [{ id: 'deduction' }],
        limitExpensePayItemOptions: [{ id: 'expense' }],
      },
    };

    describe('limitPayItemOptions', () => {
      it.each([
        ['EmployeeAdditional', 'deduction'],
        ['EmployerAdditional', 'expense'],
        ['Productivity', 'expense'],
        ['Redundancy', 'expense'],
        ['SalarySacrifice', 'deduction'],
        ['Spouse', 'deduction'],
        ['SuperannuationGuarantee', 'expense'],
      ])(
        'when contribution type is %s, should return %s',
        (contributionType, expectedType) => {
          const customState = {
            ...state,
            superPayItemModal: {
              ...state.superPayItemModal,
              superPayItem: {
                ...state.superPayItemModal.superPayItem,
                contributionType,
              },
            },
          };

          const actual = getLimit(customState);
          expect(actual.limitPayItemOptions[0].id).toEqual(expectedType);
        }
      );
    });

    describe('showPercent', () => {
      it.each([
        ['UserEntered', false],
        ['Percent', true],
        ['FixedDollar', false],
      ])(
        'when calculation basis is %s, should return %s',
        (limitType, expectedShowPercent) => {
          const customState = {
            ...state,
            superPayItemModal: {
              ...state.superPayItemModal,
              superPayItem: {
                ...state.superPayItemModal.superPayItem,
                limitType,
              },
            },
          };

          const actual = getLimit(customState);
          expect(actual.showPercent).toEqual(expectedShowPercent);
        }
      );
    });

    describe('showAmount', () => {
      it.each([
        ['UserEntered', false],
        ['Percent', false],
        ['FixedDollar', true],
      ])(
        'when calculation basis is %s, should return %s',
        (limitType, expectedShowAmount) => {
          const customState = {
            ...state,
            superPayItemModal: {
              superPayItem: {
                ...state.superPayItemModal.superPayItem,
                limitType,
              },
            },
          };

          const actual = getLimit(customState);

          expect(actual.showAmount).toEqual(expectedShowAmount);
        }
      );
    });
  });

  describe('getFilteredEmployees', () => {
    it('should not contain employees who has already been allocated to super pay item', () => {
      const employeeOptions = [{ value: '1' }, { value: '2' }];
      const employees = [{ id: '1' }];

      const actual = getFilteredEmployeeOptions.resultFunc(
        employeeOptions,
        employees
      );

      expect(actual.find((item) => item.id === '1')).toBeFalsy();
      expect(actual.find((item) => item.id === '2')).toBeUndefined();
    });
  });

  describe('getFilteredExemptions', () => {
    it('should not contain exemption that has already been added to super pay item', () => {
      const exemptionOptions = [{ value: '1' }, { value: '2' }];
      const exemptions = [{ id: '1' }];

      const actual = getFilteredExemptionOptions.resultFunc(
        exemptionOptions,
        exemptions
      );

      expect(actual.find((item) => item.id === '1')).toBeFalsy();
      expect(actual.find((item) => item.id === '2')).toBeUndefined();
    });
  });

  describe('getIsExemptionDisabled', () => {
    const grossWagesId = 'grossWagesId';
    const federalWagesId = 'federalWagesId';
    const configuration = [
      {
        calculationBasisType: 'PercentOfPayrollCategory',
        enabledPayItemIds: [grossWagesId, federalWagesId],
      },
    ];

    it.each([
      ['UserEntered', 'grossWagesId', true],
      ['UserEntered', 'federalWagesId', true],
      ['UserEntered', 'someOtherId', true],
      ['PercentOfPayrollCategory', 'grossWagesId', false],
      ['PercentOfPayrollCategory', 'federalWagesId', false],
      ['PercentOfPayrollCategory', 'someOtherId', true],
      ['FixedDollar', 'grossWagesId', true],
      ['FixedDollar', 'federalWagesId', true],
      ['FixedDollar', 'someOtherId', true],
    ])(
      'when calculation basis is %s and percent of is %s , should return %s',
      (
        calculationBasisType,
        calculationBasisPayItemId,
        expectedIsExemptionDisabled
      ) => {
        const actual = getIsExemptionDisabled.resultFunc(
          calculationBasisType,
          calculationBasisPayItemId,
          configuration
        );

        expect(actual).toEqual(expectedIsExemptionDisabled);
      }
    );
  });

  describe('getUpdatedSuperPayItemForSave', () => {
    const state = {
      superPayItemModal: {
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
        grossWagesId: 'grossWagesId',
        calculationBasisDeductionPayItemOptions: [
          { id: 'grossWagesId', mappedType: 'grossWagesType' },
          {
            id: 'calculationDeductionId',
            mappedType: 'calculationDeductionType',
          },
        ],
        calculationBasisExpensePayItemOptions: [
          { id: 'grossWagesId', mappedType: 'grossWagesType' },
          { id: 'calculationExpenseId', mappedType: 'calculationExpenseType' },
        ],
        limitDeductionPayItemOptions: [
          { id: 'grossWagesId', mappedType: 'grossWagesType' },
          { id: 'limitDeductionId', mappedType: 'limitDeductionType' },
        ],
        limitExpensePayItemOptions: [
          { id: 'grossWagesId', mappedType: 'grossWagesType' },
          { id: 'limitExpenseId', mappedType: 'limitExpenseType' },
        ],
      },
    };

    describe('calculationBasis', () => {
      it.each([
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
      ])(
        'should clear amount when calculation basis is UserEntered',
        (basisType, percentage, payItemId, payItemType, amount, period) => {
          const customState = {
            ...state,
            superPayItemModal: {
              ...state.superPayItemModal,
              superPayItem: {
                ...state.superPayItemModal.superPayItem,
                calculationBasisType: basisType,
              },
            },
          };

          const actual = getUpdatedSuperPayItemModalForSave(customState);

          expect(actual.calculationBasisPercentage).toEqual(percentage);
          expect(actual.calculationBasisPayItemId).toEqual(payItemId);
          expect(actual.calculationBasisPayItemType).toEqual(payItemType);
          expect(actual.calculationBasisAmount).toEqual(amount);
          expect(actual.calculationBasisPeriod).toEqual(period);
        }
      );
    });

    describe('limit', () => {
      it.each([
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
      ])(
        'should clear amount when calculation basis is UserEntered',
        (basisType, percentage, payItemId, payItemType, amount, period) => {
          const customState = {
            ...state,
            superPayItemModal: {
              ...state.superPayItemModal,
              superPayItem: {
                ...state.superPayItemModal.superPayItem,
                limitType: basisType,
              },
            },
          };

          const actual = getUpdatedSuperPayItemModalForSave(customState);

          expect(actual.limitPercentage).toEqual(percentage);
          expect(actual.limitPayItemId).toEqual(payItemId);
          expect(actual.limitPayItemType).toEqual(payItemType);
          expect(actual.limitAmount).toEqual(amount);
          expect(actual.limitPeriod).toEqual(period);
        }
      );
    });
  });

  describe('getFormattedAmount', () => {
    it.each([
      ['', '0.00'],
      ['.', '0.00'],
      ['.1', '0.10'],
      ['.12', '0.12'],
      ['.123', '0.12'],
      ['1.', '1.00'],
      ['-1', '-1.00'],
    ])('should format %s to %s', (value, expected) => {
      const actual = getSuperPayItemModalFormattedAmount(value);

      expect(actual).toEqual(expected);
    });
  });

  describe('getFormattedPercentage', () => {
    it.each([
      ['', '0.00'],
      ['.', '0.00'],
      ['.1', '0.10'],
      ['.12', '0.12'],
      ['.123', '0.123'],
      ['1.', '1.00'],
      ['-1', '-1.00'],
    ])('should format %s to %s', (value, expected) => {
      const actual = getSuperPayItemModalFormattedPercentage(value);

      expect(actual).toEqual(expected);
    });
  });
});
