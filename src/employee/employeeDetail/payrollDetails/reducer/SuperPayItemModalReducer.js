import {
  ADD_SUPER_PAY_ITEM_MODAL_ITEM,
  CLOSE_SUPER_PAY_ITEM_MODAL,
  CREATE_SUPER_PAY_ITEM_MODAL,
  LOAD_SUPER_PAY_ITEM_MODAL,
  OPEN_SUPER_PAY_ITEM_MODAL,
  REMOVE_SUPER_PAY_ITEM_MODAL_ITEM,
  SET_SUPER_PAY_ITEM_MODAL_ALERT,
  SET_SUPER_PAY_ITEM_MODAL_INPUT,
  SET_SUPER_PAY_ITEM_MODAL_LOADING_STATE,
  SET_SUPER_PAY_ITEM_MODAL_SUBMITTING_STATE,
  SET_SUPER_PAY_ITEM_MODAL_SUPER_PAY_ITEM,
  UPDATE_SUPER_PAY_ITEM_MODAL,
} from '../../../EmployeeIntents';
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

const openSuperPayItemModal = (state, { id }) => {
  const superPayItemModalDefaultState = getSuperPayItemModalDefaultState();

  return {
    ...state,
    superPayItemModal: {
      ...superPayItemModalDefaultState,
      id,
    },
  };
};

const closeSuperPayItemModal = state => ({
  ...state,
  superPayItemModal: undefined,
});

const loadSuperPayItemModal = (state, { response }) => {
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

const createSuperPayItemModal = (state, {
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

const updateSuperPayItemModal = (state, {
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

const setSuperPayItemModalAlert = (state, { alert }) => (
  setSuperPayItemModalState(state, { alert })
);

const setSuperPayItemModalLoadingState = (state, { isLoading }) => (
  setSuperPayItemModalState(state, { isLoading })
);

const setSuperPayItemModalSubmittingState = (state, { isSubmitting }) => (
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

const setSuperPayItemModalSuperPayItem = (state, { superPayItem }) => (
  setSuperPayItemState(state, superPayItem));

const setSuperPayItemModalInput = (state, action) => {
  const partialSuperPayItem = { [action.key]: action.value };

  return setSuperPayItemState(state, partialSuperPayItem);
};

const addSuperPayItemModalItem = (state, { key, item }) => (
  setSuperPayItemState(state, {
    [key]: [
      ...state.superPayItemModal.superPayItem[key],
      item,
    ],
  })
);

const removeSuperPayItemModalItem = (state, { key, itemId }) => (
  setSuperPayItemState(state, {
    [key]: state.superPayItemModal.superPayItem[key].filter(({ id }) => id !== itemId),
  })
);

export default {
  [OPEN_SUPER_PAY_ITEM_MODAL]: openSuperPayItemModal,
  [CLOSE_SUPER_PAY_ITEM_MODAL]: closeSuperPayItemModal,
  [LOAD_SUPER_PAY_ITEM_MODAL]: loadSuperPayItemModal,
  [CREATE_SUPER_PAY_ITEM_MODAL]: createSuperPayItemModal,
  [UPDATE_SUPER_PAY_ITEM_MODAL]: updateSuperPayItemModal,
  [SET_SUPER_PAY_ITEM_MODAL_ALERT]: setSuperPayItemModalAlert,
  [SET_SUPER_PAY_ITEM_MODAL_LOADING_STATE]: setSuperPayItemModalLoadingState,
  [SET_SUPER_PAY_ITEM_MODAL_SUBMITTING_STATE]: setSuperPayItemModalSubmittingState,
  [SET_SUPER_PAY_ITEM_MODAL_SUPER_PAY_ITEM]: setSuperPayItemModalSuperPayItem,
  [SET_SUPER_PAY_ITEM_MODAL_INPUT]: setSuperPayItemModalInput,
  [ADD_SUPER_PAY_ITEM_MODAL_ITEM]: addSuperPayItemModalItem,
  [REMOVE_SUPER_PAY_ITEM_MODAL_ITEM]: removeSuperPayItemModalItem,
};
