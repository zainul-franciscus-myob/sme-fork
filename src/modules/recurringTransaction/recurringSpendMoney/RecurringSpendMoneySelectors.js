import { createSelector, createStructuredSelector } from 'reselect';

import ContactType from '../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../contact/contactCombobox/types/DisplayMode';
import ModalType from './components/ModalType';
import Region from '../../../common/types/Region';
import buildAbnLink from '../../../common/links/buildAbnLink';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

export const getIsRecurringTransactionEnabled = (state) =>
  state.isRecurringTransactionEnabled;

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getRecurringTransactionId = (state) =>
  state.recurringTransactionId;
export const getIsLoading = (state) => state.isLoading;
export const getIsSubmitting = (state) => state.isSubmitting;
export const isPageEdited = (state) => state.isPageEdited;
export const getAlert = (state) => state.alert;
export const getModalUrl = (state) => (state.modal || {}).url;
export const getModal = (state) => state.modal;
export const getIsActionsDisabled = (state) => state.isSubmitting;

export const getTransactionType = (state) => state.transactionType;

export const getSchedule = (state) => state.schedule;
export const getScheduleName = (state) => state.schedule.name;
export const getScheduleRemainingTimes = (state) =>
  state.schedule.remainingTimes;

export const getSpendMoney = (state) => state.spendMoney;
export const getSelectedPayFromId = (state) =>
  state.spendMoney.payFromAccountId;
export const getPayToContactId = (state) => state.spendMoney.payToContactId;
const getPayFromAccountOptions = (state) => state.payFromAccountOptions;
const getDescription = (state) => state.spendMoney.description;
export const getIsReportable = (state) => state.spendMoney.isReportable;
export const getIsTaxInclusive = (state) => state.spendMoney.isTaxInclusive;
export const getBankStatementText = (state) =>
  state.spendMoney.bankStatementText;

const getLines = (state) => state.spendMoney.lines;

export const getNewLineData = (state) => state.newLine;
export const getTotals = (state) => state.totals;
export const getTaxCodeOptions = (state) => state.taxCodeOptions;
export const getAccountOptions = (state) => state.accountOptions;

export const getElectronicClearingAccountId = (state) =>
  state.electronicClearingAccountId;
const getContact = (state) => state.contact;
export const getAbn = (state) => state.abn;
export const getIsAbnLoading = (state) => state.isAbnLoading;

export const getIsCreating = createSelector(
  getRecurringTransactionId,
  (recurringTransactionId) => recurringTransactionId === 'new'
);

export const getTitle = createSelector(
  getIsCreating,
  getScheduleName,
  (isCreating, transactionName) =>
    isCreating ? 'Create recurring transaction' : transactionName
);

export const getTaxCodeLabel = (state) =>
  getRegionToDialectText(state.region)('Tax code');
export const getTaxLabel = (state) =>
  getRegionToDialectText(state.region)('Tax');
const getTaxInclusiveLabel = (state) =>
  getRegionToDialectText(state.region)('Tax inclusive');
const getTaxExclusiveLabel = (state) =>
  getRegionToDialectText(state.region)('Tax exclusive');

const getLength = (state) => state.spendMoney.lines.length;
export const getIndexOfLastLine = (state) => state.spendMoney.lines.length - 1;

export const getContactType = createSelector(getContact, (contact) =>
  contact ? contact.contactType : ''
);

export const getRecurringScheduleOptions = createSelector(
  getSchedule,
  getTransactionType,
  getIsSubmitting,
  (schedule, transactionType, isDisabled) => ({
    ...schedule,
    transactionType,
    isDisabled,
    showTransactionType: true,
  })
);

export const getIsReportableDisabled = createSelector(
  getPayToContactId,
  getContactType,
  (contactId, contactType) => !contactId || contactType !== 'Supplier'
);

const getShouldShowReportable = (state) => state.region.toLowerCase() === 'au';

export const getShowBankStatementText = createSelector(
  getSelectedPayFromId,
  getElectronicClearingAccountId,
  (accountId, electronicClearingAccountId) =>
    accountId === electronicClearingAccountId
);

