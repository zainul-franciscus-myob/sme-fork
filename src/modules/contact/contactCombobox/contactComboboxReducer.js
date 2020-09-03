import {
  LOAD_CONTACT_COMBOBOX_OPTIONS,
  LOAD_CONTACT_COMBOBOX_OPTION_BY_ID,
  SET_CONTACT_COMBOBOX_LOADING_STATE,
  SET_CONTACT_COMBOBOX_OPTIONS_LOADING_STATE,
} from '../ContactIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import ContactType from './types/ContactType';
import DisplayMode from './types/DisplayMode';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  contactType: ContactType.ALL,
  displayMode: DisplayMode.NAME_AND_TYPE,
  contactOptions: [],
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

const isContactOptionExisted = (contactOptions, id) =>
  contactOptions.some((option) => option.id === id);

const loadContactComboboxOptions = (state, { contactOptions, pagination }) => ({
  ...state,
  contactOptions: [
    ...state.contactOptions,
    ...contactOptions.filter(
      (option) => !isContactOptionExisted(state.contactOptions, option.id)
    ),
  ],
  pagination: {
    ...state.pagination,
    ...pagination,
  },
});

export const getUpdatedContactOptions = ({ contactOptions }, updatedOption) => {
  return isContactOptionExisted(contactOptions, updatedOption.id)
    ? contactOptions.map((option) =>
        option.id === updatedOption.id ? updatedOption : option
      )
    : [updatedOption, ...contactOptions];
};

const loadContactComboboxOptionById = (state, { contact }) => ({
  ...state,
  contactOptions: getUpdatedContactOptions(state, contact),
});

const setContactComboboxLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setContactComboboxOptionsLoadingState = (state, { isLoading }) => ({
  ...state,
  isOptionsLoading: isLoading,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_CONTACT_COMBOBOX_OPTIONS]: loadContactComboboxOptions,
  [LOAD_CONTACT_COMBOBOX_OPTION_BY_ID]: loadContactComboboxOptionById,
  [SET_CONTACT_COMBOBOX_LOADING_STATE]: setContactComboboxLoadingState,
  [SET_CONTACT_COMBOBOX_OPTIONS_LOADING_STATE]: setContactComboboxOptionsLoadingState,
};

export default createReducer(getDefaultState(), handlers);
