import createReducer from '../../../store/createReducer';

const getDefaultState = () => {};

const handlers = {};

const recurringTransactionListReducer = createReducer(
  getDefaultState(),
  handlers
);

export default recurringTransactionListReducer;
