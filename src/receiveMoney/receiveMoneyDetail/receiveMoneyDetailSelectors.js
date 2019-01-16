import { createSelector, createStructuredSelector } from 'reselect';

const convertToUnixTime = date => new Date(date).getTime().toString();

const getReferenceId = state => state.receiveMoney.referenceId;
const getSelectedDepositIntoId = state => state.receiveMoney.selectedDepositIntoAccountId;
const getSelectedPayFromContact = state => state.receiveMoney.selectedPayFromContactId;
const getDepositIntoAccounts = state => state.receiveMoney.depositIntoAccounts;
const getPayFromContacts = state => state.receiveMoney.payFromContacts;
const getDate = state => state.receiveMoney.date;
const getDescription = state => state.receiveMoney.description;
const getIsReportable = state => state.receiveMoney.isReportable;
const getIsTaxInclusive = state => state.receiveMoney.isTaxInclusive;

const getHeadersProperties = createStructuredSelector({
  referenceId: getReferenceId,
  selectedDepositIntoAccountId: getSelectedDepositIntoId,
  selectedPayFromContactId: getSelectedPayFromContact,
  depositIntoAccounts: getDepositIntoAccounts,
  payFromContacts: getPayFromContacts,
  date: getDate,
  description: getDescription,
  isReportable: getIsReportable,
  isTaxInclusive: getIsTaxInclusive,
});

export const getHeaderOptions = createSelector(getHeadersProperties, (headerProps) => {
  const {
    depositIntoAccounts = [], payFromContacts = [],
    selectedPayFromContactId, selectedDepositIntoAccountId,
    date,
    ...headerOptions
  } = headerProps;
  const selectedDepositIntoAccountIndex = depositIntoAccounts.findIndex(
    account => account.id === selectedDepositIntoAccountId,
  );
  const selectedPayFromContactIndex = payFromContacts.findIndex(
    contact => contact.id === selectedPayFromContactId,
  );

  return {
    depositIntoAccounts,
    payFromContacts,
    selectedDepositIntoAccountIndex,
    selectedPayFromContactIndex,
    date: convertToUnixTime(date),
    ...headerOptions,
  };
});

export const getAlertMessage = state => state.alertMessage;
export const getModalType = state => state.modalType;
export const getIsLoading = state => state.isLoading;

const formatNumber = num => num.toFixed(2);

export const getDefaultTaxCodeId = ({ accountId, accounts }) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

export const getLineDataByIndexSelector = () => createSelector(
  (state, props) => state.receiveMoney.lines[props.index],
  ((line) => {
    let formatedLine = {};
    if (line) {
      const {
        accountId, taxCodeId, taxCodes, accounts, amount, description, taxAmount,
      } = line;

      formatedLine = ({
        amount,
        taxAmount,
        description,
        accountId,
        taxCodeId,
        taxCodes,
        accounts,
        selectedAccountIndex: accounts.findIndex(({ id }) => id === accountId),
        selectedTaxCodeIndex: taxCodes.findIndex(({ id }) => id === taxCodeId),
      });
    }
    return formatedLine;
  }),
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

const formatTotal = (total) => {
  const num = parseFloat(total);

  return num < 0 ? `-$${formatNumber(Math.abs(num))}` : `$${formatNumber(num)}`;
};

export const getReceiveMoney = state => state.receiveMoney;

export const getReceiveMoneyId = state => state.receiveMoney.id;

const getTotals = state => state.totals;

export const getFormattedTotals = createSelector(
  getTotals,
  (totals) => {
    const { netAmount, totalTax, totalAmount } = totals;

    return {
      netAmount: formatTotal(netAmount),
      totalTax: formatTotal(totalTax),
      totalAmount: formatTotal(totalAmount),
    };
  },
);

export const getReceiveMoneyForCreatePayload = (state) => {
  const { referenceId, originalReferenceId, ...rest } = getReceiveMoney(state);
  return referenceId === originalReferenceId ? rest : { ...rest, referenceId };
};

export const getCalculatedTotalsPayload = (state) => {
  const { lines, isTaxInclusive } = getReceiveMoney(state);
  return { isTaxInclusive, lines };
};

export const getIsActionsDisabled = state => state.isSubmitting;
export const isPageEdited = state => state.isPageEdited;
