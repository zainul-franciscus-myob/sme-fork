import {
  ADD_SPEND_MONEY_LINE,
  CLOSE_MODAL,
  GET_TAX_CALCULATIONS,
  LOAD_ABN_FROM_CONTACT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_NEW_RECURRING_SPEND_MONEY,
  LOAD_RECURRING_SPEND_MONEY,
  OPEN_MODAL,
  REMOVE_SPEND_MONEY_LINE,
  RESET_PAY_TO_CONTACT,
  RESET_TOTALS,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PAY_TO_CONTACT,
  SET_SCHEDULE_OPTIONS,
  SET_SPEND_MONEY_OPTIONS,
  SET_SUBMITTING_STATE,
  UPDATE_SPEND_MONEY_LINE,
} from './RecurringSpendMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getBankStatementText,
  getElectronicClearingAccountId,
  getScheduleRemainingTimes,
} from './RecurringSpendMoneySelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  recurringTransactionId: '',
  alert: undefined,
  modal: undefined,
  title: '',
  transactionType: '',
  schedule: {
    name: '',
    frequency: '',
    recurrence: '',
    isAutomaticallyRecorded: false,
    nextDueDate: formatIsoDate(new Date()),
    secondDueDate: '',
    endDate: '',
    numberOfTimes: '',
    remainingTimes: '',
    shouldNotifyUser: false,
    notifyUserId: '',
    shouldUseCustomNumber: false,
    customNumber: '',
  },
  spendMoney: {
    isTaxInclusive: false,
    description: '',
    payFromAccountId: '',
    payToContactId: '',
    isReportable: undefined,
    lines: [],
    bankStatementText: '',
  },
  newLine: {
    accountId: '',
    amount: '',
    quantity: '',
    description: '',
    taxCodeId: '',
    taxAmount: '',
    jobId: '',
  },
  payFromAccountOptions: [],
  accountOptions: [],
  taxCodeOptions: [],
  totals: {
    subTotal: '$0.00',
    totalTax: '$0.00',
    totalAmount: '$0.00',
  },
  electronicClearingAccountId: '',
  contact: undefined,
  abn: undefined,
  isLoading: LoadingState,
  isSubmitting: false,
  isAbnLoading: false,
  isPageEdited: false,
  isRecurringTransactionEnabled: false,
});

const pageEdited = { isPageEdited: true };

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const closeModal = (state) => ({
  ...state,
  modal: undefined,
});

const loadNewRecurringSpendMoney = (state, action) => ({
  ...state,
  ...action,
  schedule: {
    ...state.schedule,
    ...action.schedule,
  },
  spendMoney: {
    ...state.spendMoney,
    ...action.spendMoney,
  },
  accountOptions: action.accountOptions,
  taxCodeOptions: action.taxCodeOptions,
  newLine: {
    ...state.newLine,
    ...action.newLine,
  },
  isLoading: false,
});

const loadRecurringSpendMoney = (state, action) => ({
  ...state,
  ...action,
  schedule: {
    ...state.schedule,
    ...action.schedule,
  },
  spendMoney: {
    ...state.spendMoney,
    ...action.spendMoney,
  },
  newLine: {
    ...state.newLine,
    ...action.newLine,
  },
  isLoading: false,
});

const setScheduleOptions = (state, { key, value }) => {
  const remainingTimes =
    key === 'numberOfTimes' ? value : getScheduleRemainingTimes(state);

  return {
    ...state,
    schedule: {
      ...state.schedule,
      [key]: value,
      remainingTimes,
    },
    isPageEdited: true,
  };
};

const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const setSpendMoneyOptions = (state, { key, value }) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    bankStatementText:
      key === 'payFromAccountId' &&
      value !== getElectronicClearingAccountId(state)
        ? ''
        : getBankStatementText(state),
    [key]: value,
  },
});

const addSpendMoneyLine = (state, action) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    lines: [
      ...state.spendMoney.lines,
      {
        ...state.newLine,
        ...action.line,
        taxCodeId: getDefaultTaxCodeId({
          accountId: action.line.accountId,
          accountOptions: state.accountOptions,
        }),
      },
    ],
  },
});

const updateSpendMoneyLine = (state, action) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    lines: state.spendMoney.lines.map((line, index) => {
      const { lineIndex, lineKey, lineValue } = action;

      if (index === lineIndex) {
        const isUpdateAccount = lineKey === 'accountId';

        const updatedLine = {
          ...line,
          taxCodeId: isUpdateAccount
            ? getDefaultTaxCodeId({
                accountId: lineValue,
                accountOptions: state.accountOptions,
              })
            : line.taxCodeId,
          [lineKey]: lineValue,
        };
        return updatedLine;
      }

      return line;
    }),
  },
});

const removeSpendMoneyLine = (state, action) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    lines: state.spendMoney.lines.filter(
      (item, index) => index !== action.index
    ),
  },
});

const getTaxCalculations = (state, { taxCalculations: { lines, totals } }) => ({
  ...state,
  isPageEdited: true,
  spendMoney: {
    ...state.spendMoney,
    lines: state.spendMoney.lines.map((line, index) => {
      const { amount } = lines[index];
      return {
        ...line,
        amount: amount.valueOf(),
      };
    }),
  },
  totals: {
    ...state.totals,
    subTotal: formatCurrency(totals.subTotal.valueOf()),
    totalTax: formatCurrency(totals.totalTax.valueOf()),
    totalAmount: formatCurrency(totals.totalAmount.valueOf()),
  },
});

const resetTotals = (state) => ({
  ...state,
  totals: getDefaultState().totals,
});

const setPayToContact = (state, { contact }) => {
  const { id = '', contactType = '', isReportable = false } = contact || {};

  return {
    ...state,
    spendMoney: {
      ...state.spendMoney,
      payToContactId: id,
      isReportable: contactType === 'Supplier' ? isReportable : false,
    },
    contact,
    abn: undefined,
  };
};

const resetPayToContact = (state) => ({
  ...state,
  abn: undefined,
});

const loadAbnFromContact = (state, action) => ({
  ...state,
  abn: action.abn,
});

const setAbnLoadingState = (state, action) => ({
  ...state,
  isAbnLoading: action.isAbnLoading,
});

const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accountOptions: [account, ...state.accountOptions],
  isPageEdited: true,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,

  [LOAD_NEW_RECURRING_SPEND_MONEY]: loadNewRecurringSpendMoney,
  [LOAD_RECURRING_SPEND_MONEY]: loadRecurringSpendMoney,

  [SET_SCHEDULE_OPTIONS]: setScheduleOptions,
  [SET_SPEND_MONEY_OPTIONS]: setSpendMoneyOptions,
  [ADD_SPEND_MONEY_LINE]: addSpendMoneyLine,
  [UPDATE_SPEND_MONEY_LINE]: updateSpendMoneyLine,
  [REMOVE_SPEND_MONEY_LINE]: removeSpendMoneyLine,
  [GET_TAX_CALCULATIONS]: getTaxCalculations,
  [RESET_TOTALS]: resetTotals,

  [SET_PAY_TO_CONTACT]: setPayToContact,
  [RESET_PAY_TO_CONTACT]: resetPayToContact,
  [LOAD_ABN_FROM_CONTACT]: loadAbnFromContact,
  [SET_ABN_LOADING_STATE]: setAbnLoadingState,

  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
};

const spendMoneyReducer = createReducer(getDefaultState(), handlers);

export default spendMoneyReducer;
