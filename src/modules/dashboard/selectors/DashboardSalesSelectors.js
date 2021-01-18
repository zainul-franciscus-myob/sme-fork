import { createSelector, createStructuredSelector } from 'reselect';
import { startOfMonth } from 'date-fns';

import {
  getBusinessId,
  getLast12MonthsDateRange,
  getRegion,
} from './DashboardSelectors';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getSalesEntries = (state) => state.sales.entries;

const getSalesMonth = (state) => state.sales.month;

export const getIsEmpty = (state) => state.sales.isEmpty;

export const getIsTableEmpty = (state) => state.sales.entries.length === 0;

export const getSalesChart = (state) => state.sales.chart;

export const getHasError = (state) => state.sales.hasError;

export const getIsLoading = (state) => state.sales.isLoading;

export const getCreateInvoiceLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/invoice/new`
);

export const getInvoiceListLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/invoice`
);

export const getUnpaidTotalLink = createSelector(
  getInvoiceListLink,
  getLast12MonthsDateRange,
  (link, { dateFrom, dateTo }) =>
    `${link}?dateFrom=${dateFrom}&dateTo=${dateTo}&status=Open&orderBy=DateOccurred&sortOrder=desc`
);

export const getOverDueTotalLink = createSelector(
  getInvoiceListLink,
  getLast12MonthsDateRange,
  (link, { dateFrom, dateTo }) =>
    `${link}?dateFrom=${dateFrom}&dateTo=${dateTo}&status=Open&orderBy=DateDue&sortOrder=desc`
);

export const getInvoiceTotalLink = createSelector(
  getInvoiceListLink,
  (link) => {
    const today = new Date();
    const dateFrom = formatIsoDate(startOfMonth(today));
    const dateTo = formatIsoDate(today);

    return `${link}?dateFrom=${dateFrom}&dateTo=${dateTo}`;
  }
);

const getSalesTotalLabel = (state) => `Sales for ${getSalesMonth(state)}`;

export const getSalesTotalSummary = createStructuredSelector({
  unpaidTotal: (state) => state.sales.unpaidTotal,
  overDueTotal: (state) => state.sales.overDueTotal,
  salesTotal: (state) => state.sales.salesTotal,
  salesTotalLabel: getSalesTotalLabel,
  unpaidTotalLink: getUnpaidTotalLink,
  invoiceTotalLink: getInvoiceTotalLink,
  overDueTotalLink: getOverDueTotalLink,
});

const getInvoiceLink = (region, businessId, invoiceId) =>
  `/#/${region}/${businessId}/invoice/${invoiceId}`;

const getContactLink = (region, businessId, contactId) =>
  `/#/${region}/${businessId}/contact/${contactId}`;

export const getSalesTableEntries = createSelector(
  getSalesEntries,
  getRegion,
  getBusinessId,
  (entries, region, businessId) =>
    entries.map((entry) => ({
      ...entry,
      invoiceLink: getInvoiceLink(region, businessId, entry.id),
      contactLink: getContactLink(region, businessId, entry.contactId),
    }))
);

export const getLoadSalesParams = createSelector(
  getLast12MonthsDateRange,
  ({ dateFrom, dateTo }) => ({
    todayDate: new Date(),
    dateFrom,
    dateTo,
  })
);
