import {
  CLOSE_MODAL,
  LOAD_INVENTORY_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_ENABLE_FOR_BUYING,
  SET_ENABLE_FOR_SELLING,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BUYING_DETAILS,
  UPDATE_ITEM_DETAILS,
  UPDATE_SELLING_DETAILS,
} from '../InventoryIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createInventoryDetailDispatcher = store => ({
  setInitialState: context => store.dispatch({
    intent: SET_INITIAL_STATE,
    context,
  }),
  resetState: () => store.dispatch({
    intent: RESET_STATE,
  }),
  setLoadingState: loadingState => store.dispatch({
    intent: SET_LOADING_STATE,
    loadingState,
  }),
  setSubmittingState: isSubmitting => store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  }),
  displayAlert: alertMessage => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage,
  }),
  dismissAlert: () => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  }),
  openModal: modalType => store.dispatch({
    intent: OPEN_MODAL,
    modalType,
  }),
  closeModal: () => store.dispatch({
    intent: CLOSE_MODAL,
  }),
  loadInventoryDetail: response => store.dispatch({
    intent: LOAD_INVENTORY_DETAIL,
    ...response,
  }),
  setEnableForSellingState: ({ value }) => store.dispatch({
    intent: SET_ENABLE_FOR_SELLING,
    isEnableForSelling: value,
  }),
  setEnableForBuyingState: ({ value }) => store.dispatch({
    intent: SET_ENABLE_FOR_BUYING,
    isEnableForBuying: value,
  }),
  updateItemDetails: ({ key, value }) => store.dispatch({
    intent: UPDATE_ITEM_DETAILS,
    key,
    value,
  }),
  updateSellingDetails: ({ key, value }) => store.dispatch({
    intent: UPDATE_SELLING_DETAILS,
    key,
    value,
  }),
  updateBuyingDetails: ({ key, value }) => store.dispatch({
    intent: UPDATE_BUYING_DETAILS,
    key,
    value,
  }),
});

export default createInventoryDetailDispatcher;
