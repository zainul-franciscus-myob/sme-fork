import {
  ADD_BILL_SERVICE_LINE,
  FORMAT_BILL_SERVICE_LINE,
  GET_CALCULATED_BILL_DETAIL_TOTALS,
  REMOVE_BILL_SERVICE_LINE,
  RESET_TOTALS,
  UPDATE_BILL_SERVICE_HEADER_OPTIONS,
  UPDATE_BILL_SERVICE_LINE,
} from './BillServiceIntents';
import {
  CLOSE_MODAL,
  LOAD_SUPPLIER_ADDRESS,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_SUBMITTING_STATE,
} from '../../BillIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';

const createBillServiceDispatcher = store => ({
  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({
      intent,
    });
  },

  setInitialState: (context, payload) => {
    const intent = SET_INITIAL_STATE;

    store.dispatch({
      intent,
      context,
      ...payload,
    });
  },

  displayAlert: errorMessage => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  }),

  dismissAlert: () => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  }),

  setSubmittingState: isSubmitting => store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  }),

  closeModal: () => store.dispatch({
    intent: CLOSE_MODAL,
  }),

  openModal: modalType => store.dispatch({
    intent: OPEN_MODAL,
    modalType,
  }),

  addTableLine: line => store.dispatch({
    intent: ADD_BILL_SERVICE_LINE,
    line,
  }),

  updateTableLine: ({ index, key, value }) => store.dispatch({
    intent: UPDATE_BILL_SERVICE_LINE,
    index,
    key,
    value,
  }),

  formatLine: index => store.dispatch({
    intent: FORMAT_BILL_SERVICE_LINE,
    index,
  }),

  removeTableLine: index => store.dispatch({
    intent: REMOVE_BILL_SERVICE_LINE,
    index,
  }),

  updateHeaderOptions: ({ key, value }) => store.dispatch({
    intent: UPDATE_BILL_SERVICE_HEADER_OPTIONS,
    key,
    value,
  }),

  loadSupplierAddress: address => store.dispatch({
    intent: LOAD_SUPPLIER_ADDRESS,
    address,
  }),

  resetTotals: () => store.dispatch({ intent: RESET_TOTALS }),

  getCalculatedBillTotals: totals => store.dispatch({
    intent: GET_CALCULATED_BILL_DETAIL_TOTALS,
    totals,
  }),
});

export default createBillServiceDispatcher;
