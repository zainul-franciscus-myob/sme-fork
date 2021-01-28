import { createSelector } from 'reselect';

import { mainTabItems } from './tabItems';
import Region from '../../../common/types/Region';
import buildOnlinePaymentLink from '../../../common/links/buildOnlinePaymentLink';

export const getLoadingState = (state) => state.loadingState;
export const getRegion = (state) => state.region;
export const getBusinessId = (state) => state.businessId;
export const getAlert = (state) => state.alert;
export const getSelectedTab = (state) => state.selectedTab;
export const getPendingDeleteTemplate = (state) => state.pendingDeleteTemplate;
export const getPaymentTerms = (state) => state.paymentTerms;
export const getDateOfMonth = (state) => state.dateOfMonth;
export const getLayout = (state) => state.layout;
export const getTabData = (state) => state.tabData;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getModalType = (state) => state.modalType;
const getIsPayDirectSettingsLoading = (state) => state.payDirect.isLoading;
const getIsPayDirectSettingsServiceAvailable = (state) =>
  state.payDirect.isServiceAvailable;
export const getIsRegistered = (state) => state.payDirect.isRegistered;
const getPayDirectUrl = (state) => state.payDirect.url;
const getPayDirectRegistrationUrl = (state) => state.payDirect.registrationUrl;
export const getIsTrial = (state) => state.subscription.isTrial;
export const getShowActions = (state) =>
  mainTabItems(state.region, state.isEInvoicingEnabled).find(
    (tab) => tab.id === state.selectedTab
  ).hasActions;
export const getEInvoicingStatus = (state) => state.isEInvoicingEnabled;
export const getAccountOptions = (state) => state.accountOptions;
const getSerialNumber = (state) => state.serialNumber;

export const getShowDateField = (state) =>
  [
    'OnADayOfTheMonth',
    'InAGivenNumberOfDays',
    'DayOfMonthAfterEOM',
    'NumberOfDaysAfterEOM',
  ].includes(state.tabData.paymentType);

export const getShowDateInput = (state) =>
  ['InAGivenNumberOfDays', 'NumberOfDaysAfterEOM'].includes(
    state.tabData.paymentType
  );

export const getDateInputPostfix = (state) =>
  ({
    OnADayOfTheMonth: 'of this month',
    InAGivenNumberOfDays: 'days after the issue date',
    DayOfMonthAfterEOM: 'of next month',
    NumberOfDaysAfterEOM: 'days after the end of the month',
  }[state.tabData.paymentType] || '');

export const getPayDirectLink = createSelector(
  getPayDirectUrl,
  getBusinessId,
  getSerialNumber,
  getIsTrial,
  getIsRegistered,
  (url, businessId, serialNumber, isTrial, isRegistered) =>
    buildOnlinePaymentLink({
      url,
      businessId,
      serialNumber,
      isTrial,
      isRegistered,
      location: 'settings',
    })
);

export const getPayDirectRegistrationLink = createSelector(
  getPayDirectRegistrationUrl,
  getBusinessId,
  getSerialNumber,
  getIsTrial,
  getIsRegistered,
  (url, businessId, serialNumber, isTrial, isRegistered) =>
    buildOnlinePaymentLink({
      url,
      businessId,
      serialNumber,
      isTrial,
      isRegistered,
      location: 'settings',
    })
);

export const getReminderLink = (state) =>
  `${state.reminders.url}?consumer=ARL&source=SMEP&origin=global&cfid=${state.businessId}`;

export const getMarketplaceLink = (state) =>
  `https://www.myob.com/${state.region}/apps/category/tasks?category=einvoicing`;

export const getIsSubscribed = (state) =>
  state.salesSettings?.eInvoicingAppName !== '';

export const getEInvoicingAppName = (state) =>
  state.salesSettings?.eInvoicingAppName;

const getTemplateSettings = (state) => state.templateSettings;

export const encodeTemplateName = (name) => encodeURIComponent(name);

export const getTemplates = createSelector(
  getRegion,
  getBusinessId,
  getTemplateSettings,
  (region, businessId, { templates }) =>
    templates.map((template) => ({
      ...template,
      link: `/#/${region}/${businessId}/template/${encodeTemplateName(
        template.name
      )}`,
    }))
);

export const getArlTemplates = createSelector(
  getTemplateSettings,
  ({ arlTemplates }) => arlTemplates
);

export const getEssentialsTemplates = createSelector(
  getTemplateSettings,
  ({ essentialsTemplates }) => essentialsTemplates
);

export const getOrderBy = createSelector(
  getTemplateSettings,
  (templateSettings) => templateSettings.orderBy
);
export const getSortOrder = createSelector(
  getTemplateSettings,
  (templateSettings) => templateSettings.sortOrder
);

export const getOrder = createSelector(
  getOrderBy,
  getSortOrder,
  (column, sortOrder) => ({ column, descending: sortOrder === 'desc' })
);

export const getHasArlTemplates = (state) =>
  getArlTemplates(state).length !== 0;
export const getHasEssentialsTemplates = (state) =>
  getEssentialsTemplates(state).length !== 0;
export const getHasTemplates = (state) => getTemplates(state).length !== 0;

export const getIsTemplatesLoading = createSelector(
  getTemplateSettings,
  (templateSettings) => templateSettings.isLoading
);

const flipSortOrder = createSelector(getSortOrder, (sortOrder) =>
  sortOrder === 'desc' ? 'asc' : 'desc'
);

export const getNewSortOrder = (orderBy) => (state) =>
  orderBy === getOrderBy(state) ? flipSortOrder(state) : 'asc';

export const getSalesSettingsPayload = (state) => {
  const tabData = getTabData(state);
  const region = getRegion(state);

  return {
    ...tabData,
    region,
  };
};

export const getShowOnlinePaymentOptions = createSelector(
  getRegion,
  (region) => region === Region.au
);

export const getOnlinePaymentOptions = createSelector(
  getIsPayDirectSettingsLoading,
  getIsPayDirectSettingsServiceAvailable,
  getIsRegistered,
  getPayDirectLink,
  getPayDirectRegistrationLink,
  getTabData,
  getAccountOptions,
  getIsTrial,
  (
    isLoading,
    isServiceAvailable,
    isRegistered,
    payDirectLink,
    registrationLink,
    salesSettings,
    accountOptions,
    isTrial
  ) => {
    const { accountId } = salesSettings;

    return {
      isLoading,
      isTrial,
      isServiceAvailable,
      isRegistered,
      payDirectLink,
      registrationLink,
      accountId,
      accountOptions,
    };
  }
);

export const getPendingTab = (state) => state.pendingTab;
