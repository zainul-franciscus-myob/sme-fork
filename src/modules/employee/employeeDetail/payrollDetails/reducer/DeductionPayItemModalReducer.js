import {
  ADD_DEDUCTION_PAY_ITEM_MODAL_ITEM,
  CLOSE_DEDUCTION_PAY_ITEM_MODAL,
  CREATE_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_DEDUCTION_PAY_ITEM_MODAL,
  OPEN_DEDUCTION_PAY_ITEM_MODAL,
  REMOVE_DEDUCTION_PAY_ITEM_MODAL_ITEM,
  SET_DEDUCTION_PAY_ITEM_MODAL_ALERT,
  SET_DEDUCTION_PAY_ITEM_MODAL_INPUT,
  SET_DEDUCTION_PAY_ITEM_MODAL_LOADING_STATE,
  SET_DEDUCTION_PAY_ITEM_MODAL_SUBMITTING_STATE,
  UPDATE_DEDUCTION_PAY_ITEM_MODAL,
} from '../../../EmployeeIntents';
import { getDeductionPayItems } from '../selectors/PayrollDeductionDetailSelectors';

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

const loadDeductionPayItemModal = (state, { response }) => ({
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

const createDeductionPayItemModal = (state, {
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

const updateDeductionPayItemModal = (state, {
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

const openDeductionPayItemModal = (state, { id }) => {
  const deductionPayItemModalDefaultState = getDeductionPayItemModalDefaultState();

  return {
    ...state,
    deductionPayItemModal: {
      ...deductionPayItemModalDefaultState,
      id,
    },
  };
};

const closeDeductionPayItemModal = state => ({
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

const setDeductionPayItemModalLoadingState = (state, { isLoading }) => (
  setDeductionPayItemModalState(state, { isLoading })
);

const setDeductionPayItemModalSubmittingState = (state, { isSubmitting }) => (
  setDeductionPayItemModalState(state, { isSubmitting })
);

const setDeductionPayItemModalAlert = (state, { alert }) => (
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

const setDeductionPayItemModalInput = (state, { key, value }) => (
  setDeductionPayItemState(state, { [key]: value })
);

const addDeductionPayItemModalItem = (state, { key, item }) => (
  setDeductionPayItemState(state, {
    [key]: [
      ...state.deductionPayItemModal.deductionPayItem[key],
      item,
    ],
  })
);

const removeDeductionPayItemModalItem = (state, { key, itemId }) => (
  setDeductionPayItemState(state, {
    [key]: state.deductionPayItemModal.deductionPayItem[key].filter(({ id }) => id !== itemId),
  })
);

export default {
  [ADD_DEDUCTION_PAY_ITEM_MODAL_ITEM]: addDeductionPayItemModalItem,
  [CLOSE_DEDUCTION_PAY_ITEM_MODAL]: closeDeductionPayItemModal,
  [CREATE_DEDUCTION_PAY_ITEM_MODAL]: createDeductionPayItemModal,
  [LOAD_DEDUCTION_PAY_ITEM_MODAL]: loadDeductionPayItemModal,
  [OPEN_DEDUCTION_PAY_ITEM_MODAL]: openDeductionPayItemModal,
  [REMOVE_DEDUCTION_PAY_ITEM_MODAL_ITEM]: removeDeductionPayItemModalItem,
  [SET_DEDUCTION_PAY_ITEM_MODAL_ALERT]: setDeductionPayItemModalAlert,
  [SET_DEDUCTION_PAY_ITEM_MODAL_INPUT]: setDeductionPayItemModalInput,
  [SET_DEDUCTION_PAY_ITEM_MODAL_LOADING_STATE]: setDeductionPayItemModalLoadingState,
  [SET_DEDUCTION_PAY_ITEM_MODAL_SUBMITTING_STATE]: setDeductionPayItemModalSubmittingState,
  [UPDATE_DEDUCTION_PAY_ITEM_MODAL]: updateDeductionPayItemModal,
};
