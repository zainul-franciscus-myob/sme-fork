import { mainTabIds } from './tabItems';

export const getIsLoading = state => state.isLoading;
export const getIsSubmitting = state => state.isSubmitting;
export const getBusinessId = state => state.businessId;
export const getAlert = state => state.alert;
export const getSelectedTab = state => state.selectedTab;
export const getPendingTab = state => state.pendingTab;
export const getPaymentTerms = state => state.paymentTerms;
export const getDateOfMonth = state => state.dateOfMonth;
export const getLayout = state => state.layout;
export const getTabData = state => state.tabData;
export const getIsPageEdited = state => state.isPageEdited;
export const getIsRegistered = state => state.payDirect.isRegistered;
export const getShowActions = state => state.selectedTab !== mainTabIds.reminders;

export const getShowDateField = state => [
  'OnADayOfTheMonth',
  'InAGivenNumberOfDays',
  'DayOfMonthAfterEOM',
  'NumberOfDaysAfterEOM',
].includes(state.tabData.paymentType);

export const getShowDateInput = state => [
  'InAGivenNumberOfDays',
  'NumberOfDaysAfterEOM',
].includes(state.tabData.paymentType);

export const getDateInputPostfix = state => ({
  OnADayOfTheMonth: 'of this month',
  InAGivenNumberOfDays: 'days after the issue date',
  DayOfMonthAfterEOM: 'of next month',
  NumberOfDaysAfterEOM: 'days after the end of the month',
}[state.tabData.paymentType] || '');

export const getPayDirectLink = state => `${state.payDirect.url}?cdf=${state.businessId}&sn=${state.payDirect.serialNumber}`;

export const getLayoutDescription = state => (
  state.tabData.defaultSaleLayout === 'Item'
    ? 'Use this layout if you\'ve created stock or service items and need to show quantities or hours.'
    : 'Use this layout if you only sell date-based professional services and don\'t need quantities or items.'
);

export const getReminderLink = state => `${state.reminders.url}?consumer=ARL&origin=global&businessId=${state.businessId}`;
