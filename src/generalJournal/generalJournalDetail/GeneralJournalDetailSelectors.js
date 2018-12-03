export const getHeaderOptions = (state) => {
  const { generalJournal: { lines, id, ...headerOptions } } = state;

  return headerOptions;
};

const formatNumber = num => num.toFixed(2);

const isZero = amount => formatNumber(Number(amount)) === '0.00';

export const getDefaultTaxCodeId = ({ accountId, accounts }) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const getDisabledField = ({ debitInputAmount, creditInputAmount }) => {
  if (debitInputAmount && !isZero(debitInputAmount)) {
    return 'credit';
  }

  if (creditInputAmount && !isZero(creditInputAmount)) {
    return 'debit';
  }

  return '';
};

export const getLineData = (state) => {
  const { generalJournal: { lines } } = state;

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

    return {
      ...line,
      accounts,
      selectedAccountIndex,
      selectedTaxCodeIndex,
      isCreditDisabled: disabledField === 'credit',
      isDebitDisabled: disabledField === 'debit',
    };
  });

  return formattedLines;
};

export const getIndexOfLastLine = (state) => {
  const { generalJournal: { lines } } = state;

  return lines.length - 1;
};

const getTotalDebit = (lines, isTaxInclusive) => {
  const debitLines = lines.filter(line => line.debitAmount !== '');

  return debitLines.reduce(
    (acc, line) => acc
    + (Number(line.debitAmount)
    + (isTaxInclusive ? Number(line.taxAmount) : 0)),
    0,
  );
};

const getTotalCredit = (lines, isTaxInclusive) => {
  const creditLines = lines.filter(line => line.creditAmount !== '');

  return creditLines.reduce(
    (acc, line) => acc
    + (Number(line.creditAmount)
    + (isTaxInclusive ? Number(line.taxAmount) : 0)),
    0,
  );
};

const getTotalTax = (lines, gstReportingMethod) => lines.reduce(
  (acc, { taxAmount, creditAmount }) => {
    const parsedTaxAmount = Number(taxAmount);
    const isCredit = Boolean(creditAmount);
    const isSale = gstReportingMethod === 'sale';

    if (isCredit) {
      return isSale ? acc + parsedTaxAmount : acc - parsedTaxAmount;
    }

    return isSale ? acc - parsedTaxAmount : acc + parsedTaxAmount;
  },
  0,
);

const getTotalAmount = (lines, gstReportingMethod) => lines.reduce(
  (acc, { debitAmount, creditAmount }) => {
    const isCredit = Boolean(creditAmount);
    const isSale = gstReportingMethod === 'sale';

    if (isCredit) {
      return isSale ? acc + Number(creditAmount) : acc - Number(creditAmount);
    }

    return isSale ? acc - Number(debitAmount) : acc + Number(debitAmount);
  },
  0,
);

const getOutOfBalance = (lines, gstReportingMethod) => Math.abs(
  getTotalAmount(lines, gstReportingMethod) + getTotalTax(lines, gstReportingMethod),
);

const formatTotal = num => (num < 0 ? `-$${formatNumber(Math.abs(num))}` : `$${formatNumber(num)}`);

export const getGeneralJournal = state => state.generalJournal;

export const getTotals = (state) => {
  const {
    lines,
    isTaxInclusive,
    gstReportingMethod,
  } = getGeneralJournal(state);

  const totalDebit = formatTotal(getTotalDebit(lines, isTaxInclusive));
  const totalCredit = formatTotal(getTotalCredit(lines, isTaxInclusive));
  const totalTax = formatTotal(getTotalTax(lines, gstReportingMethod));
  const totalOutOfBalance = formatTotal(getOutOfBalance(lines, gstReportingMethod));

  return {
    totalCredit,
    totalDebit,
    totalTax,
    totalOutOfBalance,
  };
};

export const getJournalId = state => state.generalJournal.id;

export const getGeneralJournalForCreatePayload = (state) => {
  const { referenceId, originalReferenceId, ...rest } = getGeneralJournal(state);
  return referenceId === originalReferenceId ? rest : { ...rest, referenceId };
};

export const getTaxCalculatorPayload = (state) => {
  const { lines, isTaxInclusive, gstReportingMethod } = getGeneralJournal(state);
  const newLines = lines.map(({
    taxAmount,
    debitInputAmount: debitAmount,
    creditInputAmount: creditAmount,
    ...line
  }) => ({
    ...line,
    debitAmount,
    creditAmount,
  }));

  return { isTaxInclusive, gstReportingMethod, lines: newLines };
};

export const getNewLineData = state => state.newLine;

export const getIsActionsDisabled = state => state.isSubmitting;
