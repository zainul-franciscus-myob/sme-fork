const TransactionListIntents = {
  SET_ALERT_MESSAGE: Symbol('Set alert message'),
  SET_LOADING_STATE: Symbol('Set loading state'),
  SET_ALERT: Symbol('Set the Alert of the page'),
  LOAD_TRANSACTION_LIST: Symbol('Load list of transactions'),
  SORT_AND_FILTER_TRANSACTION_LIST: Symbol('Sort and filter list of transactions'),
  SET_TABLE_LOADING_STATE: Symbol('Set Table loading state'),
  UPDATE_FILTER_OPTIONS: Symbol('Update filter Options'),
};

export default TransactionListIntents;
