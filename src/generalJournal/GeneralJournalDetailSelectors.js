export const getHeaderOptions = (state) => {
  const { generalJournal: { lines, id, ...headerOptions } } = state;

  return headerOptions;
};

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

const getTotalDebit = (lines) => {
  const debitLines = lines.filter(line => line.debitAmount !== '');
  return debitLines.reduce(
    (acc, line) => acc + (parseFloat(line.debitAmount) || 0), 0,
  );
};
const getTotalCredit = (lines) => {
  const creditLines = lines.filter(line => line.creditAmount !== '');
  return creditLines.reduce(
    (acc, line) => acc + (parseFloat(line.creditAmount) || 0), 0,
  );
};

const getTotalTax = lines => lines.reduce(
  (acc, { taxAmount }) => acc + parseFloat(taxAmount),
  0,
);

const isCreditLine = ({ creditAmount }) => Boolean(creditAmount);

const getLineAmount = (line) => {
  const {
    creditAmount,
    debitAmount,
  } = line;

  const lineAmount = debitAmount || creditAmount || 0;
  return parseFloat(lineAmount);
};

const getTaxExclusiveOutOfBalance = (lines) => {
  const outOfBalance = lines.reduce(
    (acc, line) => {
      const amount = getLineAmount(line);
      const taxAmount = parseFloat(line.taxAmount);
      const totalAmount = amount + taxAmount;

      return isCreditLine(line)
        ? acc - totalAmount
        : acc + totalAmount;
    },
    0,
  );

  return outOfBalance;
};

const getOutOfBalance = (lines) => {
  const outOfBalance = getTaxExclusiveOutOfBalance(lines);

  return Math.abs(outOfBalance);
};

export const getTotals = (state) => {
  const {
    generalJournal: {
      lines,
    },
  } = state;

  const totalDebit = getTotalDebit(lines);
  const totalCredit = getTotalCredit(lines);
  const totalTax = getTotalTax(lines);
  const totalOutOfBalance = getOutOfBalance(lines);

  return {
    totalCredit: formatTotal(totalCredit),
    totalDebit: formatTotal(totalDebit),
    totalTax: formatTotal(totalTax),
    totalOutOfBalance: formatTotal(totalOutOfBalance),
  };
};

export const getJournalId = state => state.generalJournal.id;

export const getGeneralJournal = state => state.generalJournal;

export const getGeneralJournalForCreatePayload = (state) => {
  const { referenceId, originalReferenceId, ...rest } = getGeneralJournal(state);
  return referenceId === originalReferenceId ? rest : { ...rest, referenceId };
};

export const getNewLineData = state => state.newLine;
