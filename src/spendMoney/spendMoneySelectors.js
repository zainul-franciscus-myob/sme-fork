const formatAccount = ({
  id, displayId, displayName, accountType, taxCodeId, reportingMethod,
}) => ({
  id,
  displayId,
  displayName: ` ${displayName}`,
  accountType,
  taxCodeId,
  reportingMethod,
});

export const getHeaderOptions = (state) => {
  const {
    spendMoney: {
      lines, id, payFromAccounts, ...headerOptions
    },
  } = state;

  const formattedAccounts = payFromAccounts.map(account => formatAccount(account));

  return {
    payFromAccounts: formattedAccounts,
    ...headerOptions,
  };
};

const formatNumber = num => num.toFixed(2);

export const getDefaultTaxCodeId = ({ accountId, accounts }) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const getDisabledField = ({ debitAmount, creditAmount }) => {
  if (debitAmount) {
    return 'credit';
  }

  if (creditAmount) {
    return 'debit';
  }

  return '';
};

const getDisplayAmount = (amount, taxAmount, isTaxInclusive) => {
  const parsedAmount = parseFloat(amount);
  const calculatedAmount = isTaxInclusive ? parsedAmount + parseFloat(taxAmount) : amount;

  return calculatedAmount;
};

const getDisplayAmounts = ({ debitAmount, creditAmount, taxAmount }, isTaxInclusive) => ({
  displayDebitAmount: debitAmount
    && getDisplayAmount(debitAmount, taxAmount, isTaxInclusive),
  displayCreditAmount: creditAmount
    && getDisplayAmount(creditAmount, taxAmount, isTaxInclusive),
});

export const getLineData = (state) => {
  const {
    generalJournal: {
      lines,
      isTaxInclusive,
    },
  } = state;

  const formattedLines = lines.map((line) => {
    const {
      taxCodes,
      accounts,
      accountId,
      taxCodeId,
    } = line;

    const disabledField = getDisabledField(line);

    const selectedAccountIndex = accounts.findIndex(({ id }) => id === accountId);
    const selectedTaxCodeIndex = taxCodes.findIndex(({ id }) => id === taxCodeId);

    const {
      displayDebitAmount,
      displayCreditAmount,
    } = getDisplayAmounts(line, isTaxInclusive);

    const formattedAccounts = accounts.map(formatAccount);

    return {
      ...line,
      accounts: formattedAccounts,
      displayDebitAmount,
      displayCreditAmount,
      selectedAccountIndex,
      selectedTaxCodeIndex,
      isCreditDisabled: disabledField === 'credit',
      isDebitDisabled: disabledField === 'debit',
    };
  });

  return formattedLines;
};

export const getIndexOfLastLine = (state) => {
  const {
    generalJournal: {
      lines,
    },
  } = state;

  return lines.length - 1;
};

const formatTotal = num => (num < 0 ? `-$${formatNumber(Math.abs(num))}` : `$${formatNumber(num)}`);

export const getTotals = () => ({
  netAmount: formatTotal(0),
  totalTax: formatTotal(0),
  totalOutOfBalance: formatTotal(0),
});

export const getSpendMoneyForCreatePayload = state => ({
  ...state,
});

export const getNewLineData = state => state.newLine;
