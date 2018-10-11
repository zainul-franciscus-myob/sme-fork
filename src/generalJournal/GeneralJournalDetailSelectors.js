export const getHeaderOptions = (state) => {
  const { generalJournal: { lines, id, ...headerOptions } } = state;

  return headerOptions;
};

const formatTaxCode = taxCode => ({
  ...taxCode,
  rate: `${taxCode.rate}%`,
});

const formatAccount = ({ id, displayName, accountType }) => ({
  id,
  displayName: ` ${displayName}`,
  accountType,
});

const formatNumber = num => num.toFixed(2);

export const getAccounts = ({ accounts }) => accounts.map(formatAccount);

const getDisabledField = ({ debitDisplayAmount, creditDisplayAmount }) => {
  if (debitDisplayAmount) {
    return 'credit';
  }

  if (creditDisplayAmount) {
    return 'debit';
  }

  return '';
};

const getSelectedTaxCode = (taxCodes, taxCodeId) => {
  const selectedTaxCodeIndex = taxCodes.findIndex(({ id }) => id === taxCodeId);
  const selectedTaxCode = taxCodes[selectedTaxCodeIndex] || {};
  return selectedTaxCode;
};

const getTaxCodes = (accounts, line) => {
  const selectedAccountIndex = accounts.findIndex(({ id }) => id === line.accountId);
  const { taxCodes = [] } = accounts[selectedAccountIndex] || {};
  return taxCodes;
};

const calculateInclusiveTax = (amount, rate) => rate * (amount / (1 + rate));
const calculateExclusiveTax = (amount, rate) => amount * rate;

export const getTaxRateForLineFromAccounts = (accounts, line) => {
  const taxCodes = getTaxCodes(accounts, line);
  const { rate = 0 } = getSelectedTaxCode(taxCodes, line.taxCodeId);
  const taxRate = parseFloat(rate) / 100;
  return taxRate;
};

const calculateTaxForLine = (line, accounts, isTaxInclusive) => {
  const {
    debitDisplayAmount,
    creditDisplayAmount,
  } = line;

  const taxRate = getTaxRateForLineFromAccounts(accounts, line);
  const selectedAmount = parseFloat(debitDisplayAmount || creditDisplayAmount || 0);
  const taxAmount = isTaxInclusive
    ? calculateInclusiveTax(selectedAmount, taxRate)
    : calculateExclusiveTax(selectedAmount, taxRate);

  return taxAmount;
};

export const getLineData = (state) => {
  const {
    accounts,
    generalJournal: {
      lines,
      isTaxInclusive,
    },
  } = state;

  const formattedLines = lines.map((line) => {
    const disabledField = getDisabledField(line);

    const selectedAccountIndex = accounts.findIndex(({ id }) => id === line.accountId);

    const { taxCodes = [] } = accounts[selectedAccountIndex] || {};
    const taxCodeOptions = taxCodes.map(formatTaxCode);
    const selectedTaxCodeIndex = taxCodes.findIndex(({ id }) => id === line.taxCodeId);
    const displayTaxAmount = formatNumber(calculateTaxForLine(line, accounts, isTaxInclusive));

    return {
      ...line,
      displayTaxAmount,
      selectedAccountIndex,
      selectedTaxCodeIndex,
      taxCodes: taxCodeOptions,
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
  const debitLines = lines.filter(line => line.debitDisplayAmount !== '');
  return debitLines.reduce(
    (acc, line) => acc + (parseFloat(line.debitDisplayAmount) || 0), 0,
  );
};
const getTotalCredit = (lines) => {
  const creditLines = lines.filter(line => line.creditDisplayAmount !== '');
  return creditLines.reduce(
    (acc, line) => acc + (parseFloat(line.creditDisplayAmount) || 0), 0,
  );
};

const getTotalTax = (lines, accounts, isTaxInclusive) => lines.reduce(
  (acc, line) => acc + calculateTaxForLine(line, accounts, isTaxInclusive),
  0,
);

const getTaxInclusiveOutOfBalance = (lines) => {
  const totalDebit = getTotalDebit(lines);
  const totalCredit = getTotalCredit(lines);
  return totalDebit - totalCredit;
};

const isCreditLine = ({ creditDisplayAmount }) => Boolean(creditDisplayAmount);

const getLineAmount = (line) => {
  const {
    creditDisplayAmount,
    debitDisplayAmount,
  } = line;

  const lineAmount = debitDisplayAmount || creditDisplayAmount || 0;
  return parseFloat(lineAmount);
};

const getTaxAmountForTaxExclusiveLine = (amount, line, accounts) => {
  const taxRate = getTaxRateForLineFromAccounts(accounts, line);
  const taxAmount = calculateExclusiveTax(amount, taxRate);
  return taxAmount;
};

const getTaxExclusiveOutOfBalance = (lines, accounts) => {
  const outOfBalance = lines.reduce(
    (acc, line) => {
      const amount = getLineAmount(line);
      const taxAmount = getTaxAmountForTaxExclusiveLine(amount, line, accounts);
      const totalAmount = amount + taxAmount;

      return isCreditLine(line)
        ? acc - totalAmount
        : acc + totalAmount;
    },
    0,
  );

  return outOfBalance;
};

const getOutOfBalance = (lines, accounts, isTaxInclusive) => {
  const outOfBalance = isTaxInclusive
    ? getTaxInclusiveOutOfBalance(lines)
    : getTaxExclusiveOutOfBalance(lines, accounts);

  return Math.abs(outOfBalance);
};

export const getTotals = (state) => {
  const {
    accounts,
    generalJournal: {
      lines,
      isTaxInclusive,
    },
  } = state;

  const totalDebit = getTotalDebit(lines);
  const totalCredit = getTotalCredit(lines);
  const totalTax = getTotalTax(lines, accounts, isTaxInclusive);
  const totalOutOfBalance = getOutOfBalance(lines, accounts, isTaxInclusive);

  return {
    totalCredit: formatTotal(totalCredit),
    totalDebit: formatTotal(totalDebit),
    totalTax: formatTotal(totalTax),
    totalOutOfBalance: formatTotal(totalOutOfBalance),
  };
};
