import { PreviewType } from '../../../../templateOptions';
import getShouldShowChequePayment from '../getShouldShowChequePayment';

describe('getShouldShowChequePayment', () => {
  it.each([
    [PreviewType.Quote, true, false],
    [PreviewType.Quote, false, false],
    ['someOtherTemplate', true, true],
    ['someOtherTemplate', false, false],
  ])('only returns true if cheque payment is allowed and preview template is not quote',
    (
      previewType,
      isAllowPaymentByCheque,
      expectedResult,
    ) => {
      const actual = getShouldShowChequePayment({
        previewType,
        isAllowPaymentByCheque,
      });

      expect(actual).toEqual(expectedResult);
    });
});
