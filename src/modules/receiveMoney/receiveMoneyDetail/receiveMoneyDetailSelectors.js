import { createSelector, createStructuredSelector } from 'reselect';

import { TaxCalculatorTypes, createTaxCalculator } from '../../../common/taxCalculator';
import ModalType from '../ModalType';
import formatAmount from '../../../common/valueFormatters/formatAmount';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

const calculate = createTaxCalculator(TaxCalculatorTypes.receiveMoney);

const getReferenceId = state => state.receiveMoney.referenceId;
const getSelectedDepositIntoId = state => state.receiveMoney.selectedDepositIntoAccountId;
const getSelectedPayFromContact = state => state.receiveMoney.selectedPayFromContactId;
const getDate = state => state.receiveMoney.date;
const getDescription = state => state.receiveMoney.description;
const getIsReportable = state => state.receiveMoney.isReportable;
const getIsTaxInclusive = state => state.receiveMoney.isTaxInclusive;
const getLines = state => state.receiveMoney.lines;

const getDepositIntoAccountOptions = state => state.depositIntoAccountOptions;
const getPayFromContactOptions = state => state.payFromContactOptions;
export const getAccountOptions = state => state.accountOptions;
export const getTaxCodeOptions = state => state.taxCodeOptions;

export const getHeaderOptions = createStructuredSelector({
  referenceId: getReferenceId,
  selectedDepositIntoAccountId: getSelectedDepositIntoId,
  selectedPayFromContactId: getSelectedPayFromContact,
  depositIntoAccountOptions: getDepositIntoAccountOptions,
  payFromContactOptions: getPayFromContactOptions,
  date: getDate,
  description: getDescription,
  isReportable: getIsReportable,
  isTaxInclusive: getIsTaxInclusive,
});

export const getAlertMessage = state => state.alertMessage;
export const getLoadingState = state => state.loadingState;

export const getDefaultTaxCodeId = ({ accountId }, accountOptions) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

export const getLineDataByIndexSelector = () => createSelector(
  (state, props) => state.receiveMoney.lines[props.index],
  (line => (line
    ? { ...line, displayAmount: formatAmount(line.amount) }
    : {})),
);

const getLength = state => state.receiveMoney.lines.length;

export const getTableData = createSelector(
  getLength,
  len => Array(len).fill({}),
);

export const getIsTableEmpty = createSelector(
  getLength,
  len => len === 0,
);

export const getNewLineData = state => state.newLine;

export const getIndexOfLastLine = state => state.receiveMoney.lines.length - 1;

export const getReceiveMoney = state => state.receiveMoney;

export const getReceiveMoneyId = state => state.receiveMoney.id;

export const getTotals = state => state.totals;

export const getReceiveMoneyForCreatePayload = (state) => {
  const {
    referenceId,
    originalReferenceId,
    ...rest
  } = getReceiveMoney(state);

  const referenceIdForPayload = referenceId === originalReferenceId ? undefined : referenceId;

  return {
    ...rest,
    referenceId: referenceIdForPayload,
  };
};

export const getReceiveMoneyForUpdatePayload = (state) => {
  const {
    originalReferenceId,
    ...rest
  } = getReceiveMoney(state);

  return rest;
};

export const getCalculatedTotalsPayload = (state) => {
  const { lines, isTaxInclusive } = getReceiveMoney(state);
  return {
    isTaxInclusive,
    lines,
  };
};

export const getIsActionsDisabled = state => state.isSubmitting;
export const isPageEdited = state => state.isPageEdited;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getPageTitle = state => state.pageTitle;
export const getTaxCodeLabel = state => getRegionToDialectText(state.region)('Tax code');
export const getTaxLabel = state => getRegionToDialectText(state.region)('Tax');

export const getModal = state => state.modal;
export const getModalUrl = state => ((state.modal || {}).url);

export const getTransactionListUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/transactionList`,
);

export const getSaveUrl = (state) => {
  const modalUrl = getModalUrl(state);
  const transactionListUrl = getTransactionListUrl(state);
  return modalUrl || transactionListUrl;
};

export const getOpenedModalType = (state) => {
  const modal = getModal(state) || { type: ModalType.NONE };

  return modal.type;
};

export const getTaxCalculations = (state, isSwitchingTaxInclusive) => {
  const isTaxInclusive = getIsTaxInclusive(state);
  const isLineAmountsTaxInclusive = isSwitchingTaxInclusive ? !isTaxInclusive : isTaxInclusive;
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
