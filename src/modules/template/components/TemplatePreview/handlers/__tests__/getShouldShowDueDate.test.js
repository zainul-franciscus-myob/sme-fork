import { PreviewType } from '../../../../templateOptions';
import getShouldShowDueDate from '../getShouldShowDueDate';

describe('getShouldShowDueDate', () => {
  it('returns true for invoice preview type', () => {
    const actual = getShouldShowDueDate(PreviewType.Invoice);
    expect(actual).toBeTruthy();
  });
});
