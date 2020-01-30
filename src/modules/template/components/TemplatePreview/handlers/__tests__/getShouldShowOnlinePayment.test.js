import { PreviewType } from '../../../../templateOptions';
import getShouldShowOnlinePayment from '../getShouldShowOnlinePayment';

describe('getShouldShowOnlinePayment', () => {
  it('returns true if preview type is invoice', () => {
    const actual = getShouldShowOnlinePayment(PreviewType.Invoice);
    expect(actual).toBeTruthy();
  });
});
