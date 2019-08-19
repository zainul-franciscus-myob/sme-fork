import { getAllocatedPayItems } from '../selectors/PayrollSuperSelectors';

const getSuperPayItemModalDefaultState = () => ({
  id: '',
  isLoading: false,
  isSubmitting: false,
  alert: undefined,
  title: '',
  superPayItem: {
    name: '',
    contributionType: '',
    expenseAccountId: '',
    payableAccountId: '',
    atoReportingCategory: '',
    printOnPayAdvice: false,
    calculationBasisType: '',
    calculationBasisPercentage: '',
    calculationBasisPayItemId: '',
    calculationBasisPayItemType: '',
    calculationBasisAmount: '',
    calculationBasisPeriod: '',
    exclusion: '',
    limitType: '',
    limitPercentage: '',
    limitPayItemId: '',
    limitPayItemType: '',
    limitAmount: '',
    limitPeriod: '',
    threshold: '',
    exemptions: [],
    employees: [],
  },
  grossWagesId: '',
  federalWagesId: '',
  contributionTypeOptions: [],
  expenseAccountOptions: [],
  payableAccountOptions: [],
  atoReportingCategoryOptions: [],
  calculationBasisTypeOptions: [],
  limitTypeOptions: [],
  periodOptions: [],
  employeeOptions: [],
  calculationBasisDeductionPayItemOptions: [],
  calculationBasisExpensePayItemOptions: [],
  limitDeductionPayItemOptions: [],
  limitExpensePayItemOptions: [],
  exemptionPayItemOptions: [],
});

export const openSuperPayItemModal = (state, { id }) => {
  const superPayItemModalDefaultState = getSuperPayItemModalDefaultState();

  return {
    ...state,
    superPayItemModal: {
      ...superPayItemModalDefaultState,
      id,
    },
  };
};

export const closeSuperPayItemModal = state => ({
  ...state,
  superPayItemModal: undefined,
});

export const loadSuperPayItemModal = (state, { response }) => {
  const { superPayItem, ...res } = response;

  return {
    ...state,
    superPayItemModal: {
      ...state.superPayItemModal,
      ...res,
      superPayItem: {
        ...state.superPayItemModal.superPayItem,
        ...superPayItem,
      },
    },
  };
};

export const createSuperPayItemModal = (state, {
  response: { allocatedPayItem, superPayItemOptions },
}) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    superannuationDetails: {
      ...state.payrollDetails.superannuationDetails,
      allocatedPayItems: [
        ...state.payrollDetails.superannuationDetails.allocatedPayItems,
        allocatedPayItem,
      ],
    },
  },
  isPageEdited: true,
  superPayItemOptions,
});

export const updateSuperPayItemModal = (state, {
  response: { allocatedPayItem, superPayItemOptions },
}) => {
  const allocatedPayItems = getAllocatedPayItems(state);
  const updatedAllocatedPayItems = allocatedPayItems
    .map(payItem => (payItem.id === allocatedPayItem.id ? allocatedPayItem : payItem));

  return {
    ...state,
    payrollDetails: {
      ...state.payrollDetails,
      superannuationDetails: {
        ...state.payrollDetails.superannuationDetails,
        allocatedPayItems: updatedAllocatedPayItems,
      },
    },
    superPayItemOptions,
  };
};

const setSuperPayItemModalState = (state, modal) => ({
  ...state,
  superPayItemModal: {
    ...state.superPayItemModal,
    ...modal,
  },
});

export const setSuperPayItemModalAlert = (state, { alert }) => (
  setSuperPayItemModalState(state, { alert })
);

export const setSuperPayItemModalLoadingState = (state, { isLoading }) => (
  setSuperPayItemModalState(state, { isLoading })
);

export const setSuperPayItemModalSubmittingState = (state, { isSubmitting }) => (
  setSuperPayItemModalState(state, { isSubmitting })
);

const setSuperPayItemState = (state, partialSuperPayItem) => ({
  ...state,
  superPayItemModal: {
    ...state.superPayItemModal,
    superPayItem: {
      ...state.superPayItemModal.superPayItem,
      ...partialSuperPayItem,
    },
  },
});

export const setSuperPayItemModalSuperPayItem = (state, { superPayItem }) => (
  setSuperPayItemState(state, superPayItem));

export const setSuperPayItemModalInput = (state, action) => {
  const partialSuperPayItem = { [action.key]: action.value };

  return setSuperPayItemState(state, partialSuperPayItem);
};

export const addSuperPayItemModalItem = (state, { key, item }) => (
  setSuperPayItemState(state, {
    [key]: [
      ...state.superPayItemModal.superPayItem[key],
      item,
    ],
  })
);

export const removeSuperPayItemModalItem = (state, { key, itemId }) => (
  setSuperPayItemState(state, {
    [key]: state.superPayItemModal.superPayItem[key].filter(({ id }) => id !== itemId),
  })
);
