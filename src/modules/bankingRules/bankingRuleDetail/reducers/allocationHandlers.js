import {
  ADD_TABLE_ROW,
  CHANGE_TABLE_ROW,
  REMOVE_TABLE_ROW,
} from '../BankingRuleDetailIntents';
import { allocationTypeOptions } from '../AllocationTypes';
import { getAllocationAccounts } from '../bankingRuleDetailSelectors';

const findTaxCodeIdByAccountId = (state, accountId) =>
  getAllocationAccounts(state).find((account) => account.id === accountId)
    .taxCodeId;

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
    allocations: updatedAllocations,
  };
};

const addRowForPercentage = (state, partialRow) =>
  addAllocation({
    state,
    allocations: state.allocations,
    newRow: {
      ...state.newAllocationLine,
      ...partialRow,
      value: state.allocations.length !== 0 ? '0.00' : '100.00',
    },
  });

const addRowForAmount = (state, partialRow) => {
  if (state.allocations.length === 0) {
    return addAllocation({
      state,
      allocations: state.allocations,
      newRow: {
        ...state.newAllocationLine,
        ...partialRow,
        value: 'Full amount',
      },
    });
  }

  const updatedAllocations = state.allocations.map((allocation, index) => ({
    ...allocation,
    value: index === state.allocations.length - 1 ? '0.00' : allocation.value,
  }));

  return addAllocation({
    state,
    allocations: updatedAllocations,
    newRow: {
      ...state.newAllocationLine,
      ...partialRow,
      value: 'Remainder',
    },
  });
};

const addTableRow = (state, action) => {
  const { id, ...partialRow } = action.row;

  return state.allocationType === allocationTypeOptions.percent
    ? addRowForPercentage(state, partialRow)
    : addRowForAmount(state, partialRow);
};

const changeTableRow = (state, action) => ({
  ...state,
  allocations: state.allocations.map((line, index) => {
    if (index === action.index) {
      return {
        ...line,
        taxCodeId:
          action.key === 'accountId'
            ? findTaxCodeIdByAccountId(state, action.value)
            : line.taxCodeId,
        [action.key]: action.value,
      };
    }
    return line;
  }),
});

const removeRowForPercentage = (state, allocations) => ({
  ...state,
  allocations: allocations.map((allocation, index) =>
    index === allocations.length - 1
      ? {
          ...allocation,
          value: allocations.length === 1 ? '100.00' : allocation.value,
        }
      : allocation
  ),
});

const removeRowForAmount = (state, allocations) => ({
  ...state,
  allocations: allocations.map((allocation, index) =>
    index === allocations.length - 1
      ? {
          ...allocation,
          value: allocations.length === 1 ? 'Full amount' : 'Remainder',
        }
      : allocation
  ),
});

const removeTableRow = (state, action) => {
  const updatedAllocations = state.allocations.filter(
    (_, index) => index !== action.index
  );

  const updatedState =
    state.allocationType === allocationTypeOptions.percent
      ? removeRowForPercentage(state, updatedAllocations)
      : removeRowForAmount(state, updatedAllocations);

  return {
    ...updatedState,
  };
};

export default {
  [ADD_TABLE_ROW]: addTableRow,
  [CHANGE_TABLE_ROW]: changeTableRow,
  [REMOVE_TABLE_ROW]: removeTableRow,
};
