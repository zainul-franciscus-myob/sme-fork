import { createStructuredSelector } from 'reselect';
import { getHours } from 'date-fns';

export const getShouldShowBanking = state => state.enabled.includes('bank');
export const getShouldShowSales = state => state.enabled.includes('sales');
export const getShouldShowPurchases = state => state.enabled.includes('purchases');
export const getShouldShowLeanEngage = state => state.enabled.includes('leanEngage');
export const getShouldShowTracking = state => state.enabled.includes('tracking');

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getAlert = state => state.alert;

export const getIsLoading = state => state.isLoading;

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
  businessName: state => state.businessName,
  inspirationalQuote: state => state.inspirationalQuote,
  showBankFeedBalance: getShouldShowBanking,
});
