import {
  ADD_LINE,
  CLOSE_MODAL,
  FORMAT_LINE_AMOUNT,
  OPEN_MODAL,
  PREFILL_NEW_BILL_ITEM_FROM_IN_TRAY,
  PREFILL_NEW_BILL_ITEM_FROM_IN_TRAY_ON_SUPPLIER_SELECT,
  REMOVE_LINE,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_ARE_LINES_CALCULATING,
  SET_LINE_AMOUNT_DIRTY,
  SET_SUBMITTING_STATE,
  TABLE_ROW_CHANGE,
  UPDATE_BILL_OPTION,
  UPDATE_LINES,
} from './BillItemIntents';
import {
  LOAD_SUPPLIER_ADDRESS,
} from '../../BillIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';

const createBillItemDispatcher = store => ({
  setInitialState: context => store.dispatch({
    intent: SET_INITIAL_STATE,
    context,
  }),

  resetState: () => store.dispatch({
    intent: RESET_STATE,
  }),

  openModal: modalType => store.dispatch({
    intent: OPEN_MODAL,
    modalType,
  }),

  closeModal: () => store.dispatch({
    intent: CLOSE_MODAL,
  }),

  setSubmittingState: isSubmitting => store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  }),

  setLineAmountDirty: isLineAmountDirty => store.dispatch({
    intent: SET_LINE_AMOUNT_DIRTY,
    isLineAmountDirty,
  }),

  setAreLinesCalculating: areLinesCalculating => store.dispatch({
    intent: SET_ARE_LINES_CALCULATING,
    areLinesCalculating,
  }),

  displayAlert: errorMessage => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  }),

  dismissAlert: () => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  }),

  loadSupplierAddress: address => store.dispatch({
    intent: LOAD_SUPPLIER_ADDRESS,
    address,
  }),

  prefillDataFromInTray: response => store.dispatch({
    intent: PREFILL_NEW_BILL_ITEM_FROM_IN_TRAY,
    ...response,
  }),

  prefillDataFromInTrayOnSupplierSelect: () => store.dispatch({
    intent: PREFILL_NEW_BILL_ITEM_FROM_IN_TRAY_ON_SUPPLIER_SELECT,
  }),

  updateBillOption: ({ key, value }) => store.dispatch({
    intent: UPDATE_BILL_OPTION,
    key,
    value,
  }),

  addTableLine: line => store.dispatch({
    intent: ADD_LINE,
    line,
  }),

  updateLines: response => store.dispatch({
    intent: UPDATE_LINES,
    ...response,
  }),

  changeTableRow: (index, key, value) => store.dispatch({
    intent: TABLE_ROW_CHANGE,
    index,
    key,
    value,
  }),

  removeTableRow: index => store.dispatch({
    intent: REMOVE_LINE,
    index,
  }),

  resetTotals: () => store.dispatch({
    intent: RESET_TOTALS,
  }),

  formatLineAmount: (index, key) => store.dispatch({
    intent: FORMAT_LINE_AMOUNT,
    index,
    key,
  }),
});

export default createBillItemDispatcher;
