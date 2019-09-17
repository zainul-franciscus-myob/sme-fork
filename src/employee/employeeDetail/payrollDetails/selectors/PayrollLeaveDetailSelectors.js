import { createSelector } from 'reselect/lib/index';
import { format } from 'date-fns';

import { getStartDate, getTerminationDate } from './EmploymentDetailsSelectors';

export const getLeavePayItemOptions = state => state.leavePayItemOptions;

export const getAllocatedLeavePayItems = state => state.payrollDetails.leaveDetails
  .allocatedLeavePayItems;

const getAllocatedLeaveItemModal = state => state.payrollDetails.leaveDetails.modal;

export const formatDate = date => format(
  new Date(date),
  'DD/MM/YYYY',
);

const getNumberOrZero = value => (Number.isNaN(Number(value)) ? 0 : Number(value));

const calculateAllocatedLeavePayItemTotal = ({ carryOver, yearToDate }) => {
  const checkedCarryOver = getNumberOrZero(carryOver);
  const checkedYearToDate = getNumberOrZero(yearToDate);
  const sum = Number(checkedCarryOver) + Number(checkedYearToDate);
  return String(sum.toFixed(2));
};

export const getLeavePayItems = createSelector(
  getAllocatedLeavePayItems,
  allocatedLeaveItems => allocatedLeaveItems.map(allocatedItem => ({
    ...allocatedItem,
    total: calculateAllocatedLeavePayItemTotal(allocatedItem),
  })),
);

export const getFilteredLeavePayItemOptions = createSelector(
  getLeavePayItemOptions,
  getLeavePayItems,
  (leavePayItemOptions, allocatedLeavePayItems) => leavePayItemOptions
    .filter((leavePayItemOption) => {
      const listedItem = allocatedLeavePayItems
        .find(leavePayItem => leavePayItem.payItemId === leavePayItemOption.id);
      return !listedItem;
    }),
);

export const getLeaveDetail = createSelector(
  getStartDate,
  getTerminationDate,
  getLeavePayItems,
  getFilteredLeavePayItemOptions,
  getAllocatedLeaveItemModal,
  (
    startDate,
    terminationDate,
    allocatedLeavePayItems,
    allocatedLeavePayItemOptions,
    allocatedLeavePayItemModal,
  ) => ({
    startDate: startDate ? formatDate(startDate) : '-',
    terminationDate: terminationDate ? formatDate(terminationDate) : '-',
    showAllocatedLeavePayItems: !terminationDate,
    allocatedLeavePayItems,
    allocatedLeavePayItemOptions,
    allocatedLeavePayItemModal,
  }),
);
