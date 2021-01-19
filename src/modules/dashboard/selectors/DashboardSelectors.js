import { createStructuredSelector } from 'reselect';
import { getHours, subYears } from 'date-fns';

import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

export const getShouldShowBanking = (state) =>
  state.enabled.includes('banking');
export const getShouldShowBankFeedBalance = (state) =>
  state.enabled.includes('bankFeedBalance');
export const getShouldShowSales = (state) => state.enabled.includes('sales');
export const getShouldShowPurchases = (state) =>
  state.enabled.includes('purchases');
export const getShouldShowLeanEngage = (state) =>
  state.enabled.includes('leanEngage');
export const getShouldShowTracking = (state) =>
  state.enabled.includes('tracking');
export const getShouldShowPayroll = (state) =>
  state.enabled.includes('payroll');
export const getShouldShowInTray = (state) => state.enabled.includes('inTray');

export const getBusinessId = (state) => state.businessId;

export const getRegion = (state) => state.region;

export const getAlert = (state) => state.alert;

export const getIsLoading = (state) => state.isLoading;

const getGreeting = () => {
  const hours = getHours(new Date());

  if (hours >= 4 && hours < 12) {
    return 'Good morning,';
  }

  if (hours >= 12 && hours < 17) {
    return 'Good afternoon,';
  }

  return 'Good evening,';
};

export const getDashboardHeader = createStructuredSelector({
  greeting: getGreeting,
  businessName: (state) => state.businessName,
  inspirationalQuote: (state) => state.inspirationalQuote,
  showBankFeedBalance: getShouldShowBankFeedBalance,
});

export const getShouldUsePayrollLayout = (state) =>
  getShouldShowPayroll(state) &&
  getShouldShowLeanEngage(state) &&
  !getShouldShowTracking(state) &&
  !getShouldShowPurchases(state) &&
  !getShouldShowSales(state) &&
  !getShouldShowBankFeedBalance(state) &&
  !getShouldShowBanking(state);

export const getLast12MonthsDateRange = () => {
  const today = new Date();
  const dateFrom = formatIsoDate(subYears(today, 1));
  const dateTo = formatIsoDate(today);

  return {
    dateFrom,
    dateTo,
  };
};