export const getAbnLink = createSelector(getAbn, (abn) =>
  abn ? buildAbnLink(abn.abn) : ''
);

export const getShouldShowAbn = createSelector(
  getRegion,
  getAbn,
  (region, abn) => region === Region.au && Boolean(abn)
);

export const getShouldLoadAbn = createSelector(
  getRegion,
  (region) => region === Region.au
);

export const getEditContactUrl = createSelector(
  getBusinessId,
  getRegion,
  getPayToContactId,
  (businessId, region, contactId) =>
    `/#/${region}/${businessId}/contact/${contactId}`
);

export const getHeaderOptions = createStructuredSelector({
  payFromAccountId: getSelectedPayFromId,
  payToContactId: getPayToContactId,
  isReportable: getIsReportable,
  description: getDescription,
  isTaxInclusive: getIsTaxInclusive,
  bankStatementText: getBankStatementText,
  taxInclusiveLabel: getTaxInclusiveLabel,
  taxExclusiveLabel: getTaxExclusiveLabel,
  payFromAccountOptions: getPayFromAccountOptions,
  accountOptions: getAccountOptions,
  electronicClearingAccountId: getElectronicClearingAccountId,
  region: getRegion,
  isReportableDisabled: getIsReportableDisabled,
  shouldShowReportable: getShouldShowReportable,
  showBankStatementText: getShowBankStatementText,
  abn: getAbn,
  abnLink: getAbnLink,
  isAbnLoading: getIsAbnLoading,
  shouldShowAbn: getShouldShowAbn,
  editContactUrl: getEditContactUrl,
});

export const getLineDataByIndexSelector = () =>
  createSelector(
    (state, props) => state.spendMoney.lines[props.index],
    (line) => line || {}
  );

export const getTableData = createSelector(getLength, (len) =>
  Array(len).fill({})
);

export const getIsTableEmpty = createSelector(getLength, (len) => len === 0);

export const getCreateOrUpdateSpendMoneyPayload = (state) => {
  const schedule = getSchedule(state);
  const spendMoney = getSpendMoney(state);

  return { schedule, spendMoney };
};

export const getRecurringTransactionListUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/recurringTransaction`
);

export const getLoadContactDetailUrlParams = createStructuredSelector({
  businessId: getBusinessId,
  contactId: getPayToContactId,
});

export const getLoadSpendMoneyRequestUrlParams = createSelector(
  getBusinessId,
  getIsCreating,
  getRecurringTransactionId,
  (businessId, isCreating, recurringTransactionId) => {
    return isCreating ? { businessId } : { businessId, recurringTransactionId };
  }
);

export const getOpenedModalType = (state) => {
  const modal = getModal(state) || { type: ModalType.NONE };

  return modal.type;
};

export const getLinesForTaxCalculation = createSelector(getLines, (lines) =>
  lines.map((line) => ({
    ...line,
    lineTypeId: line.lineSubTypeId,
  }))
);

export const getIsLineAmountsTaxInclusive = (
  isTaxInclusive,
  isSwitchingTaxInclusive
) => (isSwitchingTaxInclusive ? !isTaxInclusive : isTaxInclusive);

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getJobModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getJobComboboxContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getUniqueSelectedJobIds = (state) => {
  const lines = getLines(state);

  if (lines.length > 0) {
    const selectedJobIds = lines.reduce((jobIds, line) => {
      if (line.jobId) {
        jobIds.push(line.jobId);
      }
      return jobIds;
    }, []);
    return [...new Set([...selectedJobIds])];
  }

  return [];
};

export const getContactComboboxContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const contactId = getPayToContactId(state);

  return {
    businessId,
    region,
    contactId,
    contactType: ContactType.ALL,
    displayMode: DisplayMode.NAME_AND_TYPE,
  };
};

export const getLoadAddedAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);

  return { businessId, accountId };
};

export const getLoadContactUrlParams = (state, contactId) => {
  const businessId = getBusinessId(state);

  return { businessId, contactId };
};

export const getRedirectUrl = createSelector(
  getModalUrl,
  getRecurringTransactionListUrl,
  (modalUrl, transactionListUrl) => {
    return modalUrl || transactionListUrl;
  }
);
