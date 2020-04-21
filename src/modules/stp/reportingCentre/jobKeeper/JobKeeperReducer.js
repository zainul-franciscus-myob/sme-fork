import createReducer from '../../../../store/createReducer';

const handlers = {};

const getDefaultState = () => ({});

const jobKeeperReducer = createReducer(getDefaultState(), handlers);

export default jobKeeperReducer;
