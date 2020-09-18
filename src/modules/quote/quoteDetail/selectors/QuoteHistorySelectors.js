import FormatDateWithPattern from '../../../../common/valueFormatters/formatDate/formatDateWithPattern';

export const getDate = (date) =>
  date !== undefined ? FormatDateWithPattern('dd/MM/yyyy')(new Date(date)) : '';

const businessEvents = ['CREATED', 'CREATED_INVOICE'];

export const getTime = (row) =>
  row.date !== undefined && !businessEvents.includes(row.status)
    ? FormatDateWithPattern('h:mmaa')(new Date(row.date)).toLowerCase()
    : '';

export const getQuoteHistoryTable = (state) =>
  (state.activityHistory || []).map((activity) => ({
    ...activity,
    displayDate: getDate(activity.date),
    displayTime: getTime(activity),
  }));

export const getQuoteHistoryAccordionStatus = (state) =>
  state.quoteHistoryAccordionStatus;

export const getMostRecentStatus = (state) => {
  const activityHistory = getQuoteHistoryTable(state);
  return activityHistory[0] && activityHistory[0].status;
};

export const getMostRecentStatusColor = () => 'light-grey';
