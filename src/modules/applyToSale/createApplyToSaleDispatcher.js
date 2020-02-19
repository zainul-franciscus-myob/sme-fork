import {
  LOAD_APPLY_TO_SALE,
  LOAD_NEW_APPLY_TO_SALE,
  SET_ALERT_MESSAGE,
  SET_IS_LOADING,
  SET_IS_PAGE_EDITED,
  SET_IS_SUBMITTING,
  SET_MODAL_TYPE,
  UPDATE_APPLY_TO_SALE_OPTION,
  UPDATE_TABLE_AMOUNT_INPUT,
} from './ApplyToSaleIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createApplyToSaleDispatcher = store => ({
  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setInitialState: context => store.dispatch({
    intent: SET_INITIAL_STATE,
    context,
  }),

  updateApplyToSaleOption: ({ key, value }) => store.dispatch({
    intent: UPDATE_APPLY_TO_SALE_OPTION,
    key,
    value,
  }),

  updateTableAmountInput: ({ key, value, index }) => store.dispatch({
    intent: UPDATE_TABLE_AMOUNT_INPUT,
    key,
    value,
    index,
  }),

  setModalType: modalType => store.dispatch({
    intent: SET_MODAL_TYPE,
    modalType,
  }),

  setAlertMessage: alertMessage => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage,
  }),

  setIsLoading: isLoading => store.dispatch({
    intent: SET_IS_LOADING,
    isLoading,
  }),

  setIsPageEdited: isPageEdited => store.dispatch({
    intent: SET_IS_PAGE_EDITED,
    isPageEdited,
  }),

  setIsSubmitting: isSubmitting => store.dispatch({
    intent: SET_IS_SUBMITTING,
    isSubmitting,
  }),

  loadApplyToSale: ({ applyToSale, isCreating }) => {
    const intent = isCreating ? LOAD_NEW_APPLY_TO_SALE : LOAD_APPLY_TO_SALE;
    store.dispatch({
      intent,
      applyToSale,
    });
  },
});

export default createApplyToSaleDispatcher;
