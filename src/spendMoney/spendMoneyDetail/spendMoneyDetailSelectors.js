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

const formatTotal = num => (num < 0 ? `-$${formatNumber(Math.abs(num))}` : `$${formatNumber(num)}`);

export const getTotals = () => ({
  netAmount: formatTotal(0),
  totalTax: formatTotal(0),
  totalOutOfBalance: formatTotal(0),
});

export const getSpendMoneyForCreatePayload = ({ spendMoney }) => {
  const { referenceId, originalReferenceId, ...rest } = spendMoney;
  return referenceId === originalReferenceId ? rest : { ...rest, referenceId };
};

export const getIsActionsDisabled = state => state.isSubmitting;
