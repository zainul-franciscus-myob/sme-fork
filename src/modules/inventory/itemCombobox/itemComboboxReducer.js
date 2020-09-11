import {
  LOAD_ITEM_COMBOBOX_OPTIONS,
  LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS,
  LOAD_ITEM_COMBOBOX_OPTION_BY_ID,
  SET_ITEM_COMBOBOX_LOADING_STATE,
  SET_ITEM_COMBOBOX_OPTIONS_LOADING_STATE,
  UPDATE_ITEM_COMBOBOX_OPTIONS,
} from '../InventoryIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import ItemTypes from './ItemTypes';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  itemType: ItemTypes.All,
  itemOptions: [],
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
  isLoading: false,
  isOptionsLoading: true,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const setItemComboboxLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setItemOptionsLoadingState = (state, { isLoading }) => ({
  ...state,
  isOptionsLoading: isLoading,
});

const getUniqueSetOfItemOptions = (topOptions, bottomOptions) => {
  const topOptionIds = new Set(topOptions.map(({ id }) => id));
  return [
    ...topOptions,
    ...bottomOptions.filter(({ id }) => !topOptionIds.has(id)),
  ];
};

const loadItemComboboxOptions = (state, { itemOptions, pagination }) => ({
  ...state,
  itemOptions: getUniqueSetOfItemOptions(state.itemOptions, itemOptions),
  pagination: {
    ...state.pagination,
    ...pagination,
  },
});

const isOptionExisted = (stateOptions, updatedOption) =>
  stateOptions.some((stateOption) => stateOption.id === updatedOption.id);
const getUpdatedItemOptions = (stateOptions, updatedOption) =>
  isOptionExisted(stateOptions, updatedOption)
    ? stateOptions.map((option) =>
        option.id === updatedOption.id ? updatedOption : option
      )
    : [updatedOption, ...stateOptions];

const loadItemComboboxOptionById = (state, { item }) => ({
  ...state,
  itemOptions: getUpdatedItemOptions(state.itemOptions, item),
});

const loadItemComboboxOptionsByIds = (state, { items }) => ({
  ...state,
  itemOptions: getUniqueSetOfItemOptions(items, state.itemOptions),
});

const updateItemComboboxOptions = (state, { item }) => ({
  ...state,
  itemOptions: getUpdatedItemOptions(state.itemOptions, item),
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_ITEM_COMBOBOX_LOADING_STATE]: setItemComboboxLoadingState,
  [SET_ITEM_COMBOBOX_OPTIONS_LOADING_STATE]: setItemOptionsLoadingState,
  [LOAD_ITEM_COMBOBOX_OPTIONS]: loadItemComboboxOptions,
  [LOAD_ITEM_COMBOBOX_OPTION_BY_ID]: loadItemComboboxOptionById,
  [LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS]: loadItemComboboxOptionsByIds,
  [UPDATE_ITEM_COMBOBOX_OPTIONS]: updateItemComboboxOptions,
};

export default createReducer(getDefaultState(), handlers);
