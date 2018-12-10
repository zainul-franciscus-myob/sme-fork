const SpendMoneyIntents = {
  LOAD_NEW_SPEND_MONEY: Symbol('Load a new empty spend money entry data'),
  LOAD_SPEND_MONEY_DETAIL: Symbol('Load a spend money entry data'),
  LOAD_REFERENCE_ID: Symbol('Load the reference id'),
  CREATE_SPEND_MONEY: Symbol('Create a new spend money entry'),
  UPDATE_SPEND_MONEY_HEADER: Symbol('Update spend money header'),
  UPDATE_SPEND_MONEY_LINE: Symbol('Update spend money line'),
  ADD_SPEND_MONEY_LINE: Symbol('Add spend money line'),
  DELETE_SPEND_MONEY_LINE: Symbol('Delete spend money line'),
  FORMAT_SPEND_MONEY_LINE: Symbol('Format spend money line'),
  OPEN_MODAL: Symbol('Open a modal'),
  CLOSE_MODAL: Symbol('Close a modal'),
  SET_ALERT_MESSAGE: Symbol('Set alert message'),
  SET_LOADING_STATE: Symbol('Set loading state'),
  SET_SUBMITTING_STATE: Symbol('Set submitting state'),
  GET_CALCULATED_TOTALS: Symbol('Get calculated totals'),
};

export default SpendMoneyIntents;
