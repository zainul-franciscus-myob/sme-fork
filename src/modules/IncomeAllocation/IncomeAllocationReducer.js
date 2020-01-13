import {
  ADD_INCOME_ALLOCATION_LINE,
  DELETE_INCOME_ALLOCATION_LINE,
  FORMAT_INCOME_ALLOCATION_LINE,
  LOAD_INCOME_ALLOCATION,
  SET_ALERT,
  SET_LOADING_STATE,
  UPDATE_ENTITY_TYPE,
  UPDATE_INCOME_ALLOCATION_LINE,
} from './IncomeAllocationIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import LoadingState from '../../components/PageView/LoadingState';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  incomeAllocation: {
    entityType: '',
    lines: [],
  },
  newLine: {
    headerAccountId: '',
    retainedEarningsAccountId: '',
    originalRetainedEarningsAccountId: '',
    currentEarningsAccountId: '',
    originalCurrentEarningsAccountId: '',
    equity: '',
  },
  accounts: [],
  entityTypes: [],
  loadingState: LoadingState.LOADING,
  isSubmitting: false,
  alert: undefined,
  businessId: '',
});

const getIncomeAllocationLines = (lines = []) => lines.map(({
  retainedEarningsAccountId, currentEarningsAccountId, ...line
}) => ({
  retainedEarningsAccountId,
  originalRetainedEarningsAccountId: retainedEarningsAccountId,
  currentEarningsAccountId,
  originalCurrentEarningsAccountId: currentEarningsAccountId,
  ...line,
}));

const loadIncomeAllocation = (state, action) => ({
  ...state,
  incomeAllocation: {
    ...state.incomeAllocation,
    ...action.incomeAllocation,
    lines: getIncomeAllocationLines(action.incomeAllocation.lines),
  },
  entityTypes: action.entityTypes,
  accounts: action.accounts,
});

const resetState = () => ({ ...getDefaultState() });

const formatStringNumber = num => parseFloat(num).toFixed(2).toString();
const formatLine = (state, action) => ({
  ...state,
  incomeAllocation: {
    ...state.incomeAllocation,
    lines: state.incomeAllocation.lines.map(
      ({ equity, ...line }, index) => (
        {
          equity: index === action.index && equity
            ? formatStringNumber(equity) : equity,
          ...line,
        }
      ),
    ),
  },
});

const updateEntityType = (state, action) => ({
  ...state,
  incomeAllocation: {
    ...state.incomeAllocation,
    entityType: action.entityType,
  },
});

const isHeaderAccountLineItem = lineKey => lineKey === 'headerAccountId';

const updateIncomeAllocationLine = (line, { lineKey, lineValue }) => {
  const updatedLine = {
    ...line,
    [lineKey]: lineValue,
  };

  return isHeaderAccountLineItem(lineKey)
    ? {
      ...updatedLine,
      retainedEarningsAccountId: '',
      currentEarningsAccountId: '',
    }
    : updatedLine;
};

const getLinesForUpdate = (action, lines) => lines.map((line, index) => (
  index === action.lineIndex ? updateIncomeAllocationLine(line, action) : line
));

const updateLine = (state, action) => ({
  ...state,
  incomeAllocation: {
    ...state.incomeAllocation,
    lines: getLinesForUpdate(action, state.incomeAllocation.lines),
  },
});

const addLine = (state, action) => ({
  ...state,
  incomeAllocation: {
    ...state.incomeAllocation,
    lines: [
      ...state.incomeAllocation.lines,
      {
        ...state.newLine,
        ...action.line,
      },
    ],
  },
});

const deleteLine = (state, action) => ({
  ...state,
  incomeAllocation: {
    ...state.incomeAllocation,
    lines: state.incomeAllocation.lines.filter((item, index) => index !== action.index),
  },
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [LOAD_INCOME_ALLOCATION]: loadIncomeAllocation,
  [RESET_STATE]: resetState,
  [UPDATE_ENTITY_TYPE]: updateEntityType,
  [UPDATE_INCOME_ALLOCATION_LINE]: updateLine,
  [ADD_INCOME_ALLOCATION_LINE]: addLine,
  [DELETE_INCOME_ALLOCATION_LINE]: deleteLine,
  [FORMAT_INCOME_ALLOCATION_LINE]: formatLine,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [SET_INITIAL_STATE]: setInitialState,
};

const incomeAllocationReducer = createReducer(getDefaultState(), handlers);

export default incomeAllocationReducer;
