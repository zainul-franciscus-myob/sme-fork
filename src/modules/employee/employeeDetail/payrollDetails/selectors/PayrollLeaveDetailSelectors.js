import { createSelector } from 'reselect/lib/index';

import { getStartDate, getTerminationDate } from './EmploymentDetailsSelectors';
import formatSlashDate from '../../../../../common/valueFormatters/formatDate/formatSlashDate';

export const getLeavePayItemOptions = state => state.leavePayItemOptions;

export const getAllocatedLeavePayItems = state => state.payrollDetails.leaveDetails
  .allocatedLeavePayItems;

const getAllocatedLeaveItemModal = state => state.payrollDetails.leaveDetails.modal;


const getNumberOrZero = value => (Number.isNaN(Number(value)) ? 0 : Number(value));

const calculateAllocatedLeavePayItemTotal = ({ balanceAdjustment, carryOver, yearToDate }) => {
  const checkedBalanceAdjustment = getNumberOrZero(balanceAdjustment);
  const checkedCarryOver = getNumberOrZero(carryOver);
  const checkedYearToDate = getNumberOrZero(yearToDate);
  const sum = Number(checkedCarryOver) + Number(checkedYearToDate)
              + Number(checkedBalanceAdjustment);
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
    startDate: startDate ? formatSlashDate(new Date(startDate)) : '-',
    terminationDate: terminationDate ? formatSlashDate(new Date(terminationDate)) : '-',
    showAllocatedLeavePayItems: !terminationDate,
    allocatedLeavePayItems,
    allocatedLeavePayItemOptions,
    allocatedLeavePayItemModal,
  }),
);
