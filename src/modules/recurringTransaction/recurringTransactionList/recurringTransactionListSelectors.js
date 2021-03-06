import { createSelector } from 'reselect';
import { differenceInDays } from 'date-fns';

import ScheduleFrequency from '../types/ScheduleFrequency';
import TransactionType from '../types/TransactionType';
import getRecurringUrl from '../common/getRecurringUrl';

export const getBusinessId = (state) => state.businessId;

export const getRegion = (state) => state.region;

export const getIsLoading = (state) => state.isLoading;

export const getAlert = (state) => state.alert;

const getEntries = (state) => state.entries;

const getDayLabel = (number) =>
  number > 1 ? `${number} days` : `${number} day`;

export const calculateOverdue = ({ frequency, currentDate, nextDueDate }) => {
  if (frequency === ScheduleFrequency.NEVER) {
    return '';
  }

  const dayDifference = differenceInDays(currentDate, nextDueDate);
  return dayDifference <= 0 ? 'Up to date' : getDayLabel(dayDifference);
};

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) =>
    entries.map((entry) => {
      const { id, transactionType } = entry;
      const link =
        transactionType === TransactionType.BILL ||
        transactionType === TransactionType.INVOICE ||
        transactionType === TransactionType.SPEND_MONEY
          ? getRecurringUrl({
              transactionType,
              businessId,
              region,
              recurringTransactionId: id,
            })
          : undefined;
      const overdue = calculateOverdue({
        frequency: entry.frequency,
        currentDate: new Date(),
        nextDueDate: new Date(entry.nextDue),
      });

      return {
        ...entry,
        overdue,
        link,
      };
    })
);

export const getTransactionTypeOptions = (state) =>
  state.transactionTypeOptions;

export const getOrderBy = (state) => state.orderBy;

export const getIsRecurringTransactionEnabled = (state) =>
  state.isRecurringTransactionEnabled;

export const getIsTableLoading = (state) => state.isTableLoading;

export const getFlipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getFilterOptions = ({ filterOptions }) => filterOptions;
export const getUrlParams = createSelector(getFilterOptions, ({ type }) => ({
  type,
}));

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getTransactionTypeFilters = createSelector(
  getTransactionTypeOptions,
  (typeOptions) =>
    typeOptions.map((option) => ({
      label: option.displayName,
      value: option.name,
    }))
);

export const getCreateRecurringTransactionUrl = (state, transactionType) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const recurringTransactionId = 'new';

  return getRecurringUrl({
    businessId,
    region,
    recurringTransactionId,
    transactionType,
  });
};
