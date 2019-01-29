const TransferMoneyIntents = {
  SET_LOADING_STATE: Symbol('Set loading state'),
  LOAD_NEW_TRANSFER_MONEY: Symbol('Load a new empty transfer money entry data'),
  LOAD_TRANSFER_MONEY_DETAIL: Symbol('Load a transfer money entry data'),
  DELETE_TRANSFER_MONEY: Symbol('Delete a transfer money entry'),
  UPDATE_FORM: Symbol('Update a form value'),
  FORMAT_AMOUNT: Symbol('Format amount'),
  SET_SUBMITTING_STATE: Symbol('Set submitting state'),
  CREATE_TRANSFER_MONEY: Symbol('Create a transfer money entry'),
  SET_ALERT_MESSAGE: Symbol('Set alert message'),
  OPEN_MODAL: Symbol('Open modal'),
  CLOSE_MODAL: Symbol('Close modal'),
};

export default TransferMoneyIntents;
