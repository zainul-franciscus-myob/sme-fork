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
  LOAD_NEW_RECEIVE_MONEY: Symbol('Load a new empty receive money entry data'),
  CREATE_RECEIVE_MONEY: Symbol('Create a new receive money entry'),
  UPDATE_RECEIVE_MONEY: Symbol('Update a receive money entry'),
  UPDATE_RECEIVE_MONEY_LINE: Symbol('Update receive money line'),
  ADD_RECEIVE_MONEY_LINE: Symbol('Add receive money line'),
  DELETE_RECEIVE_MONEY_LINE: Symbol('Delete receive money line'),
  GET_CALCULATED_TOTALS: Symbol('Get calculated totals'),
  RESET_TOTALS: Symbol('Reset calculated totals'),
  SET_ALERT: Symbol('Set the Alert of the page'),
};

export default ReceiveMoneyIntents;
