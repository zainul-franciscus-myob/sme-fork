import {
  ADD_IN_TRAY_LIST_ENTRY,
  CREATE_IN_TRAY_MODAL_DOCUMENT,
  LOAD_IN_TRAY_MODAL,
  REMOVE_IN_TRAY_LIST_ENTRY,
  SELECT_DOCUMENT,
  SET_ALERT,
  SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE,
  SET_IN_TRAY_LIST_FILTER_OPTIONS,
  SET_IN_TRAY_LIST_SORT_ORDER,
  SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
  SET_LOADING_STATE,
  SORT_AND_FILTER_IN_TRAY_MODAL,
} from '../InTrayIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getFilteredEntriesByKey,
  getUpdatedEntriesByKey,
  getUploadedEntry,
} from './InTrayModalSelectors';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  isLoading: true,
  isOpen: false,
  businessId: '',
  alert: undefined,
  isTableLoading: false,
  isUploadAllowed: true,
  selectedId: '',
  filterOptions: {
    keywords: '',
  },
  sortOrder: 'desc',
  orderBy: 'ReceivedOn',
  entries: [],
});

const loadInTrayModal = (state, action) => ({
  ...state,
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

const handlers = {
  [LOAD_IN_TRAY_MODAL]: loadInTrayModal,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_ALERT]: setAlert,

  [SORT_AND_FILTER_IN_TRAY_MODAL]: sortAndFilterInTrayModal,
  [SET_IN_TRAY_LIST_FILTER_OPTIONS]: setFilterOption,
  [SET_IN_TRAY_LIST_SORT_ORDER]: setSortOrder,
  [SET_IN_TRAY_LIST_TABLE_LOADING_STATE]: setTableLoadingState,

  [CREATE_IN_TRAY_MODAL_DOCUMENT]: createInTrayModalDocument,
  [ADD_IN_TRAY_LIST_ENTRY]: addEntry,
  [REMOVE_IN_TRAY_LIST_ENTRY]: removeEntry,
  [SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE]: setEntrySubmittingState,

  [SELECT_DOCUMENT]: setSelectedDocumentId,
};

const inTrayModalReducer = createReducer(getDefaultState(), handlers);

export default inTrayModalReducer;
