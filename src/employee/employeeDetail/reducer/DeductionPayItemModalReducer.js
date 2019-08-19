import { getDeductionPayItems } from '../selectors/PayrollDeductionDetailSelectors';
import { getFormattedAmount, getFormattedPercentage } from '../selectors/DeductionPayItemModalSelectors';

const getDeductionPayItemModalDefaultState = () => ({
  id: '',
  isLoading: true,
  isSubmitting: false,
  alert: undefined,
  title: '',
  deductionPayItem: {
    name: '',
    linkedPayableAccountId: '',
    atoReportingCategory: '',
    calculationBasis: '',
    calculationPercentage: '',
    calculationPercentOfId: '',
    calculationDollars: '',
    calculationPer: '',
    limit: '',
    limitPercentage: '',
    limitPercentOfId: '',
    limitDollars: '',
    limitPer: '',
    employees: [],
    exemptions: [],
  },
  accountOptions: [],
  atoReportCategoryOptions: [],
  calculationBasisOptions: [],
  calculationPercentOfOptions: [],
  calculationDollarPerOptions: [],
  limitOptions: [],
  limitPercentOfOptions: [],
  limitDollarPerOptions: [],
  employeeOptions: [],
  exemptionOptions: [],
});

export const loadDeductionPayItemModal = (state, { response }) => ({
  ...state,
  deductionPayItemModal: {
    ...state.deductionPayItemModal,
    ...response,
    deductionPayItem: {
      ...state.deductionPayItemModal.deductionPayItem,
      ...response.deductionPayItem,
    },
  },
});

export const createDeductionPayItemModal = (state, {
  response: { deductionPayItem, deductionPayItemOptions },
}) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    deductionDetails: {
      ...state.payrollDetails.deductionDetails,
      deductionPayItems: [
        ...state.payrollDetails.deductionDetails.deductionPayItems,
        deductionPayItem,
      ],
    },
  },
  isPageEdited: true,
  deductionPayItemOptions,
});

export const updateDeductionPayItemModal = (state, {
  response: { deductionPayItem, deductionPayItemOptions },
}) => {
  const deductionPayItems = getDeductionPayItems(state);
  const updatedDeductionPayItems = deductionPayItems
    .map(payItem => (payItem.id === deductionPayItem.id ? deductionPayItem : payItem));

  return {
    ...state,
    payrollDetails: {
      ...state.payrollDetails,
      deductionDetails: {
        ...state.payrollDetails.deductionDetails,
        deductionPayItems: updatedDeductionPayItems,
      },
    },
    deductionPayItemOptions,
  };
};

export const openDeductionPayItemModal = (state, { id }) => {
  const deductionPayItemModalDefaultState = getDeductionPayItemModalDefaultState();

  return {
    ...state,
    deductionPayItemModal: {
      ...deductionPayItemModalDefaultState,
      id,
    },
  };
};

export const closeDeductionPayItemModal = state => ({
  ...state,
  deductionPayItemModal: undefined,
});

const setDeductionPayItemModalState = (state, modal) => ({
  ...state,
  deductionPayItemModal: {
    ...state.deductionPayItemModal,
    ...modal,
  },
});

export const setDeductionPayItemModalLoadingState = (state, { isLoading }) => (
  setDeductionPayItemModalState(state, { isLoading })
);

export const setDeductionPayItemModalSubmittingState = (state, { isSubmitting }) => (
  setDeductionPayItemModalState(state, { isSubmitting })
);

export const setDeductionPayItemModalAlert = (state, { alert }) => (
  setDeductionPayItemModalState(state, { alert })
);

const setDeductionPayItemState = (state, deductionPayItem) => ({
  ...state,
  deductionPayItemModal: {
    ...state.deductionPayItemModal,
    deductionPayItem: {
      ...state.deductionPayItemModal.deductionPayItem,
      ...deductionPayItem,
    },
  },
});

export const setDeductionPayItemModalInput = (state, { key, value }) => (
  setDeductionPayItemState(state, { [key]: value })
);

export const formatDeductionPayItemModalAmountInput = (state, { key, value }) => {
  if (key === 'calculationPercentage' || key === 'limitPercentage') {
    const formattedPercentage = getFormattedPercentage(value);
    return setDeductionPayItemState(state, { [key]: formattedPercentage });
  }

  if (key === 'calculationDollars' || key === 'limitDollars') {
    const formattedAmount = getFormattedAmount(value);
    return setDeductionPayItemState(state, { [key]: formattedAmount });
  }

  return state;
};

export const addDeductionPayItemModalItem = (state, { key, item }) => (
  setDeductionPayItemState(state, {
    [key]: [
      ...state.deductionPayItemModal.deductionPayItem[key],
      item,
    ],
  })
);

export const removeDeductionPayItemModalItem = (state, { key, itemId }) => (
  setDeductionPayItemState(state, {
    [key]: state.deductionPayItemModal.deductionPayItem[key].filter(({ id }) => id !== itemId),
  })
);
