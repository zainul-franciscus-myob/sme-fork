import { getAllocationAccounts } from '../bankingRuleSelectors';
import AllocationTypes from '../AllocationTypes';
import formatNumberWithDecimalScaleRange from '../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';

const newAllocationLine = {
  accountId: '',
  value: '',
  taxCodeId: '',
};

const findTaxCodeIdByAccountId = (state, accountId) => (
  getAllocationAccounts({ bankingRuleModal: state })
    .find(({ id }) => id === accountId).taxCodeId
);

const addAllocation = ({ state, allocations, newRow }) => {
  const updatedAllocations = [
    ...allocations,
    {
      ...newRow,
      taxCodeId: findTaxCodeIdByAccountId(state, newRow.accountId),
    },
  ];
  return {
    ...state,
    bankingRule: {
      ...state.bankingRule,
      allocations: updatedAllocations,
    },
  };
};

const addRowForPercentage = (state, partialRow) => addAllocation({
  state,
  allocations: state.bankingRule.allocations,
  newRow: {
    ...newAllocationLine,
    ...partialRow,
    value: state.bankingRule.allocations.length !== 0 ? '0.00' : '100.00',
  },
});

const addRowForAmount = (state, partialRow) => {
  if (state.bankingRule.allocations.length === 0) {
    return addAllocation({
      state,
      allocations: state.bankingRule.allocations,
      newRow: {
        ...newAllocationLine,
        ...partialRow,
        value: 'Full amount',
      },
    });
  }

  const updatedAllocations = state.bankingRule.allocations.map((allocation, index) => ({
    ...allocation,
    value: index === state.bankingRule.allocations.length - 1 ? '0.00' : allocation.value,
  }));

  return addAllocation({
    state,
    allocations: updatedAllocations,
    newRow: {
      ...newAllocationLine,
      ...partialRow,
      value: 'Remainder',
    },
  });
};

export const addTableRow = (state, action) => {
  const { id, ...partialRow } = action.row;
  return (state.bankingRule.allocationType === AllocationTypes.percent)
    ? addRowForPercentage(state, partialRow)
    : addRowForAmount(state, partialRow);
};

export const updateTableRow = (state, action) => ({
  ...state,
  bankingRule: {
    ...state.bankingRule,
    allocations: state.bankingRule.allocations.map((line, index) => {
      if (index === action.index) {
        return {
          ...line,
          taxCodeId: action.key === 'accountId'
            ? findTaxCodeIdByAccountId(state, action.value)
            : line.taxCodeId,
          [action.key]: action.value,
        };
      }
      return line;
    }),
  },
});

const removeRowForPercentage = (state, allocations) => ({
  ...state,
  bankingRule: {
    ...state.bankingRule,
    allocations: allocations.map((allocation, index) => (
      index === allocations.length - 1
        ? {
          ...allocation,
          value: allocations.length === 1 ? '100.00' : allocation.value,
        }
        : allocation)),
  },
});

const removeRowForAmount = (state, allocations) => ({
  ...state,
  bankingRule: {
    ...state.bankingRule,
    allocations: allocations.map((allocation, index) => (
      index === allocations.length - 1
        ? {
          ...allocation,
          value: allocations.length === 1 ? 'Full amount' : 'Remainder',
        }
        : allocation)),
  },
});

export const removeTableRow = (state, action) => {
  const { bankingRule } = state;
  const updatedAllocations = bankingRule.allocations.filter((_, index) => index !== action.index);

  const updatedState = (bankingRule.allocationType === AllocationTypes.percent)
    ? removeRowForPercentage(state, updatedAllocations)
    : removeRowForAmount(state, updatedAllocations);

  return {
    ...updatedState,
  };
};

export const formatAmount = (state, action) => {
  const { index } = action;
  const allocation = state.bankingRule.allocations[index];
  const newValue = formatNumberWithDecimalScaleRange(allocation.value, 2, 6);
  const newAllocations = [...state.bankingRule.allocations];
  newAllocations[index] = { ...allocation, value: newValue };
  return {
    ...state,
    bankingRule: {
      ...state.bankingRule,
      allocations: newAllocations,
    },
  };
};
