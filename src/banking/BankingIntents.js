export const SET_ALERT_MESSAGE = Symbol('Set alert message');
export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_ERROR_STATE = Symbol('Set error state');
export const SET_ALERT = Symbol('Set the Alert of the page');
export const LOAD_BANK_TRANSACTIONS = Symbol('Load list of bank transactions');
export const SORT_AND_FILTER_BANK_TRANSACTIONS = Symbol('Sort and filter list of bank transactions');
export const SET_TABLE_LOADING_STATE = Symbol('Set Table loading state');
export const UPDATE_FILTER_OPTIONS = Symbol('Update filter Options');

export const SET_ENTRY_FOCUS = Symbol('Set the focus state of an entry');
export const SET_ENTRY_LOADING_STATE = Symbol('Set the loading state of an entry');
export const ALLOCATE_TRANSACTION = Symbol('Allocate a bank transaction');
export const UNALLOCATE_TRANSACTION = Symbol('Unallocate an allocated bank transaction');
export const OPEN_MODAL = Symbol('Open a modal');
export const CLOSE_MODAL = Symbol('Close a modal');

export const SET_OPEN_ENTRY_LOADING_STATE = Symbol('Set bank transaction open entry loading state');
export const SET_OPEN_ENTRY_POSITION = Symbol('Set bank transaction open entry position');
export const COLLAPSE_TRANSACTION_LINE = Symbol('Collapse bank transaction entry');
export const UNALLOCATE_OPEN_ENTRY_TRANSACTION = Symbol('Unallocate allocated transaction from expand line');

export const UPDATE_SPLIT_ALLOCATION_HEADER = Symbol('Update the header of split allocation in accordion table');
export const ADD_SPLIT_ALLOCATION_LINE = Symbol('Add split allocation line');
export const UPDATE_SPLIT_ALLOCATION_LINE = Symbol('Update split allocation line');
export const DELETE_SPLIT_ALLOCATION_LINE = Symbol('Delete split allocation line');
export const SAVE_SPLIT_ALLOCATION = Symbol('Save split allocation transaction');
export const LOAD_SPLIT_ALLOCATION = Symbol('Load split allocation transaction');
export const LOAD_NEW_SPLIT_ALLOCATION = Symbol('Load new split allocation transaction');

export const LOAD_MATCH_TRANSACTIONS = Symbol('Load list of match transactions');
export const SORT_AND_FILTER_MATCH_TRANSACTIONS = Symbol('Sort and filter list of match transactions');
export const SAVE_MATCH_TRANSACTION = Symbol('Save match transaction');
export const UPDATE_MATCH_TRANSACTION_OPTIONS = Symbol('Update match transaction filter Options');
export const SET_MATCH_TRANSACTION_SORT_ORDER = Symbol('Set match transaction sort order');
export const UPDATE_MATCH_TRANSACTION_SELECTION = Symbol('Update match transaction selection');
export const SET_MATCH_TRANSACTION_LOADING_STATE = Symbol('Set match transaction table loading state');

export const LOAD_PAYMENT_ALLOCATION_LINES = Symbol('Load bill or invoice payment lines');
export const LOAD_PAYMENT_ALLOCATION = Symbol('Load bill or invoice payment allocation');
export const SAVE_PAYMENT_ALLOCATION = Symbol('Save bill or invoice payment allocation');
export const LOAD_PAYMENT_ALLOCATION_OPTIONS = Symbol('Load payment allocation filter options');
export const UPDATE_PAYMENT_ALLOCATION_OPTIONS = Symbol('Update payment allocation filter options');
export const UPDATE_PAYMENT_ALLOCATION_LINE = Symbol('Update payment allocation line');
export const SET_PAYMENT_ALLOCATION_LOADING_STATE = Symbol('Set payment allocation loading state');

export const LOAD_TRANSFER_MONEY = Symbol('Load an existing transfer money');
export const LOAD_NEW_TRANSFER_MONEY = Symbol('Load a new transfer money');
export const UPDATE_TRANSFER_MONEY = Symbol('Update the transfer money');
export const SAVE_TRANSFER_MONEY = Symbol('Save transfer money');

export const SELECT_TRANSACTION = Symbol('Select bank transaction');
export const SELECT_ALL_TRANSACTIONS = Symbol('Select all bank transactions');
export const UPDATE_BULK_ALLOCATION_OPTIONS = Symbol('Update bulk allocation options');
export const BULK_ALLOCATE_TRANSACTIONS = Symbol('Bulk allocate transactions');
export const BULK_UNALLOCATE_TRANSACTIONS = Symbol('Bulk unallocate transactions');
export const SET_BULK_LOADING_STATE = Symbol('Set bulk loading state for bulk allocation');
export const RESET_BULK_ALLOCATION = Symbol('Reset the state of the bulk allocation options');

export const APPLY_RULE_TO_TRANSACTIONS = Symbol('Apply baning rule to transactions');
export const UNSELECT_TRANSACTIONS = Symbol('Unselect transactions');

export const LOAD_ATTACHMENTS = Symbol('Load attachments');
export const SET_ATTACHMENTS_LOADING_STATE = Symbol('Set attachments loading state');
export const ADD_ATTACHMENTS = Symbol('Add attachments');
export const UPLOAD_ATTACHMENT = Symbol('Upload attachment');
export const UPDATE_UPLOAD_PROGRESS = Symbol('Update upload progress');
export const UPLOAD_ATTACHMENT_FAILED = Symbol('Upload attachment failed');
export const OPEN_REMOVE_ATTACHMENT_MODAL = Symbol('Open remove attachment modal');
export const REMOVE_ATTACHMENT = Symbol('Remove attachment');
export const REMOVE_ATTACHMENT_BY_INDEX = Symbol('Remove attachment by index');
export const SET_OPERATION_IN_PROGRESS_STATE = Symbol('Set operation in progress state');
