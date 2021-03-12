import { createSelector, createStructuredSelector } from 'reselect';
import { isBefore } from 'date-fns';

import {
  TaxCalculatorTypes,
  createTaxCalculator,
} from '../../../../common/taxCalculator';
import ContactType from '../../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../../contact/contactCombobox/types/DisplayMode';
import ModalType from '../../ModalType';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';
import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

const calculate = createTaxCalculator(TaxCalculatorTypes.receiveMoney);

export const getIsLineEdited = (state) => state.isLineEdited;
export const getIsCreating = (state) => state.receiveMoneyId === 'new';
export const getDuplicateId = (state) => state.duplicateId;
export const getReceiveMoneyId = (state) => state.receiveMoneyId;

const getReferenceId = (state) => state.receiveMoney.referenceId;
const getSelectedDepositIntoId = (state) =>
  state.receiveMoney.selectedDepositIntoAccountId;
export const getSelectedPayFromContact = (state) =>
  state.receiveMoney.selectedPayFromContactId;
const getDate = (state) => state.receiveMoney.date;
const getDescription = (state) => state.receiveMoney.description;
const getIsReportable = (state) => state.receiveMoney.isReportable;
const getIsTaxInclusive = (state) => state.receiveMoney.isTaxInclusive;
const getLines = (state) => state.receiveMoney.lines;
const getStartOfFinancialYearDate = (state) => state.startOfFinancialYearDate;

const getDepositIntoAccountOptions = (state) => state.depositIntoAccountOptions;
export const getAccountOptions = (state) => state.accountOptions;
export const getTaxCodeOptions = (state) => state.taxCodeOptions;

export const getHeaderOptions = createStructuredSelector({
  referenceId: getReferenceId,
  selectedDepositIntoAccountId: getSelectedDepositIntoId,
  selectedPayFromContactId: getSelectedPayFromContact,
  depositIntoAccountOptions: getDepositIntoAccountOptions,
  date: getDate,
  description: getDescription,
  isReportable: getIsReportable,
  isTaxInclusive: getIsTaxInclusive,
});

export const getAlertMessage = (state) => state.alertMessage;
export const getAlert = (state) => state.alert;
export const getLoadingState = (state) => state.loadingState;

export const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

export const getLineDataByIndexSelector = () =>
  createSelector(
    (state, props) => state.receiveMoney.lines[props.index],
    (line) => (line ? { ...line } : {})
  );

const getLength = (state) => state.receiveMoney.lines.length;

export const getTableData = createSelector(getLength, (len) =>
  Array(len).fill({})
);

export const getIsTableEmpty = createSelector(getLength, (len) => len === 0);

export const getNewLineData = (state) => state.newLine;

export const getIndexOfLastLine = (state) =>
  state.receiveMoney.lines.length - 1;

export const getReceiveMoney = (state) => state.receiveMoney;

export const getTotals = (state) => state.totals;

export const getCalculatedTotalsPayload = (state) => {
  const { lines, isTaxInclusive } = getReceiveMoney(state);
  return {
    isTaxInclusive,
    lines,
  };
};

export const getIsActionsDisabled = (state) => state.isSubmitting;
export const isPageEdited = (state) => state.isPageEdited;
export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getPageTitle = (state) => state.pageTitle;
export const getTaxCodeLabel = (state) =>
  getRegionToDialectText(state.region)('Tax code');
export const getTaxLabel = (state) =>
  getRegionToDialectText(state.region)('Tax');

export const getModal = (state) => state.modal;
export const getModalUrl = (state) => (state.modal || {}).url;

export const getOpenedModalType = (state) => {
  const modal = getModal(state) || { type: ModalType.NONE };

  return modal.type;
};

export const getTaxCalculations = (state, isSwitchingTaxInclusive) => {
  const isTaxInclusive = getIsTaxInclusive(state);
  const isLineAmountsTaxInclusive = isSwitchingTaxInclusive
    ? !isTaxInclusive
    : isTaxInclusive;
  const lines = getLines(state);
  const taxCodes = getTaxCodeOptions(state);

  const { lines: calculatedLines, totals: calculatedTotals } = calculate({
    lines,
    taxCodes,
    isTaxInclusive,
    isLineAmountsTaxInclusive,
  });
  const { subTotal, totalTax, totalAmount } = calculatedTotals;

  return {
    lines: lines.map((line, index) => ({
      ...line,
      amount: calculatedLines[index].amount.valueOf(),
    })),
    totals: {
      subTotal: formatCurrency(subTotal.valueOf()),
      totalTax: formatCurrency(totalTax.valueOf()),
      totalAmount: formatCurrency(totalAmount.valueOf()),
    },
  };
};

export const getAccountModalContext = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => ({ businessId, region })
);

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

export const getIsBeforeStartOfFinancialYear = createSelector(
  getDate,
  getStartOfFinancialYearDate,
  (date, startOfFinancialYearDate) =>
    date &&
    startOfFinancialYearDate &&
    isBefore(new Date(date), new Date(startOfFinancialYearDate))
);

export const getViewedAccountToolTip = (state) => state.viewedAccountToolTip;

export const getContactComboboxContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const contactId = getSelectedPayFromContact(state);

  return {
    businessId,
    region,
    contactId,
    contactType: ContactType.ALL,
    displayMode: DisplayMode.NAME_AND_TYPE,
  };
};

const getIsCustomizedForNonGstEnabled = (state) =>
  state.isCustomizedForNonGstEnabled;

const getIsRegisteredForGst = (state) => state.isRegisteredForGst;

const getHasTaxCodeOtherThanNT = (state) =>
  state.receiveMoney.lines?.some(
    (line) => line.taxCodeId && line.taxCodeId !== '4'
  );

export const getShouldShowTaxOptions = createSelector(
  getIsCustomizedForNonGstEnabled,
  getIsRegisteredForGst,
  getHasTaxCodeOtherThanNT,
  (isCustomizedForNonGstEnabled, isRegisteredForGst, hasTaxCodeOtherThanNT) =>
    !isCustomizedForNonGstEnabled || isRegisteredForGst || hasTaxCodeOtherThanNT
);
