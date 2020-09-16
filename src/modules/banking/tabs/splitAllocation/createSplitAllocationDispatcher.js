import {
  ADD_SPLIT_ALLOCATION_LINE,
  CALCULATE_SPLIT_ALLOCATION_TAX,
  DELETE_SPLIT_ALLOCATION_LINE,
  LOAD_NEW_SPLIT_ALLOCATION,
  LOAD_SPLIT_ALLOCATION,
  SAVE_SPLIT_ALLOCATION,
  UPDATE_SPLIT_ALLOCATION_CONTACT,
  UPDATE_SPLIT_ALLOCATION_HEADER,
  UPDATE_SPLIT_ALLOCATION_LINE,
} from '../../BankingIntents';

const createSplitAllocationDispatcher = (store) => ({
  updateSplitAllocationHeader: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_SPLIT_ALLOCATION_HEADER,
      key,
      value,
    });
  },

  updateSplitAllocationContact: ({ key, value, contactType, isReportable }) => {
    store.dispatch({
      intent: UPDATE_SPLIT_ALLOCATION_CONTACT,
      key,
      value,
      contactType,
      isReportable,
    });
  },

  addSplitAllocationLine: ({ key, value }) => {
    store.dispatch({
      intent: ADD_SPLIT_ALLOCATION_LINE,
      key,
      value,
    });
  },

  updateSplitAllocationLine: (lineIndex, lineKey, lineValue) => {
    store.dispatch({
      intent: UPDATE_SPLIT_ALLOCATION_LINE,
      lineIndex,
      lineKey,
      lineValue,
    });
  },

  deleteSplitAllocationLine: (index) => {
    store.dispatch({
      intent: DELETE_SPLIT_ALLOCATION_LINE,
      index,
    });
  },

  saveSplitAllocation: (index, payload) => {
    store.dispatch({
      intent: SAVE_SPLIT_ALLOCATION,
      index,
      ...payload,
    });
  },

  loadSplitAllocation: (index, payload) => {
    store.dispatch({
      intent: LOAD_SPLIT_ALLOCATION,
      index,
      ...payload,
    });
  },

  loadNewSplitAllocation: (index) => {
    store.dispatch({
      intent: LOAD_NEW_SPLIT_ALLOCATION,
      index,
    });
  },

  calculateSplitAllocationTax: ({ taxCalculations }) => {
    store.dispatch({
      intent: CALCULATE_SPLIT_ALLOCATION_TAX,
      taxCalculations,
    });
  },
});

export default createSplitAllocationDispatcher;
