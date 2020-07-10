import { createSelector, createStructuredSelector } from 'reselect';
import { isBefore } from 'date-fns';

import {
  LOAD_NEW_DUPLICATE_SPEND_MONEY,
  LOAD_NEW_SPEND_MONEY,
  LOAD_SPEND_MONEY_DETAIL,
} from '../SpendMoneyIntents';
import ModalType from './components/ModalType';
import Region from '../../../common/types/Region';
import buildAbnLink from '../../../common/links/buildAbnLink';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

const getReferenceId = (state) => state.spendMoney.referenceId;
export const getSelectedPayFromId = (state) =>
  state.spendMoney.selectedPayFromAccountId;
const getSelectedBankAccountId = (state) => state.selectedBankAccountId;
const getSelectedDate = (state) => state.selectedDate;
export const getSelectedPayToContactId = (state) =>
  state.spendMoney.selectedPayToContactId;
const getPayFromAccounts = (state) => state.spendMoney.payFromAccounts;
const getPayToContacts = (state) => state.spendMoney.payToContacts;
export const getDate = (state) => state.spendMoney.date;
const getDescription = (state) => state.spendMoney.description;
export const getExpenseAccountId = (state) => state.spendMoney.expenseAccountId;
const getLines = (state) => state.spendMoney.lines;
export const getInTrayDocumentId = (state) => state.inTrayDocumentId;
export const getIsReportable = (state) => state.spendMoney.isReportable;
export const getIsTaxInclusive = (state) => state.spendMoney.isTaxInclusive;
const getTaxInclusiveLabel = (state) =>
  getRegionToDialectText(state.region)('Tax inclusive');
const getTaxExclusiveLabel = (state) =>
  getRegionToDialectText(state.region)('Tax exclusive');
export const getTaxCodeOptions = (state) => state.taxCodes;
export const getAccountOptions = (state) => state.accounts;
export const getJobOptions = (state) => state.jobs;
export const getRegion = (state) => state.region;
const getElectronicClearingAccountId = (state) =>
  state.spendMoney.electronicClearingAccountId;
const getBankStatementText = (state) => state.spendMoney.bankStatementText;
export const getDuplicateId = (state) => state.duplicateId;
export const getAbn = (state) => state.abn;
export const getIsAbnLoading = (state) => state.isAbnLoading;
export const getStartOfFinancialYearDate = (state) =>
  state.startOfFinancialYearDate;
export const getIsJobComboboxDisabled = (state) => state.isJobLoading;

const getHeadersProperties = createStructuredSelector({
  referenceId: getReferenceId,
  selectedPayFromAccountId: getSelectedPayFromId,
  selectedPayToContactId: getSelectedPayToContactId,
  payFromAccounts: getPayFromAccounts,
  payToContacts: getPayToContacts,
  date: getDate,
  description: getDescription,
  expenseAccountId: getExpenseAccountId,
  isReportable: getIsReportable,
  isTaxInclusive: getIsTaxInclusive,
  taxInclusiveLabel: getTaxInclusiveLabel,
  taxExclusiveLabel: getTaxExclusiveLabel,
  region: getRegion,
  electronicClearingAccountId: getElectronicClearingAccountId,
  bankStatementText: getBankStatementText,
});

export const getIsSpendMoneyJobColumnEnabled = (state) =>
  state.isSpendMoneyJobColumnEnabled;

export const getIsReportableDisabled = createSelector(
  getPayToContacts,
  getSelectedPayToContactId,
  (contacts, contactId) => {
    const { contactType } = contacts.find(({ id }) => id === contactId) || {};

    return contactType !== 'Supplier';
  }
);

export const getIsCreating = (state) => state.spendMoneyId === 'new';
export const getIsCreatingFromInTray = createSelector(
  getIsCreating,
  getInTrayDocumentId,
  (isCreating, inTrayDocumentId) => isCreating && inTrayDocumentId
);

const getShouldShowReportable = (state) => state.region.toLowerCase() === 'au';

const getContactType = (contactId, contacts) =>
  contacts.find((contact) => contact.id === contactId).contactType;

export const getShouldShowAccountCode = createSelector(
  getIsCreating,
  getSelectedPayToContactId,
  getPayToContacts,
  (isCreating, contactId, contacts) =>
    isCreating &&
    contactId &&
    getContactType(contactId, contacts) === 'Supplier'
);

