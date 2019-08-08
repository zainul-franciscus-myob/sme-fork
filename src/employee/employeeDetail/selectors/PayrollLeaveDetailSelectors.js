import { createSelector } from 'reselect/lib/index';
import { format } from 'date-fns';

const getLeavePayItemOptions = state => state.leavePayItemOptions;

const getAllocatedLeavePayItems = state => state.payrollDetails.leaveDetails.allocatedLeavePayItems;

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
        .find(leavePayItem => leavePayItem.payItemId === leavePayItemOption.payItemId);
      return !listedItem;
    }),
);

export const getStartDate = ({
  payrollDetails: {
    employmentDetails: {
      startDate,
    },
  },
}) => (`Start Date ${startDate === '' ? '-' : formatDate(startDate)}`);

export const getTerminationDate = ({
  payrollDetails: {
    employmentDetails: {
      terminationDate,
    },
  },
}) => (`Termination date ${terminationDate === '' ? '-' : formatDate(terminationDate)}`);
