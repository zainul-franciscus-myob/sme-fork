import { createSelector } from 'reselect';

import {
  getBusinessId,
  getContacts,
  getEntries,
  getFilterOptions,
  getIsOpenTransactionWithdrawal,
} from '../../selectors/index';
import ContactType from '../../../contact/contactCombobox/types/ContactType';
import DefaultLineTypeId from '../../types/DefaultLineTypeId';
import DisplayMode from '../../../contact/contactCombobox/types/DisplayMode';
import formatAmount from '../../../../common/valueFormatters/formatAmount';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';
import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

const getAllocate = (state) => state.openEntry.allocate;

export const getIsSpendMoney = (state) => state.openEntry.allocate.isSpendMoney;

export const getTotalAmount = (state) => state.openEntry.allocate.totalAmount;

export const getNewLineData = (state) => state.openEntry.allocate.newLine;

export const getContactId = (state) => state.openEntry.allocate.contactId;

export const getIsReportable = (state) => state.openEntry.allocate.isReportable;

const getLines = (state) => state.openEntry.allocate.lines;

const getLinesLength = (state) => state.openEntry.allocate.lines.length;

export const getRegion = (state) => state.region;

export const getIndexOfLastLine = (state) =>
  state.openEntry.allocate.lines.length - 1;

export const getTaxLabel = (state) =>
  getRegionToDialectText(state.region)('Tax code');

export const getTaxAmountLabel = (state) =>
  getRegionToDialectText(state.region)('Tax amount');

export const getDescription = createSelector(
  getAllocate,
  ({ description }) => description
);

export const getLinesForTaxCalculation = (state) => {
  const lines = getLines(state);
  const isWithdrawal = getIsOpenTransactionWithdrawal(state);
  const defaultLineTypeId = isWithdrawal
    ? DefaultLineTypeId.SPEND_MONEY
    : DefaultLineTypeId.RECEIVE_MONEY;

  return lines.map((line) => ({
    amount: line.amount,
    taxCodeId: line.taxCodeId,
    lineTypeId: line.lineTypeId || defaultLineTypeId,
  }));
};

export const getTotalPercentageAmount = createSelector(getLines, (lines = []) =>
  lines.reduce(
    (accumulator, currentValue) =>
      accumulator + (Number(currentValue.amountPercent) || 0),
    0
  )
);

export const getTotalDollarAmount = createSelector(getLines, (lines = []) =>
  lines.reduce(
    (accumulator, currentValue) =>
      accumulator + (Number(currentValue.amount) || 0),
    0
  )
);

export const getDefaultTaxCodeId = ({ accountId, accounts }) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

export const getTableData = createSelector(getLinesLength, (len) =>
  Array(len).fill({})
);

export const getLineDataByIndex = createSelector(
  (state, props) => state.openEntry.allocate.lines[props.index],
  (line) => line || {}
);

export const getContact = createSelector(
  getContacts,
  getContactId,
  (contacts, contactId) => contacts.find(({ id }) => id === contactId)
);

const getContactType = (state) => state.openEntry.allocate.contactType;

export const getIsSupplier = createSelector(
  getContactType,
  (contactType) => contactType === ContactType.SUPPLIER
);

export const getShowIsReportableCheckbox = createSelector(
  getIsSpendMoney,
  getIsSupplier,
  getRegion,
  (isSpendMoney, isSupplier, region) =>
    isSpendMoney && isSupplier && region === 'au'
);

export const getContactLabel = createSelector(getIsSpendMoney, (isSpendMoney) =>
  isSpendMoney ? 'payee' : 'payer'
);

export const getTotals = createSelector(
  getTotalDollarAmount,
  getTotalAmount,
  (totalAllocated, total) => {
    const totalAllocatedPercent =
      total !== 0 ? (totalAllocated / total) * 100 : 100;
    const totalUnallocated = total - totalAllocated;
    const totalUnallocatedPercent = 100 - totalAllocatedPercent;

    return {
      totalAllocated: `${formatCurrency(totalAllocated)} (${formatAmount(
        totalAllocatedPercent
      )}%)`,
      totalUnallocated: `${formatCurrency(totalUnallocated)} (${formatAmount(
        totalUnallocatedPercent
      )}%)`,
    };
  }
);

export const getSplitAllocationPayload = (state, index) => {
  const entries = getEntries(state);
  const isSupplier = getIsSupplier(state);
  const memo = getDescription(state);
  const openedEntry = entries[index];
  const { transactionId } = openedEntry;

  const { bankAccount: bankAccountId } = getFilterOptions(state);

  const {
    isSpendMoney: isWithdrawal,
    date,
    contactId,
    isReportable,
    lines,
  } = getAllocate(state);

  return {
    bankAccountId,
    transactionId,
    isWithdrawal,
    contactId,
    description: memo,
    isReportable: isWithdrawal && isSupplier ? isReportable : undefined,
    date,
    lines: lines.map(
      ({ accountId, amount, description, taxCodeId, jobId, quantity }) => ({
        accountId,
        amount,
        description,
        taxCodeId,
        jobId,
        quantity,
      })
    ),
  };
};

export const getSplitAllocateContactComboboxContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const contactId = getContactId(state);

  return {
    businessId,
    region,
    contactId,
    contactType: ContactType.ALL,
    displayMode: DisplayMode.NAME_AND_TYPE,
  };
};
