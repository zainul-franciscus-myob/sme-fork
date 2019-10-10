import { createStructuredSelector } from 'reselect';
import { getHours } from 'date-fns';

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
  bankFeedBalance: state => state.bankFeedBalance,
});
