import {
  LOAD_INVOICE_LIST,
  LOAD_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../InvoiceIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getAppliedFilterOptions } from '../../linkBill/LinkBillSelectors';
import { getFilterOptions } from './invoiceListSelectors';

const createInvoiceListDispatcher = store => ({
  setInitialState: (context, settings) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
      settings,
    });
  },
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  updateFilterOptions: ({ filterName, value }) => {
    store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
  },
  setSortOrder: ({ orderBy, newSortOrder }) => {
    store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  },
  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({
      intent,
      loadingState,
    });
  },
  setTableLoadingState: (isLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    store.dispatch({
      intent,
      isLoading,
    });
  },
  setAlert: ({ message, type }) => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  },
  dismissAlert: () => store.dispatch({ intent: SET_ALERT }),
  setNextPageLoadingState: (isNextPageLoading) => {
    const intent = SET_NEXT_PAGE_LOADING_STATE;
    store.dispatch({
      intent,
      isNextPageLoading,
    });
  },
  loadInvoiceList: (response) => {
    store.dispatch({
      intent: LOAD_INVOICE_LIST,
      ...response,
    });
  },
  sortInvoiceList: ({
    entries, total, totalDue, totalOverdue, pagination,
  }) => {
    const filterOptions = getAppliedFilterOptions(store.getState());
    store.dispatch({
      intent: SORT_AND_FILTER_INVOICE_LIST,
      entries,
      total,
      totalDue,
      totalOverdue,
      filterOptions,
      pagination,
    });
  },
  filterInvoiceList: ({
    entries,
    total,
    totalDue,
    totalOverdue,
    pagination,
  }) => {
    const filterOptions = getFilterOptions(store.getState());
    store.dispatch({
      intent: SORT_AND_FILTER_INVOICE_LIST,
      entries,
      filterOptions,
      total,
      totalDue,
      totalOverdue,
      pagination,
    });
  },
  loadNextPage: ({ entries, pagination }) => {
    store.dispatch({
      intent: LOAD_NEXT_PAGE,
      entries,
      pagination,
    });
  },
});

export default createInvoiceListDispatcher;