export const getShowBankStatementText = createSelector(
  getSelectedPayFromId,
  getElectronicClearingAccountId,
  (accountId, electronicClearingAccountId) =>
    accountId === electronicClearingAccountId
);

export const getHeaderOptions = createSelector(
  getHeadersProperties,
  getIsReportableDisabled,
  getShouldShowReportable,
  getShouldShowAccountCode,
  getShowBankStatementText,
  (
    headerProps,
    isReportableDisabled,
    shouldShowReportable,
    shouldShowAccountCode,
    showBankStatementText
  ) => {
    const {
      payFromAccounts = [],
      payToContacts = [],
      ...headerOptions
    } = headerProps;

    return {
      payFromAccounts,
      payToContacts,
      ...headerOptions,
      isReportableDisabled,
      shouldShowReportable,
      shouldShowAccountCode,
      showBankStatementText,
    };
  }
);

export const getAlert = (state) => state.alert;
export const getModalUrl = (state) => (state.modal || {}).url;
export const getModal = (state) => state.modal;
export const getIsLoading = (state) => state.isLoading;

export const getLineDataByIndexSelector = () =>
  createSelector(
    (state, props) => state.spendMoney.lines[props.index],
    (line) => line || {}
  );

const getLength = (state) => state.spendMoney.lines.length;

export const getTableData = createSelector(getLength, (len) =>
  Array(len).fill({})
);

export const getIsTableEmpty = createSelector(getLength, (len) => len === 0);

export const getNewLineData = (state) => state.newLine;

export const getIndexOfLastLine = (state) => state.spendMoney.lines.length - 1;

export const getSpendMoney = (state) => state.spendMoney;

export const getSpendMoneyId = (state) => state.spendMoneyId;
export const getSpendMoneyUid = (state) => state.spendMoney.uid;

export const getTotals = (state) => state.totals;

export const isReferenceIdDirty = (state) => {
  const { referenceId, originalReferenceId } = getSpendMoney(state);
  return referenceId !== originalReferenceId;
};

const getSpendMoneyLinesForPayload = (lines) =>
  lines.map((line) => {
    const { accounts, taxCodes, ...rest } = line;
    return rest;
  });

export const getSpendMoneyForCreatePayload = (state) => {
  const {
    referenceId,
    originalReferenceId,
    payFromAccounts,
    payToContacts,
    lines,
    ...rest
  } = getSpendMoney(state);

  const linesForPayload = getSpendMoneyLinesForPayload(lines);
  const referenceIdForPayload =
    referenceId === originalReferenceId ? undefined : referenceId;

  return {
    ...rest,
    lines: linesForPayload,
    referenceId: referenceIdForPayload,
  };
};

export const getSpendMoneyForUpdatePayload = (state) => {
  const {
    payFromAccounts,
    payToContacts,
    originalReferenceId,
    lines,
    ...rest
  } = getSpendMoney(state);

  const linesForPayload = getSpendMoneyLinesForPayload(lines);

  return {
    ...rest,
    lines: linesForPayload,
  };
};

export const getCalculatedTotalsPayload = (state) => {
  const { lines, isTaxInclusive } = getSpendMoney(state);
  return {
    isTaxInclusive,
    lines: getSpendMoneyLinesForPayload(lines),
  };
};

export const getIsActionsDisabled = (state) => state.isSubmitting;
export const getIsSubmitting = (state) => state.isSubmitting;
export const getIsSupplierBlocking = (state) => state.isSupplierBlocking;
export const isPageEdited = (state) => state.isPageEdited;
export const getBusinessId = (state) => state.businessId;
export const getPageTitle = (state) => state.pageTitle;
export const getTaxCodeLabel = (state) =>
  getRegionToDialectText(state.region)('Tax code');
export const getTaxLabel = (state) =>
  getRegionToDialectText(state.region)('Tax');
export const getAttachments = createSelector(
  (state) => state.attachments,
  (attachments) =>
    attachments.map((attachment) => ({
      id: attachment.id,
      name: attachment.name,
      size: attachment.size,
      loaded: attachment.uploadProgress
        ? Math.round(attachment.size * attachment.uploadProgress)
        : 0,
      state: attachment.state || 'default',
      error: attachment.error,
      canRemove: !['queued', 'loading'].includes(attachment.state),
      isInProgress: attachment.isInProgress,
    }))
);

export const getAttachmentCount = (state) => state.attachments.length;
export const getHasAttachment = (state) => state.attachments.length > 0;

