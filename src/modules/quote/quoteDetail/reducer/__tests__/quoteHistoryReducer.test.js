import { toggleQuoteHistoryAccordion } from '../QuoteHistoryReducer';
import QuoteHistoryAccordionStatus from '../../types/QuoteHistoryAccordionStatus';

describe('QuoteHistoryReducer', () => {
  describe('toggleQuoteHistoryAccordion', () => {
    it('returns closed for open', () => {
      const state = {
        quoteHistoryAccordionStatus: QuoteHistoryAccordionStatus.OPEN,
      };
      const expected = {
        quoteHistoryAccordionStatus: QuoteHistoryAccordionStatus.CLOSED,
      };

      const actual = toggleQuoteHistoryAccordion(state);

      expect(actual).toEqual(expected);
    });

    it('returns open for closed', () => {
      const state = {
        quoteHistoryAccordionStatus: QuoteHistoryAccordionStatus.CLOSED,
      };
      const expected = {
        quoteHistoryAccordionStatus: QuoteHistoryAccordionStatus.OPEN,
      };

      const actual = toggleQuoteHistoryAccordion(state);

      expect(actual).toEqual(expected);
    });
  });
});
