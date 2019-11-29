import {
  ADD_TABLE_ROW,
  CHANGE_TABLE_ROW,
  CLOSE_MODAL,
  FORMAT_AMOUNT,
  LOAD_BANKING_RULE_SPEND_MONEY,
  LOAD_NEW_BANKING_RULE_SPEND_MONEY,
  OPEN_MODAL,
  REMOVE_TABLE_ROW,
  SET_ALERT_MESSAGE,
  SET_IS_PAGE_EDITED,
  SET_LOADING_STATE,
  UPDATE_FORM,
} from './BankingRuleSpendMoneyIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import {
  allocationTypeOptions,
} from './AllocationTypes';
import createReducer from '../../store/createReducer';
import formatNumberWithDecimalScaleRange from '../../common/valueFormatters/formatNumberWithDecimalScaleRange';

const getDefaultState = () => ({
  businessId: '',
  bankingRuleId: '',
  region: '',
  name: '',
  title: '',
  isInactiveRule: false,
  applyToAllAccounts: '',
  transactionDescription: '',
  accountId: '',
  contactId: '',
  allocationType: '',
  allocations: [],
  conditions: {
    containsWords: {
      id: undefined,
      value: '',
    },
    exactWords: {
      id: undefined,
      value: '',
    },
    equalAmounts: {
      id: undefined,
      value: '',
    },
  },
  allocationAccounts: [],
  bankAccounts: [],
  contacts: [],
  taxCodes: [],
  newAllocationLine: {
    accountId: '',
    value: '',
    taxCodeId: '',
  },
  isLoading: false,
  isPageEdited: false,
  alertMessage: '',
  modal: undefined,
  isPaymentReportable: undefined,
});
const resetState = () => (getDefaultState());

const setInitalState = (state, action) => ({
  ...getDefaultState(),
  businessId: action.context.businessId,
  bankingRuleId: action.context.bankingRuleId,
  region: action.context.region,
});

const loadBankingRuleSpendMoney = (state, action) => ({
  ...state,
  ...action.bankingRule,
});

const findTaxCodeIdByAccountId = (state, accountId) => state.allocationAccounts
  .find(account => account.id === accountId)
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

const addRowForPercentage = (state, partialRow) => addAllocation({
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

  return (state.allocationType === allocationTypeOptions.percent)
    ? addRowForPercentage(state, partialRow)
    : addRowForAmount(state, partialRow);
};

const changeTableRow = (state, action) => ({
  ...state,
  allocations: state.allocations.map((line, index) => {
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
});

const removeRowForPercentage = (state, allocations) => ({
  ...state,
  allocations: allocations.map((allocation, index) => (
    index === allocations.length - 1
      ? {
        ...allocation,
        value: allocations.length === 1 ? '100.00' : allocation.value,
      }
      : allocation)),
});

const removeRowForAmount = (state, allocations) => ({
  ...state,
  allocations: allocations.map((allocation, index) => (
    index === allocations.length - 1
      ? {
        ...allocation,
        value: allocations.length === 1 ? 'Full amount' : 'Remainder',
      }
      : allocation)),
});

const removeTableRow = (state, action) => {
  const updatedAllocations = state.allocations.filter((_, index) => index !== action.index);

  const updatedState = (state.allocationType === allocationTypeOptions.percent)
    ? removeRowForPercentage(state, updatedAllocations)
    : removeRowForAmount(state, updatedAllocations);

  return {
    ...updatedState,
  };
};

const formatAmount = (state, { index }) => {
  const updatedAllocations = state.allocations.map((row, rowIndex) => {
    const value = Number(row.value) || 0;
    return rowIndex === index ? {
      ...row,
      value: value ? formatNumberWithDecimalScaleRange(value, 2, 6) : '',
    } : row;
  });

  return {
    ...state,
    allocations: updatedAllocations,
  };
};

const isCondition = key => ['exactWords', 'containsWords', 'equalAmounts'].includes(key);
const isContact = key => key === 'contactId';
const updateContactId = (state, action) => {
  const contact = state.contacts.find(({ id }) => id === action.value);

  return {
    ...state,
    contactId: contact.id,
    isPaymentReportable: contact.isPaymentReportable,
  };
};
const updateForm = (state, action) => {
  if (isCondition(action.key)) {
    return {
      ...state,
      conditions: {
        ...state.conditions,
        [action.key]: {
          ...state.conditions[action.key],
          value: action.value,
        },
      },
    };
  }

  if (action.key === 'allocationType') {
    return {
      ...state,
      [action.key]: action.value,
      allocations: [],
    };
  }

  if (isContact(action.key)) {
    return updateContactId(state, action);
  }

  return {
    ...state,
    [action.key]: action.value,
  };
};

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const closeModal = state => ({
  ...state,
  modal: undefined,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const setIsPagedEdited = state => ({
  ...state,
  isPageEdited: true,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitalState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [CLOSE_MODAL]: closeModal,
  [OPEN_MODAL]: openModal,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [SET_IS_PAGE_EDITED]: setIsPagedEdited,
  [LOAD_NEW_BANKING_RULE_SPEND_MONEY]: loadBankingRuleSpendMoney,
  [LOAD_BANKING_RULE_SPEND_MONEY]: loadBankingRuleSpendMoney,
  [ADD_TABLE_ROW]: addTableRow,
  [CHANGE_TABLE_ROW]: changeTableRow,
  [REMOVE_TABLE_ROW]: removeTableRow,
  [FORMAT_AMOUNT]: formatAmount,
  [UPDATE_FORM]: updateForm,
};

const bankingRuleSpendMoneyReducer = createReducer(getDefaultState(), handlers);

export default bankingRuleSpendMoneyReducer;