export const getFilesForUpload = (state, files) =>
  files.filter(
    (file) =>
      state.attachments.find((attachment) => attachment.file === file).state ===
      'queued'
  );

export const getIsContactReportable = (state, contactId) => {
  const contacts = getPayToContacts(state);

  const { isReportable } = contacts.find(({ id }) => id === contactId) || {};

  return isReportable;
};

export const getTransactionListUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/transactionList`
);

export const getLoadContactDetailUrlParams = createStructuredSelector({
  businessId: getBusinessId,
  contactId: getSelectedPayToContactId,
});

export const getLoadSpendMoneyRequestParams = createSelector(
  getBusinessId,
  getSelectedBankAccountId,
  getSelectedDate,
  (businessId, selectedBankAccountId, selectedDate) =>
    selectedBankAccountId && selectedDate
      ? {
          selectedBankAccountId,
          selectedDate,
        }
      : {}
);

export const getLoadSpendMoneyRequestUrlParams = createSelector(
  getBusinessId,
  getIsCreating,
  getSpendMoneyId,
  getDuplicateId,
  (businessId, isCreating, spendMoneyId, duplicateId) => {
    if (isCreating) {
      if (duplicateId) {
        return {
          businessId,
          duplicateId,
        };
      }

      return {
        businessId,
      };
    }
    return {
      businessId,
      spendMoneyId,
    };
  }
);

const getInTrayDocument = (state) => state.inTrayDocument;

export const getLinkInTrayContentWithoutSpendMoneyId = createSelector(
  getSpendMoneyUid,
  getInTrayDocumentId,
  getSelectedPayToContactId,
  getExpenseAccountId,
  (uid, inTrayDocumentId, contactId, expenseAccountId) => ({
    uid,
    inTrayDocumentId,
    contactId,
    expenseAccountId,
  })
);

export const getInTrayDocumentUploadedDate = createSelector(
  getInTrayDocument,
  ({ uploadedDate }) => uploadedDate
);

export const getIntrayDocumentThumbnailUrl = createSelector(
  getInTrayDocument,
  ({ thumbnailUrl }) => thumbnailUrl
);

export const getInTrayDocumentFileUrl = createSelector(
  getInTrayDocument,
  ({ url }) => url
);

export const getShowSplitView = (state) => state.showSplitView;

export const getPrefillStatus = (state) => state.prefillStatus;
export const getHasPrefilledLines = (state) =>
  state.spendMoney.lines.length > 0;

export const getShowPrefillInfo = (state) => state.showPrefillInfo;

export const getInTrayUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/inTray`
);

export const getCreateUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/spendMoney/new`
);

export const getSaveUrl = createSelector(
  getIsCreatingFromInTray,
  getModalUrl,
  getTransactionListUrl,
  getInTrayUrl,
  (isCreatingFromInTray, modalUrl, transactionListUrl, inTrayUrl) => {
    if (isCreatingFromInTray && !modalUrl) {
      return inTrayUrl;
    }
    return modalUrl || transactionListUrl;
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

export const getContactModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getLoadAddedAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);

  return { businessId, accountId };
};

export const getLoadAddedContactUrlParams = (state, contactId) => {
  const businessId = getBusinessId(state);

  return { businessId, contactId };
};

export const getLoadSpendMoneyIntent = createSelector(
  getIsCreating,
  getDuplicateId,
  (isCreating, duplicateId) => {
    if (isCreating) {
      if (duplicateId) {
        return LOAD_NEW_DUPLICATE_SPEND_MONEY;
      }

      return LOAD_NEW_SPEND_MONEY;
    }

    return LOAD_SPEND_MONEY_DETAIL;
  }
);

export const getAbnLink = createSelector(getAbn, (abn) =>
  abn ? buildAbnLink(abn.abn) : ''
);

export const getEditContactUrl = createSelector(
  getBusinessId,
  getRegion,
  getSelectedPayToContactId,
  (businessId, region, contactId) =>
    `/#/${region}/${businessId}/contact/${contactId}`
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

export const getIsBeforeStartOfFinancialYear = createSelector(
  getDate,
  getStartOfFinancialYearDate,
  (date, startOfFinancialYearDate) =>
    date &&
    startOfFinancialYearDate &&
    isBefore(new Date(date), new Date(startOfFinancialYearDate))
);

export const getLoadAddedJobUrlParams = (state, jobId) => {
  const businessId = getBusinessId(state);
  return { businessId, jobId };
};
