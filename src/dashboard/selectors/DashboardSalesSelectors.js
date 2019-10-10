import { createSelector, createStructuredSelector } from 'reselect';

import { getBusinessId, getRegion } from './DashboardSelectors';
import formatIsoDate from '../../valueFormatters/formatDate/formatIsoDate';

const getSalesLayout = state => state.sales.layout;

const getSalesEntries = state => state.sales.entries;

const getSalesMonth = state => state.sales.month;

export const getIsEmpty = state => state.sales.isEmpty;

export const getIsTableEmpty = state => state.sales.entries.length === 0;

export const getSalesChart = state => state.sales.chart;

export const getHasError = state => state.sales.hasError;

export const getIsLoading = state => state.sales.isLoading;

export const getCreateInvoiceLink = createSelector(
  getBusinessId,
  getRegion,
  getSalesLayout,
  (businessId, region, layout) => {
    const newInvoiceParam = layout === 'service' ? 'newService' : 'newItem';

    return `/#/${region}/${businessId}/invoice/${newInvoiceParam}`;
  },
);

export const getInvoiceListLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/invoice`,
);

const getSalesTotalLabel = state => `Sales for ${getSalesMonth(state)}`;

export const getSalesTotalSummary = createStructuredSelector({
  unpaidTotal: state => state.sales.unpaidTotal,
  overDueTotal: state => state.sales.overDueTotal,
  salesTotal: state => state.sales.salesTotal,
  salesTotalLabel: getSalesTotalLabel,
  invoiceListLink: getInvoiceListLink,
});

const getInvoiceLink = (region, businessId, invoiceId) => `/#/${region}/${businessId}/invoice/${invoiceId}`;

const getContactLink = (region, businessId, contactId) => `/#/${region}/${businessId}/contact/${contactId}`;

export const getSalesTableEntries = createSelector(
  getSalesEntries,
  getRegion,
  getBusinessId,
  (entries, region, businessId) => entries.map(entry => ({
    ...entry,
    invoiceLink: getInvoiceLink(region, businessId, entry.id),
    contactLink: getContactLink(region, businessId, entry.contactId),
  })),
);

export const getLoadSalesParams = () => ({
  todayDate: formatIsoDate(new Date()),
});
