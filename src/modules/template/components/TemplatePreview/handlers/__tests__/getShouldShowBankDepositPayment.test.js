import { PreviewType } from '../../../../templateOptions';
import getShouldShowBankDepositPayment from '../getShouldShowBankDepositPayment';

describe('getShouldShowBankDeposit', () => {
  it.each([
    [PreviewType.Quote, true, false],
    [PreviewType.Quote, false, false],
    ['someOtherTemplate', true, true],
    ['someOtherTemplate', false, false],
  ])('only returns true if direct deposit is allowed and preview template is not quote',
    (
      previewType,
      isAllowPaymentByDirectDeposit,
      expectedResult,
    ) => {
      const actual = getShouldShowBankDepositPayment({
        previewType,
        isAllowPaymentByDirectDeposit,
      });

      expect(actual).toEqual(expectedResult);
    });
});
