import { addMonths } from 'date-fns';

import {
  ADD_IN_TRAY_LIST_ENTRY,
  CLOSE_MODAL,
  CREATE_IN_TRAY_DOCUMENT,
  DELETE_IN_TRAY_DOCUMENT,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
  OPEN_MODAL,
  POLL_INTRAY_LIST,
  REMOVE_IN_TRAY_LIST_ENTRY,
  SET_ACTIVE_ENTRY_ROW,
  SET_ALERT,
  SET_CONFIRMING_EMAIL_GENERATION,
  SET_DOCUMENT_VIEWER_URL,
  SET_IN_TRAY_DELETE_MODAL,
  SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE,
  SET_IN_TRAY_LIST_FILTER_OPTIONS,
  SET_IN_TRAY_LIST_SORT_ORDER,
  SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
  SET_LOADING_STATE,
  SET_UPLOAD_OPTIONS_ALERT,
  SET_UPLOAD_OPTIONS_LOADING_STATE,
  SORT_AND_FILTER_IN_TRAY_LIST,
  UNSET_ACTIVE_ENTRY_ROW,
  UNSET_DOCUMENT_VIEWER_URL,
} from '../../InTrayIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  addInTrayListEntry,
  createInTrayDocument,
  deleteInTrayDocument,
  pollInTrayList,
  removeInTrayListEntry,
  setInTrayActiveEntry,
  setInTrayListEntrySubmittingState,
  setInTrayListFilterOption,
  setInTrayListSortOrder,
  setInTrayListTableLoadingState,
  sortAndFilterInTrayList,
  unsetInTrayActiveEntry,
} from './inTrayListReducer';
import {
  generateInTrayEmail,
  setConfirmingEmailGeneration,
  setUploadOptionsAlert,
  setUploadOptionsLoadingState,
} from './uploadOptionsReducer';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addMonths(new Date(), -3);

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  businessId: '',
  alert: undefined,
  email: '',
  modalType: '',
  isConfirmingEmailGeneration: false,
  isUploadOptionsLoading: false,
  uploadOptionsAlert: undefined,
  inTrayList: {
    attachments: [],
    isTableLoading: false,
    filterOptions: {
      invoiceDateFrom: formatIsoDate(getDefaultDateRange()),
      invoiceDateTo: formatIsoDate(new Date()),
      keywords: '',
    },
    appliedFilterOptions: {
      invoiceDateFrom: formatIsoDate(getDefaultDateRange()),
      invoiceDateTo: formatIsoDate(new Date()),
      keywords: '',
    },
    sortOrder: '',
    orderBy: '',
    entries: [],
    activeEntryId: undefined,
    allowedActions: [],
  },
  deleteModal: undefined,
  documentViewerUrl: undefined,
});

const loadInTray = (state, action) => ({
  ...state,
  email: action.email,
  inTrayList: {
    ...state.inTrayList,
    entries: action.entries,
    sortOrder: action.sortOrder,
    orderBy: action.orderBy,
    allowedActions: action.allowedActions,
  },
});

const resetState = () => ({ ...getDefaultState() });

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
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

const setDocumentViewerUrl = (state, action) => ({
  ...state,
  documentViewerUrl: action.documentViewerUrl,
});

const unsetDocumentViewerUrl = state => ({
  ...state,
  documentViewerUrl: undefined,
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
  [SET_ACTIVE_ENTRY_ROW]: setInTrayActiveEntry,
  [UNSET_ACTIVE_ENTRY_ROW]: unsetInTrayActiveEntry,
  [SET_DOCUMENT_VIEWER_URL]: setDocumentViewerUrl,
  [UNSET_DOCUMENT_VIEWER_URL]: unsetDocumentViewerUrl,

  [POLL_INTRAY_LIST]: pollInTrayList,

};

const inTrayReducer = createReducer(getDefaultState(), handlers);

export default inTrayReducer;
