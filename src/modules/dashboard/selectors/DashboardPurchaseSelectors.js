import { addDays, startOfMonth, subYears } from 'date-fns';
import { createSelector, createStructuredSelector } from 'reselect';

import { getBusinessId, getRegion } from './DashboardSelectors';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getPurchaseEntries = (state) => state.purchase.entries;

const getPurchaseMonth = (state) => state.purchase.month;

export const getIsEmpty = (state) => state.purchase.isEmpty;

export const getFinancialYearStartDate = (state) =>
  state.purchase.financialYearStartDate;

export const getIsTableEmpty = (state) => state.purchase.entries.length === 0;

export const getPurchaseChart = (state) => state.purchase.chart;

export const getHasError = (state) => state.purchase.hasError;

export const getIsLoading = (state) => state.purchase.isLoading;

export const getCreateBillLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/bill/new`
);

export const getBillListLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/bill`
);

export const getUnpaidTotalLink = createSelector(getBillListLink, (link) => {
  const today = new Date();
  const dateFrom = formatIsoDate(addDays(subYears(today, 1), 1));
  const dateTo = formatIsoDate(today);

  return `${link}?dateFrom=${dateFrom}&dateTo=${dateTo}&status=Open`;
});

export const getOverDueTotalLink = createSelector(getBillListLink, (link) => {
  const today = new Date();
  const dateFrom = formatIsoDate(addDays(subYears(today, 1), 1));
  const dateTo = formatIsoDate(today);

  return `${link}?dateFrom=${dateFrom}&dateTo=${dateTo}&status=Open&orderBy=DateDue&sortOrder=desc`;
});

export const getPurchaseTotalLink = createSelector(getBillListLink, (link) => {
  const today = new Date();
  const dateFrom = formatIsoDate(startOfMonth(today));
  const dateTo = formatIsoDate(today);

  return `${link}?dateFrom=${dateFrom}&dateTo=${dateTo}`;
});

const getPurchaseTotalLabel = (state) =>
  `Purchases for ${getPurchaseMonth(state)}`;

export const getPurchaseTotalSummary = createStructuredSelector({
  unpaidTotal: (state) => state.purchase.unpaidTotal,
  overDueTotal: (state) => state.purchase.overDueTotal,
  purchaseTotal: (state) => state.purchase.purchaseTotal,
  purchaseTotalLabel: getPurchaseTotalLabel,
  unpaidTotalLink: getUnpaidTotalLink,
  purchaseTotalLink: getPurchaseTotalLink,
  overDueTotalLink: getOverDueTotalLink,
});

const getBillLink = (region, businessId, billId) =>
  `/#/${region}/${businessId}/bill/${billId}`;

const getContactLink = (region, businessId, contactId) =>
  `/#/${region}/${businessId}/contact/${contactId}`;

export const getPurchaseTableEntries = createSelector(
  getPurchaseEntries,
  getRegion,
  getBusinessId,
  (entries, region, businessId) =>
    entries.map((entry) => ({
      ...entry,
      billLink: getBillLink(region, businessId, entry.id),
      contactLink: getContactLink(region, businessId, entry.contactId),
    }))
);

export const getLoadPurchaseParams = () => ({
  todayDate: formatIsoDate(new Date()),
});
