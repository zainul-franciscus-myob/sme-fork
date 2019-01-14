import { createSelector, createStructuredSelector } from 'reselect';

const convertToUnixTime = date => new Date(date).getTime().toString();

const getReferenceId = state => state.spendMoney.referenceId;
const getSelectedPayFromId = state => state.spendMoney.selectedPayFromAccountId;
const getSelectedPayToContact = state => state.spendMoney.selectedPayToContactId;
const getPayFromAccounts = state => state.spendMoney.payFromAccounts;
const getPayToContacts = state => state.spendMoney.payToContacts;
const getDate = state => state.spendMoney.date;
const getDescription = state => state.spendMoney.description;
const getIsReportable = state => state.spendMoney.isReportable;
const getIsTaxInclusive = state => state.spendMoney.isTaxInclusive;

const getHeadersProperties = createStructuredSelector({
  referenceId: getReferenceId,
  selectedPayFromAccountId: getSelectedPayFromId,
  selectedPayToContactId: getSelectedPayToContact,
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
    selectedPayToContactId, selectedPayFromAccountId,
    date,
    ...headerOptions
  } = headerProps;
  const selectedPayFromAccountIndex = payFromAccounts.findIndex(
    account => account.id === selectedPayFromAccountId,
  );
  const selectedPayToContactIndex = payToContacts.findIndex(
    contact => contact.id === selectedPayToContactId,
  );

  return {
    payFromAccounts,
    payToContacts,
    selectedPayFromAccountIndex,
    selectedPayToContactIndex,
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
  (state, props) => state.spendMoney.lines[props.index],
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

const getLength = state => state.spendMoney.lines.length;

export const getTableData = createSelector(
  getLength,
  len => Array(len).fill({}),
);

export const getNewLineData = state => state.newLine;

export const getIndexOfLastLine = state => state.spendMoney.lines.length - 1;

const formatTotal = (total) => {
  const num = parseFloat(total);

  return num < 0 ? `-$${formatNumber(Math.abs(num))}` : `$${formatNumber(num)}`;
};

export const getSpendMoney = state => state.spendMoney;

export const getSpendMoneyId = state => state.spendMoney.id;

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

export const isReferenceIdDirty = (state) => {
  const { referenceId, originalReferenceId } = getSpendMoney(state);
  return referenceId !== originalReferenceId;
};

export const getSpendMoneyForCreatePayload = (state) => {
  const { referenceId, originalReferenceId, ...rest } = getSpendMoney(state);
  return referenceId === originalReferenceId ? rest : { ...rest, referenceId };
};

export const getCalculatedTotalsPayload = (state) => {
  const { lines, isTaxInclusive } = getSpendMoney(state);
  return { isTaxInclusive, lines };
};

export const getIsActionsDisabled = state => state.isSubmitting;
export const isPageEdited = state => state.isPageEdited;
