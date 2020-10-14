import { isStatusUnapproved } from '../types/BankTransactionStatusTypes';
import ModalTypes from '../types/ModalTypes';
import getDefaultState from './getDefaultState';

export const collapseTransactionLine = (state) => {
  const defaultState = getDefaultState();

  return {
    ...state,
    openPosition: defaultState.openPosition,
    isOpenEntryLoading: defaultState.isOpenEntryLoading,
    openEntry: defaultState.openEntry,
  };
};

// @@ This reducer function should be used going forwards for when a tab is loading
export const startLoadingOpenEntry = (state, { index, tabId }) => ({
  ...state,
  // @@ `isOpenEntryLoading` can be deprecated after refactoring as tabs can handle their own loading
  isOpenEntryLoading: true,
  openPosition: index,
  openEntry: {
    ...getDefaultState().openEntry,
    attachments: state.openEntry.attachments,
    activeTabId: tabId,
  },
});

// @@ This reducer function should be used going forwards for when a tab has finished loading
// @@ This should only be triggered from the module when the given index is the same as the openPosition
export const finishLoadingOpenEntry = (state, { index }) => ({
  ...state,
  // @@ `isOpenEntryLoading` can be deprecated after refactoring as tabs can handle their own loading
  isOpenEntryLoading: false,
  openEntry: {
    ...state.openEntry,
    description: state.entries[index].description,
    note: state.entries[index].note,
    attachments: state.openEntry.attachments,
    isCreating: isStatusUnapproved(state.entries[index].type),
  },
  isModalBlocking: false,
  modalAlert: undefined,
});

// @@ To be deprecated when split allocation and transfer money tab is refactored
export const loadOpenEntry = (
  state,
  index,
  propName,
  propValue,
  isCreating
) => ({
  ...state,
  openPosition: index,
  openEntry: {
    ...getDefaultState().openEntry,
    description: state.entries[index].description,
    note: state.entries[index].note,
    attachments: state.openEntry.attachments,
    isCreating,
    activeTabId: propName,
    [propName]: propValue,
  },
  isModalBlocking: false,
  modalAlert: undefined,
});

export const setOpenEntryLoadingState = (state, action) => ({
  ...state,
  isOpenEntryLoading: action.isLoading,
});

export const setOpenPosition = (state, action) => ({
  ...state,
  openPosition: action.index,
});

const updateOpenEntry = (state, patch) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    ...patch,
  },
});

export const setAttachemntsLoadingState = (state, { isAttachmentsLoading }) =>
  updateOpenEntry(state, { isAttachmentsLoading });

export const loadAttachments = (state, { attachments }) =>
  updateOpenEntry(state, { attachments });

const isMoreThan10MB = (size) => size > 10000000;

const buildAttachmentState = (size) =>
  isMoreThan10MB(size)
    ? { state: 'failed', error: 'File is more than 10MB' }
    : { state: 'queued' };

export const addAttachments = (state, { files }) =>
  updateOpenEntry(state, {
    attachments: [
      ...state.openEntry.attachments,
      ...files.map((file) => ({
        name: file.name,
        size: file.size,
        ...buildAttachmentState(file.size),
        file,
      })),
    ],
  });

const updateAttachment = (state, file, partialAttachment) =>
  updateOpenEntry(state, {
    attachments: state.openEntry.attachments.map((attachment) =>
      attachment.file === file
        ? { ...attachment, ...partialAttachment }
        : attachment
    ),
  });

export const uploadAttachment = (state, { id, name, file }) =>
  updateAttachment(state, file, { id, name, state: 'finished' });

export const uploadAttachmentFailed = (state, { message, file }) =>
  updateAttachment(state, file, { error: message, state: 'failed' });

export const uploadAttachmentProgress = (state, { file, uploadProgress }) =>
  updateAttachment(state, file, { state: 'loading', uploadProgress });

export const setOperationInProgressState = (state, { id, isInProgress }) =>
  updateOpenEntry(state, {
    attachments: state.openEntry.attachments.map((attachment) =>
      attachment.id === id ? { ...attachment, isInProgress } : attachment
    ),
  });

export const openRemoveAttachmentModal = (state, { id }) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    pendingDeleteId: id,
  },
  modalType: ModalTypes.DELETE_ATTACHMENT,
});

export const removeAttachmentByIndex = (state, { index }) =>
  updateOpenEntry(state, {
    attachments: state.openEntry.attachments.filter(
      (attachment, i) => index !== i
    ),
  });

export const removeAttachment = (state, { id }) =>
  updateOpenEntry(state, {
    attachments: state.openEntry.attachments.filter(
      (attachment) => attachment.id !== id
    ),
  });
