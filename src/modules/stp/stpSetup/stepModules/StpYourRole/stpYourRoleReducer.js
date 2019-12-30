import { SET_FIELD } from './stpYourRoleIntents';
import Role from './Role';
import createReducer from '../../../../../store/createReducer';

const getDefaultState = () => ({
  role: Role.SOMEONE_FROM_THE_BUSINESS,
  agentAbn: '',
  agentNumber: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
});

const setField = (state, { key, value }) => ({
  ...state,
  [key]: value,
});

const handlers = {
  [SET_FIELD]: setField,
};

const stpYourRoleReducer = createReducer(getDefaultState(), handlers);

export default stpYourRoleReducer;
