import { createSelector } from 'reselect';

import { mainTabItems } from './tabItems';

export const getIsLoading = state => state.isLoading;
export const getRegion = state => state.region;
export const getIsSubmitting = state => state.isSubmitting;
export const getBusinessId = state => state.businessId;
export const getAlert = state => state.alert;
export const getSelectedTab = state => state.selectedTab;
export const getPendingTab = state => state.pendingTab;
export const getPendingDeleteTemplate = state => state.pendingDeleteTemplate;
export const getPaymentTerms = state => state.paymentTerms;
export const getDateOfMonth = state => state.dateOfMonth;
export const getLayout = state => state.layout;
export const getTabData = state => state.tabData;
export const getIsPageEdited = state => state.isPageEdited;
export const getModalType = state => state.modalType;
export const getIsRegistered = state => state.payDirect.isRegistered;
export const getShowActions = state => mainTabItems
  .find(tab => tab.id === state.selectedTab).hasActions;
export const getAccountOptions = state => state.accountOptions;

export const getShowDateField = state => [
  'OnADayOfTheMonth',
  'InAGivenNumberOfDays',
  'DayOfMonthAfterEOM',
  'NumberOfDaysAfterEOM',
].includes(state.tabData.paymentType);

export const getShowDateInput = state => ['InAGivenNumberOfDays', 'NumberOfDaysAfterEOM'].includes(
  state.tabData.paymentType,
);

export const getDateInputPostfix = state => ({
  OnADayOfTheMonth: 'of this month',
  InAGivenNumberOfDays: 'days after the issue date',
  DayOfMonthAfterEOM: 'of next month',
  NumberOfDaysAfterEOM: 'days after the end of the month',
}[state.tabData.paymentType] || '');

export const getPayDirectLink = state => `${state.payDirect.url}?cdf=${state.businessId}&sn=${state.payDirect.serialNumber}`;

export const getReminderLink = state => `${state.reminders.url}?consumer=ARL&origin=global&businessId=${state.businessId}`;

const getTemplateSettings = state => state.templateSettings;

export const getTemplates = createSelector(
  getRegion,
  getBusinessId,
  getTemplateSettings,
  (region, businessId, { templates }) => templates.map(template => ({
    ...template,
    link: `/#/${region}/${businessId}/salesSettings/`,
  })),
);

export const getArlTemplates = createSelector(
  getTemplateSettings,
  ({ arlTemplates }) => arlTemplates,
);

export const getEssentialsTemplates = createSelector(
  getTemplateSettings,
  ({ essentialsTemplates }) => essentialsTemplates,
);

export const getOrderBy = createSelector(
  getTemplateSettings,
  templateSettings => templateSettings.orderBy,
);
export const getSortOrder = createSelector(
  getTemplateSettings,
  templateSettings => templateSettings.sortOrder,
);

export const getOrder = createSelector(
  getOrderBy,
  getSortOrder,
  (column, sortOrder) => ({ column, descending: sortOrder === 'desc' }),
);

export const getHasArlTemplates = state => getArlTemplates(state).length !== 0;
export const getHasEssentialsTemplates = state => getEssentialsTemplates(state).length !== 0;
export const getHasTemplates = state => getTemplates(state).length !== 0;

export const getIsTemplatesLoading = createSelector(
  getTemplateSettings,
  templateSettings => templateSettings.isLoading,
);

const flipSortOrder = createSelector(
  getSortOrder,
  sortOrder => (sortOrder === 'desc' ? 'asc' : 'desc'),
);

export const getNewSortOrder = orderBy => state => (
  orderBy === getOrderBy(state) ? flipSortOrder(state) : 'asc'
);

export const getSalesSettingsPayload = (state) => {
  const tabData = getTabData(state);
  const region = getRegion(state);

  return {
    ...tabData,
    region,
  };
};