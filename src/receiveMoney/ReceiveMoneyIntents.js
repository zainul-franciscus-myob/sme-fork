const ReceiveMoneyIntents = {
  LOAD_RECEIVE_MONEY_DETAIL: Symbol('Load a receive money entry data'),
  FORMAT_RECEIVE_MONEY_LINE: Symbol('Format receive money line'),
  OPEN_MODAL: Symbol('Open a modal'),
  CLOSE_MODAL: Symbol('Close a modal'),
  SET_ALERT_MESSAGE: Symbol('Set alert message'),
  SET_LOADING_STATE: Symbol('Set loading state'),
  SET_TABLE_LOADING_STATE: Symbol('Set Table loading state'),
};

export default ReceiveMoneyIntents;
