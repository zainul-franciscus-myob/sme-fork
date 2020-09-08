import FormatDateWithPattern from '../../../../common/valueFormatters/formatDate/formatDateWithPattern';
import QuoteHistoryStatus from '../types/QuoteHistoryStatus';

export const getDate = (date) =>
  date !== undefined ? FormatDateWithPattern('dd/MM/yyyy')(new Date(date)) : '';

const businessEvents = ['CREATED'];

export const getTime = (row) =>
  row.date !== undefined && !businessEvents.includes(row.status)
    ? FormatDateWithPattern('h:mmaa')(new Date(row.date)).toLowerCase()
    : '';

export const getQuoteHistoryTable = ({ quote }) => {
  return [
    {
      id: 1,
      status: QuoteHistoryStatus.CREATED,
      displayDate: getDate(quote.issueDate),
      displayTime: getTime({
        date: quote.issueDate,
        status: QuoteHistoryStatus.CREATED,
      }),
    },
  ];
};

export const getQuoteHistoryAccordionStatus = (state) =>
  state.quoteHistoryAccordionStatus;

export const getMostRecentStatus = (state) =>
  getQuoteHistoryTable(state)[0].status;

export const getMostRecentStatusColor = () => 'light-grey';
