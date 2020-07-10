import {
  ADD_LEAVE_PAY_ITEM_MODAL_EMPLOYEE,
  ADD_LEAVE_PAY_ITEM_MODAL_EXEMPTION,
  ADD_LEAVE_PAY_ITEM_MODAL_LINKED_WAGE,
  CLOSE_LEAVE_PAY_ITEM_MODAL,
  CREATE_LEAVE_PAY_ITEM,
  LOAD_LEAVE_PAY_ITEM,
  OPEN_LEAVE_PAY_ITEM_MODAL,
  REMOVE_LEAVE_PAY_ITEM_MODAL_EMPLOYEE,
  REMOVE_LEAVE_PAY_ITEM_MODAL_EXEMPTION,
  REMOVE_LEAVE_PAY_ITEM_MODAL_LINKED_WAGE,
  SET_LEAVE_PAY_ITEM_MODAL_ALERT,
  SET_LEAVE_PAY_ITEM_MODAL_LOADING_STATE,
  SET_LEAVE_PAY_ITEM_MODAL_SUBMITTING_STATE,
  UPDATE_LEAVE_PAY_ITEM,
  UPDATE_LEAVE_PAY_ITEM_MODAL_CALCULATION_BASIS,
  UPDATE_LEAVE_PAY_ITEM_MODAL_NAME,
} from '../../../EmployeeIntents';
import {
  getAllLeavePayItems,
  getAllocatedLeavePayItems,
} from '../selectors/PayrollLeaveDetailSelectors';
import { getCarryRemainingLeave } from '../selectors/LeavePayItemModalSelectors';

export const getLeavePayItemModalDefaultState = () => ({
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

const openLeavePayItemModal = (state, { leavePayItemId }) => ({
  ...state,
  leavePayItemModal: {
    ...getLeavePayItemModalDefaultState(),
    leavePayItemId,
  },
});

const closeLeavePayItemModal = (state) => ({
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

const setLeavePayItemModalAlert = (state, { alert }) =>
  setLeavePayItemModalState(state, { alert });

const setLeavePayItemModalLoadingState = (state, { isLoading }) =>
  setLeavePayItemModalState(state, { isLoading });

const setLeavePayItemModalSubmittingState = (state, { isSubmitting }) =>
  setLeavePayItemModalState(state, { isSubmitting });

const loadLeavePayItem = (state, { response }) => {
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

const addLeavePayItemModalEmployee = (state, action) =>
  setLeavePayItemState(state, {
    selectedEmployees: [
      ...state.leavePayItemModal.leavePayItem.selectedEmployees,
      {
        name: action.name,
        id: action.id,
      },
    ],
  });

const removeLeavePayItemModalEmployee = (state, action) =>
  setLeavePayItemState(state, {
    selectedEmployees: state.leavePayItemModal.leavePayItem.selectedEmployees.filter(
      (selectedEmployee) => selectedEmployee.id !== action.id
    ),
  });

const addLeavePayItemModalExemption = (state, action) =>
  setLeavePayItemState(state, {
    selectedExemptions: [
      ...state.leavePayItemModal.leavePayItem.selectedExemptions,
      state.leavePayItemModal.exemptionOptions.find(
        ({ id }) => id === action.id
      ),
    ],
  });

const removeLeavePayItemModalExemption = (state, action) =>
  setLeavePayItemState(state, {
    selectedExemptions: state.leavePayItemModal.leavePayItem.selectedExemptions.filter(
      (selectedExemption) => selectedExemption.id !== action.id
    ),
  });

const addLeavePayItemModalLinkedWage = (state, action) =>
  setLeavePayItemState(state, {
    selectedLinkedWages: [
      ...state.leavePayItemModal.leavePayItem.selectedLinkedWages,
      state.leavePayItemModal.linkedWagesOptions.find(
        ({ id }) => id === action.id
      ),
    ],
  });

const removeLeavePayItemModalLinkedWage = (state, action) =>
  setLeavePayItemState(state, {
    selectedLinkedWages: state.leavePayItemModal.leavePayItem.selectedLinkedWages.filter(
      (selectedLinkedWage) => selectedLinkedWage.id !== action.id
    ),
  });

const updateLeavePayItemModalName = (state, action) =>
  setLeavePayItemState(state, { name: action.value });

const updateLeavePayItemModalCalculationBasis = (state, action) =>
  setLeavePayItemState(state, { [action.key]: action.value });

const updateLeavePayItem = (state, { leavePayItem, leavePayItemOptions }) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    leaveDetails: {
      ...state.payrollDetails.leaveDetails,
      allocatedLeavePayItems: getAllocatedLeavePayItems(state).map((item) =>
        item.payItemId === leavePayItem.payItemId
          ? { ...item, ...leavePayItem }
          : item
      ),
    },
  },
  leavePayItemOptions,
});

const createLeavePayItem = (state, payload) => {
  const { leavePayItem, leavePayItemOptions } = payload;
  const newLeavePayItem = {
    ...leavePayItem,
    balanceAdjustment: '0',
    carryOver: '0',
    yearToDate: '0',
  };

  newLeavePayItem.carryLeaveOverToNextYear =
    newLeavePayItem.carryLeaveOverToNextYear ?? getCarryRemainingLeave(state);

  return {
    ...state,
    payrollDetails: {
      ...state.payrollDetails,
      leaveDetails: {
        ...state.payrollDetails.leaveDetails,
        allocatedLeavePayItems: [
          ...getAllocatedLeavePayItems(state),
          { ...newLeavePayItem },
        ],
        allLeavePayItems: [
          ...getAllLeavePayItems(state),
          { ...newLeavePayItem },
        ],
      },
    },
    isPageEdited: true,
    leavePayItemOptions,
  };
};

export default {
  [SET_LEAVE_PAY_ITEM_MODAL_ALERT]: setLeavePayItemModalAlert,
  [OPEN_LEAVE_PAY_ITEM_MODAL]: openLeavePayItemModal,
  [CLOSE_LEAVE_PAY_ITEM_MODAL]: closeLeavePayItemModal,
  [SET_LEAVE_PAY_ITEM_MODAL_LOADING_STATE]: setLeavePayItemModalLoadingState,
  [SET_LEAVE_PAY_ITEM_MODAL_SUBMITTING_STATE]: setLeavePayItemModalSubmittingState,
  [LOAD_LEAVE_PAY_ITEM]: loadLeavePayItem,
  [UPDATE_LEAVE_PAY_ITEM]: updateLeavePayItem,
  [CREATE_LEAVE_PAY_ITEM]: createLeavePayItem,
  [ADD_LEAVE_PAY_ITEM_MODAL_EMPLOYEE]: addLeavePayItemModalEmployee,
  [ADD_LEAVE_PAY_ITEM_MODAL_EXEMPTION]: addLeavePayItemModalExemption,
  [ADD_LEAVE_PAY_ITEM_MODAL_LINKED_WAGE]: addLeavePayItemModalLinkedWage,
  [REMOVE_LEAVE_PAY_ITEM_MODAL_EMPLOYEE]: removeLeavePayItemModalEmployee,
  [REMOVE_LEAVE_PAY_ITEM_MODAL_EXEMPTION]: removeLeavePayItemModalExemption,
  [REMOVE_LEAVE_PAY_ITEM_MODAL_LINKED_WAGE]: removeLeavePayItemModalLinkedWage,
  [UPDATE_LEAVE_PAY_ITEM_MODAL_NAME]: updateLeavePayItemModalName,
  [UPDATE_LEAVE_PAY_ITEM_MODAL_CALCULATION_BASIS]: updateLeavePayItemModalCalculationBasis,
};
