import {
  CLOSE_MODAL,
  LOAD_INVENTORY_DETAIL,
  LOAD_NEW_INVENTORY_DETAIL,
  OPEN_MODAL, SET_ALERT_MESSAGE,
  SET_ENABLE_FOR_BUYING,
  SET_ENABLE_FOR_SELLING,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BUYING_DETAILS,
  UPDATE_ITEM_DETAILS,
  UPDATE_SELLING_DETAILS,
} from '../InventoryIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getIsCreating } from './inventoryDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  item: {
    id: '',
    referenceId: '',
    name: '',
    originalName: '',
    description: '',
    useItemDescription: false,
    isInactive: false,
    sellingDetails: {
      unitOfMeasure: '',
      sellingPrice: '',
      allocateToAccountId: '',
      taxCodeId: '',
      isTaxInclusive: true,
    },
    buyingDetails: {
      unitOfMeasure: '',
      buyingPrice: '',
      allocateToAccountId: '',
      taxCodeId: '',
    },
  },
  isEnableForSelling: false,
  isEnableForBuying: false,
  sellingAccounts: [],
  buyingAccounts: [],
  taxCodes: [],
  loadingState: LoadingState.LOADING,
  isSubmitting: false,
  isPageEdited: false,
  alertMessage: '',
  modalType: '',
  businessId: '',
  region: '',
});

const resetState = () => (getDefaultState());

const loadInventoryDetail = (state, action) => {
  const isCreating = getIsCreating(state);
  return {
    ...state,
    ...action,
    isEnableForSelling: isCreating ? false : !!action.item.sellingDetails,
    isEnableForBuying: isCreating ? false : !!action.item.buyingDetails,
    item: {
      ...state.item,
      ...action.item,
      sellingDetails: {
        ...state.item.sellingDetails,
        ...action.item.sellingDetails,
      },
      buyingDetails: {
        ...state.item.buyingDetails,
        ...action.item.buyingDetails,
      },
    },
  };
};

const setEnableForSelling = (state, action) => ({
  ...state,
  isEnableForSelling: action.isEnableForSelling,
});

const setEnableForBuying = (state, action) => ({
  ...state,
  isEnableForBuying: action.isEnableForBuying,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const updateItemDetails = (state, action) => ({
  ...state,
  isPageEdited: true,
  item: {
    ...state.item,
    [action.key]: action.value,
  },
});

const getTaxCodeId = (accounts, accountId) => {
  const account = accounts.find(acc => acc.id === accountId);
  return account ? account.taxCodeId : '';
};

const updateSellingDetails = (state, action) => {
  const taxCodeId = action.key === 'allocateToAccountId'
    ? getTaxCodeId(state.sellingAccounts, action.value)
    : state.item.sellingDetails.taxCodeId;
  return {
    ...state,
    isPageEdited: true,
    item: {
      ...state.item,
      sellingDetails: {
        ...state.item.sellingDetails,
        taxCodeId,
        [action.key]: action.value,
      },
    },
  };
};

const updateBuyingDetails = (state, action) => {
  const taxCodeId = action.key === 'allocateToAccountId'
    ? getTaxCodeId(state.buyingAccounts, action.value)
    : state.item.buyingDetails.taxCodeId;
  return {
    ...state,
    isPageEdited: true,
    item: {
      ...state.item,
      buyingDetails: {
        ...state.item.buyingDetails,
        taxCodeId,
        [action.key]: action.value,
      },
    },
  };
};

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [RESET_STATE]: resetState,
  [LOAD_INVENTORY_DETAIL]: loadInventoryDetail,
  [LOAD_NEW_INVENTORY_DETAIL]: loadInventoryDetail,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_INITIAL_STATE]: setInitialState,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [UPDATE_ITEM_DETAILS]: updateItemDetails,
  [UPDATE_SELLING_DETAILS]: updateSellingDetails,
  [UPDATE_BUYING_DETAILS]: updateBuyingDetails,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [SET_ENABLE_FOR_BUYING]: setEnableForBuying,
  [SET_ENABLE_FOR_SELLING]: setEnableForSelling,
};

const inventoryDetailReducer = createReducer(getDefaultState(), handlers);

export default inventoryDetailReducer;
