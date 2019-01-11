const ReceiveMoneyIntents = {
  LOAD_RECEIVE_MONEY_DETAIL: Symbol('Load a receive money entry data'),
  FORMAT_RECEIVE_MONEY_LINE: Symbol('Format receive money line'),
  OPEN_MODAL: Symbol('Open a modal'),
  CLOSE_MODAL: Symbol('Close a modal'),
  SET_ALERT_MESSAGE: Symbol('Set alert message'),
  SET_LOADING_STATE: Symbol('Set loading state'),
  SET_TABLE_LOADING_STATE: Symbol('Set Table loading state'),
  LOAD_RECEIVE_MONEY_ENTRIES: Symbol('Load receive money entries'),
  FILTER_RECEIVE_MONEY_ENTRIES: Symbol('filter receive money entries'),
  UPDATE_FILTER_OPTIONS: Symbol('Update filter Options'),
  SORT_RECEIVE_MONEY_ENTRIES: Symbol('Sort the receive money entries'),
  SET_SUBMITTING_STATE: Symbol('Set submitting state'),
  DELETE_RECEIVE_MONEY: Symbol('Delete a receive money entry'),
  UPDATE_RECEIVE_MONEY_HEADER: Symbol('Update receive money header'),
};

export default ReceiveMoneyIntents;
