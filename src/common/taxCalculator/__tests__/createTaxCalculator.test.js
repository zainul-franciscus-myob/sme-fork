import Decimal from 'decimal.js';

import createTaxCalculator from '../createTaxCalculator';
import taxCodes from './fixtures/taxCodes';

describe('createTaxCalculator', () => {
  let calculate;

  const lines = [
    {
      amount: '100.00', taxCodeId: '2', units: '1', lineTypeId: 17,
    },
  ];

  const setTaxLocally = () => (
    {
      Lines: [
        { Amount: Decimal(90.91), TaxTransaction: { EffectiveTaxAmount: Decimal(9.09) } },
      ],
    }
  );

  let handler;

  const expectedTaxCodesMetadata = {
    2: {
      Id: '2',
      Code: 'GST',
      CodeType: 3,
      Rate: Decimal(10),
      Threshold: Decimal(0),
      ChildrenCalculationCollection: [],
      CalculationMethod: 2,
      RoundingMethod: 2,
      CollectedBehaviour: 1,
      PayedBehaviour: 1,
      IsWithholding: false,
      ThresholdRate: Decimal(10),
      IncludeInGstReturn: false,
    },
  };

  beforeEach(() => {
    handler = {
      setTaxLocally: jest.fn(setTaxLocally),
    };
    calculate = createTaxCalculator(handler);
  });

  it('handler should receive correct params', () => {
    calculate({
      isTaxInclusive: true,
      isLineAmountsTaxInclusive: true,
      taxCodes,
      lines,
    });

    const journalEntry = {
      Lines: [
        {
          Amount: Decimal(100), UnitCount: 1, LineType: 17, AmountForeign: null,
        },
      ],
      EffectiveTaxAmount: Decimal(0),
    };

    const lineTaxCode = expectedTaxCodesMetadata['2'];

    expect(handler.setTaxLocally)
      .toHaveBeenCalledWith(
        false,
        journalEntry,
        0,
        lineTaxCode,
        expectedTaxCodesMetadata,
        Decimal(100),
      );
  });

  it('should return tax calculation results correctly', () => {
    const actual = calculate({
      isTaxInclusive: true,
      isLineAmountsTaxInclusive: true,
      taxCodes,
      lines,
    });

    const expected = {
      lines: [
        {
          taxExclusiveAmount: Decimal(90.91),
          taxAmount: Decimal(9.09),
          amount: Decimal(100),
        },
      ],
      totals: {
        subTotal: Decimal(100),
        totalTax: Decimal(9.09),
        totalAmount: Decimal(100),
      },
    };

    expect(actual).toEqual(expected);
  });
});
