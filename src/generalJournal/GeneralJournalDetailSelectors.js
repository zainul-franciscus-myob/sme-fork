export const getHeaderOptions = (state) => { // eslint-disable-line
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

  return null;
};

const calculateTax = (line, rate = 0) => {
  const {
    debitDisplayAmount,
    creditDisplayAmount,
  } = line;

  const selectedAmount = parseFloat(debitDisplayAmount || creditDisplayAmount || 0);
  const taxRate = parseFloat(rate) / 100;

  return selectedAmount * taxRate;
};

const getSelectedTaxCode = (taxCodes, taxCodeId) => {
  const taxCodeOptions = taxCodes.map(formatTaxCode);
  const selectedTaxCodeIndex = taxCodes.findIndex(({ id }) => id === taxCodeId);
  const selectedTaxCode = taxCodeOptions[selectedTaxCodeIndex] || {};
  return selectedTaxCode;
};

const getTaxCodes = (accounts, line) => {
  const selectedAccountIndex = accounts.findIndex(({ id }) => id === line.accountId);
  const { taxCodes = [] } = accounts[selectedAccountIndex] || {};
  return taxCodes;
};

export const getLineData = (state) => {
  const {
    accounts,
    generalJournal: {
      lines,
    },
  } = state;

  const formattedLines = lines.map((line) => {
    const disabledField = getDisabledField(line);

    const selectedAccountIndex = accounts.findIndex(({ id }) => id === line.accountId);

    const { taxCodes = [] } = accounts[selectedAccountIndex] || {};
    const selectedTaxCode = getSelectedTaxCode(taxCodes, line.taxCodeId);
    const taxCodeOptions = taxCodes.map(formatTaxCode);
    const selectedTaxCodeIndex = taxCodes.findIndex(({ id }) => id === line.taxCodeId);
    const displayTaxAmount = formatNumber(calculateTax(line, selectedTaxCode.rate));

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

const getTotalTax = (lines, accounts) => lines.reduce(
  (acc, line) => {
    const taxCodes = getTaxCodes(accounts, line);
    return acc + calculateTax(line, getSelectedTaxCode(taxCodes, line.taxCodeId).rate);
  }, 0,
);

export const getTotals = (state) => {
  const {
    accounts,
    generalJournal: {
      lines,
    },
  } = state;

  const totalDebit = getTotalDebit(lines);
  const totalCredit = getTotalCredit(lines);
  const totalTax = getTotalTax(lines, accounts);
  const totalOutOfBalance = totalDebit - totalCredit;

  return {
    totalCredit: formatTotal(totalCredit),
    totalDebit: formatTotal(totalDebit),
    totalTax: formatTotal(totalTax),
    totalOutOfBalance: formatTotal(totalOutOfBalance),
  };
};
