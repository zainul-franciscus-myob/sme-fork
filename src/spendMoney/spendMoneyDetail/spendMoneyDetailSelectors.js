export const getHeaderOptions = (state) => {
  const {
    spendMoney: {
      lines, id, payFromAccounts, payToContacts,
      selectedPayToContactId, selectedPayFromAccountId, ...headerOptions
    },
  } = state;
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
    ...headerOptions,
  };
};

const formatNumber = num => num.toFixed(2);

export const getDefaultTaxCodeId = ({ accountId, accounts }) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

export const getLineData = state => state.spendMoney.lines.map(({
  accountId, taxCodeId, taxCodes, accounts, amount, description, taxAmount,
}) => ({
  amount,
  taxAmount,
  description,
  accountId,
  taxCodeId,
  taxCodes,
  accounts,
  selectedAccountIndex: accounts.findIndex(({ id }) => id === accountId),
  selectedTaxCodeIndex: taxCodes.findIndex(({ id }) => id === taxCodeId),
}));

export const getNewLineData = state => state.newLine;

export const getIndexOfLastLine = state => state.spendMoney.lines.length - 1;

const formatTotal = (total) => {
  const num = parseFloat(total);

  return num < 0 ? `-$${formatNumber(Math.abs(num))}` : `$${formatNumber(num)}`;
};

const getSpendMoney = state => state.spendMoney;

export const getTotals = (state) => {
  const { netAmount, totalTax, totalAmount } = state.totals;

  return {
    netAmount: formatTotal(netAmount),
    totalTax: formatTotal(totalTax),
    totalAmount: formatTotal(totalAmount),
  };
};

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
