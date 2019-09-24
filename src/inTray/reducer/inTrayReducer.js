import { format as dateFormat } from 'date-fns';

import {
  ADD_IN_TRAY_LIST_ENTRY,
  CLOSE_MODAL,
  CREATE_IN_TRAY_DOCUMENT,
  DELETE_IN_TRAY_DOCUMENT,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
  OPEN_MODAL,
  REMOVE_IN_TRAY_LIST_ENTRY,
  SET_ALERT,
  SET_CONFIRMING_EMAIL_GENERATION,
  SET_IN_TRAY_DELETE_MODAL,
  SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE,
  SET_IN_TRAY_LIST_FILTER_OPTIONS,
  SET_IN_TRAY_LIST_SORT_ORDER,
  SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
  SET_LOADING_STATE,
  SET_UPLOAD_OPTIONS_ALERT,
  SET_UPLOAD_OPTIONS_LOADING_STATE,
  SORT_AND_FILTER_IN_TRAY_LIST,
} from '../InTrayIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  addInTrayListEntry,
  createInTrayDocument,
  deleteInTrayDocument,
  removeInTrayListEntry,
  setInTrayListEntrySubmittingState,
  setInTrayListFilterOption,
  setInTrayListSortOrder,
  setInTrayListTableLoadingState,
  sortAndFilterInTrayList,
} from './inTrayListReducer';
import {
  generateInTrayEmail,
  setConfirmingEmailGeneration,
  setUploadOptionsAlert,
  setUploadOptionsLoadingState,
} from './uploadOptionsReducer';
import createReducer from '../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'YYYY-MM-DD');

const getDefaultDateRange = () => new Date().setMonth(new Date().getMonth() - 3);

const getDefaultState = () => ({
  isLoading: true,
  businessId: '',
  alert: undefined,
  email: '',
  modalType: '',
  isConfirmingEmailGeneration: false,
  isUploadOptionsLoading: false,
  uploadOptionsAlert: undefined,
  inTrayList: {
    isTableLoading: false,
    filterOptions: {
      invoiceDateFrom: convertToDateString(getDefaultDateRange()),
      invoiceDateTo: convertToDateString(Date.now()),
      keywords: '',
    },
    appliedFilterOptions: {
      invoiceDateFrom: convertToDateString(getDefaultDateRange()),
      invoiceDateTo: convertToDateString(Date.now()),
      keywords: '',
    },
    sortOrder: '',
    orderBy: '',
    entries: [],
  },
  deleteModal: undefined,
});

const loadInTray = (state, action) => ({
  ...state,
  email: action.email,
  inTrayList: {
    ...state.inTrayList,
    entries: action.entries,
    sortOrder: action.sortOrder,
    orderBy: action.orderBy,
  },
});

const resetState = () => ({ ...getDefaultState() });

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const openModal = (state, { modalType }) => ({
  ...state,
  modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setInTrayDeleteModal = (state, { entry }) => ({
  ...state,
  deleteModal: entry,
});

const handlers = {
  [LOAD_IN_TRAY]: loadInTray,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,

  [SET_CONFIRMING_EMAIL_GENERATION]: setConfirmingEmailGeneration,
  [GENERATE_IN_TRAY_EMAIL]: generateInTrayEmail,
  [SET_UPLOAD_OPTIONS_LOADING_STATE]: setUploadOptionsLoadingState,
  [SET_UPLOAD_OPTIONS_ALERT]: setUploadOptionsAlert,

  [SORT_AND_FILTER_IN_TRAY_LIST]: sortAndFilterInTrayList,
  [SET_IN_TRAY_LIST_FILTER_OPTIONS]: setInTrayListFilterOption,
  [SET_IN_TRAY_LIST_SORT_ORDER]: setInTrayListSortOrder,
  [SET_IN_TRAY_LIST_TABLE_LOADING_STATE]: setInTrayListTableLoadingState,

  [CREATE_IN_TRAY_DOCUMENT]: createInTrayDocument,
  [DELETE_IN_TRAY_DOCUMENT]: deleteInTrayDocument,
  [ADD_IN_TRAY_LIST_ENTRY]: addInTrayListEntry,
  [REMOVE_IN_TRAY_LIST_ENTRY]: removeInTrayListEntry,
  [SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE]: setInTrayListEntrySubmittingState,

  [SET_IN_TRAY_DELETE_MODAL]: setInTrayDeleteModal,
};

const inTrayReducer = createReducer(getDefaultState(), handlers);

export default inTrayReducer;
