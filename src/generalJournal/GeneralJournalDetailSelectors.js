export const getHeaderOptions = (state) => { // eslint-disable-line
  const { generalJournal: { lines, id, ...headerOptions } } = state;

  return headerOptions;
};

const formatTaxCode = taxCode => ({
  ...taxCode,
  rate: `${taxCode.rate}%`,
});

const formatAccount = ({ id, displayName, accountType }) => ({
  id, displayName, accountType,
});

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
    const taxCodeOptions = taxCodes.map(formatTaxCode);
    const selectedTaxCodeIndex = taxCodes.findIndex(({ id }) => id === line.taxCodeId);

    return {
      ...line,
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
