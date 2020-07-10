import {
  FORMAT_WITHHOLDING_VARIATION,
  LOAD_CONTEXT,
  SET_FORM_FIELD,
  SET_IS_LOADING,
  SET_IS_OPEN,
  SET_TAX_TABLE_RESULT,
} from './taxTableCalculationModalIntents';

const createTaxTableCalculationModalDispatcher = (store) => ({
  setIsOpen: (isOpen) => {
    store.dispatch({
      intent: SET_IS_OPEN,
      isOpen,
    });
  },

  setIsLoading: (isLoading) => {
    store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  },

  updateFormField: ({ key, value }) => {
    store.dispatch({
      intent: SET_FORM_FIELD,
      key,
      value,
    });
  },

  loadContext: (context) => {
    store.dispatch({
      intent: LOAD_CONTEXT,
      context,
    });
  },

  formatWithholdingVariationField: (value) => {
    store.dispatch({
      intent: FORMAT_WITHHOLDING_VARIATION,
      value,
    });
  },

  setTaxTableResult: (taxTableResult) => {
    store.dispatch({
      intent: SET_TAX_TABLE_RESULT,
      taxTableResult,
    });
  },
});

export default createTaxTableCalculationModalDispatcher;
