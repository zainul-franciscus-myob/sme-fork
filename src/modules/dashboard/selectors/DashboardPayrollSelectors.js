import { createSelector } from 'reselect';
import { format, getMonth } from 'date-fns';

import { getBusinessId, getRegion } from './DashboardSelectors';

export const getHasError = (state) => state.payroll.hasError;
export const getIsLoading = (state) => state.payroll.isLoading;
export const getIsEmpty = (state) => state.payroll.entries.length === 0;
export const getIsPayrollSetup = (state) => state.payroll.isPayrollSetup;

export const getPayrollSettingsLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/payrollSettings`
);

export const getPayrunListLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/payRun`
);

export const getCreatePayrunLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/payRun/new`
);

const formatEntryDates = ({ dateFrom, dateTo, dateOfPayment, ...rest }) => {
  const isSameMonth = (fromDate, toDate) =>
    getMonth(new Date(fromDate)) === getMonth(new Date(toDate));

  const formattedDateFrom = isSameMonth(dateFrom, dateTo)
    ? format(new Date(dateFrom), 'eee d')
    : format(new Date(dateFrom), 'eee d MMM');

  const date = `${formattedDateFrom} - ${format(
    new Date(dateTo),
    'eee d MMM'
  )}`;

  const formattedPaymentDate = dateOfPayment
    ? `Date of payment ${format(new Date(dateOfPayment), 'eee d MMM')}`
    : '';

  return { ...rest, date, formattedPaymentDate };
};

const getPayRunLinkSelector = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => ({ id, isDraft }) =>
    `/#/${region}/${businessId}/payRun/${isDraft ? 'new' : id}`
);

const getEntries = (state) => state.payroll.entries;

export const getPayrollEntries = createSelector(
  getEntries,
  getPayRunLinkSelector,
  (entries, getPayRunLink) =>
    entries.map((e) => ({
      ...formatEntryDates(e),
      payRunLink: getPayRunLink(e),
    }))
);
