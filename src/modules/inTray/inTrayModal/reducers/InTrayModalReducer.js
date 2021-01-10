import {
  ADD_IN_TRAY_LIST_ENTRY,
  CREATE_IN_TRAY_MODAL_DOCUMENT,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY_MODAL,
  REMOVE_IN_TRAY_LIST_ENTRY,
  RESET_IN_TRAY_LIST_FILTER_OPTIONS,
  SELECT_DOCUMENT,
  SET_ALERT,
  SET_CONFIRMING_EMAIL_GENERATION,
  SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE,
  SET_IN_TRAY_LIST_FILTER_OPTIONS,
  SET_IN_TRAY_LIST_SORT_ORDER,
  SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
  SET_LOADING_STATE,
  SET_UPLOAD_OPTIONS_ALERT,
  SET_UPLOAD_OPTIONS_LOADING_STATE,
  SET_UPLOAD_POPOVER_STATE,
  SORT_AND_FILTER_IN_TRAY_MODAL,
} from '../../InTrayIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  getFilteredEntriesByKey,
  getUpdatedEntriesByKey,
  getUploadedEntry,
} from '../selectors/InTrayModalSelectors';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  alert: undefined,
  businessId: '',
  email: '',
  entries: [],
  filterOptions: {
    keywords: '',
  },
  isConfirmingEmailGeneration: false,
  isLoading: true,
  isOpen: false,
  isTableLoading: false,
  isUploadAllowed: true,
  isUploadOptionsLoading: false,
  isUploadPopoverOpen: false,
  orderBy: 'ReceivedOn',
  region: '',
  selectedId: '',
  sortOrder: 'desc',
  uploadOptionsAlert: undefined,
});

const loadInTrayModal = (state, action) => ({
  ...state,
  email: action.email,
  entries: action.entries,
});

const resetState = () => ({ ...getDefaultState() });

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
  isOpen: true,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const sortAndFilterInTrayModal = (state, action) => ({
  ...state,
  entries: action.entries,
});

const setFilterOption = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const resetFilterOption = (state) => ({
  ...state,
  filterOptions: getDefaultState().filterOptions,
});

const setSortOrder = (state, action) => ({
  ...state,
  orderBy: action.orderBy,
  sortOrder: action.sortOrder,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const createInTrayModalDocument = (state, { uploadId, entry }) => ({
  ...state,
  entries: getUpdatedEntriesByKey(
    state,
    'uploadId',
    uploadId,
    getUploadedEntry(uploadId, entry)
  ),
});

const addEntry = (state, { entry }) => ({
  ...state,
  entries: [entry, ...state.entries],
});

export const removeEntry = (state, { uploadId }) => ({
  ...state,
  entries: getFilteredEntriesByKey(state, 'uploadId', uploadId),
});

const setEntrySubmittingState = (state, { id, isSubmitting }) => ({
  ...state,
  entries: getUpdatedEntriesByKey(state, 'id', id, { isSubmitting }),
});

const setSelectedDocumentId = (state, { id }) => ({
  ...state,
  selectedId: id,
});

const setUploadOptionsAlert = (state, { uploadOptionsAlert }) => ({
  ...state,
  uploadOptionsAlert,
});

const setConfirmingEmailGeneration = (
  state,
  { isConfirmingEmailGeneration }
) => ({
  ...state,
  isConfirmingEmailGeneration,
});

const setUploadPopoverState = (state, { isUploadPopoverOpen }) => ({
  ...state,
  isUploadPopoverOpen,
});

const setUploadOptionsLoadingState = (state, { isUploadOptionsLoading }) => ({
  ...state,
  isUploadOptionsLoading,
});

const generateInTrayEmail = (state, { email }) => ({
  ...state,
  email,
});

const handlers = {
  [LOAD_IN_TRAY_MODAL]: loadInTrayModal,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_ALERT]: setAlert,

  [SORT_AND_FILTER_IN_TRAY_MODAL]: sortAndFilterInTrayModal,
  [SET_IN_TRAY_LIST_FILTER_OPTIONS]: setFilterOption,
  [RESET_IN_TRAY_LIST_FILTER_OPTIONS]: resetFilterOption,
  [SET_IN_TRAY_LIST_SORT_ORDER]: setSortOrder,
  [SET_IN_TRAY_LIST_TABLE_LOADING_STATE]: setTableLoadingState,

  [CREATE_IN_TRAY_MODAL_DOCUMENT]: createInTrayModalDocument,
  [ADD_IN_TRAY_LIST_ENTRY]: addEntry,
  [REMOVE_IN_TRAY_LIST_ENTRY]: removeEntry,
  [SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE]: setEntrySubmittingState,
  [SELECT_DOCUMENT]: setSelectedDocumentId,

  [SET_UPLOAD_OPTIONS_ALERT]: setUploadOptionsAlert,
  [SET_CONFIRMING_EMAIL_GENERATION]: setConfirmingEmailGeneration,
  [SET_UPLOAD_POPOVER_STATE]: setUploadPopoverState,
  [SET_UPLOAD_OPTIONS_LOADING_STATE]: setUploadOptionsLoadingState,
  [GENERATE_IN_TRAY_EMAIL]: generateInTrayEmail,
};

const inTrayModalReducer = createReducer(getDefaultState(), handlers);

export default inTrayModalReducer;
