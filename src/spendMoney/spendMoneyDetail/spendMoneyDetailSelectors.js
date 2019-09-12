import { createSelector, createStructuredSelector } from 'reselect';

import getRegionToDialectText from '../../dialect/getRegionToDialectText';

const getReferenceId = state => state.spendMoney.referenceId;
const getSelectedPayFromId = state => state.spendMoney.selectedPayFromAccountId;
const getSelectedPayToContactId = state => state.spendMoney.selectedPayToContactId;
const getPayFromAccounts = state => state.spendMoney.payFromAccounts;
const getPayToContacts = state => state.spendMoney.payToContacts;
const getDate = state => state.spendMoney.date;
const getDescription = state => state.spendMoney.description;
const getIsReportable = state => state.spendMoney.isReportable;
const getIsTaxInclusive = state => state.spendMoney.isTaxInclusive;

const getHeadersProperties = createStructuredSelector({
  referenceId: getReferenceId,
  selectedPayFromAccountId: getSelectedPayFromId,
  selectedPayToContactId: getSelectedPayToContactId,
  payFromAccounts: getPayFromAccounts,
  payToContacts: getPayToContacts,
  date: getDate,
  description: getDescription,
  isReportable: getIsReportable,
  isTaxInclusive: getIsTaxInclusive,
});

export const getHeaderOptions = createSelector(getHeadersProperties, (headerProps) => {
  const {
    payFromAccounts = [], payToContacts = [],
    ...headerOptions
  } = headerProps;

  return {
    payFromAccounts,
    payToContacts,
    ...headerOptions,
  };
});

export const getAlertMessage = state => state.alertMessage;
export const getModalType = state => state.modalType;
export const getIsLoading = state => state.isLoading;

export const getDefaultTaxCodeId = ({ accountId, accounts }) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

export const getLineDataByIndexSelector = () => createSelector(
  (state, props) => state.spendMoney.lines[props.index],
  (line => line || {}),
);

const getLength = state => state.spendMoney.lines.length;

export const getTableData = createSelector(
  getLength,
  len => Array(len).fill({}),
);

export const getIsTableEmpty = createSelector(
  getLength,
  len => len === 0,
);

export const getNewLineData = state => state.newLine;

export const getIndexOfLastLine = state => state.spendMoney.lines.length - 1;

export const getSpendMoney = state => state.spendMoney;

export const getSpendMoneyId = state => state.spendMoney.id;
export const getSpendMoneyUid = state => state.spendMoney.uid;

export const getTotals = state => state.totals;

export const isReferenceIdDirty = (state) => {
  const { referenceId, originalReferenceId } = getSpendMoney(state);
  return referenceId !== originalReferenceId;
};

const getSpendMoneyLinesForPayload = lines => lines.map((line) => {
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
  const referenceIdForPayload = referenceId === originalReferenceId ? undefined : referenceId;

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
    uid,
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

export const getIsActionsDisabled = state => state.isSubmitting;
export const isPageEdited = state => state.isPageEdited;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getPageTitle = state => state.pageTitle;
export const getTaxCodeLabel = state => getRegionToDialectText(state.region)('Tax code');
export const getTaxLabel = state => getRegionToDialectText(state.region)('Tax');
export const getAttachments = createSelector(
  state => state.attachments,
  attachments => attachments.map(attachment => ({
    id: attachment.id,
    name: attachment.name,
    size: attachment.size,
    loaded: attachment.uploadProgress ? Math.round(attachment.size * attachment.uploadProgress) : 0,
    state: attachment.state || 'default',
    error: attachment.error,
    canRemove: !['queued', 'loading'].includes(attachment.state),
    isInProgress: attachment.isInProgress,
  })),
);

export const getAttachmentCount = state => state.attachments.length;
export const getHasAttachment = state => state.attachments.length > 0;

export const getFilesForUpload = (state, files) => (
  files.filter(file => state.attachments.find(
    attachment => attachment.file === file,
  ).state === 'queued')
);
