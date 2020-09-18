import QuoteHistoryAccordionStatus from '../types/QuoteHistoryAccordionStatus';

export const toggleQuoteHistoryAccordion = (state) => ({
  ...state,
  quoteHistoryAccordionStatus:
    state.quoteHistoryAccordionStatus === QuoteHistoryAccordionStatus.CLOSED
      ? QuoteHistoryAccordionStatus.OPEN
      : QuoteHistoryAccordionStatus.CLOSED,
});

export default toggleQuoteHistoryAccordion;
