import { getAllocatedLeavePayItems } from '../selectors/PayrollLeaveDetailSelectors';

const formatAmount = value => (Number(value) || 0).toFixed(2);

const removeTrailingZeroes = number => String(Number(number));

const countDecimalPlaces = (num) => {
  if (Math.floor(num) === num) return 0;
  return num.toString()
    .split('.')[1].length || 0;
};

const formatPercentage = (percentage) => {
  if (countDecimalPlaces(percentage) < 2) {
    return percentage.toFixed(2);
  }

  return removeTrailingZeroes(percentage.toFixed(5));
};

const getLeavePayItemModalDefaultState = () => ({
  leavePayItem: {
    title: '',
    name: '',
    printOnPaySlip: true,
    carryRemainingLeave: false,
    calculationBasisType: '',
    calculationBasisPercentage: '',
    calculationBasisPayItemId: '',
    calculationBasisAmount: '',
    calculationBasisPeriod: '',
    selectedExemptions: [],
    selectedEmployees: [],
    selectedLinkedWages: [],
  },
  isLoading: false,
  isSubmitting: false,
  alert: undefined,
  leavePayItemId: '',
  calculationBasisTypes: [],
  calculationBasisPercentOfOptions: [],
  payPeriods: [],
  employees: [],
  exemptionOptions: [],
  linkedWagesOptions: [],
});

export const openLeavePayItemModal = (state, { leavePayItemId }) => ({
  ...state,
  leavePayItemModal: {
    ...getLeavePayItemModalDefaultState(),
    leavePayItemId,
  },
});

export const closeLeavePayItemModal = state => ({
  ...state,
  leavePayItemModal: undefined,
});

const setLeavePayItemModalState = (state, modal) => ({
  ...state,
  leavePayItemModal: {
    ...state.leavePayItemModal,
    ...modal,
  },
});

export const setLeavePayItemModalAlert = (state, { alert }) => (
  setLeavePayItemModalState(state, { alert })
);

export const setLeavePayItemModalLoadingState = (state, { isLoading }) => (
  setLeavePayItemModalState(state, { isLoading })
);

export const setLeavePayItemModalSubmittingState = (state, { isSubmitting }) => (
  setLeavePayItemModalState(state, { isSubmitting })
);

export const loadLeavePayItem = (state, { response }) => {
  const { leavePayItem, ...rest } = response;

  return {
    ...state,
    leavePayItemModal: {
      ...state.leavePayItemModal,
      ...rest,
      leavePayItem: {
        ...state.leavePayItemModal.leavePayItem,
        ...leavePayItem,
      },
    },
  };
};

const setLeavePayItemState = (state, partialLeavePayItem) => ({
  ...state,
  leavePayItemModal: {
    ...state.leavePayItemModal,
    leavePayItem: {
      ...state.leavePayItemModal.leavePayItem,
      ...partialLeavePayItem,
    },
  },
});

export const addLeavePayItemModalEmployee = (state, action) => (
  setLeavePayItemState(state, {
    selectedEmployees: [
      ...state.leavePayItemModal.leavePayItem.selectedEmployees,
      {
        name: action.name,
        id: action.id,
      },
    ],
  })
);

export const removeLeavePayItemModalEmployee = (state, action) => (
  setLeavePayItemState(state, {
    selectedEmployees: state.leavePayItemModal.leavePayItem.selectedEmployees.filter(
      selectedEmployee => selectedEmployee.id !== action.id,
    ),
  })
);

export const addLeavePayItemModalExemption = (state, action) => (
  setLeavePayItemState(state, {
    selectedExemptions: [
      ...state.leavePayItemModal.leavePayItem.selectedExemptions,
      state.leavePayItemModal.exemptionOptions.find(({ id }) => id === action.id),
    ],
  })
);

export const removeLeavePayItemModalExemption = (state, action) => (
  setLeavePayItemState(state, {
    selectedExemptions: state.leavePayItemModal.leavePayItem.selectedExemptions.filter(
      selectedExemption => selectedExemption.id !== action.id,
    ),
  })
);

export const addLeavePayItemModalLinkedWage = (state, action) => (
  setLeavePayItemState(state, {
    selectedLinkedWages: [
      ...state.leavePayItemModal.leavePayItem.selectedLinkedWages,
      state.leavePayItemModal.linkedWagesOptions.find(({ id }) => id === action.id),
    ],
  })
);

export const removeLeavePayItemModalLinkedWage = (state, action) => (
  setLeavePayItemState(state, {
    selectedLinkedWages: state.leavePayItemModal.leavePayItem.selectedLinkedWages.filter(
      selectedLinkedWage => selectedLinkedWage.id !== action.id,
    ),
  })
);

export const updateLeavePayItemModalName = (state, action) => (
  setLeavePayItemState(state, { name: action.value })
);

export const updateLeavePayItemModalCalculationBasis = (state, action) => (
  setLeavePayItemState(state, { [action.key]: action.value })
);

export const updateLeavePayItemModalCalculationBasisAmounts = (state, { key, value }) => {
  if (key === 'calculationBasisPercentage') {
    const number = Number(value) || 0;
    const formattedPercentage = formatPercentage(number);
    return updateLeavePayItemModalCalculationBasis(state, {
      key,
      value: formattedPercentage,
    });
  }
  if (key === 'calculationBasisAmount') {
    const formattedAmount = formatAmount(value);
    return updateLeavePayItemModalCalculationBasis(state, {
      key,
      value: formattedAmount,
    });
  }
  return updateLeavePayItemModalCalculationBasis(state, {
    key,
    value,
  });
};

export const updateLeavePayItem = (state, { leavePayItem, leavePayItemOptions }) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    leaveDetails: {
      ...state.payrollDetails.leaveDetails,
      allocatedLeavePayItems: getAllocatedLeavePayItems(state).map(item => (
        item.payItemId === leavePayItem.payItemId ? { ...item, ...leavePayItem } : item
      )),
    },
  },
  leavePayItemOptions,
});

export const createLeavePayItem = (state, { leavePayItem, leavePayItemOptions }) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    leaveDetails: {
      ...state.payrollDetails.leaveDetails,
      allocatedLeavePayItems: [
        ...getAllocatedLeavePayItems(state),
        { ...leavePayItem, carryOver: '0' },
      ],
    },
  },
  leavePayItemOptions,
});
