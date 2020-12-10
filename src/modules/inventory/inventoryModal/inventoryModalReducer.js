import {
  CLOSE_ALERT,
  LOAD_ITEM,
  OPEN,
  OPEN_ALERT,
  OPEN_BUYING_DETAILS,
  OPEN_SELLING_DETAILS,
  START_LOADING,
  STOP_LOADING,
  UPDATE_BUYING_OPTION,
  UPDATE_IS_BUYING,
  UPDATE_IS_SELLING,
  UPDATE_ITEM_OPTION,
  UPDATE_SELLING_OPTION,
} from './InventoryModalIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  isOpen: false,
  isLoading: false,
  alert: undefined,
  businessId: '',
  region: '',
  isSelling: false,
  isBuying: false,
  item: {
    name: '',
    description: '',
    useDescription: false,
    displayId: '',
    sellingDetails: {
      price: '',
      isTaxInclusive: true,
      unitOfMeasure: '',
      accountId: '',
      taxCodeId: '',
    },
    buyingDetails: {
      price: '',
      isTaxInclusive: true,
      unitOfMeasure: '',
      accountId: '',
      taxCodeId: '',
    },
  },
  buyingAccountOptions: [],
  sellingAccountOptions: [],
  taxCodeOptions: [],
});

const open = (state) => ({
  ...state,
  isOpen: true,
});

const resetState = () => getDefaultState();

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadItem = (state, action) => ({
  ...state,
  ...action.response,
});

const closeAlert = (state) => ({
  ...state,
  alert: undefined,
});

const openAlert = (state, action) => ({
  ...state,
  alert: {
    message: action.message,
    type: action.type,
  },
});

const startLoading = (state) => ({
  ...state,
  isLoading: true,
});

const stopLoading = (state) => ({
  ...state,
  isLoading: false,
});

const updateItemOption = (state, action) => ({
  ...state,
  item: {
    ...state.item,
    [action.key]: action.value,
  },
});

const getTaxCodeIdFromAccountId = ({ accountOptions, accountId }) =>
  accountOptions.find((accountOption) => accountOption.id === accountId)
    .taxCodeId;

const updateSellingOption = (state, action) => {
  const key =
    action.key === 'isTaxInclusiveForSellingDetails'
      ? 'isTaxInclusive'
      : action.key;

  const isAccountId = action.key === 'accountId';

  return {
    ...state,
    item: {
      ...state.item,
      sellingDetails: {
        ...state.item.sellingDetails,
        taxCodeId: isAccountId
          ? getTaxCodeIdFromAccountId({
              accountOptions: state.sellingAccountOptions,
              accountId: action.value,
            })
          : state.item.sellingDetails.taxCodeId,
        [key]: action.value,
      },
    },
  };
};

const updateBuyingOption = (state, action) => {
  const isAccountId = action.key === 'accountId';
  const key =
    action.key === 'isTaxInclusiveForBuyingDetails'
      ? 'isTaxInclusive'
      : action.key;

  return {
    ...state,
    item: {
      ...state.item,
      buyingDetails: {
        ...state.item.buyingDetails,
        taxCodeId: isAccountId
          ? getTaxCodeIdFromAccountId({
              accountOptions: state.buyingAccountOptions,
              accountId: action.value,
            })
          : state.item.buyingDetails.taxCodeId,
        [key]: action.value,
      },
    },
  };
};

const updateIsBuying = (state, action) => ({
  ...state,
  isBuying: action.isBuying,
  item: {
    ...state.item,
    buyingDetails: getDefaultState().item.buyingDetails,
  },
});

const updateIsSelling = (state, action) => ({
  ...state,
  isSelling: action.isSelling,
  item: {
    ...state.item,
    sellingDetails: getDefaultState().item.sellingDetails,
  },
});

const openBuyingDetails = (state) => ({
  ...state,
  isBuying: true,
});

const openSellingDetails = (state) => ({
  ...state,
  isSelling: true,
});

const handlers = {
  [OPEN]: open,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [OPEN_ALERT]: openAlert,
  [CLOSE_ALERT]: closeAlert,
  [LOAD_ITEM]: loadItem,
  [UPDATE_ITEM_OPTION]: updateItemOption,
  [UPDATE_SELLING_OPTION]: updateSellingOption,
  [UPDATE_BUYING_OPTION]: updateBuyingOption,
  [OPEN_BUYING_DETAILS]: openBuyingDetails,
  [OPEN_SELLING_DETAILS]: openSellingDetails,
  [START_LOADING]: startLoading,
  [STOP_LOADING]: stopLoading,
  [UPDATE_IS_BUYING]: updateIsBuying,
  [UPDATE_IS_SELLING]: updateIsSelling,
};

export default createReducer(getDefaultState(), handlers);
